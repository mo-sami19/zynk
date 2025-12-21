const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'public', 'zynk.png');
const outputDir = path.join(__dirname, 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicons from zynk.png...');
  
  for (const { name, size } of sizes) {
    const outputPath = path.join(outputDir, name);
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`✓ Created ${name}`);
  }

  // Generate favicon.ico (multi-size)
  const icoPath = path.join(outputDir, 'favicon.ico');
  await sharp(inputFile)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(icoPath);
  console.log('✓ Created favicon.ico');
  
  console.log('\n✅ All favicon files generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Upload all generated files to your server\'s public/ directory');
  console.log('2. Run the .htaccess fix');
  console.log('3. Purge Cloudflare cache');
}

generateFavicons().catch(console.error);
