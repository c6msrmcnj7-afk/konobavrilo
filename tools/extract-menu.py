#!/usr/bin/env python3
"""Best-effort text extraction for the Konoba Vrilo menu PDF.

The menu is a Canva-style export: content streams draw with Type0 subset fonts
and show text only as hex strings, so plain `strings`/regex finds nothing.
This script maps each font through its /ToUnicode CMap, decodes the hex text
operators, and regroups fragments into visual lines by their text-matrix
position. Usage: python3 extract-menu.py <menu.pdf>
"""
import re
import sys
import zlib
from collections import defaultdict

src = sys.argv[1]
data = open(src, "rb").read()

# ---------------------------------------------------------------- objects ---
objects = {}
for m in re.finditer(rb"(\d+)\s+0\s+obj(.*?)endobj", data, re.S):
    objects[int(m.group(1))] = m.group(2)


def stream_of(body):
    m = re.search(rb"stream\r?\n(.*?)\r?\nendstream", body, re.S)
    if not m:
        return None
    raw = m.group(1)
    if b"/FlateDecode" in body:
        try:
            return zlib.decompress(raw)
        except Exception:
            try:
                return zlib.decompressobj().decompress(raw)
            except Exception:
                return None
    return raw


def parse_tounicode(cmap_bytes):
    table = {}
    for block in re.findall(rb"beginbfchar(.*?)endbfchar", cmap_bytes, re.S):
        for src_hex, dst_hex in re.findall(rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", block):
            code = int(src_hex, 16)
            text = "".join(
                chr(int(dst_hex[i : i + 4], 16)) for i in range(0, len(dst_hex), 4)
            )
            table[code] = text
    for block in re.findall(rb"beginbfrange(.*?)endbfrange", cmap_bytes, re.S):
        for lo, hi, dst in re.findall(
            rb"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", block
        ):
            start, end = int(lo, 16), int(hi, 16)
            base = int(dst, 16)
            for offset in range(end - start + 1):
                table[start + offset] = chr(base + offset)
    return table


# font object -> cmap
font_cmaps = {}
for num, body in objects.items():
    m = re.search(rb"/ToUnicode\s+(\d+)\s+0\s+R", body)
    if m:
        cmap_stream = stream_of(objects.get(int(m.group(1)), b""))
        if cmap_stream:
            font_cmaps[num] = parse_tounicode(cmap_stream)

# resource name (/F8) -> cmap, via every /Font << ... >> dictionary
name_to_cmap = {}
for body in objects.values():
    for fontdict in re.findall(rb"/Font\s*<<(.*?)>>", body, re.S):
        for name, num in re.findall(rb"/([A-Za-z0-9]+)\s+(\d+)\s+0\s+R", fontdict):
            cmap = font_cmaps.get(int(num))
            if cmap:
                name_to_cmap[name.decode()] = cmap

print(f"# fonts with cmaps: {len(font_cmaps)}  resource names: {sorted(name_to_cmap)}", file=sys.stderr)

# -------------------------------------------------------------- contents ---
TOKEN = re.compile(
    rb"/([A-Za-z0-9]+)\s+[\d.]+\s+Tf"          # font selection
    rb"|([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+Tm"  # text matrix
    rb"|([-\d.]+)\s+([-\d.]+)\s+(?:Td|TD)"     # relative move
    rb"|<([0-9A-Fa-f]+)>\s*Tj"                 # hex string
    rb"|\[(.*?)\]\s*TJ"                        # array of strings
    rb"|(T\*)"                                 # next line
)

pages = []
for num in sorted(objects):
    body = objects[num]
    if b"/Contents" in body and b"/Type" in body and b"/Page" in body:
        m = re.search(rb"/Contents\s+(\d+)\s+0\s+R", body)
        if m:
            pages.append(int(m.group(1)))
if not pages:  # fall back: every big deflated stream that draws text
    pages = [
        n
        for n, b in objects.items()
        if b"BT" in (stream_of(b) or b"")
    ]

for page_index, obj in enumerate(pages, 1):
    content = stream_of(objects.get(obj, b"")) or b""
    cmap = None
    x = y = 0.0
    fragments = []
    for m in TOKEN.finditer(content):
        if m.group(1):
            cmap = name_to_cmap.get(m.group(1).decode())
        elif m.group(2) is not None:
            x, y = float(m.group(6)), float(m.group(7))
        elif m.group(8) is not None:
            x += float(m.group(8))
            y += float(m.group(9))
            fragments.append((y, x, "\n"))
        elif m.group(10):
            hexstr = m.group(10)
            if cmap:
                text = ""
                for i in range(0, len(hexstr) - 1, 4):
                    code = int(hexstr[i : i + 4], 16)
                    text += cmap.get(code, "")
                if text:
                    fragments.append((y, x, text))
        elif m.group(11) is not None:
            parts = re.findall(rb"<([0-9A-Fa-f]+)>", m.group(11))
            if cmap and parts:
                text = ""
                for p in parts:
                    for i in range(0, len(p) - 1, 4):
                        code = int(p[i : i + 4], 16)
                        text += cmap.get(code, "")
                if text:
                    fragments.append((y, x, text))
        elif m.group(12):
            fragments.append((y, x, "\n"))

    # regroup into visual lines: same rounded y, ordered by x
    lines = defaultdict(list)
    for fy, fx, text in fragments:
        if text == "\n":
            continue
        lines[round(fy / 3.0)].append((fx, text))
    print(f"\n===== PAGE {page_index} =====")
    for key in sorted(lines):
        row = "  ".join(t for _, t in sorted(lines[key]))
        row = re.sub(r"\s{2,}", "  ", row).strip()
        if row:
            print(row)
