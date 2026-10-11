const fs = require('fs');

const finder = fs.readFileSync('src/components/FinderWindow/FinderWindow.jsx', 'utf8');

const startIdx = finder.indexOf('const vfsData = {');
const endIdx = finder.indexOf('};\n\n  const vfs =');
const vfsStr = finder.substring(startIdx + 'const vfsData = '.length, endIdx + 1);

// We want to keep the source paths exactly as they are in the JS.
// But we need to parse them.
// Let's use a regex to parse out all collections starting with mcdonalds_
let collections = {};

const pattern = /'([^']+)'\s*:\s*\[([\s\S]*?)\]/g;
let match;
while ((match = pattern.exec(vfsStr)) !== null) {
    const key = match[1];
    if (key.startsWith('mcdonalds_') || key === 'tvc' || key === 'crispy' || key === 'mcdonalds') {
        const arrStr = match[2];
        const items = [];
        const itemPattern = /\{\s*([^}]+)\s*\}/g;
        let itemMatch;
        while ((itemMatch = itemPattern.exec(arrStr)) !== null) {
            const propsStr = itemMatch[1];
            if (propsStr.includes('src:')) {
                const idMatch = propsStr.match(/id:\s*'([^']+)'/);
                const nameMatch = propsStr.match(/name:\s*`([^`]+)`/);
                const typeMatch = propsStr.match(/type:\s*'([^']+)'/);
                const srcMatch = propsStr.match(/src:\s*(import\.meta\.env\.BASE_URL\s*\+\s*`[^`]+`)/);
                
                if (idMatch && nameMatch && srcMatch) {
                    items.push({
                        id: idMatch[1],
                        name: nameMatch[1],
                        type: typeMatch ? typeMatch[1] : 'image-viewer',
                        srcRaw: srcMatch[1]
                    });
                }
            }
        }
        if (items.length > 0) {
            collections[key] = items;
        }
    }
}

let out_str = "const COLLECTIONS = {\n";
for (const [key, items] of Object.entries(collections)) {
    out_str += `  '${key}': [\n`;
    items.forEach(item => {
        let t = item.type === 'video' ? 'video' : 'image-viewer';
        out_str += `    { id: '${item.id}', name: \`${item.name}\`, type: '${t}', src: ${item.srcRaw} },\n`;
    });
    out_str += "  ],\n";
}

out_str += `  '7days': [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/06:11:25.jpg', name: '06:11:25.jpg', type: 'image-viewer' },
    { id: 'film', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/7DAYSBRIEF_2025_Video mai pubblicato.mp4', name: '7DAYSBRIEF_2025_Video mai pubblicato.mp4', type: 'video' }
  ],
  iliad: [
    { id: 'tvc', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_Benvenuta, Megan!.mp4', name: 'Poche cose sono per sempre_Benvenuta, Megan!.mp4', type: 'video' }
  ],
  orosaiwa: [
    { id: 'orosaiwa_tvc', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/La TUA colazione ogni giorno_2026.mp4', name: 'La TUA colazione ogni giorno_2026.mp4', type: 'video' }
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
};`;

let iv = fs.readFileSync('src/components/ImageViewer/ImageViewer.jsx', 'utf8');
const start_iv = iv.indexOf('const COLLECTIONS = {');
const end_iv = iv.indexOf('};\n\nexport default function ImageViewer');

iv = iv.substring(0, start_iv) + out_str + iv.substring(end_iv + 1);

fs.writeFileSync('src/components/ImageViewer/ImageViewer.jsx', iv);
console.log('DONE');
