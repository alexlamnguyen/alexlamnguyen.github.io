// Pixel-preserving composition: embed the original PNG and rearrange crops only.
// Run from the repository root: node scripts/arrange-pll.cjs
const fs = require('node:fs');
const png = fs.readFileSync('assets/pll-schem.png');
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1116 || height !== 775) throw new Error('Source dimensions changed; review crop coordinates.');
const source = `data:image/png;base64,${png.toString('base64')}`;
// Overlap at boundaries preserves labels and connections across panels.
const panels = [
  { y: 0, height: 120, label: 'Decoupling' },
  { y: 110, height: 490, label: 'PLL, reference clock and control' },
  { y: 575, height: 200, label: 'Power and connectors' }
];
let top = 24;
const content = panels.map(panel => {
  const markup = `<svg x="24" y="${top}" width="1116" height="${panel.height}" viewBox="0 ${panel.y} 1116 ${panel.height}" overflow="hidden" aria-label="${panel.label}"><image width="1116" height="775" href="${source}"/></svg>`;
  top += panel.height + 24;
  return markup;
}).join('\n');
fs.writeFileSync('assets/pll-schem-collage.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="1164" height="${top}" viewBox="0 0 1164 ${top}"><title>PLL schematic arranged in three overlapping panels</title><rect width="100%" height="100%" fill="#fafaf8"/>${content}</svg>\n`);
