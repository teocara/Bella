(() => {
  const EMAIL = 'giorgio@ingdemurtas.it', KEY = 'ingdemurtas-cart';
  const $ = (s) => document.querySelector(s), B = document.body.dataset;
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  const names = {};
  document.querySelectorAll('.prodc').forEach((c) => (names[c.dataset.id] = c.dataset.name));
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const total = () => Object.values(cart).reduce((a, b) => a + b, 0);

  const render = () => {
    $('#cartcount').textContent = total();
    $('#empty').hidden = total() > 0;
    $('#oform').hidden = total() === 0;
    const ul = $('#lines'); ul.textContent = '';
    Object.entries(cart).forEach(([id, q]) => {
      if (!names[id]) return;
      const li = document.createElement('li');
      li.innerHTML = '<span class="ln"></span><span class="qty"><button type="button" data-d="-1" aria-label="−">−</button><b></b><button type="button" data-d="1" aria-label="+">+</button></span><button type="button" class="rm" data-d="rm"></button>';
      li.dataset.id = id;
      li.querySelector('.ln').textContent = names[id];
      li.querySelector('b').textContent = q;
      li.querySelector('.rm').textContent = B.rm;
      ul.append(li);
    });
  };
  const open = (o) => {
    $('#drawer').classList.toggle('open', o); $('#scrim').classList.toggle('open', o);
    $('#drawer').setAttribute('aria-hidden', !o);
  };

  document.querySelectorAll('.add').forEach((b) => b.addEventListener('click', () => {
    const id = b.closest('.prodc').dataset.id;
    cart[id] = (cart[id] || 0) + 1; save(); render(); open(true);
  }));
  $('#lines').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-d]'); if (!b) return;
    const id = b.closest('li').dataset.id, d = b.dataset.d;
    if (d === 'rm') delete cart[id]; else { cart[id] += +d; if (cart[id] < 1) delete cart[id]; }
    save(); render();
  });
  $('#cartbtn').addEventListener('click', () => open(true));
  $('#closecart').addEventListener('click', () => open(false));
  $('#scrim').addEventListener('click', () => open(false));
  addEventListener('keydown', (e) => e.key === 'Escape' && open(false));

  $('#oform').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, d = new FormData(f);
    if (!d.get('nome').trim() || !f.email.checkValidity() || !f.email.value.trim()) { $('#status').textContent = B.err; return; }
    const items = Object.entries(cart).filter(([id]) => names[id]).map(([id, q]) => `- ${names[id]} × ${q}`).join('\n');
    const body = `${B.lines}:\n${items}\n\n${d.get('note')}\n\n${d.get('nome')}\n${d.get('email')}\n${d.get('tel')}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(B.subj)}&body=${encodeURIComponent(body)}`;
    $('#status').textContent = B.ok;
  });
  render();
})();
