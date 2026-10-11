const fs = require('fs');

const mcdVfsStr = fs.readFileSync('mcd_vfs.txt', 'utf8');

const finderPath = 'src/components/FinderWindow/FinderWindow.jsx';
let finderCode = fs.readFileSync(finderPath, 'utf8');

const startIdx = finderCode.indexOf("'mcdonalds': {");
const endStr = "    },\n    '7days': {";
const endIdx = finderCode.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    finderCode = finderCode.substring(0, startIdx) + mcdVfsStr.trim() + ",\n" + finderCode.substring(endIdx + 5);
    fs.writeFileSync(finderPath, finderCode);
    console.log("Updated FinderWindow.jsx");
} else {
    console.log("Could not find insertion points in FinderWindow.jsx");
}
