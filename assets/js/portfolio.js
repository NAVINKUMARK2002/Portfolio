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

// The entrance runs once; later activations only shake the card.
const idCard = document.querySelector('.lanyard-assembly');
if (idCard && badge) {
  const replayBadge = () => {
    badge.classList.remove('badge-entered');
    idCard.classList.remove('badge-shake');
    void idCard.offsetWidth;
    idCard.classList.add('badge-shake');
  };
  idCard.addEventListener('click', replayBadge);
  idCard.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      replayBadge();
    }
  });
}

if (idCard) {
  idCard.addEventListener("animationend", event => {
    if (event.animationName === "badge-drop") badge.classList.remove("badge-entered");
    if (event.animationName === "badge-shake") idCard.classList.remove("badge-shake");
  });
}

// Reveal timeline entries once as they enter the viewport.
const experienceRows = document.querySelectorAll('#experience .timeline-row');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const experienceObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('experience-visible');
        experienceObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  for (const row of experienceRows) {
    row.classList.add('experience-reveal');
    experienceObserver.observe(row);
  }
  // Keep keyboard-focused content visible even before its scroll reveal.
  document.querySelector('#experience')?.addEventListener('focusin', event => {
    event.target.closest('.timeline-row')?.classList.add('experience-visible');
  });
}
