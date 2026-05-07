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
    node.textContent = now.toLocaleTimeString('de-DE', opts);
  }
  tick();
  setInterval(tick, 30000);
})();

// Mobile burger menu
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  // Backdrop overlay — blurs page content behind open menu
  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openMenu() {
    nav.classList.add('nav-open');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    document.body.classList.remove('menu-open');
  }


  // Build mobile drawer from existing nav elements
  var drawer = document.createElement('div');
  drawer.className = 'nav-drawer';

  var origLinks = nav.querySelector('.nav-links');
  if (origLinks) {
    var drawerLinks = origLinks.cloneNode(true);
    drawerLinks.className = 'nav-drawer-links';
    drawer.appendChild(drawerLinks);
  }

  var origCta = nav.querySelector('.nav-cta');
  if (origCta) {
    var ctaClone = origCta.cloneNode(true);
    drawer.appendChild(ctaClone);
  }

  var origLang = nav.querySelector('.lang-switcher');
  if (origLang) {
    var langClone = origLang.cloneNode(true);
    langClone.className = 'nav-drawer-lang';
    // Wire drawer lang buttons to original switcher
    langClone.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = btn.getAttribute('data-lang');
        var orig = nav.querySelector('.lang-switcher .lang-btn[data-lang="' + l + '"]');
        if (orig) orig.click();
        // Sync active state in drawer
        langClone.querySelectorAll('.lang-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-lang') === l);
        });
      });
    });
    // Set initial active state
    var curLang = document.documentElement.getAttribute('data-lang') || 'en';
    langClone.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === curLang);
    });
    drawer.appendChild(langClone);
  }

  nav.appendChild(drawer);

  // Toggle open/close
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.contains('nav-open') ? closeMenu() : openMenu();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeMenu);

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== backdrop) {
      closeMenu();
    }
  });

  // Close on link click inside drawer (not lang buttons)
  drawer.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (link) closeMenu();
  });

  // Sync lang active state when language changes
  document.addEventListener('langchange', function (e) {
    var l = e.detail.lang;
    drawer.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === l);
    });
  });
})();
