/* Render project cards from the shared project data. */

function featuredVisual(project) {
  if (project.id === 'mapping-to-sql-gemma') {
    return `
      <svg class="loss-chart" viewBox="0 0 320 150" role="img" aria-label="Training loss from 1.049 at step 10 to 0.184 at step 700">
        <line x1="36" y1="22" x2="36" y2="112" stroke="#3d3832" />
        <line x1="36" y1="112" x2="300" y2="112" stroke="#3d3832" />
        <polyline fill="none" stroke="#c4a574" stroke-width="1.5" points="36,40.6 220.9,113.6 296,112.7" />
        <circle cx="36" cy="40.6" r="2.5" fill="#c4a574" />
        <circle cx="220.9" cy="113.6" r="2.5" fill="#c4a574" />
        <circle cx="296" cy="112.7" r="2.5" fill="#c4a574" />
        <text x="42" y="36">1.049</text>
        <text x="168" y="108">0.173</text>
        <text x="248" y="106">0.184</text>
        <text x="28" y="126">step 10</text>
        <text x="196" y="126">500</text>
        <text x="274" y="126">700</text>
        <text x="36" y="14">cross-entropy loss</text>
      </svg>
    `;
  }

  if (project.id === 'ai-classroom-monitor') {
    return `
      <svg class="overlay-frame" viewBox="0 0 320 150" role="img" aria-label="Synthetic classroom overlay with enrolled, phone, and sleeping cues">
        <rect x="18" y="16" width="92" height="78" fill="none" stroke="#c4a574" stroke-width="1.5" />
        <text x="18" y="12" fill="#c4a574" font-family="JetBrains Mono, monospace" font-size="9">enrolled</text>
        <rect x="150" y="28" width="54" height="36" fill="none" stroke="#e7e2d9" stroke-width="1.5" />
        <text x="150" y="24" fill="#e7e2d9" font-family="JetBrains Mono, monospace" font-size="9">phone</text>
        <rect x="220" y="48" width="78" height="46" fill="none" stroke="#8a8378" stroke-width="1.5" stroke-dasharray="3 2" />
        <text x="220" y="44" fill="#8a8378" font-family="JetBrains Mono, monospace" font-size="9">sleeping cue</text>
      </svg>
    `;
  }

  if (project.id === 'autonomous-social-content-engine') {
    return `
      <ol class="screen-index">
        <li>Generate post</li>
        <li>Saved posts</li>
        <li>Schedule</li>
        <li>Weekly automation</li>
        <li>Saved blogs</li>
        <li>Replies</li>
        <li>Audio</li>
        <li>Podcast</li>
        <li>Analytics</li>
      </ol>
    `;
  }

  if (project.id === 'enterprise-json-query-enhancer') {
    return `
      <svg class="flow-diagram" viewBox="0 0 240 80" role="img" aria-label="Mapping workbook compiled to a Spark DAG, then patched">
        <rect x="4" y="24" width="68" height="32" fill="none" stroke="#3d3832" />
        <rect x="86" y="24" width="68" height="32" fill="none" stroke="#3d3832" />
        <rect x="168" y="24" width="68" height="32" fill="none" stroke="#3d3832" />
        <line x1="72" y1="40" x2="86" y2="40" stroke="#c4a574" />
        <polyline points="80,36 86,40 80,44" fill="none" stroke="#c4a574" />
        <line x1="154" y1="40" x2="168" y2="40" stroke="#c4a574" />
        <polyline points="162,36 168,40 162,44" fill="none" stroke="#c4a574" />
        <text x="38" y="44" text-anchor="middle">Workbook</text>
        <text x="120" y="44" text-anchor="middle">DAG</text>
        <text x="202" y="44" text-anchor="middle">Patch</text>
      </svg>
    `;
  }

  if (project.id === 'ai-healthcare-scribe') {
    return `
      <svg class="flow-diagram" viewBox="0 0 240 96" role="img" aria-label="Voice agent calling book, triage, and close">
        <rect x="4" y="34" width="64" height="28" fill="none" stroke="#3d3832" />
        <rect x="148" y="4" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="148" y="36" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="148" y="68" width="84" height="24" fill="none" stroke="#3d3832" />
        <line x1="68" y1="48" x2="148" y2="16" stroke="#c4a574" />
        <line x1="68" y1="48" x2="148" y2="48" stroke="#c4a574" />
        <line x1="68" y1="48" x2="148" y2="80" stroke="#c4a574" />
        <text x="36" y="52" text-anchor="middle">Voice</text>
        <text x="190" y="20" text-anchor="middle">Book</text>
        <text x="190" y="52" text-anchor="middle">Triage</text>
        <text x="190" y="84" text-anchor="middle">Close</text>
      </svg>
    `;
  }

  if (project.id === 'ai-quiz-generation-saas') {
    return `
      <svg class="flow-diagram" viewBox="0 0 240 96" role="img" aria-label="Text, PDF, and diagram sources turned into a quiz">
        <rect x="4" y="4" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="4" y="36" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="4" y="68" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="160" y="34" width="72" height="28" fill="none" stroke="#3d3832" />
        <line x1="88" y1="16" x2="160" y2="48" stroke="#c4a574" />
        <line x1="88" y1="48" x2="160" y2="48" stroke="#c4a574" />
        <line x1="88" y1="80" x2="160" y2="48" stroke="#c4a574" />
        <text x="46" y="20" text-anchor="middle">Text</text>
        <text x="46" y="52" text-anchor="middle">PDF</text>
        <text x="46" y="84" text-anchor="middle">Diagram</text>
        <text x="196" y="52" text-anchor="middle">Quiz</text>
      </svg>
    `;
  }

  if (project.id === 'enterprise-pms-innovation-analytics') {
    return `
      <ol class="screen-index">
        <li>Projects</li>
        <li>SPC</li>
        <li>Collaboration</li>
        <li>CMS</li>
      </ol>
    `;
  }

  if (project.id === 'bio-adaptive-music-meditation') {
    return `
      <svg class="flow-diagram" viewBox="0 0 240 96" role="img" aria-label="Face, voice, and sensor readings into audio, with a hardware fallback">
        <rect x="4" y="4" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="4" y="36" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="4" y="68" width="84" height="24" fill="none" stroke="#3d3832" />
        <rect x="156" y="34" width="76" height="28" fill="none" stroke="#3d3832" />
        <line x1="88" y1="16" x2="156" y2="48" stroke="#c4a574" />
        <line x1="88" y1="48" x2="156" y2="48" stroke="#c4a574" />
        <line x1="88" y1="80" x2="156" y2="48" stroke="#c4a574" />
        <text x="46" y="20" text-anchor="middle">Face</text>
        <text x="46" y="52" text-anchor="middle">Voice</text>
        <text x="46" y="84" text-anchor="middle">Sensor</text>
        <text x="194" y="52" text-anchor="middle">Audio</text>
      </svg>
      <p class="visual-caption">Hardware fallback</p>
    `;
  }

  return `<span class="project-monogram">${project.num}</span>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectsGrid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((project) => `
    <article class="bento-card${project.featured ? ' featured' : ''}">
      <div class="bento-card-inner">
        <div class="bento-visual">
          ${featuredVisual(project)}
        </div>
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
                <span>Interactive demo (simulated)</span>
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
