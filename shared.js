// Reveal-on-scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// Live clock in footer
(function () {
  const node = document.querySelector('[data-clock]');
  if (!node) return;
  function tick() {
    const now = new Date();
    const opts = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' };
    node.textContent = now.toLocaleTimeString('de-DE', opts) + ' MEZ';
  }
  tick();
  setInterval(tick, 30000);
})();
