/* Render compact first-glance project cards and category filtering from shared project data. */

function escapeCardHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch]);
}

function renderProjectCards(filter) {
  const container = document.getElementById('projectsGrid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  const filtered = filter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((project) => Array.isArray(project.filterGroups) && project.filterGroups.includes(filter));

  container.innerHTML = filtered.map((project) => {
    const safeProjectId = escapeCardHtml(project.id);
    const detailHref = `projects/${encodeURIComponent(project.id)}/`;
    const typeLabel = project.solutionType || project.categoryLabel;
    const summaryText = project.cardSummary || project.shortDesc;
    const tags = (project.cardTags && project.cardTags.length > 0)
      ? project.cardTags
      : project.techStack.slice(0, 3);

    let primaryAction = '';
    if (project.liveUrl) {
      const outboundTarget = project.liveUrl.includes('compelion')
        ? 'live_product_compelion'
        : (project.liveUrl.includes('quizentia') ? 'live_product_quizentia' : '');
      primaryAction = `
        <a href="${escapeCardHtml(project.liveUrl)}" class="link-btn link-btn-demo" target="_blank" rel="noopener noreferrer"
          data-analytics-event="outbound_click" data-analytics-category="outbound_proof"
          data-analytics-label="${safeProjectId}_live_site"
          ${outboundTarget ? `data-analytics-target="${outboundTarget}"` : ''}
          data-analytics-project="${safeProjectId}">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Live Website</span>
        </a>
      `;
    } else if (project.liveDemo) {
      primaryAction = `
        <a href="${escapeCardHtml(project.liveDemo)}" class="link-btn link-btn-demo"
          data-analytics-event="select_content" data-analytics-category="demo_launch"
          data-analytics-label="${safeProjectId}_demo_card" data-analytics-project="${safeProjectId}">
          <i class="fa-solid fa-play"></i>
          <span>Interactive Demo</span>
        </a>
      `;
    }

    return `
      <article class="bento-card" data-filter-groups="${escapeCardHtml((project.filterGroups || []).join(','))}">
        <div class="bento-content">
          <div class="project-meta">
            <span class="project-num">${escapeCardHtml(project.num)}</span>
            <span class="project-type-badge">${escapeCardHtml(typeLabel)}</span>
          </div>
          <h3 class="project-title">
            <a href="${detailHref}" class="project-title-link"
              data-analytics-event="select_content" data-analytics-category="project_card"
              data-analytics-label="${safeProjectId}" data-analytics-project="${safeProjectId}">${escapeCardHtml(project.title)}</a>
          </h3>
          <p class="project-summary">${escapeCardHtml(summaryText)}</p>
          ${project.outcomeBadge ? `
            <div class="project-outcome-pill">
              <i class="fa-solid fa-check-circle" aria-hidden="true"></i>
              <span>${escapeCardHtml(project.outcomeBadge)}</span>
            </div>
          ` : ''}
          <div class="tech-stack">
            ${tags.map((tag) => `<span class="tech-tag">${escapeCardHtml(tag)}</span>`).join('')}
          </div>
          <div class="project-links">
            ${primaryAction}
            <a href="${detailHref}" class="link-btn link-btn-details"
              data-analytics-event="select_content" data-analytics-category="project_card"
              data-analytics-label="${safeProjectId}" data-analytics-project="${safeProjectId}">
              <span>View Details</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards('all');

  const filterBar = document.getElementById('projectFilterBar');
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    const pill = event.target.closest('.filter-pill');
    if (!pill) return;

    const filter = pill.getAttribute('data-filter') || 'all';
    filterBar.querySelectorAll('.filter-pill').forEach((btn) => {
      const isSelected = btn === pill;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    renderProjectCards(filter);
  });
});
