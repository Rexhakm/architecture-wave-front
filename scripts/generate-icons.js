const fs = require('fs');
const path = require('path');

// Icon sizes we need to generate
const iconSizes = [
  16, 32, 72, 96, 128, 144, 152, 192, 384, 512
];

// Create icon based on the actual Architecture Wave logo design
function createArchitectureWaveIcon(size) {
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#E2E2E2"/>
  
  <!-- Top shape - inverted V / upward arrow -->
  <path d="M${size*0.25} ${size*0.35} L${size*0.5} ${size*0.15} L${size*0.75} ${size*0.35}" 
        stroke="#111111" 
        stroke-width="${size*0.08}" 
        fill="none" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
  
  <!-- Bottom shape - stylized W -->
  <path d="M${size*0.2} ${size*0.45} L${size*0.35} ${size*0.65} L${size*0.5} ${size*0.45} L${size*0.65} ${size*0.65} L${size*0.8} ${size*0.45}" 
        stroke="#111111" 
        stroke-width="${size*0.08}" 
        fill="none" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
</svg>`;

  return svg;
}

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons for each size
iconSizes.forEach(size => {
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  
  const svg = createArchitectureWaveIcon(size);
  fs.writeFileSync(svgPath, svg);
  
  console.log(`Generated icon-${size}x${size}.svg`);
});

// Create Apple touch icon
const appleIcon = createArchitectureWaveIcon(180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), appleIcon);
console.log('Generated apple-touch-icon.svg');

// Create favicon.ico placeholder
const faviconSvg = createArchitectureWaveIcon(32);
fs.writeFileSync(path.join(iconsDir, 'favicon-32x32.svg'), faviconSvg);
console.log('Generated favicon-32x32.svg');

console.log('\nIcon generation complete with your actual logo design!');
console.log('The icons now feature your minimalist V + W Architecture Wave logo.');
console.log('\nFor production, convert these SVG files to PNG/ICO using:');
console.log('- sharp (Node.js library)');
console.log('- ImageMagick (command line)');
console.log('- Online converters');
console.log('\nThe manifest.json file is ready to use with these new icons.'); 