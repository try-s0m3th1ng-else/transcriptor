#!/usr/bin/env python3
"""Construye el transcriptor a partir de parser.js y page.html.

Uso: python3 build.py [carpeta_salida]
Genera en la carpeta de salida:
  - index.html        -> la web publicada (GitHub Pages)
  - version.json      -> versión publicada; la página abierta la consulta para avisar de que hay una nueva
  - transcriptor.html -> copia para descargar y abrir sin conexión
  - transcriptor-artifact.html -> versión para el artifact de Claude
La versión sale de VERSION y la URL de reportes de report_url.txt (si existe).
"""
import os, sys, re, json
d = os.path.dirname(os.path.abspath(__file__))
rd = lambda n: open(os.path.join(d, n), encoding='utf-8').read()
version = rd('VERSION').strip()
url_file = os.path.join(d, 'report_url.txt')
report_url = open(url_file, encoding='utf-8').read().strip() if os.path.exists(url_file) else ''
page = (rd('page.html').replace('/*PARSER*/', rd('parser.js'))
        .replace('/*VERSION*/', version).replace('/*REPORT_URL*/', report_url))
out_dir = sys.argv[1] if len(sys.argv) > 1 else d
w = lambda n, t: open(os.path.join(out_dir, n), 'w', encoding='utf-8').write(t)
w('transcriptor-artifact.html', page)
# La web y el archivo local no piden fuentes a Google (usan las del sistema).
page = re.sub(r'<link[^>]+fonts\.googleapis\.com[^>]*>\n?', '', page)
local = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
         '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
         # Lista blanca de conexiones: aunque alguien cambiara el código, el navegador solo deja hablar
         # con esta misma web (version.json) y con Google Apps Script (reportes).
         '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; '
         'style-src \'unsafe-inline\'; img-src data:; connect-src \'self\' https://script.google.com '
         'https://script.googleusercontent.com; form-action \'none\'; base-uri \'none\'">\n'
         '<meta name="referrer" content="no-referrer">\n</head>\n<body>\n' + page + '\n</body>\n</html>\n')
w('transcriptor.html', local)
w('index.html', local)
w('version.json', json.dumps({'version': version}) + '\n')
print('v%s construido en %s (reportes: %s)' % (version, out_dir, report_url or 'sin configurar'))
