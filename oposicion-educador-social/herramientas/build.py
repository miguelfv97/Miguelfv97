# Uso: python3 build.py fuente.md salida.pdf "Cabecera"
import sys, markdown, subprocess, os, re, json
src, out, head = sys.argv[1], sys.argv[2], sys.argv[3]
md = open(src, encoding='utf-8').read()
# bloques ::: clase ... :::
def boxes(t):
    return re.sub(r'^:::\s*(\w+)\s*(.*?)\n([\s\S]*?)^:::\s*$',
        lambda m: f'<div markdown="1" class="box {m.group(1)}"><div class="boxt">{m.group(2)}</div>\n\n{m.group(3)}\n</div>', t, flags=re.M)
md = boxes(md)
body = markdown.markdown(md, extensions=['tables','sane_lists','md_in_html','attr_list'])

css = open(os.path.join(os.path.dirname(__file__),'style.css')).read()
html = f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{css}</style></head><body>{body}</body></html>'
hp = out.replace('.pdf','.html'); open(hp,'w',encoding='utf-8').write(html)
js = f"""
const {{ chromium }} = require('playwright');
(async () => {{
 const b = await chromium.launch(); const p = await b.newPage();
 await p.goto('file://{os.path.abspath(hp)}');
 await p.pdf({{ path: {json.dumps(out)}, format: 'A4', printBackground: true,
  margin: {{ top: '22mm', bottom: '20mm', left: '20mm', right: '18mm' }},
  displayHeaderFooter: true,
  headerTemplate: `<div style="font-family:Inter,sans-serif;font-size:7.5pt;color:#777;width:100%;padding:0 18mm 0 20mm;display:flex;justify-content:space-between"><span>Educador/a Social · Ayto. de Murcia</span><span>{head}</span></div>`,
  footerTemplate: `<div style="font-family:Inter,sans-serif;font-size:7.5pt;color:#777;width:100%;text-align:center">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>` }});
 await b.close(); }})();
"""
subprocess.run(['node','-e',js],check=True, cwd='/tmp')
os.remove(hp)
print('ok', out)
