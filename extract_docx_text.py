import zipfile, re
files = [r'assets\Template surat undangan.docx', r'assets\Template SURAT PERMOHONAN.docx', r'assets\template surat izin.docx']
for f in files:
    print('---', f)
    with zipfile.ZipFile(f) as z:
        xml = z.read('word/document.xml').decode('utf-8')
    texts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', xml)
    print('\n'.join(texts[:200]))
    print('...')
