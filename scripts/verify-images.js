const fs = require('fs');
const path = require('path');

// Function to check if image exists
function checkImageExists(imagePath) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  return fs.existsSync(fullPath);
}

// List of images used in the application
const imagesToCheck = [
  '/assets/chair.png',
  '/assets/dinner.png',
  '/assets/Vector-9.png',
  '/assets/Vector.png',
  '/assets/image-1.png',
  '/assets/image-2.png',
  '/assets/image-3.png',
  '/assets/Rectangle3.png',
  '/assets/Vector-10.png',
  '/assets/Vector-11.png',
  '/assets/Vector-2.png',
  '/assets/Vector-3.png',
  '/assets/Vector-4.png',
  '/assets/Vector-5.png',
  '/assets/Vector-6.png',
  '/assets/Vector-7.png',
  '/assets/Vector-8.png',
  '/assets/Rectangle.png',
  '/assets/Rectangle2.png'
];

console.log('🔍 Checking image files...\n');

let allImagesExist = true;

imagesToCheck.forEach(imagePath => {
  const exists = checkImageExists(imagePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${imagePath} ${exists ? 'exists' : 'MISSING'}`);
  
  if (!exists) {
    allImagesExist = false;
  }
});

console.log('\n📊 Summary:');
if (allImagesExist) {
  console.log('✅ All images are present and ready for production!');
} else {
  console.log('❌ Some images are missing. Please check the files above.');
  console.log('\n💡 Tips for production:');
  console.log('1. Ensure all images are in the public/assets folder');
  console.log('2. Use the ProductImage component for automatic fallbacks');
  console.log('3. Consider using a CDN for better performance');
  console.log('4. Optimize images for web (compress, use WebP format)');
}

process.exit(allImagesExist ? 0 : 1); 