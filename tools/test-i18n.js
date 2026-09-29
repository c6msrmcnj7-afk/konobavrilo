const { JSDOM } = require('jsdom');
const fs = require('fs');

process.chdir(require('path').join(__dirname,'..'));
const pages = ['index.html','blog/index.html','blog/neretvanski-brudet.html','blog/konoba-vrilo-u-medijima.html'];
const runtime = fs.readFileSync('i18n.js','utf8');
let fail = 0;

for (const page of pages) {
  const html = fs.readFileSync(page,'utf8');
  for (const lang of ['hr','en','de','it']) {
    const dom = new JSDOM(html, { url: 'https://example.test/' + page + '?lang=' + lang, runScripts: 'outside-only' });
    const w = dom.window;
    try { w.eval(runtime); } catch (e) { console.log('GREŠKA', page, lang, e.message); fail++; continue; }

    // simuliraj kraj parsiranja (u pregledniku ovo radi sam)
    w.document.dispatchEvent(new w.Event('DOMContentLoaded', { bubbles: true }));
    if (w.VriloI18n) w.VriloI18n.setLang(lang);

    const d = w.document;
    const problems = [];
    if (d.documentElement.lang !== lang) problems.push('html lang=' + d.documentElement.lang);

    // svaka oznaka mora biti prevedena (osim ako je hrvatski)
    const nodes = d.querySelectorAll('[data-i18n]');
    let untranslated = 0;
    nodes.forEach(n => {
      const key = n.getAttribute('data-i18n');
      const entry = w.VriloI18n.dict[key];
      if (!entry) { problems.push('nema ključ ' + key); return; }
      const expected = entry[lang];
      if (lang !== 'hr' && n.innerHTML.trim() !== expected.trim()) untranslated++;
    });
    if (untranslated) problems.push(untranslated + ' neprevedenih tekstova');

    const attrs = d.querySelectorAll('[data-i18n-attr]');
    let badAttr = 0;
    attrs.forEach(n => {
      n.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        const entry = w.VriloI18n.dict[key];
        if (!entry) { problems.push('nema ključ ' + key); return; }
        if (lang !== 'hr' && n.getAttribute(attr) !== entry[lang]) badAttr++;
      });
    });
    if (badAttr) problems.push(badAttr + ' atributa bez prijevoda');

    const sw = d.querySelectorAll('.lang-switch');
    if (!sw.length) problems.push('nema prekidača jezika');
    const active = d.querySelectorAll('.lang-switch button.is-active');
    if (active.length !== sw.length) problems.push('aktivan gumb: ' + active.length + '/' + sw.length);

    const titleOk = lang === 'hr' ? true : (w.document.title === w.VriloI18n.dict[d.querySelector('[data-i18n-title]').getAttribute('data-i18n-title')][lang]);
    if (!titleOk) problems.push('title: ' + w.document.title);

    if (problems.length) { fail++; console.log('FAIL', page, lang, '->', problems.slice(0,4).join(' | ')); }
    else console.log('OK  ', page.padEnd(40), lang, '| gumbi:', sw.length, '| title:', w.document.title.slice(0,50));
    w.close();
  }
}
console.log(fail ? '\n' + fail + ' kombinacija s problemima' : '\nSVE KOMBINACIJE PROLAZE');
