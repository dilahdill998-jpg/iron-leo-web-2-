(function () {
  var s = window.PENGATURAN || {};
  var fix = function (v, base) {
    v = String(v || '').trim();
    if (!v) return '';
    return /^https?:\/\//i.test(v) ? v : base + v.replace(/^@/, '');
  };
  var ig = fix(s.instagram, 'https://www.instagram.com/ironleo_syrus?rpxt=ZmV2bGc2NmJubnQ1');
  var tt = fix(s.tiktok, 'https://www.tiktok.com/@ironleo_syrus?_r=1&_t=ZS-9AiL6GzhxuX');
  var alamat = String(s.alamat || '').trim();
  var maps = String(s.maps || '').trim() ||
    (alamat ? 'https://maps.app.goo.gl/Mqwj7onQrqBYjYm57?g_st=aw' + encodeURIComponent(alamat) : '');

  var svg = function (p) {
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  };
  var ICON = {
    ig: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>'),
    tt: svg('<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.4 2 4 4.5 4.2"/>'),
    pin: svg('<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>')
  };
  var link = function (href, icon, label) {
    return '<a href="' + href + '" target="_blank" rel="noopener">' + ICON[icon] + '<span>' + label + '</span></a>';
  };
  var esc = function (t) { return t.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var parts = [];
  if (ig) parts.push(link(ig, 'ig', 'Instagram'));
  if (tt) parts.push(link(tt, 'tt', 'TikTok'));
  if (maps) parts.push(link(maps, 'pin', 'Lihat di Google Maps'));
  if (!parts.length) return;

  var css = '.contact{margin:22px auto 0;display:flex;flex-direction:column;align-items:center;gap:14px}' +
    '.contact .addr{max-width:34em;font-size:14px;color:var(--muted)}' +
    '.contact .row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}' +
    '.contact a{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid var(--line);color:var(--gold);font-size:14px;transition:border-color .2s,background .2s}' +
    '.contact a:hover{border-color:var(--gold);background:rgba(214,178,94,.08)}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var box = document.createElement('div'); box.className = 'contact';
  box.innerHTML = (alamat ? '<div class="addr">' + esc(alamat) + '</div>' : '') + '<div class="row">' + parts.join('') + '</div>';
  var wrap = document.querySelector('footer.site .wrap');
  if (wrap) wrap.appendChild(box);
})();