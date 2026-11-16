/* Centralized, privacy-preserving GA4 telemetry and recruiter attribution module. */
(() => {
  const MEASUREMENT_ID = 'G-NEJV1LG1SL';
  const ATTRIBUTION_STORAGE_KEY = 'portfolio_utm_attribution';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const MAX_EVENT_PARAMS = 25;
  const LONG_URL_KEYS = new Set(['link_url', 'page_location', 'page_referrer']);

  const SENSITIVE_KEY_PATTERN = /^(name|full_name|first_name|last_name|contact_name|email|e_mail|contact_email|phone|tel|telephone|mobile|message|brief|contact_brief|body|text|address|street|ssn|password|secret|token)$/i;
  const SENSITIVE_QUERY_PARAM_PATTERN = /([?&])(email|e_mail|name|full_name|first_name|last_name|contact_name|phone|tel|telephone|mobile|brief|message|body)=([^&#]*)/gi;
  const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const PHONE_PATTERN = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b|\+\d{1,3}[\s.-]?\d{4,5}[\s.-]?\d{4,6}\b/g;
  const GA4_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;

  const urlParams = new URLSearchParams(window.location.search || '');
  const hostname = (window.location.hostname || '').toLowerCase();
  const isDebugMode =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    window.location.protocol === 'file:' ||
    urlParams.get('analytics_debug') === '1' ||
    urlParams.get('gtm_debug') === '1';

  const preInitQueue = Array.isArray(window.__portfolioAnalyticsQueue)
    ? window.__portfolioAnalyticsQueue.splice(0)
    : [];
  const pendingQueue = [];
  let isBootstrapped = false;

  function normalizeIdentifier(rawValue) {
    return String(rawValue || '')
      .trim()
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40);
  }

  function normalizeEventName(name) {
    const clean = normalizeIdentifier(name);
    return GA4_NAME_PATTERN.test(clean) ? clean : null;
  }

  function redactPII(value, keyHint = '') {
    if (keyHint && SENSITIVE_KEY_PATTERN.test(String(keyHint).trim())) {
      return '[REDACTED_PII]';
    }
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : undefined;
    }

    let str = String(value).trim();
    if (!str) return '';

    if (/^mailto:/i.test(str)) {
      const [, query = ''] = str.split('?');
      const redactedQuery = query
        ? '?' + query.replace(/(^|&)(body|message|name|email|phone)=([^&]*)/gi, '$1$2=[REDACTED_PII]')
        : '';
      return `mailto:[REDACTED_EMAIL]${redactedQuery}`;
    }

    if (str.includes('?')) {
      str = str.replace(SENSITIVE_QUERY_PARAM_PATTERN, '$1$2=[REDACTED_PII]');
    }

    str = str.replace(EMAIL_PATTERN, '[REDACTED_EMAIL]');
    str = str.replace(PHONE_PATTERN, '[REDACTED_PHONE]');
    return str;
  }

  function resolveProjectId(explicitProjectId) {
    if (explicitProjectId) {
      return String(explicitProjectId).trim().slice(0, 100);
    }
    if (document.body && document.body.dataset && document.body.dataset.projectId) {
      return String(document.body.dataset.projectId).trim().slice(0, 100);
    }
    const pathMatch = (window.location.pathname || '').match(/\/projects\/([^/]+)\/?/i);
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]).slice(0, 100);
    }
    if (/\/project-detail(?:\.html)?$/i.test(window.location.pathname || '')) {
      const hashParams = new URLSearchParams((window.location.hash || '').replace(/^#/, ''));
      const detailId = urlParams.get('id') || hashParams.get('id');
      if (detailId) {
        return String(detailId).trim().slice(0, 100);
      }
    }
    return '';
  }

  function captureAndGetAttribution() {
    const stored = {};
    try {
      const existing = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
      if (existing) {
        Object.assign(stored, JSON.parse(existing));
      }
    } catch (_) {
      /* sessionStorage unavailable in restricted environments */
    }

    let updated = false;
    UTM_KEYS.forEach((key) => {
      const val = urlParams.get(key);
      if (val && val.trim()) {
        const cleanVal = redactPII(val, key);
        if (cleanVal) {
          stored[key] = String(cleanVal).slice(0, 100);
          updated = true;
        }
      }
    });

    if (updated) {
      try {
        window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
      } catch (_) {
        /* ignore storage quota or privacy mode errors */
      }
    }

    return stored;
  }

  const sessionAttribution = captureAndGetAttribution();

  function sanitizeParams(rawParams = {}) {
    const source = rawParams && typeof rawParams === 'object' && !Array.isArray(rawParams)
      ? rawParams
      : {};
    const sanitized = {};
    let keyCount = 0;

    const assignParam = (rawKey, rawVal) => {
      if (keyCount >= MAX_EVENT_PARAMS) return;
      const cleanKey = normalizeIdentifier(rawKey);
      if (!GA4_NAME_PATTERN.test(cleanKey)) return;
      if (/^(ga_|google_|firebase_)/.test(cleanKey)) return;

      const cleanVal = redactPII(rawVal, cleanKey);
      if (cleanVal === undefined || cleanVal === '') return;

      if (typeof cleanVal === 'string') {
        const maxLen = LONG_URL_KEYS.has(cleanKey) ? 500 : 100;
        sanitized[cleanKey] = cleanVal.slice(0, maxLen);
      } else {
        sanitized[cleanKey] = cleanVal;
      }

      if (!Object.prototype.hasOwnProperty.call(sanitized, cleanKey)) return;
      keyCount = Object.keys(sanitized).length;
    };

    Object.entries(source).forEach(([k, v]) => {
      assignParam(k, v);
    });

    if (!sanitized.project_id) {
      const detectedProjectId = resolveProjectId(source.project_id);
      if (detectedProjectId) {
        assignParam('project_id', detectedProjectId);
      }
    }

    UTM_KEYS.forEach((utmKey) => {
      if (!sanitized[utmKey] && sessionAttribution[utmKey]) {
        assignParam(utmKey, sessionAttribution[utmKey]);
      }
    });

    if (isDebugMode && sanitized.debug_mode === undefined) {
      assignParam('debug_mode', true);
    }

    return sanitized;
  }

  function flushQueue() {
    if (!isBootstrapped || typeof window.gtag !== 'function') return;
    while (pendingQueue.length > 0) {
      const item = pendingQueue.shift();
      if (!item || !item.name) continue;
      window.gtag('event', item.name, item.params);
      if (isDebugMode && typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug('[GA4 Telemetry]', item.name, item.params);
      }
    }
  }

  function trackEvent(name, params = {}) {
    const cleanName = normalizeEventName(name);
    if (!cleanName) {
      if (isDebugMode && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('[GA4 Telemetry] Dropped invalid event name:', name);
      }
      return false;
    }

    const cleanParams = sanitizeParams(params);
    pendingQueue.push({ name: cleanName, params: cleanParams });
    flushQueue();
    return true;
  }

  function classifyOutboundTarget(anchor, explicitTarget) {
    if (explicitTarget) {
      return normalizeIdentifier(explicitTarget) || String(explicitTarget).trim();
    }
    const rawHref = anchor.getAttribute('href') || '';
    if (/^mailto:/i.test(rawHref) || anchor.protocol === 'mailto:') {
      return 'email_direct';
    }
    const linkHost = (anchor.hostname || '').toLowerCase().replace(/^www\./, '');
    if (linkHost === 'compelion.com' || linkHost.endsWith('.compelion.com')) {
      return 'live_product_compelion';
    }
    if (linkHost === 'quizentia.com' || linkHost.endsWith('.quizentia.com')) {
      return 'live_product_quizentia';
    }
    if (linkHost === 'github.com' || linkHost.endsWith('.github.com')) {
      const segments = (anchor.pathname || '').split('/').filter(Boolean);
      return segments.length > 1 ? 'github_repo' : 'github_profile';
    }
    if (linkHost === 'linkedin.com' || linkHost.endsWith('.linkedin.com')) {
      return 'linkedin_profile';
    }
    return `external_${normalizeIdentifier(linkHost) || 'link'}`;
  }

  function buildOutboundParams(anchor, baseParams = {}) {
    const rawHref = anchor.getAttribute('href') || '';
    const isMailto = /^mailto:/i.test(rawHref) || anchor.protocol === 'mailto:';
    const linkHost = isMailto
      ? 'mailto'
      : (anchor.hostname || '').toLowerCase().replace(/^www\./, '');
    const linkUrl = isMailto ? rawHref : (anchor.href || rawHref);

    return {
      event_category: baseParams.event_category || 'outbound_proof',
      event_label: baseParams.event_label || classifyOutboundTarget(anchor, baseParams.outbound_target),
      outbound_target: classifyOutboundTarget(anchor, baseParams.outbound_target),
      link_domain: linkHost,
      link_url: linkUrl,
      link_text: (anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
      outbound: true,
      transport_type: 'beacon',
      ...baseParams
    };
  }

  function handleDelegatedClick(event) {
    if (!event || !event.target || typeof event.target.closest !== 'function') return;

    const declaredEl = event.target.closest('[data-analytics-event]');
    if (declaredEl) {
      if (declaredEl.getAttribute('data-analytics-manual') === 'true') {
        return;
      }

      const eventName = normalizeEventName(declaredEl.getAttribute('data-analytics-event'));
      if (!eventName) return;

      const baseParams = {};
      const attrMap = {
        'data-analytics-category': 'event_category',
        'data-analytics-label': 'event_label',
        'data-analytics-project': 'project_id',
        'data-analytics-demo': 'demo_name',
        'data-analytics-action': 'demo_action',
        'data-analytics-target': 'outbound_target',
        'data-analytics-filter': 'filter_group'
      };

      Object.entries(attrMap).forEach(([attrName, paramKey]) => {
        const val = declaredEl.getAttribute(attrName);
        if (val) baseParams[paramKey] = val;
      });

      if (!baseParams.event_label) {
        const fallbackLabel = (declaredEl.textContent || declaredEl.getAttribute('aria-label') || '')
          .trim()
          .replace(/\s+/g, ' ');
        if (fallbackLabel) baseParams.event_label = fallbackLabel;
      }

      const anchor = declaredEl.tagName === 'A' ? declaredEl : declaredEl.closest('a[href]');
      if (eventName === 'outbound_click' && anchor) {
        const outboundParams = buildOutboundParams(anchor, baseParams);
        outboundParams.transport_type = 'beacon';
        trackEvent('outbound_click', outboundParams);
        return;
      }

      trackEvent(eventName, baseParams);
      return;
    }

    const anchor = event.target.closest('a[href]');
    if (!anchor) return;

    const rawHref = anchor.getAttribute('href') || '';
    const isMailto = /^mailto:/i.test(rawHref) || anchor.protocol === 'mailto:';
    const isHttp = anchor.protocol === 'http:' || anchor.protocol === 'https:';
    const isExternalHttp =
      isHttp &&
      Boolean(anchor.hostname) &&
      anchor.hostname.toLowerCase() !== hostname;

    if (isMailto || isExternalHttp) {
      trackEvent('outbound_click', buildOutboundParams(anchor));
    }
  }

  function isCaseStudyPage() {
    const path = window.location.pathname || '';
    return (
      /\/projects\/[^/]+\/?/i.test(path) ||
      /\/project-detail(?:\.html)?$/i.test(path) ||
      Boolean(document.body && document.body.classList && document.body.classList.contains('project-detail-body'))
    );
  }

  function initScrollDepthTracking() {
    if (!isCaseStudyPage()) return;

    const thresholds = [50, 90];
    const firedThresholds = new Set();
    let rafPending = false;

    const evaluateScroll = () => {
      rafPending = false;
      if (firedThresholds.size >= thresholds.length) return;

      const docEl = document.documentElement;
      const bodyEl = document.body;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        (docEl ? docEl.scrollTop : 0) ||
        0;
      if (scrollTop <= 0) return;

      const scrollHeight = Math.max(
        docEl ? docEl.scrollHeight : 0,
        bodyEl ? bodyEl.scrollHeight : 0
      );
      const viewportHeight = window.innerHeight || (docEl ? docEl.clientHeight : 0) || 0;
      if (scrollHeight <= 0) return;

      const percent = Math.min(100, Math.round(((scrollTop + viewportHeight) / scrollHeight) * 100));
      const projectId = resolveProjectId();

      thresholds.forEach((threshold) => {
        if (percent >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold);
          trackEvent('scroll_depth', {
            event_category: 'case_study_engagement',
            event_label: `${projectId || 'case_study'}_${threshold}%`,
            project_id: projectId || undefined,
            percent_scrolled: threshold
          });
        }
      });
    };

    window.addEventListener(
      'scroll',
      () => {
        if (firedThresholds.size >= thresholds.length || rafPending) return;
        rafPending = true;
        if (typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(evaluateScroll);
        } else {
          setTimeout(evaluateScroll, 50);
        }
      },
      { passive: true }
    );
  }

  /* Bootstrap GA4 gtag and privacy-preserving configuration. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  const configParams = {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  };
  if (isDebugMode) {
    configParams.debug_mode = true;
  }
  window.gtag('config', MEASUREMENT_ID, configParams);
  isBootstrapped = true;

  preInitQueue.forEach((item) => {
    if (item && item.name) {
      trackEvent(item.name, item.params || {});
    }
  });

  if (typeof document.querySelector === 'function' && document.head) {
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`
    );
    if (!existingScript) {
      const analyticsScript = document.createElement('script');
      analyticsScript.async = true;
      analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      if (typeof analyticsScript.addEventListener === 'function') {
        analyticsScript.addEventListener('load', flushQueue);
      }
      document.head.appendChild(analyticsScript);
    }
  }

  if (typeof document.addEventListener === 'function') {
    document.addEventListener('click', handleDelegatedClick);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        flushQueue();
        initScrollDepthTracking();
      });
    } else {
      flushQueue();
      initScrollDepthTracking();
    }
  }

  window.trackEvent = trackEvent;
  window.PortfolioAnalytics = {
    measurementId: MEASUREMENT_ID,
    isDebugMode,
    trackEvent,
    redactPII,
    sanitizeParams,
    normalizeEventName,
    getAttribution: () => ({ ...sessionAttribution }),
    flushQueue
  };
})();
