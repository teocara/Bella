(() => {
  const EMAIL = 'info@ingdemurtas.it';
  const $ = (s) => document.querySelector(s);
  const header = $('#header'), nav = $('#nav'), burger = $('#burger');

  const onScroll = () => header.classList.toggle('solid', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));

  // Scroll reveal + animated counters
  const count = (el) => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('[data-count]').forEach(count);
    io.unobserve(en.target);
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Contact form: opens a prefilled email (no backend)
  const form = $('#form'), status = $('#status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.classList.toggle('invalid', bad);
      ok = ok && !bad;
    });
    if (!ok) { status.textContent = 'Compila correttamente tutti i campi.'; return; }
    const d = new FormData(form);
    const body = `${d.get('msg')}\n\n— ${d.get('nome')} (${d.get('email')})`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Richiesta preventivo')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Si apre il tuo client email per confermare l\'invio.';
  });

  $('#year').textContent = new Date().getFullYear();
})();
