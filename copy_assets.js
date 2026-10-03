const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\vmsur\\.gemini\\antigravity-ide\\brain\\d4443cd2-ddb0-408f-91d2-426a3eea219c';
const destDir = path.resolve('public/images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const mappings = [
  { prefix: 'flavor_strawberry', target: 'strawberry.jpg' },
  { prefix: 'flavor_blueberry', target: 'blueberry.jpg' },
  { prefix: 'flavor_chocolate', target: 'chocolate.jpg' },
  { prefix: 'flavor_vanilla', target: 'vanilla.jpg' },
  { prefix: 'flavor_mango', target: 'mango.jpg' },
  { prefix: 'classic_vanilla_falooda', target: 'falooda.jpg' },
  { prefix: 'crispy_chicken_bites', target: 'chicken_bites.jpg' },
  { prefix: 'cafe_interior', target: 'cafe_interior.jpg' },
  { prefix: 'sundae_special', target: 'sundae_special.jpg' },
  { prefix: 'friends_celebrating', target: 'friends.jpg' },
];

mappings.forEach(m => {
  const match = files.find(f => f.startsWith(m.prefix) && f.endsWith('.jpg'));
  if (match) {
    fs.copyFileSync(path.join(srcDir, match), path.join(destDir, m.target));
    console.log(`Copied ${match} -> public/images/${m.target}`);
  } else {
    console.warn(`Could not find file matching ${m.prefix}`);
  }
});

// Also copy sample frames as additional gallery assets
if (fs.existsSync('sample_frames/frame_0_t0.jpg')) {
  fs.copyFileSync('sample_frames/frame_0_t0.jpg', path.join(destDir, 'hero_tub.jpg'));
  console.log('Copied hero_tub.jpg');
}
if (fs.existsSync('sample_frames/frame_4_t7.jpg')) {
  fs.copyFileSync('sample_frames/frame_4_t7.jpg', path.join(destDir, 'brand_splash.jpg'));
  console.log('Copied brand_splash.jpg');
}
if (fs.existsSync('sample_frames/end_9.9.jpg')) {
  fs.copyFileSync('sample_frames/end_9.9.jpg', path.join(destDir, 'fruit_world.jpg'));
  console.log('Copied fruit_world.jpg');
}

console.log('Assets successfully copied!');
