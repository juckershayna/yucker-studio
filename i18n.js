// Language toggle for service pages
(function () {
  var html = document.documentElement;
  var btns = document.querySelectorAll('.lang-btn');

  // Detect saved lang or default to en
  var lang = localStorage.getItem('studio-lang') || 'en';
  setLang(lang);

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  function setLang(l) {
    lang = l;
    html.setAttribute('data-lang', l);
    html.setAttribute('lang', l);
    localStorage.setItem('studio-lang', l);
    btns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === l);
    });
    // Dispatch event so calc scripts can update labels
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }
})();
