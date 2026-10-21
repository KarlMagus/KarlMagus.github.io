const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const siteRoot = __dirname;
const siteUrl = 'https://karlmagus.github.io';
const projectDataPath = path.join(siteRoot, 'projects-data.js');
const projectContext = {};
vm.createContext(projectContext);
vm.runInContext(fs.readFileSync(projectDataPath, 'utf8'), projectContext, { filename: projectDataPath });
const projects = vm.runInContext('PORTFOLIO_PROJECTS', projectContext);

const publicCaseStudies = {
  'mapping-to-sql-gemma': {
    summary: 'A local-first language-model workflow that turns spreadsheet mapping rules into structured SQL and JSON, with fine-tuning, input normalization, and validation.',
    focus: 'Model adaptation, preprocessing, structured generation, and local API serving.',
    highlights: ['Adapted an open-weight model with parameter-efficient fine-tuning.', 'Built a preprocessing path for mapping inputs and common transformation variations.', 'Evaluated generated output for schema structure and SQL validity.'],
    tags: ['Mistral', 'QLoRA', 'PyTorch', 'Python API', 'ANSI SQL']
  },
  'enterprise-json-query-enhancer': {
    summary: 'An AI-assisted data pipeline compiler that converts mapping workbooks into structured ETL manifests and supports incremental schema updates with validation.',
    focus: 'Data systems engineering, workflow compilation, schema validation, and incremental updates.',
    highlights: ['Built a workbook-to-manifest generation workflow.', 'Added deterministic checks around generated pipeline structure.', 'Designed incremental updates to avoid rebuilding unchanged pipeline stages.'],
    tags: ['Gemini Flash 2.5', 'Python', 'Flask', 'Apache Spark', 'JSON Schema']
  },
  'ai-classroom-monitor': {
    summary: 'A classroom video analytics prototype demonstrating presence and activity signals, server-side overlays, and cloud-backed video workflows. The public demo uses synthetic sample records.',
    focus: 'Computer vision integration, video processing, telemetry presentation, and cloud storage.',
    highlights: ['Integrated managed vision analysis with a video-processing backend.', 'Composited time-aligned visual overlays for review.', 'Separated high-frequency telemetry from session and media storage.'],
    tags: ['AWS Rekognition', 'OpenCV', 'MoviePy', 'Django', 'AWS S3']
  },
  'ai-healthcare-scribe': {
    summary: 'An autonomous voice AI front desk and central healthcare record architecture for hospitals and clinics, handling telephony bookings, doctor consultations, lab loops, and FHIR R4 interoperability.',
    focus: 'Voice AI conversational telephony, healthcare interoperability (FHIR R4), multi-tenant EHR architecture, and privacy governance.',
    highlights: ['Engineered ElevenLabs voice agent with deterministic backend slot booking tools.', 'Built swappable record backend supporting standalone, integrated HIS, and hybrid modes.', 'Automated notifications and post-call workflows using n8n and WhatsApp API.', 'Implemented restricted diagnostic lab portal and closed-loop follow-up scheduling.'],
    tags: ['ElevenLabs', 'FastAPI', 'n8n', 'FHIR R4', 'PostgreSQL', 'WhatsApp API', 'Docker']
  },
  'ai-quiz-generation-saas': {
    summary: 'A full-stack assessment product that turns text, documents, and diagrams into editable quizzes with multiple question formats and export options.',
    focus: 'Multimodal ingestion, AI-assisted content generation, product workflows, and SaaS architecture.',
    highlights: ['Built text, document, and image-based input flows.', 'Implemented quiz editing, practice, and scoring experiences.', 'Added usage controls and multi-format export.'],
    tags: ['FastAPI', 'React', 'OpenAI', 'MySQL', 'Docker']
  },
  'enterprise-pms-innovation-analytics': {
    summary: 'An enterprise planning and innovation platform combining project workflows, quantitative analytics, bilingual publishing, and AI-assisted content tools.',
    focus: 'Full-stack platform engineering, analytics, collaboration, and content management.',
    highlights: ['Connected planning workflows from ideation through delivery tracking.', 'Implemented quantitative process and cost-benefit analysis views.', 'Integrated bilingual publishing and real-time collaboration.'],
    tags: ['Django REST Framework', 'React', 'PostgreSQL', 'Gemini', 'SPC']
  },
  'bio-adaptive-music-meditation': {
    summary: 'A bio-adaptive wellness prototype that combines multimodal signals with generative audio and visual output, including a fallback mode for disconnected sensors.',
    focus: 'Multimodal signal integration, generative media, hardware connectivity, and accessible interaction.',
    highlights: ['Combined visual, voice, and biometric inputs into an adaptive session state.', 'Connected sensor readings to generative audio and visual experiences.', 'Added simulated telemetry fallback and session export.'],
    tags: ['Django', 'Rekognition', 'Transformers', 'MusicGen', 'Arduino']
  },
  'autonomous-social-content-engine': {
    summary: 'A multi-agent content operations platform for research, editorial planning, multilingual media generation, scheduling, and audience engagement workflows.',
    focus: 'Agent orchestration, background processing, multimodal generation, and publishing integrations.',
    highlights: ['Coordinated research, planning, drafting, and media tasks across agents.', 'Added scheduled content queues and bilingual audio generation.', 'Connected publishing and engagement workflows through platform integrations.'],
    tags: ['PyAutoGen', 'OpenAI', 'Django-Q2', 'TTS', 'Social APIs']
  }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function renderProjectPage(project, publicContent, index) {
  const previousProject = projects[(index - 1 + projects.length) % projects.length];
  const nextProject = projects[(index + 1) % projects.length];
  const canonicalUrl = `${siteUrl}/projects/${project.id}/`;
  const pageDescription = publicContent.summary;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: pageDescription,
    url: canonicalUrl,
    creator: {
      '@type': 'Person',
      name: 'Ishraq Ahmad',
      url: `${siteUrl}/`
    },
    keywords: publicContent.tags.join(', ')
  };
  const starCard = project.starSummary ? `
    <div class="detail-star-card" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
      <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-text); font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-compass"></i>
        <span>Summary</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-building" style="color: var(--accent-bright);"></i> Situation
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${escapeHtml(project.starSummary.situation)}</p>
        </div>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-list-check" style="color: var(--accent-bright);"></i> Task
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${escapeHtml(project.starSummary.task)}</p>
        </div>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-brain" style="color: var(--accent-bright);"></i> Action
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${escapeHtml(project.starSummary.action)}</p>
        </div>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-chart-line" style="color: var(--accent-bright);"></i> Result
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${escapeHtml(project.starSummary.result)}</p>
        </div>
      </div>
    </div>
  ` : '';

  const liveDemoBanner = project.liveDemo ? `
    <div class="live-demo-banner" style="background: linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(15,23,42,0.8) 100%); border: 1px solid rgba(59,130,246,0.35); border-radius: var(--radius-md); padding: 1.25rem 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div style="max-width: 680px;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #4ade80; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></span>
          <span>Interactive Browser Demo · Simulated</span>
        </div>
        <h3 style="color: #ffffff; font-size: 1.15rem; font-weight: 600; margin: 0 0 0.25rem;">${escapeHtml(project.liveDemoTitle || 'Test the Pipeline in Your Browser')}</h3>
        <p style="color: #94a3b8; font-size: 0.88rem; margin: 0; line-height: 1.5;">${escapeHtml(project.liveDemoDesc || 'Interactive browser simulation comparing predefined examples and pipeline stages.')}</p>
      </div>
      <a href="../../${escapeHtml(project.liveDemo)}" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; white-space: nowrap;">
        <i class="fa-solid fa-play"></i>
        <span>Launch Interactive Demo</span>
      </a>
    </div>
  ` : '';

  const projectSections = [
    ['Project Summary', publicContent.summary],
    ['Engineering Focus', publicContent.focus]
  ];
  const highlightsList = (project.highlights && project.highlights.length > 0)
    ? project.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')
    : publicContent.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('');

  const techTags = (project.techStack && project.techStack.length > 0)
    ? project.techStack.map((tag) => `<span class="sidebar-tag">${escapeHtml(tag)}</span>`).join('')
    : publicContent.tags.map((tag) => `<span class="sidebar-tag">${escapeHtml(tag)}</span>`).join('');

  const sections = (project.sections && project.sections.length > 0)
    ? project.sections.map((sec) => `
        <section class="detail-section">
          <h2 class="detail-section-title">
            <i class="fa-solid ${sec.icon || 'fa-layer-group'}"></i>
            <span>${sec.title}</span>
          </h2>
          <div class="detail-prose">
            ${sec.content}
          </div>
        </section>
      `).join('')
    : projectSections.map(([title, text]) => `
        <section class="detail-section">
          <h2 class="detail-section-title"><span>${escapeHtml(title)}</span></h2>
          <div class="detail-prose"><p>${escapeHtml(text)}</p></div>
        </section>
      `).join('');

  const liveDemoLink = project.liveDemo ? `
    <a href="../../${escapeHtml(project.liveDemo)}" class="btn btn-primary btn-block">
      <span>Open Interactive Demo</span>
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </a>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(project.title)} | Ishraq Ahmad</title>
  <meta name="description" content="${escapeHtml(pageDescription)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(project.title)} | Ishraq Ahmad" />
  <meta property="og:description" content="${escapeHtml(pageDescription)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta name="twitter:card" content="summary" />
  <script defer src="../../js/analytics.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="../../style.css" />
  <link rel="stylesheet" href="../../project-detail.css" />
  <script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>
</head>
<body class="project-detail-body">
  <div class="tech-grid-bg" aria-hidden="true"></div>
  <header class="navbar">
    <div class="nav-container">
      <a href="../../index.html" class="logo"><span class="logo-text">Ishraq Ahmad</span></a>
      <nav class="nav-links">
        <a href="../../index.html#hero" class="nav-link">Home</a>
        <a href="../../index.html#projects" class="nav-link active">Projects</a>
        <a href="../../index.html#about" class="nav-link">About</a>
        <a href="../../index.html#contact" class="nav-link">Contact</a>
      </nav>
      <div class="nav-cta">
        <a href="../../index.html#projects" class="btn btn-sm btn-secondary"><i class="fa-solid fa-arrow-left"></i><span>All Projects</span></a>
      </div>
    </div>
  </header>
  <main class="project-detail-main">
    <div class="container">
      <nav class="detail-breadcrumb" aria-label="Breadcrumb">
        <a href="../../index.html#projects"><i class="fa-solid fa-chevron-left"></i> Portfolio</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${escapeHtml(project.categoryLabel)}</span>
      </nav>
      <header class="detail-hero">
        <div class="detail-badges">
          <span class="detail-tag">Project ${escapeHtml(project.num)}</span>
          <span class="detail-role">${escapeHtml(project.role)}</span>
        </div>
        <h1 class="detail-title">${escapeHtml(project.title)}</h1>
        <p class="detail-subtitle">${escapeHtml(pageDescription)}</p>
        <div class="detail-meta-bar">
          <div class="meta-col"><span class="meta-label">Focus</span><span class="meta-val">${escapeHtml(publicContent.focus)}</span></div>
          <div class="meta-col"><span class="meta-label">Core Technologies</span><span class="meta-val">${escapeHtml(publicContent.tags.slice(0, 4).join(' · '))}</span></div>
          <div class="meta-col"><span class="meta-label">Project Type</span><span class="meta-val">${escapeHtml(project.categoryLabel)}</span></div>
        </div>
      </header>
      <div class="detail-content-layout">
        <div class="detail-body-col">
          ${liveDemoBanner}
          ${starCard}
          ${sections}
        </div>
        <aside class="detail-sidebar-col">
          <div class="sidebar-card">
            <h2 class="sidebar-heading"><i class="fa-solid fa-layer-group"></i> Architecture Stack</h2>
            <div class="sidebar-tags">${techTags}</div>
            <div class="sidebar-divider"></div>
            <h2 class="sidebar-heading"><i class="fa-solid fa-chart-line"></i> Engineering Highlights</h2>
            <ul class="sidebar-highlights-list">${highlightsList}</ul>
            <div class="sidebar-divider"></div>
            ${liveDemoLink}
            <a href="../../index.html#contact" class="btn btn-secondary btn-block"><span>Discuss Similar Work</span></a>
          </div>
        </aside>
      </div>
      <nav class="detail-footer-nav" aria-label="Project navigation">
        <a href="../${previousProject.id}/" class="nav-project-btn"><i class="fa-solid fa-arrow-left"></i><span><span class="nav-hint">Previous Project</span><span class="nav-name">${escapeHtml(previousProject.title)}</span></span></a>
        <a href="../../index.html#projects" class="nav-all-btn"><i class="fa-solid fa-grid-2"></i><span>View All Projects</span></a>
        <a href="../${nextProject.id}/" class="nav-project-btn"><span><span class="nav-hint">Next Project</span><span class="nav-name">${escapeHtml(nextProject.title)}</span></span><i class="fa-solid fa-arrow-right"></i></a>
      </nav>
    </div>
  </main>
  <footer class="site-footer"><div class="container footer-bottom"><p>&copy; 2026 Ishraq Ahmad. All rights reserved.</p></div></footer>
</body>
</html>
`;
}

const missingPublicContent = projects.filter((project) => !publicCaseStudies[project.id]);
if (missingPublicContent.length) {
  throw new Error(`Missing public case-study summaries: ${missingPublicContent.map((project) => project.id).join(', ')}`);
}

for (const [index, project] of projects.entries()) {
  const outputDirectory = path.join(siteRoot, 'projects', project.id);
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(outputDirectory, 'index.html'),
    renderProjectPage(project, publicCaseStudies[project.id], index),
    'utf8'
  );
}

const sitemapPaths = [
  '/',
  '/demo-sql-finetuning.html',
  '/demo-etl-generator.html',
  '/demo-classroom-cv.html',
  ...projects.map((project) => `/projects/${project.id}/`)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((pagePath) => `  <url><loc>${siteUrl}${pagePath}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(siteRoot, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${projects.length} public project pages and sitemap.xml.`);
