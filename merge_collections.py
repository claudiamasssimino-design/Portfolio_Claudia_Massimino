import re

finder_path = "src/components/FinderWindow/FinderWindow.jsx"
with open(finder_path, 'r') as f:
    finder_code = f.read()

start_idx = finder_code.find("const vfsData = {")
end_idx = finder_code.find("};\n\n  const vfs =")

vfs_str = finder_code[start_idx:end_idx+1]

collections = {}

pattern = r"'([^']+)'\s*:\s*(\[[^\]]*\])"
matches = re.finditer(pattern, vfs_str)

for match in matches:
    key = match.group(1)
    arr_str = match.group(2)
    
    if key.startswith('mcd_') or key == 'tvc' or key == 'crispy':
        items = []
        item_matches = re.finditer(r'\{\s*(.*?)\s*\}', arr_str, re.DOTALL)
        for im in item_matches:
            props = im.group(1)
            if 'src:' in props or '"src":' in props:
                id_match = re.search(r'["\']?id["\']?\s*:\s*["\']([^"\']+)["\']', props)
                name_match = re.search(r'["\']?name["\']?\s*:\s*["\']([^"\']+)["\']', props)
                type_match = re.search(r'["\']?type["\']?\s*:\s*["\']([^"\']+)["\']', props)
                # FIX: Match import.meta.env.BASE_URL + `...` or '...' or "..." correctly
                src_match = re.search(r'["\']?src["\']?\s*:\s*(import\.meta\.env\.BASE_URL\s*\+\s*[`][^`]+[`])', props)
                if not src_match:
                     src_match = re.search(r'["\']?src["\']?\s*:\s*(import\.meta\.env\.BASE_URL\s*\+\s*["\'][^"\']+["\'])', props)
                
                if id_match and name_match and src_match:
                    items.append({
                        'id': id_match.group(1),
                        'name': name_match.group(1),
                        'type': type_match.group(1) if type_match else 'image-viewer',
                        'src': src_match.group(1)
                    })
        if items:
            collections[key] = items

out_str = "const COLLECTIONS = {\n"
for key, items in collections.items():
    out_str += f"  '{key}': [\n"
    for item in items:
        out_str += f"    {{ id: '{item['id']}', name: '{item['name']}', type: '{item['type']}', src: {item['src']} }},\n"
    out_str += "  ],\n"

out_str += """  mcdonalds: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy1.png', name: 'crispy1.png', type: 'image-viewer' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy2.png', name: 'crispy2.png', type: 'image-viewer' },
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/crispy3.png', name: 'crispy3.png', type: 'image-viewer' },
    { id: 'v1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Club.mp4', name: 'McD_Crispy_15sec_Club.mp4', type: 'video' },
    { id: 'v2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Corsa.mp4', name: 'McD_Crispy_15sec_Corsa.mp4', type: 'video' },
    { id: 'v3', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Famiglia.mp4', name: 'McD_Crispy_15sec_Famiglia.mp4', type: 'video' },
    { id: 'v4', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/McD_Crispy_15sec_Ufficio.mp4', name: 'McD_Crispy_15sec_Ufficio.mp4', type: 'video' }
  ],
  '7days': [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/06:11:25.jpg', name: '06:11:25.jpg', type: 'image-viewer' }
  ],
  articoli: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Screenshot 2026-09-09 alle 21.54.57.png', name: 'Screenshot 2026-09-09 alle 21.54.57.png', type: 'image-viewer' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Screenshot 2026-09-09 alle 21.55.10.png', name: 'Screenshot 2026-09-09 alle 21.55.10.png', type: 'image-viewer' },
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Screenshot 2026-09-09 alle 21.55.20.png', name: 'Screenshot 2026-09-09 alle 21.55.20.png', type: 'image-viewer' }
  ],
  ped: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_1.png', name: 'WD_PL_1.png', type: 'image-viewer' },
    { id: 'img2', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_2.png', name: 'WD_PL_2.png', type: 'image-viewer' },
    { id: 'img3', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_3.png', name: 'WD_PL_3.png', type: 'image-viewer' },
    { id: 'img4', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/WD_PL_4.png', name: 'WD_PL_4.png', type: 'image-viewer' }
  ],
  pastelli: [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/Prima di Photoshop usavo i pastelli.png', name: 'Prima di Photoshop usavo i pastelli.png', type: 'image-viewer' }
  ]
};
"""

iv_path = "src/components/ImageViewer/ImageViewer.jsx"
with open(iv_path, 'r') as f:
    iv_code = f.read()

start_iv = iv_code.find("const COLLECTIONS = {")
end_iv = iv_code.find("};\n\nexport default function ImageViewer")

iv_code = iv_code[:start_iv] + out_str + iv_code[end_iv+2:]

with open(iv_path, 'w') as f:
    f.write(iv_code)

print("MERGED UNIFIED COLLECTIONS FIXED")
