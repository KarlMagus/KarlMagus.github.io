/* ==========================================================================
   PROJECT DETAIL PAGE CONTROLLER
   Reads project ID from URL query string (?id=...) and renders detailed view
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
});

function renderProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  let projectId = urlParams.get('id') || hashParams.get('id');

  // Fallback to first project if missing or invalid
  if (!projectId || !getProjectById(projectId)) {
    projectId = PORTFOLIO_PROJECTS[0].id;
  }

  const project = getProjectById(projectId);
  if (!project) return;

  // Set page title
  document.title = `${project.title} | Technical Deep-Dive`;

  // Breadcrumbs & Header Badges
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  if (breadcrumbCategory) breadcrumbCategory.textContent = project.categoryLabel;

  const detailNum = document.getElementById('detailNum');
  if (detailNum) detailNum.textContent = `Project ${project.num}`;

  const detailCategory = document.getElementById('detailCategory');
  if (detailCategory) detailCategory.textContent = project.categoryLabel;

  const detailRole = document.getElementById('detailRole');
  if (detailRole) detailRole.textContent = project.role;

  // Hero Titles
  const detailTitle = document.getElementById('detailTitle');
  if (detailTitle) detailTitle.textContent = project.title;

  const detailSubtitle = document.getElementById('detailSubtitle');
  if (detailSubtitle) detailSubtitle.textContent = project.shortDesc;

  // Metadata Bar
  const detailDomain = document.getElementById('detailDomain');
  if (detailDomain) detailDomain.textContent = project.domain;

  const detailModels = document.getElementById('detailModels');
  if (detailModels) detailModels.textContent = project.models;

  const detailExecution = document.getElementById('detailExecution');
  if (detailExecution) detailExecution.textContent = project.execution;

  // Render Detailed Body Sections
  const detailBodyContent = document.getElementById('detailBodyContent');
  if (detailBodyContent && project.sections) {
    const liveDemoBanner = project.liveDemo ? `
      <div class="live-demo-banner">
        <div class="live-demo-copy">
          <div class="live-demo-kicker">
            <span class="live-demo-dot"></span>
            <span>Interactive Browser Demo · Simulated</span>
          </div>
          <h3>${project.liveDemoTitle || 'Test the Pipeline in Your Browser'}</h3>
          <p>${project.liveDemoDesc || 'Upload or choose mapping spreadsheets, inspect join keys, and synthesize ANSI SQL & Spark DAGs in real time.'}</p>
        </div>
        <a href="${project.liveDemo}" class="btn btn-primary">
          <i class="fa-solid fa-play"></i>
          <span>Launch Interactive Demo</span>
        </a>
      </div>
    ` : '';

    const starCard = project.starSummary ? `
      <div class="detail-star-card" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-text); font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-compass"></i>
          <span>Executive Summary & STAR Framework Breakdown</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-building" style="color: var(--accent-bright);"></i> Situation
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${project.starSummary.situation}</p>
          </div>
          <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-list-check" style="color: var(--accent-bright);"></i> Task
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${project.starSummary.task}</p>
          </div>
          <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-brain" style="color: var(--accent-bright);"></i> Action
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${project.starSummary.action}</p>
          </div>
          <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem;">
            <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-chart-line" style="color: var(--accent-bright);"></i> Result
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${project.starSummary.result}</p>
          </div>
        </div>
      </div>
    ` : '';

    detailBodyContent.innerHTML = liveDemoBanner + starCard + project.sections.map(sec => `
      <section class="detail-section">
        <h2 class="detail-section-title">
          <i class="fa-solid ${sec.icon || 'fa-layer-group'}"></i>
          <span>${sec.title}</span>
        </h2>
        <div class="detail-prose">
          ${sec.content}
        </div>
      </section>
    `).join('');
  }

  // Sidebar Tech Stack Tags
  const detailTechStack = document.getElementById('detailTechStack');
  if (detailTechStack && project.techStack) {
    detailTechStack.innerHTML = project.techStack.map(tag => `
      <span class="sidebar-tag">${tag}</span>
    `).join('');
  }

  // Sidebar Highlights
  const detailHighlights = document.getElementById('detailHighlights');
  if (detailHighlights && project.highlights) {
    detailHighlights.innerHTML = project.highlights.map(hl => `
      <li>${hl}</li>
    `).join('');
  }

  // Sidebar Live Demo CTA
  const sidebarCta = document.querySelector('.sidebar-cta');
  if (sidebarCta && project.liveDemo) {
    sidebarCta.innerHTML = `
      <a href="${project.liveDemo}" class="btn btn-primary btn-block" style="margin-bottom: 0.75rem;">
        <i class="fa-solid fa-play"></i>
        <span>Launch Interactive Demo</span>
      </a>
      <a href="index.html#contact" class="btn btn-secondary btn-block">
        <span>Discuss a Similar Project</span>
        <i class="fa-regular fa-paper-plane"></i>
      </a>
    `;
  }

  // Next / Previous Navigation Links
  const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === project.id);
  const prevIndex = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
  const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;

  const prevProject = PORTFOLIO_PROJECTS[prevIndex];
  const nextProject = PORTFOLIO_PROJECTS[nextIndex];

  const prevBtn = document.getElementById('prevProjectBtn');
  const prevProjectName = document.getElementById('prevProjectName');
  if (prevBtn && prevProjectName) {
    prevBtn.href = `projects/${encodeURIComponent(prevProject.id)}/`;
    prevProjectName.textContent = prevProject.title;
  }

  const nextBtn = document.getElementById('nextProjectBtn');
  const nextProjectName = document.getElementById('nextProjectName');
  if (nextBtn && nextProjectName) {
    nextBtn.href = `projects/${encodeURIComponent(nextProject.id)}/`;
    nextProjectName.textContent = nextProject.title;
  }

  // Scroll to top upon load
  window.scrollTo(0, 0);
}
