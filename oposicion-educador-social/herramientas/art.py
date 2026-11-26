import re,sys
t=open(sys.argv[1]).read()
for a in sys.argv[3:]:
    ms=list(re.finditer(r'\nArtículo '+re.escape(a)+r'(?:\.|\n| )[\s\S]*?(?=\nArtículo \d|\nSubir|\Z)',t))
    s=max((m.group(0) for m in ms),key=len) if ms else 'NOT FOUND'
    s=re.sub(r'\n\s*(Se modifica|Se añade|Se suprime|Se dota|Seleccionar redacción|Modificación publicada|Texto original|Redacción anterior|Téngase en cuenta|Última actualización|\[Bloque)[^\n]*','',s)
    print('=== art',a, s[:int(sys.argv[2])].strip(),'\n')
