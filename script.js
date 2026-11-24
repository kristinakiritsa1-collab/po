/* =========================================================
   Кристина Кирица — «Моя творческая вселенная» · script.js
   Без внешних зависимостей. Работает офлайн (file://).
   ========================================================= */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var body = document.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
  var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------------- Данные ---------------- */
  var DA = 'assets/digital-art/';
  var ART = [
    { f: '01-blonde-portrait', w: 596, h: 760, t: 'Светловолосый портрет', c: ['portrait', 'semi'], cat: 'Цифровой портрет · полуреализм', pal: ['#9fd4ff', '#dfe6f2', '#f3d27a'] },
    { f: '02-summer-popsicle', w: 582, h: 760, t: 'Летнее настроение', c: ['semi', 'experiment'], cat: 'Полуреалистичная иллюстрация', pal: ['#ffb69e', '#83d9ff', '#ffe9a8'] },
    { f: '03-boy-with-plush', w: 569, h: 760, t: 'Портрет с игрушкой', c: ['vintage', 'portrait'], cat: 'Винтажная эстетика', pal: ['#c58b4f', '#7a4e2d', '#2b1a12'] },
    { f: '04-purple-streak-girl', w: 569, h: 760, t: 'Фиолетовая прядь', c: ['stylized', 'experiment'], cat: 'Стилизованный персонаж · эксперимент', pal: ['#8755f5', '#d14bd8', '#2a1a4a'] },
    { f: '05-auburn-bow', w: 569, h: 760, t: 'Каштановые волосы и бант', c: ['portrait', 'fanart'], cat: 'Фан-арт · цифровой портрет', pal: ['#ffb69e', '#f458ae', '#fff0f8'] },
    { f: '06-violet-hair', w: 569, h: 760, t: 'Фиолетовые волосы', c: ['portrait', 'fanart'], cat: 'Фан-арт · цифровой портрет', pal: ['#b48cff', '#6b3fa0', '#241439'] },
    { f: '07-pink-bob', w: 569, h: 760, t: 'Розовое каре', c: ['portrait', 'fanart', 'stylized'], cat: 'Фан-арт · цифровой портрет', pal: ['#f458ae', '#ffb69e', '#ffe0ec'] },
    { f: '08-pink-hairclips', w: 569, h: 760, t: 'Розовые заколки', c: ['portrait', 'fanart'], cat: 'Фан-арт · цифровой портрет', pal: ['#ff7eb6', '#ffc2a8', '#c2185b'] },
    { f: '09-dark-hair-headband', w: 570, h: 760, t: 'Ветер в волосах', c: ['semi', 'stylized'], cat: 'Стилизованный персонаж', pal: ['#6b7a99', '#1f2a4d', '#e6e9f2'] },
    { f: '10-spiky-blond', w: 569, h: 760, t: 'Тёмный портрет', c: ['fanart', 'semi'], cat: 'Фан-арт · тёмная работа', pal: ['#3a4256', '#0e1630', '#d8c47a'] }
  ];
  ART.forEach(function (a) { a.full = DA + a.f + '.jpg'; a.thumb = DA + 'thumbs/' + a.f + '.jpg'; });

  var BOOKS = {
    guguscuk24: { title: 'Guguşçuk №24 · 2026', n: 24, dir: 'assets/magazines/guguscuk-24/pages/', pdf: 'assets/pdf/guguscuk-24-2026.pdf', aspect: 1067 / 1500, bg: ['#d9531e', '#3a0d06'] },
    tepegoz: { title: 'Tepägöz · Gagauz mifli masalı', n: 21, dir: 'assets/books/tepegoz/pages/', pdf: 'assets/pdf/tepegoz.pdf', aspect: 925 / 1300, bg: ['#a0508e', '#24103a'] },
    gagauzluk: { title: 'Uşakların gözünnän «GAGAUZLUK» · 2026', n: 39, dir: 'assets/catalogs/gagauzluk/pages/', pdf: 'assets/pdf/gagauzluk-fotokatalog-2026.pdf', aspect: 1, bg: ['#5e86a8', '#1b2436'] }
  };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function pagePath(b, i, thumb) { return BOOKS[b].dir + (thumb ? 'thumbs/' : '') + pad(i + 1) + '.jpg'; }

  var ROM = 'assets/romina/';
  var SCREENS = [
    ['screen-splash', 'Заставка'], ['screen-login', 'Вход'], ['screen-lessons', 'Уроки'], ['screen-pronunciation', 'Произношение'],
    ['screen-writing', 'Письмо'], ['screen-reading', 'Чтение'], ['screen-ai', 'AI-помощник'], ['screen-profile-progress', 'Профиль и прогресс'],
    ['screen-daily', 'Ежедневные задания'], ['screen-settings-language', 'Языковые настройки']
  ];
  var ZIN = ['01-composition', '02-logo-light', '03-logo-variant', '04-poster-captured-moment', '05-logo-dark', '06-business-card', '07-business-cards-mockup', '08-poster-portrait', '09-booklet', '10-booklet-open', '11-poster-logo', '12-poster-best-photo', '13-tag'];
  var ZIN_T = ['Фирменная композиция', 'Логотип · светлая версия', 'Вариант знака', 'Постер Captured moment', 'Логотип · тёмная версия', 'Визитка', 'Мокап визиток', 'Портретный постер', 'Фотобуклет', 'Разворот фотобуклета', 'Постер со знаком', 'Постер The best photo of your life', 'Бирка'];
  var CHAR_SRC = 'assets/character-design/romina-national-costume.jpg';
  var BOOK_AR = { guguscuk24: '1067/1500', tepegoz: '925/1300', gagauzluk: '1/1' };

  /* ---------------- Утилиты ---------------- */
  function splitText(el) {
    var cs = getComputedStyle(el);
    if ((cs.webkitBackgroundClip || cs.backgroundClip) === 'text') { el.classList.add('reveal-up'); return; }
    var txt = el.textContent.replace(/\s+/g, ' ').trim(); el.setAttribute('aria-label', txt); el.textContent = '';
    var i = 0;
    txt.split(' ').forEach(function (word, wi) {
      if (wi) el.appendChild(document.createTextNode(' '));
      var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (ch) {
        var s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; s.style.setProperty('--i', i++); w.appendChild(s);
      });
      el.appendChild(w);
    });
    el.classList.add('split-ready');
  }
  $$('[data-split]').forEach(function (el) { if (!el.closest('#intro')) splitText(el); });
  // буквы «ПОРТФОЛИО» в заставке
  (function () {
    var w = $('.intro-word'), t = w.textContent; w.textContent = '';
    t.split('').forEach(function (c, i) { var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i); w.appendChild(s); });
  })();

  function svgUse(id, cls) {
    var ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg'), u = document.createElementNS(ns, 'use');
    u.setAttribute('href', '#' + id); s.appendChild(u); if (cls) s.setAttribute('class', cls); return s;
  }
  function edgePos() { // позиции по краям, чтобы декор не перекрывал работы
    var side = rnd();
    if (side < .35) return [rnd() * 9 + 1, rnd() * 90 + 4];
    if (side < .7) return [rnd() * 9 + 89, rnd() * 90 + 4];
    if (side < .85) return [rnd() * 90 + 5, rnd() * 8 + 2];
    return [rnd() * 90 + 5, rnd() * 8 + 90];
  }
  $$('.deco').forEach(function (d) {
    var n = +d.dataset.stars || 0, sp = +d.dataset.spheres || 0, rg = +d.dataset.rings || 0, i, p, el;
    for (i = 0; i < n; i++) {
      p = edgePos(); el = svgUse(rnd() < .65 ? 's-sparkle' : 's-star', 'd-star' + (rnd() < .3 ? ' gold' : ''));
      el.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (14 + rnd() * 34) + 'px;--t:' + (2.5 + rnd() * 4) + 's;animation-delay:' + (-rnd() * 5) + 's';
      d.appendChild(el);
    }
    for (i = 0; i < sp; i++) {
      p = edgePos(); el = document.createElement('i'); el.className = 'd-sphere';
      el.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (40 + rnd() * 90) + 'px;--t:' + (6 + rnd() * 6) + 's;margin:-40px';
      d.appendChild(el);
    }
    for (i = 0; i < rg; i++) {
      p = edgePos(); el = document.createElement('i'); el.className = 'd-ring';
      el.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (90 + rnd() * 140) + 'px;--t:' + (10 + rnd() * 10) + 's;margin:-80px';
      d.appendChild(el);
    }
  });

  /* ---------------- Заставка ---------------- */
  var intro = $('#intro'), introDone = false;
  (function () {
    var box = $('.intro-stars');
    for (var i = 0; i < 16; i++) {
      var s = svgUse('s-sparkle'); var p = [rnd() * 96 + 2, rnd() * 92 + 4];
      s.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (12 + rnd() * 40) + 'px;--dl:' + (0.3 + rnd() * 1.4) + 's';
      box.appendChild(s);
    }
  })();
  function endIntro() {
    if (introDone) return; introDone = true;
    intro.classList.add('zoom');
    setTimeout(function () {
      intro.classList.add('done'); body.classList.remove('is-intro');
      $('#home').classList.add('inview');
      setTimeout(function () { intro.remove(); }, 1000);
    }, reduce ? 50 : 650);
  }
  $('.intro-skip').addEventListener('click', endIntro);
  setTimeout(endIntro, reduce ? 600 : 3300);

  /* ---------------- Навигация / разделы ---------------- */
  var sections = $$('main > .section');
  var dotsBox = $('.dots');
  sections.forEach(function (s) {
    var a = document.createElement('a'); a.href = '#' + s.id; a.dataset.go = s.id;
    a.innerHTML = '<span>' + s.dataset.num + ' · ' + s.dataset.title + '</span>';
    a.setAttribute('aria-label', s.dataset.title); dotsBox.appendChild(a);
  });
  function goTo(id) {
    var el = document.getElementById(id); if (!el) return;
    closeMenus();
    var y = el.getBoundingClientRect().top + window.scrollY - (el.classList.contains('section') ? 0 : 64);
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]');
    if (a) { e.preventDefault(); goTo(a.dataset.go); }
  });
  var menu = $('.menu');
  function closeMenus() { $$('.has-sub.open').forEach(function (l) { l.classList.remove('open'); }); menu.classList.remove('open'); }
  $$('.has-sub > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation(); var li = b.parentNode, was = li.classList.contains('open');
      $$('.has-sub.open').forEach(function (l) { l.classList.remove('open'); });
      if (!was) li.classList.add('open');
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.menu')) closeMenus(); });
  $('.burger').addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('open'); });
  var toTop = $('.to-top');
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  var groupOf = { home: null, about: null, digital: 'art', traditional: 'art', characters: 'art', graphic: 'graphic', identity: 'graphic', packaging: 'graphic', social: 'graphic', magazines: 'publish', books: 'publish', catalogs: 'publish', uiux: 'digitalp', web: 'digitalp', finale: 'digitalp' };
  var subTargets = ['zinfoto', 'bk', 'glow', 'council', 'emblem', 'guguscuk'].map(function (id) { return document.getElementById(id); });
  var current = null;
  function setActive(sec) {
    if (current === sec) return; current = sec;
    var c = sec.dataset.colors.split(',');
    ['--c1', '--c2', '--c3', '--c4'].forEach(function (k, i) { body.style.setProperty(k, c[i]); });
    $('.sec-counter b').textContent = sec.dataset.num;
    $$('.dots a').forEach(function (a) { a.classList.toggle('on', a.dataset.go === sec.id); });
    $$('.menu-list > li').forEach(function (li) { li.classList.remove('active'); });
    var g = groupOf[sec.id];
    var li = g ? $('.has-sub[data-group="' + g + '"]') : ($('.menu-list a[data-go="' + sec.id + '"]') || {}).parentNode;
    if (li && li.classList) li.classList.add('active');
  }
  var ticking = false;
  function onScroll() {
    ticking = false;
    var vh = window.innerHeight, mid = vh * 0.45, best = sections[0];
    for (var i = 0; i < sections.length; i++) { var r = sections[i].getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { best = sections[i]; break; } }
    setActive(best);
    var max = document.documentElement.scrollHeight - vh;
    $('.progress span').style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    toTop.classList.toggle('show', window.scrollY > vh * 0.8);
    // подсветка подпунктов
    var sub = null;
    subTargets.forEach(function (t) { if (!t) return; var r = t.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) sub = t.id; });
    $$('.sub a').forEach(function (a) { a.classList.toggle('active', a.dataset.go === (sub || best.id)); });
    romScroll();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.target.id === 'home' && !introDone) return;
      e.target.classList.toggle('inview', e.isIntersecting);
    });
  }, { rootMargin: '-8% 0px -8% 0px' });
  sections.forEach(function (s) { io.observe(s); });
  var devIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dev'); devIO.unobserve(e.target); } }); }, { threshold: .35 });
  $$('.develop').forEach(function (d) { devIO.observe(d); });

  /* ---------------- Частицы ---------------- */
  var cv = $('#particles'), cx = cv.getContext('2d'), parts = [], pw, ph;
  function pResize() {
    var d = Math.min(window.devicePixelRatio || 1, 1.5); pw = innerWidth; ph = innerHeight;
    cv.width = pw * d; cv.height = ph * d; cx.setTransform(d, 0, 0, d, 0, 0);
    var n = Math.round(Math.min(70, pw * ph / 22000)); parts = [];
    for (var i = 0; i < n; i++) parts.push({ x: Math.random() * pw, y: Math.random() * ph, r: .6 + Math.random() * 2.2, v: .1 + Math.random() * .35, ph: Math.random() * 6.28, sp: Math.random() < .22 });
  }
  pResize(); window.addEventListener('resize', pResize);
  var mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  function particlesOn() { return !document.hidden && !body.classList.contains('calm') && !body.classList.contains('modal-open') && !reduce; }
  function pFrame(t) {
    requestAnimationFrame(pFrame);
    if (!particlesOn()) return;
    cx.clearRect(0, 0, pw, ph);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.y -= p.v; p.x += Math.sin(t / 2000 + p.ph) * .2 + (mouse.x - pw / 2) * 0.00008 * p.r;
      if (p.y < -10) { p.y = ph + 10; p.x = Math.random() * pw; }
      var a = .35 + .65 * Math.abs(Math.sin(t / 900 + p.ph));
      if (p.sp) {
        var s = p.r * 3.2 * a; cx.fillStyle = 'rgba(255,255,255,' + a + ')';
        cx.beginPath(); cx.moveTo(p.x, p.y - s); cx.quadraticCurveTo(p.x, p.y, p.x + s, p.y); cx.quadraticCurveTo(p.x, p.y, p.x, p.y + s); cx.quadraticCurveTo(p.x, p.y, p.x - s, p.y); cx.quadraticCurveTo(p.x, p.y, p.x, p.y - s); cx.fill();
      } else {
        cx.fillStyle = 'rgba(255,240,248,' + a * .8 + ')'; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
      }
    }
  }
  requestAnimationFrame(pFrame);

  /* ---------------- Курсор, магнитные кнопки, наклон ---------------- */
  var glow = $('.cursor-glow');
  window.addEventListener('pointermove', function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (glow) glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
  }, { passive: true });
  if (!isTouch) {
    document.addEventListener('pointermove', function (e) {
      var m = e.target.closest && e.target.closest('.magnetic');
      $$('.magnetic.mag-on').forEach(function (b) { if (b !== m) { b.classList.remove('mag-on'); b.style.transform = ''; } });
      if (!m || body.classList.contains('calm')) return;
      var r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      m.classList.add('mag-on'); m.style.transform = 'translate(' + dx * .25 + 'px,' + dy * .3 + 'px)';
    }, { passive: true });
    document.addEventListener('pointermove', function (e) {
      var t = e.target.closest && e.target.closest('.tilt');
      $$('.tilt.tilting').forEach(function (b) { if (b !== t) { b.classList.remove('tilting'); b.style.transform = ''; } });
      if (!t || body.classList.contains('calm')) return;
      var r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.classList.add('tilting');
      t.style.transform = 'perspective(900px) rotateX(' + ((.5 - y) * 10) + 'deg) rotateY(' + ((x - .5) * 12) + 'deg) scale(1.02)';
      t.style.setProperty('--mx', x * 100 + '%'); t.style.setProperty('--my', y * 100 + '%');
    }, { passive: true });
    // главный экран — сцена реагирует на курсор
    var hf = $('.hero-frames');
    $('#home').addEventListener('pointermove', function (e) {
      if (body.classList.contains('calm')) return;
      var x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      hf.style.transform = 'rotateY(' + x * 16 + 'deg) rotateX(' + -y * 10 + 'deg)';
    });
    $('#home').addEventListener('pointerleave', function () { hf.style.transform = ''; });
    // ZinFoto — вращение мокапа в перспективе
    var zs = $('.zin-stage3d'), zc = $('.zin-card3d');
    zs.addEventListener('pointermove', function (e) {
      var r = zs.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      zc.style.transform = 'rotateX(' + (-y * 26) + 'deg) rotateY(' + (x * 34) + 'deg) scale(1.02)';
    });
    zs.addEventListener('pointerleave', function () { zc.style.transform = ''; });
    // персонаж — параллакс одним слоем (без деформации)
    var cs = $('.char-stage'), ci = $('.char-img');
    cs.addEventListener('pointermove', function (e) {
      var r = cs.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      ci.style.transform = 'translate(' + x * 22 + 'px,' + y * 16 + 'px)';
      $('.rs1').style.translate = (-x * 30) + 'px ' + (-y * 30) + 'px';
      $('.rs2').style.translate = (x * 14) + 'px ' + (y * 14) + 'px';
    });
    cs.addEventListener('pointerleave', function () { ci.style.transform = ''; });
    // телефоны Romina
    var ph2 = $('.phones');
    ph2.addEventListener('pointermove', function (e) {
      var r = ph2.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      ph2.style.transform = 'rotateY(' + x * 14 + 'deg) rotateX(' + -y * 8 + 'deg)';
    });
    ph2.addEventListener('pointerleave', function () { ph2.style.transform = ''; });
  }

  /* ---------------- 3D-карусель ---------------- */
  var carousel = $('.carousel'), ring = $('.carousel-ring'), cards = [];
  var N = ART.length, step = 360 / N, rot = 0, target = null, vel = 0, dragging = false, lastInteract = -1e9, hoverC = false, front = -1, R = 500, cw = 260, tiltX = 0;
  ART.forEach(function (a, i) {
    var c = document.createElement('div'); c.className = 'c-card'; c.dataset.i = i;
    c.innerHTML = '<img src="' + a.thumb + '" alt="' + a.t + '" draggable="false"><span class="c-zoom">⤢</span>';
    c.style.setProperty('--glow', a.pal[0]);
    ring.appendChild(c); cards.push(c);
  });
  function cSize() {
    cw = Math.round(clamp(innerWidth * .2, 170, 270));
    if (innerWidth < 640) cw = 180;
    carousel.style.setProperty('--cw', cw + 'px');
    R = Math.round(cw / (2 * Math.tan(Math.PI / N)) * 1.12);
  }
  cSize(); window.addEventListener('resize', cSize);
  function norm(a) { a = ((a % 360) + 540) % 360 - 180; return a; }
  function cRender() {
    ring.style.transform = 'translateZ(' + (-R) + 'px) rotateX(' + (-6 + tiltX) + 'deg) rotateY(' + rot + 'deg)';
    var best = 0, bestA = 999;
    for (var i = 0; i < N; i++) {
      var a = norm(i * step + rot), k = Math.max(0, 1 - Math.abs(a) / step);
      cards[i].style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + R + 'px) scale(' + (1 + .2 * k) + ')';
      cards[i].style.filter = 'brightness(' + (.55 + .45 * Math.max(0, Math.cos(a * Math.PI / 180))) + ')';
      cards[i].style.zIndex = Math.round(100 - Math.abs(a));
      if (Math.abs(a) < bestA) { bestA = Math.abs(a); best = i; }
    }
    if (best !== front) {
      if (front >= 0) cards[front].classList.remove('front');
      front = best; cards[front].classList.add('front');
      var art = ART[front];
      $('.carousel-caption b').textContent = art.t;
      $('.carousel-caption span').textContent = art.cat + ' · ' + (front + 1) + ' / ' + N;
      var bg = $('.carousel-bg'); bg.style.setProperty('--a1', art.pal[0]); bg.style.setProperty('--a2', art.pal[1]);
      bg.style.background = 'radial-gradient(60% 70% at 50% 50%, ' + art.pal[0] + ' 0%, ' + art.pal[1] + ' 45%, transparent 75%)';
    }
  }
  function cLoop(t) {
    requestAnimationFrame(cLoop);
    var sec = $('#digital');
    if (!sec.classList.contains('inview') || body.classList.contains('modal-open')) return;
    var now = performance.now();
    if (target !== null) { var d = target - rot; rot += d * .12; if (Math.abs(d) < .05) { rot = target; target = null; } }
    else if (!dragging) {
      if (Math.abs(vel) > .02) { rot += vel; vel *= .93; if (Math.abs(vel) <= .02) target = Math.round(rot / step) * step; }
      else if (!hoverC && now - lastInteract > 3500 && !body.classList.contains('calm')) rot -= .07;
    }
    cRender();
  }
  cRender(); requestAnimationFrame(cLoop);
  function cGo(dir) { lastInteract = performance.now(); vel = 0; var base = target !== null ? target : Math.round(rot / step) * step; target = base - dir * step; }
  $$('.cbtn').forEach(function (b) { b.addEventListener('click', function () { cGo(+b.dataset.dir); }); });
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { cGo(1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { cGo(-1); e.preventDefault(); }
    else if (e.key === 'Enter') openLB('digital-all', front);
  });
  carousel.addEventListener('pointerenter', function () { hoverC = true; });
  carousel.addEventListener('pointerleave', function () { hoverC = false; tiltX = 0; });
  var dStart = null;
  carousel.addEventListener('pointerdown', function (e) {
    dStart = { x: e.clientX, rot: rot, t: performance.now(), lastX: e.clientX, moved: false, card: e.target.closest('.c-card') };
    target = null; vel = 0; lastInteract = performance.now();
  });
  carousel.addEventListener('pointermove', function (e) {
    var r = carousel.getBoundingClientRect(); tiltX = ((e.clientY - r.top) / r.height - .5) * -8;
    if (!dStart) { if (!dragging && !body.classList.contains('calm')) rot += ((e.clientX - r.left) / r.width - .5) * -.12; return; }
    var dx = e.clientX - dStart.x;
    if (!dStart.moved && Math.abs(dx) > 6) { dStart.moved = true; dragging = true; carousel.classList.add('dragging'); try { carousel.setPointerCapture(e.pointerId); } catch (_) {} }
    if (dStart.moved) { rot = dStart.rot + dx * .25; vel = (e.clientX - dStart.lastX) * .25; dStart.lastX = e.clientX; lastInteract = performance.now(); }
  });
  function cUp() {
    if (!dStart) return;
    var s = dStart; dStart = null; dragging = false; carousel.classList.remove('dragging'); lastInteract = performance.now();
    if (!s.moved && s.card) {
      var i = +s.card.dataset.i;
      if (i === front) openLB('digital-all', i);
      else { var a = norm(i * step + rot); target = rot - a; }
    }
  }
  carousel.addEventListener('pointerup', cUp); carousel.addEventListener('pointercancel', cUp);

  /* ---------------- Галерея с фильтрами ---------------- */
  var grid = $('#artGrid');
  ART.forEach(function (a, i) {
    var f = document.createElement('figure'); f.className = 'art-item tilt'; f.dataset.cats = a.c.join(' ');
    f.style.setProperty('--p1', a.pal[0]); f.style.setProperty('--p2', a.pal[1]); f.style.setProperty('--p3', a.pal[2]);
    f.innerHTML = '<img src="' + a.thumb + '" alt="' + a.t + '" width="' + a.w + '" height="' + a.h + '" loading="lazy"><figcaption>' + a.t + '<small>' + a.cat + '</small></figcaption>';
    f.addEventListener('click', function () { openLB('digital-all', i); });
    grid.appendChild(f);
  });
  $$('.filter button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.filter button').forEach(function (x) { x.classList.toggle('on', x === b); });
      var c = b.dataset.cat;
      $$('.art-item').forEach(function (it) { it.classList.toggle('hide', c !== 'all' && it.dataset.cats.split(' ').indexOf(c) < 0); });
    });
  });

  /* ---------------- Детали персонажа ---------------- */
  function cropStyle(el, fx, fy, z, src) {
    var px = (fx * z - .5) / (z - 1) * 100, py = (fy * z - .5) / (z - 1) * 100;
    el.style.backgroundImage = 'url("' + src + '")';
    el.style.backgroundSize = (z * 100) + '%';
    el.style.backgroundPosition = clamp(px, 0, 100) + '% ' + clamp(py, 0, 100) + '%';
    el.style.setProperty('--bz', (z * 100) + '%');
  }
  $$('.char-details .detail[data-fx]').forEach(function (d) {
    var f = d.dataset.fx.split(',').map(Number);
    cropStyle($('.detail-img', d), f[0], f[1], +d.dataset.z, CHAR_SRC);
    d.addEventListener('click', function () { openLB('char', 0); });
  });
  (function () { // мини-детали в презентации
    var box = $('.sc-details');
    $$('.char-details .detail[data-fx]').forEach(function (d) {
      var f = d.dataset.fx.split(','), el = document.createElement('div');
      cropStyle(el, +f[0], +f[1], +d.dataset.z, CHAR_SRC);
      el.innerHTML = '<span>' + $('span', d).textContent + '</span>'; box.appendChild(el);
    });
  })();

  /* ---------------- Лента логотипов ---------------- */
  var LOGOS = [
    ['assets/romina/thumbs/logo-emblem.jpg', 'Romina', 'uiux', ''],
    ['assets/zinfoto/thumbs/05-logo-dark.jpg', 'ZinFoto', 'zinfoto', ''],
    ['assets/bk-wearshop/thumbs/composition.jpg', 'BK Wearshop', 'bk', 'object-position:0 0;transform:scale(1.7);transform-origin:22% 10%'],
    ['assets/glow-mermaid/thumbs/01-logo.jpg', 'Glow Mermaid', 'glow', ''],
    ['assets/student-council/thumbs/logo.jpg', 'Ученический совет Гагаузии', 'council', 'object-fit:contain'],
    ['assets/school-emblem/thumbs/emblem.jpg', 'Герб лицея V. Moșkov', 'emblem', '']
  ];
  var lm = $('.lm-track');
  for (var rep = 0; rep < 2; rep++) LOGOS.forEach(function (l) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'lm-item'; b.dataset.go = l[2];
    b.setAttribute('aria-label', 'Перейти к проекту ' + l[1]);
    b.innerHTML = '<i class="lm-in"><img src="' + l[0] + '" alt="" style="' + l[3] + '"></i><span>' + l[1] + '</span>';
    if (rep) b.tabIndex = -1;
    lm.appendChild(b);
  });

  /* ---------------- Декор проектов ---------------- */
  (function () {
    var bf = $('.bk-butterflies');
    for (var i = 0; i < 9; i++) { var s = svgUse('s-butterfly'); var p = edgePos(); s.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (24 + rnd() * 40) + 'px;--t:' + (7 + rnd() * 6) + 's;--r:' + (rnd() * 60 - 30) + 'deg;animation-delay:' + (-rnd() * 8) + 's'; bf.appendChild(s); }
    var bb = $('.bubbles');
    for (i = 0; i < 26; i++) { var b = document.createElement('i'); b.style.cssText = 'left:' + rnd() * 100 + '%;--s:' + (8 + rnd() * 34) + 'px;--t:' + (9 + rnd() * 12) + 's;--dl:' + (-rnd() * 20) + 's;--dx:' + (rnd() * 120 - 60) + 'px'; bb.appendChild(b); }
    var pl = $('.pearls');
    for (i = 0; i < 12; i++) { var q = document.createElement('i'); p = edgePos(); q.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (12 + rnd() * 26) + 'px;--t:' + (5 + rnd() * 5) + 's;animation-delay:' + (-rnd() * 5) + 's'; pl.appendChild(q); }
    var lv = $('.leaves'), cols = ['#ffd36e', '#ff8a3d', '#c8321a', '#ffb340', '#a8240f'];
    for (i = 0; i < 22; i++) { s = svgUse('s-leaf'); s.style.cssText = 'left:' + rnd() * 100 + '%;--s:' + (20 + rnd() * 30) + 'px;--t:' + (10 + rnd() * 10) + 's;--dl:' + (-rnd() * 20) + 's;--dx:' + (rnd() * 200 - 100) + 'px;--c:' + cols[i % 5]; lv.appendChild(s); }
    var sd = $('.spring-deco');
    for (i = 0; i < 14; i++) { var kind = i % 4; s = svgUse(kind < 2 ? 's-flower' : kind === 2 ? 's-butterfly' : 's-bird', kind === 0 ? 'fl' : kind === 1 ? 'fl2' : kind === 2 ? 'bf' : 'bd'); p = edgePos(); s.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;--s:' + (22 + rnd() * 30) + 'px;--t:' + (kind === 3 ? 18 + rnd() * 10 : 5 + rnd() * 5) + 's;animation-delay:' + (-rnd() * 10) + 's'; sd.appendChild(s); }
    var st = $('.sky-stars');
    for (i = 0; i < 40; i++) { var t = document.createElement('i'); t.style.cssText = 'left:' + rnd() * 100 + '%;top:' + rnd() * 45 + '%;--t:' + (2 + rnd() * 4) + 's;animation-delay:' + (-rnd() * 4) + 's'; st.appendChild(t); }
    var fs = $('.fs-track');
    for (rep = 0; rep < 2; rep++) for (i = 8; i <= 38; i += 2) { var im = new Image(); im.src = pagePath('gagauzluk', i, true); im.alt = ''; im.loading = 'lazy'; fs.appendChild(im); }
    // финал — фрагменты работ на орбитах
    var thumbs = [ART[0].thumb, ART[5].thumb, ART[6].thumb, 'assets/glow-mermaid/thumbs/03-mermaid-illustration.jpg', 'assets/books/tepegoz/pages/thumbs/01.jpg', 'assets/magazines/guguscuk-24/pages/thumbs/01.jpg', 'assets/romina/thumbs/logo-character.jpg', ART[1].thumb, 'assets/school-emblem/thumbs/emblem.jpg', ART[3].thumb];
    $$('.fin-orbit').forEach(function (box, bi) {
      thumbs.forEach(function (src, k) {
        var d = document.createElement('div'); d.className = 'fo';
        var rad = (k % 2 ? 40 : 30) + (bi ? 2 : 0);
        d.style.cssText = '--s:' + (k % 3 ? 80 : 104) + 'px;--rad:' + rad + 'vmax;--t:' + (60 + (k % 3) * 14) + 's;--dl:' + (-(k / thumbs.length) * (60 + (k % 3) * 14)) + 's';
        if (innerWidth < 700) d.style.setProperty('--rad', (rad + 10) + 'vw');
        d.innerHTML = '<img src="' + src + '" alt="" loading="lazy">'; box.appendChild(d);
      });
    });
    // избранные развороты
    $$('[data-book-spreads]').forEach(function (box) {
      var b = box.dataset.bookSpreads;
      box.dataset.pairs.split(',').forEach(function (pr) {
        var p2 = pr.split('-').map(Number), w = document.createElement('div'); w.style.setProperty('--ar', BOOK_AR[b]);
        w.innerHTML = '<div class="spread" role="button" tabindex="0" aria-label="Открыть на страницах ' + pr + '"><img loading="lazy" alt="Страница ' + p2[0] + '" src="' + pagePath(b, p2[0] - 1) + '"><img loading="lazy" alt="Страница ' + p2[1] + '" src="' + pagePath(b, p2[1] - 1) + '"></div><p class="spread-cap">Разворот · страницы ' + p2[0] + '–' + p2[1] + '</p>';
        var sp = w.firstChild;
        function go() { openReader(b, p2[0] - 1); }
        sp.addEventListener('click', go); sp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
        box.appendChild(w);
      });
    });
  })();

  /* ---------------- Romina: смена экранов ---------------- */
  var scrIdx = 0, sbtns = $('.screen-btns');
  SCREENS.forEach(function (s, i) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = s[1]; if (!i) b.className = 'on';
    b.addEventListener('click', function () { setScreen(i); }); sbtns.appendChild(b);
  });
  function swapImg(img, src) {
    if (img.getAttribute('src') === src) return;
    img.classList.add('swap');
    setTimeout(function () { img.src = src; img.onload = function () { img.classList.remove('swap'); }; }, 220);
  }
  function setScreen(i) {
    scrIdx = (i + SCREENS.length) % SCREENS.length;
    $$('.screen-btns button').forEach(function (b, k) { b.classList.toggle('on', k === scrIdx); });
    $('.rom-screen-name').textContent = SCREENS[scrIdx][1];
    swapImg($('.p-center img'), ROM + SCREENS[scrIdx][0] + '.jpg');
    swapImg($('.p-left img'), ROM + SCREENS[(scrIdx + SCREENS.length - 1) % SCREENS.length][0] + '.jpg');
    swapImg($('.p-right img'), ROM + SCREENS[(scrIdx + 1) % SCREENS.length][0] + '.jpg');
  }
  setScreen(0);
  $('.p-left').addEventListener('click', function () { setScreen(scrIdx - 1); });
  $('.p-right').addEventListener('click', function () { setScreen(scrIdx + 1); });
  $('.p-center').addEventListener('click', function () { openLB('rom-screens', scrIdx); });
  function romScroll() {
    var s = $('#uiux'), r = s.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    var p = clamp((innerHeight / 2 - (r.top + r.height / 2)) / innerHeight, -1, 1);
    $('.p-left').style.marginTop = (-p * 60) + 'px';
    $('.p-right').style.marginTop = (p * 60) + 'px';
    $('.p-center').style.marginTop = (p * 20) + 'px';
  }

  /* ---------------- Лайтбокс ---------------- */
  var LB = {}; // группы
  function addSet(name, items) { LB[name] = items; }
  addSet('digital-all', ART.map(function (a) { return { src: a.full, cap: a.t + ' — ' + a.cat, pal: a.pal }; }));
  addSet('zin-all', ZIN.map(function (z, i) { return { src: 'assets/zinfoto/' + z + '.jpg', cap: 'ZinFoto · ' + ZIN_T[i], pal: ['#55555e', '#0b0b0d'] }; }));
  addSet('rom-screens', SCREENS.map(function (s) { return { src: ROM + s[0] + '.jpg', cap: 'Romina · ' + s[1], pal: ['#8f1d1d', '#2a0d0d'] }; }));
  var PAL = { hero: ['#8755F5', '#241439'], trad: ['#c98a5a', '#3a2416'], char: ['#b8322a', '#2a1410'], zin: ['#55555e', '#0b0b0d'], bk: ['#7a5236', '#1a100c'], glow: ['#c39bff', '#4b2a8c'], council: ['#ff6fb5', '#1c4a6a'], emblem: ['#1ea08c', '#071a3a'], g22: ['#3ccf6e', '#0e3a2a'], gag: ['#9fc9e8', '#24304a'], rom: ['#8f1d1d', '#2a0d0d'] };
  $$('[data-lb]').forEach(function (el) {
    var g = el.dataset.lb, src = el.dataset.full || ($('img', el) || el).getAttribute('src');
    var cap = (($('img', el) || el).getAttribute('alt')) || '';
    LB[g] = LB[g] || [];
    var idx = LB[g].findIndex(function (it) { return it.src === src; });
    if (idx < 0) { LB[g].push({ src: src, cap: cap, pal: PAL[g] }); idx = LB[g].length - 1; }
    el.addEventListener('click', function () { openLB(g, idx); });
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-open-lb]'); if (!b) return;
    openLB(b.dataset.openLb, +b.dataset.index || 0);
  });
  var lb = $('#lightbox'), lbImg = $('.lb-img'), lbStage = $('.lb-stage'), lbSet = [], lbI = 0, zoom = 1, pan = { x: 0, y: 0 };
  function modalState() { body.classList.toggle('modal-open', lb.classList.contains('open') || $('#reader').classList.contains('open') || $('#present').classList.contains('open')); }
  function openLB(g, i) {
    lbSet = LB[g] || []; if (!lbSet.length) return;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); modalState(); showLB(i || 0);
  }
  function showLB(i) {
    lbI = (i + lbSet.length) % lbSet.length; var it = lbSet[lbI];
    zoom = 1; pan = { x: 0, y: 0 }; applyZoom();
    lbImg.classList.add('loading');
    var im = new Image(); im.onload = function () { lbImg.src = it.src; lbImg.alt = it.cap; lbImg.classList.remove('loading'); }; im.src = it.src;
    $('.lb-count').textContent = (lbI + 1) + ' / ' + lbSet.length;
    $('.lb-cap').textContent = it.cap || '';
    var p = it.pal || ['#8755F5', '#241439'];
    $('.lb-bg').style.setProperty('--lb1', p[0]); $('.lb-bg').style.setProperty('--lb2', p[p.length - 1]);
    $('.lb-bg').style.background = 'radial-gradient(circle at 50% 40%, ' + mix(p[0]) + ', ' + mix(p[p.length - 1], .3) + ' 75%)';
    $$('.lb-nav').forEach(function (b) { b.disabled = lbSet.length < 2; });
  }
  function mix(hex, k) { // затемнение цвета для фона
    k = k === undefined ? .55 : k; var n = parseInt(hex.slice(1), 16);
    return 'rgb(' + Math.round((n >> 16) * k) + ',' + Math.round(((n >> 8) & 255) * k) + ',' + Math.round((n & 255) * k) + ')';
  }
  function closeLB() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); modalState(); }
  function applyZoom() { lbImg.style.transform = 'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ')'; lbStage.classList.toggle('zoomed', zoom > 1); }
  function setZoom(z) { zoom = clamp(z, 1, 5); if (zoom === 1) pan = { x: 0, y: 0 }; applyZoom(); }
  $('.lb-close').addEventListener('click', closeLB);
  $('.lb-bg').addEventListener('click', closeLB);
  $('.lb-nav.prev').addEventListener('click', function () { showLB(lbI - 1); });
  $('.lb-nav.next').addEventListener('click', function () { showLB(lbI + 1); });
  $$('.lb-tools [data-z]').forEach(function (b) { b.addEventListener('click', function () { var d = +b.dataset.z; setZoom(d === 0 ? 1 : zoom * (d > 0 ? 1.4 : 1 / 1.4)); }); });
  lbStage.addEventListener('wheel', function (e) { e.preventDefault(); setZoom(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15)); }, { passive: false });
  lbStage.addEventListener('dblclick', function () { setZoom(zoom > 1 ? 1 : 2.2); });
  var lbDrag = null;
  lbStage.addEventListener('pointerdown', function (e) { if (e.target !== lbImg && zoom === 1) { closeLB(); return; } lbDrag = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y, moved: false }; try { lbStage.setPointerCapture(e.pointerId); } catch (_) {} });
  lbStage.addEventListener('pointermove', function (e) {
    if (!lbDrag) return; var dx = e.clientX - lbDrag.x, dy = e.clientY - lbDrag.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) lbDrag.moved = true;
    if (zoom > 1) { pan.x = lbDrag.px + dx; pan.y = lbDrag.py + dy; lbImg.style.transition = 'none'; applyZoom(); }
  });
  lbStage.addEventListener('pointerup', function (e) {
    if (!lbDrag) return; var d = lbDrag; lbDrag = null; lbImg.style.transition = '';
    if (zoom === 1 && d.moved) { var dx = e.clientX - d.x; if (Math.abs(dx) > 50) showLB(lbI + (dx < 0 ? 1 : -1)); }
  });

  /* ---------------- Читалка ---------------- */
  var reader = $('#reader'), rdBook = $('.rd-book'), fb = null, curBook = null, lastPages = {};
  try { lastPages = JSON.parse(store('kk-pages') || '{}') || {}; } catch (e) { lastPages = {}; }
  function openReader(b, page) {
    var B = BOOKS[b]; if (!B) { if (b === 'guguscuk22') openLB('g22', 0); return; }
    curBook = b;
    $('.rd-title').textContent = B.title;
    $('.rd-total').textContent = B.n;
    $('.rd-goto input').max = B.n;
    $('.rd-dl').href = B.pdf;
    $('.rd-bg').style.background = 'radial-gradient(circle at 50% 30%, ' + B.bg[0] + ', ' + B.bg[1] + ' 75%)';
    reader.classList.add('open'); reader.setAttribute('aria-hidden', 'false'); modalState();
    // миниатюры
    var tt = $('.rd-thumbs-track'); tt.innerHTML = '';
    for (var i = 0; i < B.n; i++) (function (i) {
      var bt = document.createElement('button'); bt.type = 'button'; bt.innerHTML = '<img loading="lazy" alt="Страница ' + (i + 1) + '" src="' + pagePath(b, i, true) + '"><span>' + (i + 1) + '</span>';
      bt.addEventListener('click', function () { fb.goTo(i); }); tt.appendChild(bt);
    })(i);
    if (fb) fb.destroy();
    var pages = []; for (i = 0; i < B.n; i++) pages.push(pagePath(b, i));
    var start = page !== undefined ? page : (lastPages[b] || 0);
    requestAnimationFrame(function () {
      fb = new KFlipBook(rdBook, { pages: pages, aspect: B.aspect, startPage: start, onChange: rdChange });
    });
  }
  function rdChange(info) {
    var p = info.pages;
    $('.rd-cur').textContent = p.length > 1 ? (p[0] + 1) + '–' + (p[1] + 1) : (p[0] + 1);
    $('.rd-goto input').value = p[0] + 1;
    lastPages[curBook] = p[p.length - 1]; store('kk-pages', JSON.stringify(lastPages));
    $$('.rd-thumbs button').forEach(function (b, i) { b.classList.toggle('on', p.indexOf(i) >= 0); });
    var on = $('.rd-thumbs button.on'); if (on && reader.classList.contains('thumbs-on')) on.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    $('.rd-nav.prev').disabled = !fb || !fb.canPrev(); $('.rd-nav.next').disabled = !fb || !fb.canNext();
    setTimeout(function () { if (fb) { $('.rd-nav.prev').disabled = !fb.canPrev(); $('.rd-nav.next').disabled = !fb.canNext(); } }, 0);
  }
  function closeReader() {
    reader.classList.remove('open', 'thumbs-on'); reader.setAttribute('aria-hidden', 'true');
    if (document.fullscreenElement === reader) document.exitFullscreen().catch(function () {});
    setTimeout(function () { if (!reader.classList.contains('open') && fb) { fb.destroy(); fb = null; } }, 500);
    modalState();
  }
  $('.rd-close').addEventListener('click', closeReader);
  $('.rd-nav.prev').addEventListener('click', function () { fb && fb.prev(); });
  $('.rd-nav.next').addEventListener('click', function () { fb && fb.next(); });
  $('.rd-thumbs-btn').addEventListener('click', function () { reader.classList.toggle('thumbs-on'); setTimeout(function () { var on = $('.rd-thumbs button.on'); on && on.scrollIntoView({ block: 'nearest', inline: 'center' }); }, 420); });
  $('.rd-goto').addEventListener('submit', function (e) { e.preventDefault(); var v = +$('.rd-goto input').value; if (fb && v >= 1) fb.goTo(v - 1); });
  $('.rd-zoom').addEventListener('click', function () {
    if (!fb) return; var B = BOOKS[curBook];
    addSet('reader-zoom', fb.info().pages.map(function (i) { return { src: pagePath(curBook, i), cap: B.title + ' · страница ' + (i + 1), pal: B.bg }; }));
    openLB('reader-zoom', 0); setZoom(1.6);
  });
  $('.rd-full').addEventListener('click', function () {
    if (document.fullscreenElement === reader) document.exitFullscreen().catch(function () {});
    else if (reader.requestFullscreen) reader.requestFullscreen().catch(function () {});
  });

  /* Анимация «книга вылетает в центр» */
  function flyBook(srcEl, b) {
    var img = srcEl && (srcEl.querySelector('.b-cover img') || srcEl.querySelector('img'));
    if (!img || reduce || body.classList.contains('calm')) { openReader(b); return; }
    var r = img.getBoundingClientRect(), B = BOOKS[b];
    var fly = document.createElement('div'); fly.className = 'book-fly';
    fly.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
    fly.innerHTML = '<img src="' + img.getAttribute('src') + '" alt="">'; body.appendChild(fly);
    var H = innerHeight * .74, W = H * B.aspect;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      fly.style.left = (innerWidth / 2 - W / 2) + 'px'; fly.style.top = (innerHeight / 2 - H / 2) + 'px';
      fly.style.width = W + 'px'; fly.style.height = H + 'px'; fly.classList.add('open');
    }); });
    setTimeout(function () { openReader(b); }, 900);
    setTimeout(function () { fly.style.opacity = '0'; }, 1050);
    setTimeout(function () { fly.remove(); }, 1500);
  }
  document.addEventListener('click', function (e) {
    var bk = e.target.closest('.book3d'), ob = e.target.closest('[data-open-book]');
    if (bk) { var b = bk.dataset.book; if (b === 'guguscuk22') openLB('g22', 0); else flyBook(bk, b); return; }
    if (ob) { if (ob.closest('#present')) openReader(ob.dataset.openBook); else flyBook(ob.querySelector('img') ? ob : null, ob.dataset.openBook); }
  });

  /* ---------------- Режим презентации ---------------- */
  var pr = $('#present'), scenes = $$('.scene', pr), sIdx = 0;
  var SC_PAL = [['#8755F5', '#F458AE', '#241439'], ['#6b3fa0', '#83D9FF', '#1b1036'], ['#b8322a', '#d9a066', '#2a1410'], ['#55555e', '#c39bff', '#120a18'], ['#ff6fb5', '#1ea08c', '#0b2a3a'], ['#e0561c', '#7a3fa0', '#2a1240'], ['#8f1d1d', '#e0b04a', '#2a0d0d'], ['#F458AE', '#8755F5', '#241439']];
  var ORIG = ['50% 50%', '100% 50%', '0% 100%', '50% 0%', '100% 100%', '0% 0%', '50% 100%', '50% 50%'];
  (function () {
    var fan = $('.sc-fan');
    ART.forEach(function (a, i) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', a.t);
      var ang = (i - (N - 1) / 2) * 8.5;
      b.style.transform = 'translateX(-50%) rotate(' + ang + 'deg)';
      b.dataset.ang = ang;
      b.innerHTML = '<img src="' + a.thumb + '" alt="">';
      b.addEventListener('mouseenter', function () { b.style.transform = 'translateX(-50%) rotate(' + ang + 'deg) translateY(-40px) scale(1.12)'; });
      b.addEventListener('mouseleave', function () { b.style.transform = 'translateX(-50%) rotate(' + ang + 'deg)'; });
      b.addEventListener('click', function () { openLB('digital-all', i); });
      fan.appendChild(b);
    });
    var dots = $('.pr-dots');
    scenes.forEach(function (s, i) {
      var d = document.createElement('button'); d.type = 'button'; d.setAttribute('aria-label', s.dataset.t);
      d.addEventListener('click', function () { showScene(i); }); dots.appendChild(d);
    });
  })();
  function showScene(i) {
    sIdx = clamp(i, 0, scenes.length - 1);
    scenes.forEach(function (s, k) { s.style.clipPath = ''; s.classList.toggle('on', k === sIdx); });
    var sc = scenes[sIdx]; sc.style.setProperty('clip-path', 'circle(150% at ' + ORIG[sIdx] + ')');
    var p = SC_PAL[sIdx];
    $('.pr-bg').style.background = 'radial-gradient(70% 60% at 30% 30%, ' + p[0] + ', transparent 70%), radial-gradient(60% 60% at 80% 80%, ' + p[1] + ', transparent 70%), ' + p[2];
    $$('.pr-dots button').forEach(function (d, k) { d.classList.toggle('on', k === sIdx); });
    $('.pr-count').textContent = (sIdx + 1) + ' / ' + scenes.length + ' · ' + sc.dataset.t;
    // сцена 2: веер раскрывается
    $$('.sc-fan button').forEach(function (b, k) {
      var ang = +b.dataset.ang;
      b.style.transform = 'translateX(-50%) rotate(' + (sIdx === 1 ? ang : 0) + 'deg)';
    });
  }
  function hideScenesBefore() { scenes.forEach(function (s) { s.style.clipPath = 'circle(0% at ' + ORIG[scenes.indexOf(s)] + ')'; }); }
  function openPresent() {
    closeMenus(); hideScenesBefore();
    pr.classList.add('open'); pr.setAttribute('aria-hidden', 'false'); modalState();
    showScene(0);
    var el = document.documentElement;
    if (el.requestFullscreen && !document.fullscreenElement) {
      el.requestFullscreen().then(function () {
        if (navigator.keyboard && navigator.keyboard.lock) navigator.keyboard.lock(['Escape']).catch(function () {});
      }).catch(function () {});
    }
  }
  function closePresent() {
    if (!pr.classList.contains('open')) return;
    if (lb.classList.contains('open')) closeLB();
    if (reader.classList.contains('open')) closeReader();
    pr.classList.remove('open'); pr.setAttribute('aria-hidden', 'true'); modalState();
    if (navigator.keyboard && navigator.keyboard.unlock) navigator.keyboard.unlock();
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }
  ['#presentBtn', '#presentBtnTop'].forEach(function (s) { $(s).addEventListener('click', openPresent); });
  $$('[data-present]').forEach(function (b) { b.addEventListener('click', openPresent); });
  $('.pr-btn.prev').addEventListener('click', function () { showScene(sIdx - 1); });
  $('.pr-btn.next').addEventListener('click', function () { showScene(sIdx + 1); });
  $('.pr-btn.close').addEventListener('click', closePresent);
  document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) return;
    // Если браузер сам вышел из полноэкранного режима по Esc
    if (pr.classList.contains('open')) {
      if (lb.classList.contains('open')) closeLB();
      else if (reader.classList.contains('open')) closeReader();
      else closePresent();
    }
  });

  /* ---------------- Клавиатура ---------------- */
  document.addEventListener('keydown', function (e) {
    if (e.target.matches && e.target.matches('input, textarea')) { if (e.key === 'Escape') e.target.blur(); return; }
    var k = e.key;
    if (lb.classList.contains('open')) {
      if (k === 'Escape') closeLB();
      else if (k === 'ArrowRight') showLB(lbI + 1);
      else if (k === 'ArrowLeft') showLB(lbI - 1);
      else if (k === '+' || k === '=') setZoom(zoom * 1.4);
      else if (k === '-') setZoom(zoom / 1.4);
      else return;
      e.preventDefault(); return;
    }
    if (reader.classList.contains('open')) {
      if (k === 'Escape') closeReader();
      else if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') fb && fb.next();
      else if (k === 'ArrowLeft' || k === 'PageUp') fb && fb.prev();
      else if (k === 'Home') fb && fb.goTo(0);
      else if (k === 'End') fb && fb.goTo(BOOKS[curBook].n - 1);
      else return;
      e.preventDefault(); return;
    }
    if (pr.classList.contains('open')) {
      if (k === 'Escape') closePresent();
      else if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter' && e.target === document.body) showScene(sIdx + 1);
      else if (k === 'ArrowLeft' || k === 'PageUp') showScene(sIdx - 1);
      else if (k === 'Home') showScene(0);
      else if (k === 'End') showScene(scenes.length - 1);
      else return;
      e.preventDefault(); return;
    }
    if (k === 'Escape') closeMenus();
  });

  /* ---------------- Переключатель эффектов ---------------- */
  var fx = $('#fxToggle');
  function setCalm(on) { body.classList.toggle('calm', on); fx.setAttribute('aria-pressed', on ? 'true' : 'false'); fx.textContent = on ? '✧ Эффекты выкл.' : '✦ Эффекты'; store('kk-calm', on ? '1' : '0'); }
  fx.addEventListener('click', function () { setCalm(!body.classList.contains('calm')); });
  setCalm(reduce || store('kk-calm') === '1');

  document.addEventListener('visibilitychange', modalState);
  onScroll();
})();
