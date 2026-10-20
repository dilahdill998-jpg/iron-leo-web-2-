// Iron Leo - sisi pembeli
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rp = (n) => 'Rp' + Number(n).toLocaleString('id-ID');
const CATS = { pria: 'Pria', wanita: 'Wanita', unisex: 'Unisex' };

let products = [], settings = { whatsapp: '' }, filter = 'semua';
let cart = [];
try { cart = JSON.parse(localStorage.getItem('il_cart') || '[]'); } catch { cart = []; }
const saveCart = () => { try { localStorage.setItem('il_cart', JSON.stringify(cart)); } catch {} };

const cover = (p) => p.images[0] || '';
const byId = (id) => products.find((p) => p.id === id);
const wa = (text) => `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- keranjang ---------- */
function addToCart(id, qty = 1) {
  const it = cart.find((c) => c.id === id);
  if (it) it.qty = Math.min(99, it.qty + qty); else cart.push({ id, qty });
  saveCart(); renderCart(); toast('Ditambahkan ke keranjang');
}
function setQty(id, qty) {
  if (qty < 1) cart = cart.filter((c) => c.id !== id); else cart.find((c) => c.id === id).qty = Math.min(99, qty);
  saveCart(); renderCart();
}
function renderCart() {
  cart = cart.filter((c) => byId(c.id));
  const lines = cart.map((c) => ({ p: byId(c.id), qty: c.qty }));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.p.price, 0);
  $('#cartCount').textContent = count;
  $('#items').innerHTML = lines.length ? lines.map(({ p, qty }) => `
    <div class="item">
      <img src="${esc(cover(p))}" alt="">
      <div><h4>${esc(p.name)}</h4><div class="price">${rp(p.price)}</div>
        <div class="qty"><button data-dec="${esc(p.id)}" aria-label="Kurangi">&minus;</button><span>${qty}</span><button data-inc="${esc(p.id)}" aria-label="Tambah">+</button></div></div>
      <button class="rm" data-rm="${esc(p.id)}">Hapus</button>
    </div>`).join('') : '<p class="empty" style="margin-top:20px">Keranjang masih kosong. Pilih parfum dari katalog.</p>';
  $('#cartFoot').innerHTML = lines.length ? `
    <div class="total"><span>Total</span><b class="price">${rp(total)}</b></div>
    <input id="buyerName" placeholder="Nama Anda" autocomplete="name">
    <input id="buyerAddr" placeholder="Alamat pengiriman" autocomplete="street-address">
    <button class="btn wa" id="checkout">Pesan via WhatsApp</button>` : '';
}
function checkout() {
  const lines = cart.map((c) => ({ p: byId(c.id), qty: c.qty }));
  const total = lines.reduce((a, l) => a + l.qty * l.p.price, 0);
  const name = $('#buyerName').value.trim(), addr = $('#buyerAddr').value.trim();
  const msg = ['Halo Iron Leo, saya ingin memesan:', ...lines.map((l) => `- ${l.p.name} x${l.qty} (${rp(l.p.price * l.qty)})`),
    `Total: ${rp(total)}`, name && `Nama: ${name}`, addr && `Alamat: ${addr}`].filter(Boolean).join('\n');
  window.open(wa(msg), '_blank', 'noopener');
}
const drawer = (open) => {
  $('#drawer').classList.toggle('open', open); $('#bg').classList.toggle('open', open);
  $('#drawer').setAttribute('aria-hidden', String(!open));
};

/* ---------- halaman ---------- */
function card(p) {
  return `<article class="card">
    <a class="pic" href="#/produk/${esc(p.id)}" aria-label="Lihat ${esc(p.name)}"><img src="${esc(cover(p))}" alt="Parfum ${esc(p.name)}" loading="lazy"></a>
    <div class="info"><h3><a href="#/produk/${esc(p.id)}">${esc(p.name)}</a></h3>
      <span class="cat-tag">${CATS[p.category]} &middot; ${esc(p.size)}</span><span class="price">${rp(p.price)}</span>
      <div class="row"><a class="btn ghost sm" href="#/produk/${esc(p.id)}">Lihat detail</a><button class="btn sm" data-add="${esc(p.id)}">Tambah ke Keranjang</button></div></div>
  </article>`;
}
function home(scrollTo) {
  const list = products.filter((p) => filter === 'semua' || p.category === filter);
  $('#app').innerHTML = `
  <section class="hero">
    <img class="emblem" src="img/lion.webp" alt="Logo Iron Leo: singa dengan bintang">
    <p class="eyebrow">PARFUM PILIHAN</p>
    <h1>Elegan di Setiap Langkah</h1>
    <div class="stage">${products.slice(0, 3).map((p) => `<a href="#/produk/${esc(p.id)}" aria-label="${esc(p.name)}"><img src="${esc(cover(p))}" alt="Parfum ${esc(p.name)}"></a>`).join('')}</div>
    <a class="btn" href="#produk" data-scroll="produk">Jelajahi Katalog</a>
  </section>
  <div class="cats" id="kategori">${Object.entries(CATS).map(([k, v]) => `<button class="cat ${filter === k ? 'on' : ''}" data-cat="${k}">${v}</button>`).join('')}</div>
  <section class="block" id="produk">
    <div class="sec-head"><h2>Produk</h2>${filter !== 'semua' ? `<span>Kategori ${CATS[filter]} &middot; <a href="#" data-cat="semua" style="color:var(--gold)">Tampilkan semua</a></span>` : ''}</div>
    ${list.length ? `<div class="grid">${list.map(card).join('')}</div>` : '<p class="empty">Belum ada produk di kategori ini.</p>'}
  </section>`;
  if (scrollTo) setTimeout(() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' }), 30);
  else window.scrollTo(0, 0);
}
function detail(id) {
  const p = byId(id);
  if (!p) { $('#app').innerHTML = '<p class="empty" style="margin-top:40px">Produk tidak ditemukan. <a href="#/" style="color:var(--gold)">Kembali ke katalog</a></p>'; return; }
  document.title = `${p.name} - Iron Leo`;
  let qty = 1;
  const n = p.notes || {};
  $('#app').innerHTML = `
  <div class="crumb"><a href="#/">Katalog</a> / ${esc(p.name)}</div>
  <div class="detail">
    <div class="gallery">
      <div class="main"><img id="mainImg" src="${esc(cover(p))}" alt="Foto ${esc(p.name)}"></div>
      <div class="thumbs">${p.images.map((u, i) => `<button class="${i ? '' : 'on'}" data-img="${esc(u)}" aria-label="Foto ${i + 1}"><img src="${esc(u)}" alt="" loading="lazy"></button>`).join('')}</div>
    </div>
    <div>
      <h1>${esc(p.name)}</h1>
      <p class="tag">${esc(p.tagline)}</p>
      <div class="big-price">${rp(p.price)}</div>
      <div class="meta">${CATS[p.category]} &middot; ${esc(p.size)}</div>
      <div class="buy">
        <div class="qty"><button id="qm" aria-label="Kurangi">&minus;</button><span id="qv">1</span><button id="qp" aria-label="Tambah">+</button></div>
        <button class="btn" id="addBtn">Tambah ke Keranjang</button>
        <button class="btn wa" id="buyBtn">Beli via WhatsApp</button>
      </div>
      ${(n.top || n.middle || n.base) ? `<div class="notes"><div><small>Aroma awal</small>${esc(n.top) || '-'}</div><div><small>Aroma tengah</small>${esc(n.middle) || '-'}</div><div><small>Aroma akhir</small>${esc(n.base) || '-'}</div></div>` : ''}
      <div class="story"><h3 style="font-size:26px;margin-bottom:12px">Cerita ${esc(p.name)}</h3>${esc(p.story).split(/\n+/).map((t) => `<p>${t}</p>`).join('')}</div>
    </div>
  </div>
  ${(() => { const o = products.filter((x) => x.id !== p.id); return o.length ? `<section class="block"><div class="sec-head"><h2>Parfum lainnya</h2></div><div class="grid">${o.map(card).join('')}</div></section>` : ''; })()}`;
  window.scrollTo(0, 0);
  $('#qm').onclick = () => { qty = Math.max(1, qty - 1); $('#qv').textContent = qty; };
  $('#qp').onclick = () => { qty = Math.min(99, qty + 1); $('#qv').textContent = qty; };
  $('#addBtn').onclick = () => addToCart(p.id, qty);
  $('#buyBtn').onclick = () => window.open(wa(`Halo Iron Leo, saya ingin memesan:\n- ${p.name} x${qty} (${rp(p.price * qty)})`), '_blank', 'noopener');
}

function route() {
  document.title = 'Iron Leo - Parfum Pilihan';
  const h = location.hash.replace(/^#\/?/, '');
  const m = /^produk\/([\w-]+)/.exec(h);
  if (m) detail(m[1]); else home(h === 'kategori' ? 'kategori' : null);
}

/* ---------- event ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-add],[data-cat],[data-img],[data-inc],[data-dec],[data-rm],[data-scroll]');
  if (e.target.closest('#checkout')) return checkout();
  if (!t) return;
  const d = t.dataset;
  if (d.add) addToCart(d.add);
  else if (d.cat) { e.preventDefault(); filter = d.cat; home('produk'); }
  else if (d.scroll) { e.preventDefault(); document.getElementById(d.scroll).scrollIntoView({ behavior: 'smooth' }); }
  else if (d.img) { $('#mainImg').src = d.img; document.querySelectorAll('.thumbs button').forEach((b) => b.classList.toggle('on', b === t)); }
  else if (d.inc) setQty(d.inc, cart.find((c) => c.id === d.inc).qty + 1);
  else if (d.dec) setQty(d.dec, cart.find((c) => c.id === d.dec).qty - 1);
  else if (d.rm) setQty(d.rm, 0);
});
$('#cartBtn').onclick = () => drawer(true);
$('#closeCart').onclick = $('#bg').onclick = () => drawer(false);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') drawer(false); });
window.addEventListener('hashchange', route);

(function init() {
  products = (window.PRODUK || []).filter((p) => p.active !== false);
  settings = window.PENGATURAN || { whatsapp: '' };
  $('#waTop').href = $('#waFoot').href = wa('Halo Iron Leo, saya ingin bertanya tentang parfum.');
  renderCart(); route();
})();
