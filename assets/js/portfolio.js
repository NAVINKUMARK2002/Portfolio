const notice = document.querySelector('#cv-notice');
for (const id of ['preview-cv', 'download-cv']) {
  document.getElementById(id).addEventListener('click', () => notice.showModal());
}

const badge = document.querySelector('.lanyard-column');
if (badge && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      badge.classList.add('badge-entered');
      observer.disconnect();
    }
  }, { threshold: 0.15 });
  observer.observe(badge);
}
