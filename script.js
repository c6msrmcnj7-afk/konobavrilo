/* Konoba Vrilo — interakcije: sticky header, mobilna navigacija,
   reveal-on-scroll i lightbox za galeriju. Bez ovisnosti. */
(function () {
  'use strict';

  /* ---------- godina u footeru ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- header: promjena stanja pri skrolanju ---------- */
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobilna navigacija ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealables.forEach(function (el, index) {
      el.style.transitionDelay = (index % 4) * 90 + 'ms';
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- video: click-to-play ----------
     Dok gost ne klikne, učitava se samo lokalna naslovnica — YouTube (ili bilo
     koji drugi player) dolazi na stranicu tek tada. Adresa za ugrađivanje čita
     se iz CSS varijable --embed-domain, uz provjeru da je YouTube. */
  var embedDomain = function () {
    var value = '';
    try {
      value = getComputedStyle(document.documentElement)
        .getPropertyValue('--embed-domain').replace(/["'\s]/g, '');
    } catch (error) {
      value = '';
    }
    return /^https:\/\/(www\.)?(youtube|youtube-nocookie)\.com$/.test(value)
      ? value
      : 'https://www.youtube-nocookie.com';
  };

  var videoSrc = function (id) {
    return embedDomain() + '/embed/' + encodeURIComponent(id) +
      '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
  };

  /* ---------- lightbox: galerija i video (samo na stranicama s lightboxom) ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lbImg');
  var lightboxClose = document.getElementById('lbClose');
  var lbVideo = document.getElementById('lbVideo');
  var lbFrame = lbVideo ? lbVideo.querySelector('iframe') : null;

  var closeLightbox = function () {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    lightboxImg.hidden = false;
    if (lbFrame) lbFrame.src = '';
    if (lbVideo) lbVideo.hidden = true;
  };

  var openVideo = function (id, title) {
    if (!lbVideo || !lbFrame) return false;
    lightboxImg.hidden = true;
    lightboxImg.src = '';
    lbFrame.title = title || 'Video';
    lbFrame.src = videoSrc(id);
    lbVideo.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    return true;
  };

  if (lightbox && lightboxImg && lightboxClose) {
    var openImage = function (src, alt) {
      if (lbVideo) lbVideo.hidden = true;
      if (lbFrame) lbFrame.src = '';
      lightboxImg.hidden = false;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    document.querySelectorAll('.g-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        openImage(item.dataset.full || img.src, img ? img.alt : '');
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  /* svaka naslovnica videa: klik otvara lightbox ili ugrađuje player na mjesto */
  Array.prototype.forEach.call(document.querySelectorAll('.video-facade'), function (facade) {
    var button = facade.querySelector('.video-play');
    var id = facade.dataset.yt;
    if (!button || !id) return;

    button.addEventListener('click', function () {
      if (openVideo(id, facade.dataset.ytTitle)) return;

      var embed = document.createElement('div');
      embed.className = 'video-embed';
      var frame = document.createElement('iframe');
      frame.src = videoSrc(id);
      frame.title = facade.dataset.ytTitle || 'Video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.setAttribute('loading', 'lazy');
      embed.appendChild(frame);
      facade.appendChild(embed);
      button.parentNode.removeChild(button);
    });
  });

  /* ---------- aktivna sekcija u navigaciji (samo na početnoj) ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a:not(.nav-cta)'));

  var currentHash = function (link) {
    var href = link.getAttribute('href') || '';
    var i = href.lastIndexOf('#');
    return i === -1 ? '' : href.slice(i + 1);
  };

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.style.opacity = currentHash(link) === entry.target.id ? '1' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- sadržaj članka: aktivni naslov u bočnoj traci ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.aside-toc a'));
  var postHeadings = tocLinks
    .map(function (link) { return document.getElementById(currentHash(link)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && postHeadings.length) {
    var tocSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (link) {
          link.classList.toggle('is-current', currentHash(link) === entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    postHeadings.forEach(function (heading) { tocSpy.observe(heading); });
  }
})();
