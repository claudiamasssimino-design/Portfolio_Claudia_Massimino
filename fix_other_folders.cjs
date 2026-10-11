const fs = require('fs');

const ivPath = 'src/components/ImageViewer/ImageViewer.jsx';
let ivCode = fs.readFileSync(ivPath, 'utf8');

// Replace the old hardcoded 7days, iliad, orosaiwa, articoli, ped, pastelli collections
// We will just find '7days': [ ... ] all the way to pastelli: [ ... ] }; and replace it.
const startIdx = ivCode.indexOf("  '7days': [");
const endIdx = ivCode.indexOf("};\n\nexport default function ImageViewer");

if (startIdx !== -1 && endIdx !== -1) {
    const newCols = `  '7days_abbiamo_vinto': [
    { id: 'img1', src: import.meta.env.BASE_URL + 'FOTO PORTFOLIO/06:11:25.jpg', name: '06:11:25.jpg', type: 'image-viewer' }
  ],
  '7days_film': [
    { id: 'film', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/7DAYSBRIEF_2025_Video mai pubblicato.mp4', name: '7DAYSBRIEF_2025_Video mai pubblicato.mp4', type: 'video' }
  ],
  'iliad': [
    { id: 'i1', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_Benvenuta, Megan!.mp4', name: 'Poche cose sono per sempre_Benvenuta, Megan!.mp4', type: 'video' },
    { id: 'i2', src: import.meta.env.BASE_URL + 'TVC PORTFOLIO/Poche cose sono per sempre_parlano i fatti.mp4', name: 'Poche cose sono per sempre_parlano i fatti.mp4', type: 'video' }
  ],
  'orosaiwa': [
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
`;
    ivCode = ivCode.substring(0, startIdx) + newCols + ivCode.substring(endIdx);
    fs.writeFileSync(ivPath, ivCode);
}
