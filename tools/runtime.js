/* ==========================================================================
   Konoba Vrilo — visejezicnost (HR / EN / DE / IT)
   --------------------------------------------------------------------------
   Hrvatski je izvor i nalazi se u HTML-u. Ostali jezici zive u I18N rjecniku
   ispod, pod kljucem iz data-i18n oznake (kljuc = hash hrvatskog teksta).

   Kako dodati ili promijeniti tekst:
     1. uredi hrvatski tekst u HTML-u
     2. python3 tools/i18n.py apply     # upise oznake (idempotentno)
     3. python3 tools/i18n.py check     # kaze koji kljuc nema prijevod
     4. upisi prijevod u tools/translations.tsv i pokreni:
        python3 tools/gen_dict.py && python3 tools/make_i18n.py

   Jezik se pamti u localStorage i u URL-u (?lang=en), pa je svaka jezicna
   verzija dijeljiva linkom. Bez JavaScripta stranica ostaje na hrvatskom.
   ========================================================================== */
(function () {
  'use strict';

  var I18N = {};

  var STORAGE_KEY = 'vrilo-lang';
  var DEFAULT_LANG = 'hr';
  var LANGS = ['hr', 'en', 'de', 'it'];

  var docTitle = document.title;

  /* vrati prijevod za kljuc i jezik, ili null ako ga nema */
  var t = function (key, lang) {
    var entry = I18N[key];
    if (!entry) return null;
    var value = entry[lang];
    return value === undefined || value === null ? null : value;
  };

  /* --------------------------------------------------------- jezik u URL-u */
  var readUrlLang = function () {
    var match = /[?&]lang=(hr|en|de|it)\b/i.exec(window.location.search);
    return match ? match[1].toLowerCase() : null;
  };

  var readStoredLang = function () {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return LANGS.indexOf(value) !== -1 ? value : null;
    } catch (error) {
      return null;
    }
  };

  var storeLang = function (lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (error) { /* ignoriraj */ }
  };

  var activeLang = readUrlLang() || readStoredLang() || DEFAULT_LANG;

  /* ------------------------------------------------------- primjena jezika */
  var translateNodes = function (root, lang) {
    var nodes = root.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (node) {
      var key = node.getAttribute('data-i18n');
      if (lang === 'hr') {
        if (node.dataset.i18nHr !== undefined) {
          node.innerHTML = node.dataset.i18nHr;
        }
        return;
      }
      var value = t(key, lang);
      if (value === null) return;
      if (node.dataset.i18nHr === undefined) node.dataset.i18nHr = node.innerHTML;
      node.dataset.i18nKey = key;
      node.innerHTML = value;
    });
  };

  var translateAttrs = function (root, lang) {
    var nodes = root.querySelectorAll('[data-i18n-attr]');
    Array.prototype.forEach.call(nodes, function (node) {
      node.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        var attr = (bits[0] || '').trim();
        var key = (bits[1] || '').trim();
        if (!attr || !key) return;
        var store = 'i18nHr' + attr.replace(/[^a-z]/gi, '');
        if (lang === 'hr') {
          if (node.dataset[store] !== undefined) node.setAttribute(attr, node.dataset[store]);
          return;
        }
        var value = t(key, lang);
        if (value === null) return;
        if (node.dataset[store] === undefined) node.dataset[store] = node.getAttribute(attr) || '';
        node.setAttribute(attr, value);
      });
    });
  };

  /* engleski naslov kartice i meta opis */
  var translateHead = function (lang) {
    var titleEl = document.querySelector('[data-i18n-title]');
    var descEl = document.querySelector('[data-i18n-desc]');
    var ogDesc = document.querySelector('[data-i18n-desc-og]');
    var ogTitle = document.querySelector('[data-i18n-title-og]');

    if (titleEl) {
      var tk = titleEl.getAttribute('data-i18n-title');
      if (lang === 'hr') { document.title = docTitle; }
      else { var tv = t(tk, lang); if (tv !== null) document.title = tv; }
    }
    [[descEl, 'data-i18n-desc'], [ogDesc, 'data-i18n-desc-og'], [ogTitle, 'data-i18n-title-og']]
      .forEach(function (pair) {
        var el = pair[0], attr = pair[1];
        if (!el) return;
        var key = el.getAttribute(attr);
        if (lang === 'hr') {
          if (el.dataset.i18nHrContent !== undefined) el.setAttribute('content', el.dataset.i18nHrContent);
          return;
        }
        var value = t(key, lang);
        if (value === null) return;
        if (el.dataset.i18nHrContent === undefined) el.dataset.i18nHrContent = el.getAttribute('content') || '';
        el.setAttribute('content', value);
      });
  };

  var setUrlLang = function (lang) {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  var updateSwitchers = function (lang) {
    Array.prototype.forEach.call(document.querySelectorAll('.lang-switch'), function (box) {
      Array.prototype.forEach.call(box.querySelectorAll('[data-lang]'), function (btn) {
        var on = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  };

  var apply = function (lang) {
    activeLang = lang;
    document.documentElement.lang = lang;
    translateNodes(document, lang);
    translateAttrs(document, lang);
    translateHead(lang);
    updateSwitchers(lang);
    storeLang(lang);
    setUrlLang(lang);
    document.dispatchEvent(new CustomEvent('vrilo:langchange', { detail: { lang: lang } }));
  };

  /* ------------------------------------------------------------- prekidač */
  var buildSwitcher = function () {
    var box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Jezik / Language');
    box.innerHTML = LANGS.map(function (code) {
      return '<button type="button" data-lang="' + code + '" aria-pressed="false">'
        + code.toUpperCase() + '</button>';
    }).join('');
    return box;
  };

  /* Na mobitelu je gornja traka pretijesna za četiri tipke, pa prekidač
     selimo u klizni meni. Na širokom ekranu ostaje u traci. */
  var narrowQuery = window.matchMedia ? window.matchMedia('(max-width: 780px)') : null;
  var headerSwitcher = null;

  var placeHeaderSwitcher = function () {
    var header = document.querySelector('.header-inner');
    var nav = document.querySelector('.nav');
    if (!header || !headerSwitcher) return;
    var target = (narrowQuery && narrowQuery.matches && nav) ? nav : header;
    if (headerSwitcher.parentNode !== target) target.appendChild(headerSwitcher);
  };

  var mountSwitchers = function () {
    headerSwitcher = buildSwitcher();
    placeHeaderSwitcher();
    if (narrowQuery) {
      var relocate = function () { placeHeaderSwitcher(); };
      if (narrowQuery.addEventListener) narrowQuery.addEventListener('change', relocate);
      else if (narrowQuery.addListener) narrowQuery.addListener(relocate);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.footer-nav'), function (nav) {
      if (nav.parentNode.querySelector('.lang-switch')) return;
      nav.parentNode.insertBefore(buildSwitcher(), nav.nextSibling);
    });
  };

  var onSwitchClick = function (event) {
    var btn = event.target.closest ? event.target.closest('[data-lang]') : null;
    if (!btn) return;
    apply(btn.getAttribute('data-lang'));
  };

  document.addEventListener('click', onSwitchClick);

  var boot = function () {
    mountSwitchers();
    apply(activeLang);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.VriloI18n = { setLang: apply, getLang: function () { return activeLang; }, dict: I18N, langs: LANGS };
})();
