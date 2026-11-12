
(function () {
  'use strict';

 
  function initCarousel() {
      var track = document.querySelector('.tariffs-carousel');
    if (!track) return;
    if (window.matchMedia('(max-width: 720px)').matches) return; 
    var wrap = track.closest('.tariffs-slider');
    if (!wrap) return;

    var prev = wrap.querySelector('.ts-prev');
    var next = wrap.querySelector('.ts-next');
    var tabsBox = wrap.querySelector('.ts-dots');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.tariff'));
    if (!cards.length) return;

    var tabs = [];
    var active = 0;
    var interacted = false;
       var START_INDEX = Math.min(2, cards.length - 1); 

    function centerOf(card) { return card.offsetLeft + card.offsetWidth / 2; }
    function gap() {
      var cs = getComputedStyle(track);
      return parseFloat(cs.columnGap || cs.gap) || 0;
    }
function setPad() {
  var cs = getComputedStyle(track);
  var g = parseFloat(cs.columnGap || cs.gap) || 0;
  var p = Math.max(0, (track.clientWidth - cards[0].offsetWidth) / 2 - g);
  track.style.setProperty('--pad', p + 'px');
}
setPad();
    function nearestIndex() {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var d = Math.abs(centerOf(c) - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    }

    function goTo(i, instant) {
      i = Math.max(0, Math.min(i, cards.length - 1));
      var left = centerOf(cards[i]) - track.clientWidth / 2;
      if (instant) { track.scrollLeft = left; paint(); }
      else track.scrollTo({ left: left, behavior: 'smooth' });
    }

   
    function paint() {
      var mid = track.scrollLeft + track.clientWidth / 2;
      var unit = cards[0].offsetWidth + gap();
      cards.forEach(function (c) {
        var d = Math.min(Math.abs(centerOf(c) - mid) / unit, 1);
        c.style.setProperty('--s', (1 - 0.13 * d).toFixed(3));
        c.style.setProperty('--o', (1 - 0.6 * d).toFixed(3));
        c.style.zIndex = String(Math.round((1 - d) * 10));
      });
      var idx = nearestIndex();
      if (idx !== active || !tabs[idx] || !tabs[idx].classList.contains('is-active')) {
        active = idx;
        cards.forEach(function (c, i) { c.classList.toggle('is-active', i === idx); });
        tabs.forEach(function (t, i) { t.classList.toggle('is-active', i === idx); });
        prev.disabled = idx <= 0;
        next.disabled = idx >= cards.length - 1;
      }
    }

    
    cards.forEach(function (c, i) {
      var h = c.querySelector('h3');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ts-dot';
      b.textContent = h ? h.textContent.trim() : String(i + 1);
      b.addEventListener('click', function () { interacted = true; goTo(i); });
      tabsBox.appendChild(b);
      tabs.push(b);
    });

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { paint(); ticking = false; }); }
    }, { passive: true });

    prev.addEventListener('click', function () { interacted = true; goTo(active - 1); });
    next.addEventListener('click', function () { interacted = true; goTo(active + 1); });

    
    var justDragged = false;
    track.addEventListener('click', function (e) {
      if (justDragged) { e.preventDefault(); e.stopPropagation(); return; }
      var card = e.target.closest ? e.target.closest('.tariff') : null;
      if (!card) return;
      var i = cards.indexOf(card);
      if (i !== -1 && i !== active) {
        e.preventDefault(); e.stopPropagation();
        interacted = true;
        goTo(i);
      }
    }, true);

 
    var down = false, moved = false, startX = 0, startLeft = 0;
    track.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      down = true; moved = false; interacted = true;
      startX = e.pageX; startLeft = track.scrollLeft;
    });
    window.addEventListener('mousemove', function (e) {
      if (!down) return;
      var dx = e.pageX - startX;
      if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('mouseup', function () {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove('is-dragging');
        justDragged = true;
        setTimeout(function () { justDragged = false; }, 0);
        goTo(nearestIndex());
      }
    });
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
    track.addEventListener('touchstart', function () { interacted = true; }, { passive: true });
    track.addEventListener('wheel', function () { interacted = true; }, { passive: true });

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { setPad(); goTo(active, true); }, 120);
    });

    goTo(START_INDEX, true);
    window.addEventListener('load', function () { if (!interacted) goTo(START_INDEX, true); });
  }

 
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var sel = '.premium-heading, .luxury-line, .about-text-content, .sub-main-title, ' +
              '.benefit-card, .showcase-img-container, .showcase-text-content, ' +
              '.luxury-quote, .gift .about-column, ' +
              '.map-container-border, .contact-phone-luxury';
    var els = document.querySelectorAll(sel);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        el.classList.add('lx-in');
        setTimeout(function () {
          el.classList.remove('lx-reveal', 'lx-in');
          el.style.transitionDelay = '';
        }, 1500);
      });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add('lx-reveal');
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      io.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initReveal();
  });
})();


(function () {
  var ID = 113761560;
  var sec = {};

  setInterval(function () {
    if (document.hidden) return;
    var el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    var card = el && el.closest ? el.closest('.tariff') : null;
    if (!card) return;
    var h = card.querySelector('h3');
    var name = h ? h.textContent.trim() : 'другое';
    sec[name] = (sec[name] || 0) + 1;
  }, 1000);

  function send() {
    if (typeof ym !== 'function' || !Object.keys(sec).length) return;
    ym(ID, 'params', { 'Время на тарифах (сек)': sec });
    sec = {};
  }
  document.addEventListener('visibilitychange', function () { if (document.hidden) send(); });
  window.addEventListener('pagehide', send);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-subscribe, .modern-btn-cta, .zacazat');
    if (!btn || typeof ym !== 'function') return;
    var card = btn.closest('.tariff');
    var h = card ? card.querySelector('h3') : null;
    ym(ID, 'reachGoal', 'zapisatsya', { tarif: h ? h.textContent.trim() : 'другое' });
  });
})();