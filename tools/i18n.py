#!/usr/bin/env python3
"""Pomocni alat za dvojezicnost (HR/EN).

  python3 tools/i18n.py extract   # ispise sve tekstove koje treba prevesti
  python3 tools/i18n.py check     # provjeri da svaka oznaka ima engleski prijevod
  python3 tools/i18n.py json      # isto, strojno citljivo

Oznake u HTML-u:
  data-i18n="key"                        -> innerHTML elementa
  data-i18n-attr="alt:key;aria-label:k"  -> atributi
  data-i18n-title="key"                  -> <title>
  data-i18n-desc="key"                   -> meta description / og:description

Hrvatski tekst u HTML-u je izvor; engleski zivi u i18n.js.

Algoritam: jednoprolazni skener toka tagova. Svaki element pamti je li sadrzavao
tekst izravno (izvan djece). Kad se zatvori, ako je sadrzavao tekst, njegov se
innerHTML emitira kao jedinica i roditelj se oznaci da je tekst preuzet —
tako nema dupliranja ni gubitka mijesanog sadrzaja.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PAGES = [
    'index.html',
    'blog/index.html',
    'blog/neretvanski-brudet.html',
    'blog/konoba-vrilo-u-medijima.html',
]

ATTR_NAMES = ('alt', 'aria-label', 'title')

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
        'meta', 'param', 'source', 'track', 'wbr'}

SKIP = {'script', 'style', 'svg', 'path', 'circle', 'rect', 'g', 'defs',
        'lineargradient', 'stop', 'pattern', 'clippath', 'ellipse'}

TOKEN = re.compile(r'<!--.*?-->|<(/?)([a-zA-Z][\w-]*)((?:"[^"]*"|\'[^\']*\'|[^>"\'])*?)(/?)>', re.S)


def has_letters(text):
    return re.search(r'[A-Za-zČĆŽŠĐčćžšđ]{2}', text) is not None


def compact(text):
    text = re.sub(r'<!--.*?-->', '', text, flags=re.S)
    return re.sub(r'\s+', ' ', text).strip()


INLINE_SET = {'strong', 'em', 'b', 'i', 'a', 'span', 'br', 'sup', 'sub',
              'small', 'abbr', 'u', 's', 'code', 'time', 'mark', 'wbr'}


def units(html):
    """Vrati raspone (start, end) koje treba prevesti.

    Element je JEDINICA ako sadrži tekst i sva su mu djeca inline
    (npr. <li><span>x</span>Jegulja</li> ili <h1>a<br><em>b</em></h1>).
    Ako je element jedinica, NE ulazi se u njegovu djecu (nema dupliranja).
    Ako nije (npr. <ul>, <div>, <p> s blok-djecom), spušta se na djecu.

    Tekst koji ne pokriva nijedna jedinica (npr. tekst uz <p> blok-dijete)
    rješava se s `prep`, koji ga umata u <span>.
    """
    nodes = []
    stack = []
    pos = 0

    def note_text(start, end):
        chunk = html[start:end]
        if re.search(r'<', chunk) or not has_letters(chunk):
            return
        for node in stack:
            node['own_text'] = True
        stack[-1]['direct_text'] = True

    for m in TOKEN.finditer(html):
        tok = m.group(0)
        if tok.startswith('<!--'):
            pos = m.end()
            continue
        if m.start() > pos:
            note_text(pos, m.start())
        closing, raw_name, attrs, selfclose = m.group(1), m.group(2), m.group(3), m.group(4)
        lname = raw_name.lower()

        if lname in SKIP:
            if not closing:
                stack.append({'name': lname, 'skip': True, 'own_text': False,
                              'block_child': False, 'children': []})
            else:
                for i in range(len(stack) - 1, -1, -1):
                    if stack[i]['name'] == lname:
                        del stack[i:]
                        break
            pos = m.end()
            continue

        if lname in VOID or selfclose:
            pos = m.end()
            continue

        if not closing:
            node = {'name': lname, 'content_start': m.end(), 'skip': False,
                    'own_text': False, 'direct_text': False, 'block_child': False,
                    'children': []}
            stack.append(node)
            nodes.append(node)
            if len(stack) >= 2 and not stack[-2].get('skip'):
                stack[-2]['children'].append(node)
                if lname not in INLINE_SET:
                    stack[-2]['block_child'] = True
        else:
            for i in range(len(stack) - 1, -1, -1):
                if stack[i]['name'] == lname:
                    node = stack.pop(i)
                    del stack[i:]
                    if node.get('skip'):
                        break
                    node['content_end'] = m.start()
                    if stack and not stack[-1].get('skip') and lname not in INLINE_SET:
                        stack[-1]['block_child'] = True
                    break
        pos = m.end()

    roots = [n for n in nodes if not n.get('skip')]

    def base_unit(n):
        if 'content_end' not in n or not n['own_text'] or n['block_child']:
            return False
        inner = html[n['content_start']:n['content_end']]
        return has_letters(re.sub(r'<[^>]+>', '', inner))

    # svi kandidati (za provjeru "sva djeca su jedinice")
    candidate_ids = set(id(n) for n in nodes if base_unit(n))

    def is_unit(n):
        if not base_unit(n):
            return False
        if n['direct_text']:
            return True    # ima vlastiti tekst -> cijeli element je jedna jedinica
        kids = [c for c in n['children'] if not c.get('skip')]
        if kids and all(id(c) in candidate_ids for c in kids):
            return False   # npr. <nav>, <ul>: sav tekst je u djeci -> spusti se
        return True

    out = []

    def walk(n):
        if n.get('skip'):
            return
        if is_unit(n):
            out.append((n['content_start'], n['content_end']))
            return
        for c in n['children']:
            walk(c)

    # kreni od najviših elemenata (bez roditelja)
    child_ids = set()
    for n in nodes:
        for c in n['children']:
            child_ids.add(id(c))
    for n in nodes:
        if id(n) not in child_ids:
            walk(n)
    return sorted(set(out))


def wrap_loose_text(html):
    """Umotaj tekst koji stoji uz blok-djecu u <span data-i18n-loose>.

    Takav se tekst inace izgubi jer roditelj s blok-djetetom nije jedinica.
    Vraca (novi_html, broj_zamjena).
    """
    edits = []
    stack = []
    pos = 0
    for m in TOKEN.finditer(html):
        tok = m.group(0)
        if tok.startswith('<!--'):
            pos = m.end()
            continue
        if m.start() > pos:
            chunk = html[pos:m.start()]
            if has_letters(chunk) and not re.search(r'<', chunk) and stack:
                top = stack[-1]
                if not top.get('inline_only', True):
                    edits.append((pos, m.start()))
        closing, raw_name, attrs, selfclose = m.group(1), m.group(2), m.group(3), m.group(4)
        lname = raw_name.lower()
        if lname in SKIP:
            if not closing:
                stack.append({'name': lname, 'inline_only': True})
            else:
                for i in range(len(stack) - 1, -1, -1):
                    if stack[i]['name'] == lname:
                        del stack[i:]
                        break
            pos = m.end()
            continue
        if lname in VOID or selfclose or closing:
            if closing:
                for i in range(len(stack) - 1, -1, -1):
                    if stack[i]['name'] == lname:
                        del stack[i:]
                        break
            pos = m.end()
            continue
        stack.append({'name': lname, 'inline_only': True})
        if len(stack) >= 2 and lname not in INLINE_SET:
            stack[-2]['inline_only'] = False
        pos = m.end()

    for start, end in reversed(edits):
        chunk = html[start:end]
        lead = chunk[:len(chunk) - len(chunk.lstrip())]
        trail = chunk[len(chunk.rstrip()):]
        core = chunk.strip()
        html = html[:start] + lead + '<span data-i18n-loose>' + core + '</span>' + trail + html[end:]
    return html, len(edits)


def content_key(text):
    """Stabilan ključ iz hrvatskog teksta (dijeljen između stranica).

    Isti tekst -> isti ključ -> jedan prijevod za sve jezike i sve stranice.
    """
    import hashlib
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:10]


def cmd_apply():
    """Upiši data-i18n oznake na otvarajuće tagove. Idempotentno."""
    grand = 0
    for page in PAGES:
        path = os.path.join(ROOT, page)
        html = open(path, encoding='utf-8').read()
        body_start = html.find('<body')
        body = html[body_start:]

        wanted = {}
        for a, b in units(body):
            inner = compact(body[a:b])
            if not inner:
                continue
            wanted[a] = content_key(inner)

        # atributi (alt / aria-label / title) i title/meta stranice
        attr_wanted = {}
        for m in TOKEN.finditer(body):
            if m.group(1) or m.group(0).startswith('<!--'):
                continue
            attrs = m.group(3)
            pairs = []
            for a in ATTR_NAMES:
                mm = re.search(r'(?<![\w-])' + a + r'="([^"]*)"', attrs)
                if mm and has_letters(mm.group(1)):
                    pairs.append((a, content_key(compact(mm.group(1)))))
            if pairs:
                attr_wanted[m.start()] = pairs

        out, pos, added, kept = [], 0, 0, 0
        for m in TOKEN.finditer(body):
            out.append(body[pos:m.start()])
            tok = m.group(0)
            if tok.startswith('<!--'):
                out.append(tok)
                pos = m.end()
                continue
            closing, name, attrs, sc = m.group(1), m.group(2), m.group(3), m.group(4)
            if closing:
                out.append(tok)
            else:
                clean = re.sub(r'\s+data-i18n(?:-attr|-title|-desc)?="[^"]*"', '', attrs)
                key = wanted.get(m.end())
                extra = ''
                if key:
                    extra += f' data-i18n="{key}"'
                    added += 1
                pairs = attr_wanted.get(m.start())
                if pairs:
                    spec = ';'.join(f'{a}:{k}' for a, k in pairs)
                    extra += f' data-i18n-attr="{spec}"'
                if clean != attrs and not extra:
                    kept += 1
                out.append(f'<{name}{clean}{extra}{sc}>')
            pos = m.end()
        out.append(body[pos:])
        head = html[:body_start]

        # <title> i meta description / og:*
        def mark_title(mt):
            if not has_letters(mt.group(1)):
                return mt.group(0)
            key = content_key(compact(mt.group(1)))
            return (f'<title data-i18n-title="{key}">' + mt.group(1) + '</title>')

        head = re.sub(r'<title>(.*?)</title>', mark_title, head, count=1, flags=re.S)

        META_ATTR = {
            'description': 'data-i18n-desc',
            'og:title': 'data-i18n-title-og',
            'og:description': 'data-i18n-desc-og',
        }

        def mark_meta(prop):
            nonlocal head
            pat = re.compile(r'<meta\s+((?:name|property)="' + re.escape(prop)
                             + r'")\s+content="([^"]*)"(\s*/?>)')
            mt = pat.search(head)
            if not mt or not has_letters(mt.group(2)):
                return
            key = content_key(compact(mt.group(2)))
            head = (head[:mt.start()]
                    + f'<meta {mt.group(1)} content="{mt.group(2)}" {META_ATTR[prop]}="{key}"{mt.group(3)}'
                    + head[mt.end():])

        for prop in META_ATTR:
            mark_meta(prop)

        open(path, 'w', encoding='utf-8').write(head + ''.join(out))

        print(f'{page:44} oznaka: {added}  atributa: {sum(len(v) for v in attr_wanted.values())}')
        grand += added
    print('ukupno oznaka:', grand)


def cmd_keys():
    """Ispiši ključ -> hrvatski tekst (referenca za prevođenje)."""
    for page in PAGES:
        html = open(os.path.join(ROOT, page), encoding='utf-8').read()
        body_start = html.find('<body')
        body = html[body_start:]
        print(f'\n## {page}')
        for a, b in units(body):
            inner = compact(body[a:b])
            if inner:
                print(f'{content_key(inner)}\t{inner}')


def cmd_prep():
    for page in PAGES:
        path = os.path.join(ROOT, page)
        html = open(path, encoding='utf-8').read()
        body_start = html.find('<body')
        new_body, n = wrap_loose_text(html[body_start:])
        if n:
            open(path, 'w', encoding='utf-8').write(html[:body_start] + new_body)
        print(f'{page:44} umotano: {n}')


def head_strings(html):
    head = html[:html.find('<body')]
    t = re.search(r'<title>(.*?)</title>', head, re.S)
    out = [('TITLE', compact(t.group(1)) if t else '')]
    for m in re.finditer(r'<meta\s+(?:name|property)="(description|og:title|og:description)"\s+content="([^"]*)"', head):
        out.append((m.group(1).upper(), compact(m.group(2))))
    return out


def attr_strings(body):
    seen, out = set(), []
    for m in re.finditer(r'<([a-zA-Z][\w-]*)((?:"[^"]*"|\'[^\']*\'|[^>])*?)>', body):
        tag, attrs = m.group(1).lower(), m.group(2)
        if tag in ('script', 'style'):
            continue
        for a in ATTR_NAMES:
            mm = re.search(r'(?<![\w-])' + a + r'="([^"]*)"', attrs)
            if mm and has_letters(mm.group(1)):
                v = compact(mm.group(1))
                if (a, v) in seen:
                    continue
                seen.add((a, v))
                out.append((a, v))
    return out


def page_data(page):
    html = open(os.path.join(ROOT, page), encoding='utf-8').read()
    body_start = html.find('<body')
    body = html[body_start:]
    return {
        'head': head_strings(html),
        'texts': [compact(body[a:b]) for a, b in units(body)],
        'attrs': attr_strings(body),
    }


def cmd_extract():
    for page in PAGES:
        d = page_data(page)
        print('\n' + '=' * 100)
        print(page)
        print('=' * 100)
        print('\n--- title / meta ---')
        for k, v in d['head']:
            print(f'{k:16}: {v}')
        print(f'\n--- tekst ({len(d["texts"])}) ---')
        for t in d['texts']:
            print(t if len(t) <= 160 else t[:160] + '...')
        print(f'\n--- atributi ({len(d["attrs"])}) ---')
        for a, v in d['attrs']:
            print(f'{a:12}: {v}')


def cmd_check():
    """Provjeri da svaki ključ iz HTML-a ima prijevod na sva tri strana jezika."""
    import json
    dict_path = os.path.join(ROOT, '.dict.tmp.js')
    if not os.path.exists(dict_path):
        print('Nema .dict.tmp.js — pokreni: python3 tools/gen_dict.py')
        return 1
    src = open(dict_path, encoding='utf-8').read()
    keys = set(re.findall(r"^\s{4}'([^']+)':", src, re.M))

    langs = ('en', 'de', 'it')
    have = {l: set() for l in langs}
    for m in re.finditer(r"^\s{4}'([^']+)': \{(.*?)^\s{4}\}", src, re.M | re.S):
        key, body = m.group(1), m.group(2)
        for l in langs:
            if re.search(r'^\s+' + l + r": '", body, re.M):
                have[l].add(key)

    used = set()
    for page in PAGES:
        html = open(os.path.join(ROOT, page), encoding='utf-8').read()
        for raw in re.findall(r'data-i18n(?:-attr|-title|-desc|-desc-og|-title-og)?="([^"]*)"', html):
            for piece in raw.split(';'):
                k = piece.split(':')[-1].strip()
                if k:
                    used.add(k)

    ok = True
    print(f'ključeva u HTML-u : {len(used)}')
    print(f'ključeva u rječniku: {len(keys)}')
    missing_keys = sorted(used - keys)
    if missing_keys:
        ok = False
        print(f'\nNEMA U RJEČNIKU ({len(missing_keys)}):')
        for k in missing_keys[:20]:
            print('  ', k)
    for l in langs:
        miss = sorted(keys - have[l])
        print(f'{l.upper():>3} prijevoda      : {len(have[l])}/{len(keys)}'
              + (f'  NEDOSTAJE {len(miss)}' if miss else '  OK'))
        if miss:
            ok = False
            for k in miss[:10]:
                print(f'     {l}: {k}')
    extra = keys - used
    if extra:
        print(f'\nNAPOMENA: {len(extra)} ključeva u rječniku se ne koristi u HTML-u.')
    print('\n' + ('SVE OK' if ok else 'IMA NEDOSTATAKA'))
    return 0 if ok else 1


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'extract'
    if cmd == 'extract':
        cmd_extract()
    elif cmd == 'json':
        print(json.dumps({p: page_data(p) for p in PAGES}, ensure_ascii=False, indent=2))
    elif cmd == 'apply':
        cmd_apply()
    elif cmd == 'keys':
        cmd_keys()
    elif cmd == 'prep':
        cmd_prep()
    elif cmd == 'check':
        sys.exit(cmd_check())
    else:
        print(__doc__)
        sys.exit(2)
