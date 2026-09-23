/* ==========================================================================
   AI/ML ENGINEER PORTFOLIO INTERACTION LOGIC
   - Animated role changer (typewriter effect)
  - Dynamic project grid
   - Mobile navigation toggle
   - Contact form interactive validation & submission simulation
   - Dynamic resume download feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioProjects();
  initRoleChanger();
  initMobileNav();
  initContactForm();
  initScrollHighlight();
});

/* --------------------------------------------------------------------------
   1. Animated Role Changer (Typewriter effect)
   -------------------------------------------------------------------------- */
function initRoleChanger() {
  const roleElement = document.getElementById('roleChanger');
  if (!roleElement) return;

  const roles = [
    'LLM-Powered Applications',
    'Computer Vision Systems',
    'RAG Pipelines & Agents',
    'Full-Stack AI Platforms',
    'Production ML Infrastructure'
  ];

  let currentRoleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = roles[currentRoleIndex];

    if (isDeleting) {
      roleElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      roleElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      typingSpeed = 450; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. Dynamic Bento Grid Rendering & Filtering
   -------------------------------------------------------------------------- */
function renderPortfolioProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((project, index) => {
    const cardClass = 'bento-card';

    return `
      <article class="${cardClass}">
        <div class="bento-card-inner">
          <div class="bento-content">
            <div class="project-meta">
              <span class="project-num">${project.num}</span>
              <span class="project-cat">${project.categoryLabel}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary">${project.shortDesc}</p>
            <div class="tech-stack">
              ${project.techStack.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
              ${project.techStack.length > 4 ? `<span class="tech-tag">+${project.techStack.length - 4} more</span>` : ''}
            </div>
            <div class="project-links">
              <a href="project-detail.html#id=${encodeURIComponent(project.id)}" class="link-btn">
                <span>View Project</span>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & State
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // Name validation
    const nameInput = document.getElementById('contactName');
    const nameGroup = nameInput.closest('.form-group');

    if (!nameInput.value.trim()) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    // Email validation
    const emailInput = document.getElementById('contactEmail');
    const emailGroup = emailInput.closest('.form-group');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
      emailGroup.classList.add('has-error');
      isValid = false;
    } else {
      emailGroup.classList.remove('has-error');
    }

    // Brief validation
    const briefInput = document.getElementById('contactBrief');
    const briefGroup = briefInput.closest('.form-group');

    if (!briefInput.value.trim() || briefInput.value.trim().length < 10) {
      briefGroup.classList.add('has-error');
      isValid = false;
    } else {
      briefGroup.classList.remove('has-error');
    }

    // Stop if validation fails
    if (!isValid) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    // Submission state
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

    statusDiv.className = 'form-status';
    statusDiv.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        submitBtn.innerHTML =
          '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';

        statusDiv.className = 'form-status success';
        statusDiv.textContent =
          "Thanks for reaching out! I'll get back to you within 24 hours.";

        form.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          statusDiv.textContent = '';
          statusDiv.className = 'form-status';
        }, 4000);

      } else {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.errors?.map(error => error.message).join(', ') ||
          'Something went wrong while sending your message.'
        );
      }

    } catch (error) {
      console.error('Form submission error:', error);

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      statusDiv.className = 'form-status error';
      statusDiv.textContent =
        'Unable to send your message right now. Please try again or email me directly.';
    }
  });
}

/* --------------------------------------------------------------------------
   5. Active Section Navigation Highlighting on Scroll
   -------------------------------------------------------------------------- */
function initScrollHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Resume Download Action Handler
   -------------------------------------------------------------------------- */
function triggerResumeDownload(event) {
  event.preventDefault();

  const btn = document.getElementById('downloadResumeBtn');
  const originalHTML = btn.innerHTML;

  const fileName = 'Ishraq_Ahmad_AI_ML_Engineer_Resume.pdf';

  btn.innerHTML =
    '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Preparing...</span>';

  setTimeout(() => {
    const link = document.createElement('a');

    link.href = 'Ishraq_Ahmad_Resume.pdf';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'file_download', {
        file_name: fileName,
        file_extension: 'pdf',
        link_text: 'Download Resume'
      });
    }

    btn.innerHTML =
      '<i class="fa-solid fa-check"></i> <span>Resume Downloaded!</span>';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2500);
  }, 300);
}

window.triggerResumeDownload = triggerResumeDownload;