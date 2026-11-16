/* Resume download interaction; the PDF itself is a static portfolio asset. */
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('downloadResumeBtn');
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    const originalButtonHtml = button.innerHTML;
    const fileName = 'Ishraq_Ahmad_AI_ML_Engineer_Resume.pdf';

    button.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Preparing...</span>';

    setTimeout(() => {
      const downloadLink = document.createElement('a');
      downloadLink.href = 'Ishraq_Ahmad_Resume.pdf';
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      const downloadParams = {
        event_category: 'conversion',
        event_label: fileName,
        file_name: fileName,
        file_extension: 'pdf',
        link_text: 'Download Resume',
        link_url: 'Ishraq_Ahmad_Resume.pdf',
        transport_type: 'beacon'
      };

      if (typeof window.trackEvent === 'function') {
        window.trackEvent('file_download', downloadParams);
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'file_download', downloadParams);
      }

      button.innerHTML = '<i class="fa-solid fa-check"></i> <span>Resume Downloaded!</span>';
      setTimeout(() => {
        button.innerHTML = originalButtonHtml;
      }, 2500);
    }, 300);
  });
});
