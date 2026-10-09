(() => {
  const S = window.SITE, $ = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const byMod = id => S.items.filter(i => i.mod === id);
  const modOf = id => S.modules.find(m => m.id === id);
  const itemOf = id => S.items.find(i => i.id === id);
  let sel = null, W = 0, H = 0;

  $('yr').textContent = new Date().getFullYear();
  $('orbName').innerHTML = `<b>${S.name}</b>${S.role}`;

  // —— 漂浮模块 ——
  const els = {};
  S.modules.forEach((m, i) => {
    const b = document.createElement('button');
    b.className = 'mod';
    b.style.setProperty('--h', m.hue);
    b.innerHTML = `<div class="bell"></div><div class="lab">${m.zh}<small>${m.en}</small></div><div class="cnt">${byMod(m.id).length} 节点</div>`;
    b.onclick = () => open(m.id);
    $('mods').appendChild(b);
    els[m.id] = {el: b, i};
  });

  function layout(t) {
    const narrow = W < 760, orb = $('orb');
    let ox, oy, os, rx, ry;
    if (!sel) { os = narrow ? Math.min(W * .42, 190) : Math.min(Math.min(W, H) * .3, 260); ox = W / 2; oy = H * .48; rx = narrow ? W * .38 : Math.min(W * .34, 480); ry = narrow ? H * .3 : Math.min(H * .34, 260); }
    else if (narrow) { os = 70; ox = W / 2; oy = 120; rx = W * .4; ry = 50; }
    else { os = 140; ox = (W - 440) * .45; oy = H * .5; rx = Math.min((W - 440) * .36, 340); ry = H * .32; }
    Object.assign(orb.style, {left: ox + 'px', top: oy + 'px', width: os + 'px', height: os + 'px'});
    const pos = {};
    S.modules.forEach((m, i) => {
      const sw = reduced ? 0 : 1, a = (m.angle + sw * 6 * Math.sin(t * .17 + i * 1.7)) * Math.PI / 180;
      const x = ox + Math.cos(a) * rx, y = oy + Math.sin(a) * ry + sw * 8 * Math.sin(t * .9 + i * 2.1);
      const s = narrow ? (sel ? 34 : 60) : (sel === m.id ? 110 : sel ? 64 : 96);
      const e = els[m.id].el;
      e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.setProperty('--s', s + 'px');
      e.style.transform = `translate(-50%,-50%) rotate(${sw * 4 * Math.sin(t * .6 + i)}deg)`;
      e.classList.toggle('dim', !!sel && sel !== m.id);
      if (narrow && sel) e.querySelector('.cnt').style.display = 'none'; else e.querySelector('.cnt').style.display = '';
      pos[m.id] = {x, y, h: m.hue};
    });
    return {ox, oy, pos};
  }

  // —— 背景神经网络 ——
  const cv = $('net'), cx = cv.getContext('2d');
  const dust = Array.from({length: 90}, () => ({x: Math.random(), y: Math.random(), v: .2 + Math.random() * .6, r: Math.random() * 1.4 + .3}));
  function resize() { const d = devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); }
  addEventListener('resize', resize); resize();

  function frame(ms) {
    const t = ms / 1000, L = layout(t);
    cx.clearRect(0, 0, W, H);
    dust.forEach(p => { const y = (p.y * H - (reduced ? 0 : t * p.v * 6)) % H; cx.fillStyle = 'rgba(160,180,255,.35)'; cx.beginPath(); cx.arc(p.x * W, y < 0 ? y + H : y, p.r, 0, 7); cx.fill(); });
    S.modules.forEach((m, i) => {
      const p = L.pos[m.id], on = !sel || sel === m.id;
      const g = cx.createLinearGradient(L.ox, L.oy, p.x, p.y);
      g.addColorStop(0, 'rgba(120,150,255,.5)'); g.addColorStop(1, `hsla(${p.h},90%,65%,${on ? .7 : .2})`);
      cx.strokeStyle = g; cx.lineWidth = on ? 1.6 : .8;
      const mx = (L.ox + p.x) / 2 + 30 * Math.sin(t * .4 + i), my = (L.oy + p.y) / 2 + 30 * Math.cos(t * .3 + i);
      cx.beginPath(); cx.moveTo(L.ox, L.oy); cx.quadraticCurveTo(mx, my, p.x, p.y); cx.stroke();
      // 沿连线流动的信号
      const k = reduced ? .5 : (t * .25 + i * .2) % 1, q = 1 - k;
      cx.fillStyle = `hsla(${p.h},100%,80%,${on ? .9 : .3})`;
      cx.beginPath(); cx.arc(q * q * L.ox + 2 * q * k * mx + k * k * p.x, q * q * L.oy + 2 * q * k * my + k * k * p.y, 2.4, 0, 7); cx.fill();
    });
    // 跨模块双链
    const seen = new Set();
    S.items.forEach(it => (it.links || []).forEach(to => {
      const o = itemOf(to); if (!o || o.mod === it.mod) return;
      const key = [it.mod, o.mod].sort().join(); if (seen.has(key)) return; seen.add(key);
      const a = L.pos[it.mod], b = L.pos[o.mod], on = !sel || sel === it.mod || sel === o.mod;
      cx.strokeStyle = `rgba(200,210,255,${on ? .14 : .05})`; cx.setLineDash([3, 6]); cx.lineWidth = 1;
      cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); cx.setLineDash([]);
    }));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // —— 详情面板 ——
  const card = it => {
    const m = modOf(it.mod), title = it.url ? `<a href="${it.url}"${/^http/.test(it.url) ? ' target="_blank" rel="noopener"' : ''}>${it.title} ↗</a>` : it.title;
    const ln = (it.links || []).map(itemOf).filter(Boolean).map(o => `<span class="chip ln" data-jump="${o.id}">↔ ${o.title}</span>`).join('');
    return `<li class="item" id="it-${it.id}" style="--h:${m.hue}"><h3>${title}</h3><p>${it.desc}</p><div class="chips"><span class="chip st">${it.status}</span><span class="chip">${it.tag}</span>${ln}</div></li>`;
  };
  function open(id, focus) {
    sel = id; const m = modOf(id), list = byMod(id), p = $('panel');
    p.style.setProperty('--h', m.hue);
    $('pEn').textContent = m.en; $('pTitle').textContent = m.zh; $('pDesc').textContent = m.desc;
    const links = list.reduce((s, i) => s + (i.links || []).length, 0);
    const back = S.items.filter(i => (i.links || []).some(l => itemOf(l)?.mod === id) && i.mod !== id).length;
    $('pStats').innerHTML = `<div><b>${list.length}</b><span>节点</span></div><div><b>${links}</b><span>出链</span></div><div><b>${back}</b><span>反链</span></div>`;
    $('pItems').innerHTML = list.map(card).join('');
    p.hidden = false; $('hint').hidden = true;
    if (focus) { const e = $('it-' + focus); e?.scrollIntoView({block: 'center'}); e?.classList.add('flash'); }
  }
  function close() { sel = null; $('panel').hidden = true; $('hint').hidden = false; }
  document.addEventListener('click', e => {
    const j = e.target.closest('[data-jump]'); if (!j) return;
    const it = itemOf(j.dataset.jump); if (document.body.classList.contains('listing')) { $('it-' + it.id)?.scrollIntoView({block: 'center', behavior: 'smooth'}); return; }
    open(it.mod, it.id);
  });
  $('close').onclick = close; $('orb').onclick = close;
  addEventListener('keydown', e => e.key === 'Escape' && close());

  // —— 列表视图 ——
  $('list').innerHTML = S.modules.map(m => `<section><h2 style="color:hsl(${m.hue},90%,75%)">${m.zh}<small>${m.en}</small></h2><ul class="items">${byMod(m.id).map(card).join('')}</ul></section>`).join('');
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
    const listing = b.dataset.go === 'list'; close();
    document.body.classList.toggle('listing', listing); $('list').hidden = !listing;
    document.querySelectorAll('[data-go]').forEach(x => x.classList.toggle('on', x === b));
  });
})();
