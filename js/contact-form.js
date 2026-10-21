/* Validate and submit the portfolio contact form. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitFormBtn');
  if (!form || !status || !submitButton) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const briefInput = document.getElementById('contactBrief');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    [
      [nameInput, Boolean(nameInput.value.trim())],
      [emailInput, emailPattern.test(emailInput.value.trim())],
      [briefInput, Boolean(briefInput.value.trim()) && briefInput.value.trim().length >= 10]
    ].forEach(([input, valid]) => {
      input.closest('.form-group').classList.toggle('has-error', !valid);
      isValid = isValid && valid;
    });

    if (!isValid) {
      status.className = 'form-status error';
      status.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    const originalButtonHtml = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        const responseData = await response.json().catch(() => null);
        throw new Error(responseData?.errors?.map((error) => error.message).join(', ') || 'Unable to send message.');
      }

      submitButton.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
      status.className = 'form-status success';
      status.textContent = "Thanks for reaching out! I'll get back to you within 24 hours.";
      form.reset();

      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
        status.textContent = '';
        status.className = 'form-status';
      }, 4000);
    } catch (error) {
      console.error('Form submission error:', error);
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
      status.className = 'form-status error';
      status.textContent = 'Unable to send your message right now. Please try again or email me directly.';
    }
  });
});
