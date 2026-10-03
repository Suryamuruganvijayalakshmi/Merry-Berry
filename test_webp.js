const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const outDir = 'frames_webp';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

console.log('Extracting frames at 15fps as WebP...');
const start = Date.now();
// 15 fps gives 150 frames for 10 seconds - excellent balance of smoothness and bundle size
execSync(`"${ffmpeg}" -i "gemini_generated_video_70f3500a-ezremove.mp4" -vf "fps=16,scale=1280:-1" -q:v 75 "${outDir}/frame_%04d.webp" -y`);
const elapsed = ((Date.now() - start) / 1000).toFixed(2);

const files = fs.readdirSync(outDir);
console.log(`Extracted ${files.length} frames in ${elapsed}s`);
if (files.length > 0) {
  const firstStat = fs.statSync(`${outDir}/${files[0]}`);
  console.log(`Sample frame size: ${(firstStat.size / 1024).toFixed(1)} KB`);
  let totalSize = 0;
  files.forEach(f => totalSize += fs.statSync(`${outDir}/${f}`).size);
  console.log(`Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
}
