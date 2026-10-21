/* Render project cards from the shared project data. */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectsGrid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((project) => `
    <article class="bento-card">
      <div class="bento-card-inner">
        <div class="bento-content">
          <div class="project-meta">
            <span class="project-num">${project.num}</span>
            <span class="project-cat">${project.categoryLabel}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.shortDesc}</p>
          <div class="tech-stack">
            ${project.techStack.slice(0, 4).map((tag) => `<span class="tech-tag">${tag}</span>`).join('')}
            ${project.techStack.length > 4 ? `<span class="tech-tag">+${project.techStack.length - 4} more</span>` : ''}
          </div>
          <div class="project-links">
            ${project.liveDemo ? `
              <a href="${project.liveDemo}" class="link-btn link-btn-demo" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-play"></i>
                <span>Live Demo</span>
              </a>
            ` : ''}
            <a href="projects/${encodeURIComponent(project.id)}/" class="link-btn link-btn-details">
              <span>View Project Details</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');
});
