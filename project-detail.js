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
    detailBodyContent.innerHTML = project.sections.map(sec => `
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

  // Next / Previous Navigation Links
  const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === project.id);
  const prevIndex = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
  const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;

  const prevProject = PORTFOLIO_PROJECTS[prevIndex];
  const nextProject = PORTFOLIO_PROJECTS[nextIndex];

  const prevBtn = document.getElementById('prevProjectBtn');
  const prevProjectName = document.getElementById('prevProjectName');
  if (prevBtn && prevProjectName) {
    prevBtn.href = `project-detail.html#id=${encodeURIComponent(prevProject.id)}`;
    prevProjectName.textContent = prevProject.title;
  }

  const nextBtn = document.getElementById('nextProjectBtn');
  const nextProjectName = document.getElementById('nextProjectName');
  if (nextBtn && nextProjectName) {
    nextBtn.href = `project-detail.html#id=${encodeURIComponent(nextProject.id)}`;
    nextProjectName.textContent = nextProject.title;
  }

  // Scroll to top upon load
  window.scrollTo(0, 0);
}
