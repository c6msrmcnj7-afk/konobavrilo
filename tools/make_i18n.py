#!/usr/bin/env python3
"""Sastavlja i18n.js: rječnik (.dict.tmp.js) + runtime (tools/runtime.js).

Pokreni nakon gen_dict.py:
    python3 tools/gen_dict.py && python3 tools/make_i18n.py
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dict_js = open(os.path.join(ROOT, '.dict.tmp.js'), encoding='utf-8').read()
runtime = open(os.path.join(ROOT, 'tools', 'runtime.js'), encoding='utf-8').read()

start = dict_js.index('var I18N = {')
body = dict_js[start:].replace('var I18N = {', '  var I18N = {', 1)
body = '\n'.join(('  ' + l if l.strip() and not l.startswith('  var I18N') else l)
                 for l in body.split('\n'))

out = runtime.replace('  var I18N = {};', body)
open(os.path.join(ROOT, 'i18n.js'), 'w', encoding='utf-8').write(out)
print('i18n.js sastavljen')
