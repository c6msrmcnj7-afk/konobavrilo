#!/usr/bin/env python3
"""Generira HR/EN/DE/IT blok za i18n.js iz translations.tsv.

  translations.tsv:  key<TAB>en<TAB>de<TAB>it

Hrvatski se čita iz HTML-a (izvor istine). Ako se hrvatski u HTML-u promijeni,
a prijevod ne, `check` to prijavi.
"""
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
import importlib.util
spec = importlib.util.spec_from_file_location('i18n', os.path.join(ROOT, 'tools', 'i18n.py'))
T = importlib.util.module_from_spec(spec)
spec.loader.exec_module(T)

LANGS = ('en', 'de', 'it')


def key_for(text):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:10]


def hr_sources():
    """key -> hrvatski tekst (tekst + atributi + title/meta)."""
    out = {}
    for page in T.PAGES:
        html = open(os.path.join(ROOT, page), encoding='utf-8').read()
        body = html[html.find('<body'):]
        for k in re.findall(r'data-i18n="([^"]*)"', html):
            pass
        for a, b in T.units(body):
            inner = T.compact(body[a:b])
            if inner:
                out[key_for(inner)] = inner
        for a, v in T.attr_strings(body):
            out[key_for(v)] = v
        # oznake u <head> (title, meta) — hrvatski je u HTML-u
        for attr in ('data-i18n-title', 'data-i18n-desc', 'data-i18n-desc-og', 'data-i18n-title-og'):
            for m in re.finditer(attr + r'="([^"]*)"', html):
                key = m.group(1)
                if attr == 'data-i18n-title':
                    t = re.search(r'<title[^>]*>(.*?)</title>', html, re.S)
                    if t:
                        out[key] = T.compact(t.group(1))
                else:
                    prop = ('description' if attr == 'data-i18n-desc'
                            else 'og:title' if attr == 'data-i18n-title-og' else 'og:description')
                    mt = re.search(r'<meta\s+(?:name|property)="' + re.escape(prop)
                                   + r'"\s+content="([^"]*)"', html)
                    if mt:
                        out[key] = T.compact(mt.group(1))
    return out


def main():
    src = hr_sources()
    path = os.path.join(ROOT, 'translations.tsv')
    rows = []
    for line in open(path, encoding='utf-8'):
        line = line.rstrip('\n')
        if not line.strip() or line.startswith('#'):
            continue
        parts = line.split('\t')
        if len(parts) != 4:
            print(f'PRESKAČEM (očekujem 4 kolone): {line[:70]}')
            continue
        rows.append(parts)

    have = {r[0] for r in rows}
    missing = sorted(set(src) - have)
    if missing:
        print(f'\nNEDOSTAJE PRIJEVOD za {len(missing)} ključeva:')
        for k in missing:
            print(f'  {k}\t{src[k][:90]}')

    blocks = []
    for key, en, de, it in rows:
        hr = src.get(key, '')
        esc = lambda t: t.replace('\\', '\\\\').replace("'", "\\'")
        blocks.append(
            f"    '{key}': {{\n"
            f"      hr: '{esc(hr)}',\n"
            f"      en: '{esc(en)}',\n"
            f"      de: '{esc(de)}',\n"
            f"      it: '{esc(it)}'\n"
            f"    }}"
        )

    out = 'var I18N = {\n' + ',\n'.join(blocks) + '\n  };'
    open(os.path.join(ROOT, '.dict.tmp.js'), 'w', encoding='utf-8').write(out)
    print(f'\nzapisano {len(rows)} unosa u .dict.tmp.js')
    return 1 if missing else 0


if __name__ == '__main__':
    sys.exit(main())
