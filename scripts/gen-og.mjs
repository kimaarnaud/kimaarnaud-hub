// Régénère public/og.png (1200×630) depuis public/og.svg.
// Usage : npm run og   — à relancer après toute modification de og.svg.
import sharp from 'sharp';

await sharp('public/og.svg', { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile('public/og.png');

const meta = await sharp('public/og.png').metadata();
console.log(`og.png: ${meta.width}x${meta.height}`);
