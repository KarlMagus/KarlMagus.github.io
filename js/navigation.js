/* Mobile navigation, active-section highlighting, and the skills index. */
document.addEventListener('DOMContentLoaded', () => {
  const skillButtons = document.querySelectorAll('.skill-row-button');
  skillButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      skillButtons.forEach((other) => {
        const panel = document.getElementById(other.getAttribute('aria-controls'));
        const open = other === button && !wasOpen;
        other.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.hidden = !open;
      });
    });
  });

  const toggleButton = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    links.forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length || !links.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      if (scrollPosition >= top && scrollPosition < top + section.offsetHeight) {
        currentId = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
});
