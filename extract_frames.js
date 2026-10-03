const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const outDir = 'public/frames';
if (!fs.existsSync('public')) fs.mkdirSync('public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

console.log('Extracting frames as JPG at 24fps (full video smoothness)...');
const start = Date.now();
execSync(`"${ffmpeg}" -i "gemini_generated_video_70f3500a-ezremove.mp4" -vf "fps=24,scale=1280:-1" -q:v 3 "${outDir}/frame_%04d.jpg" -y`);
const elapsed = ((Date.now() - start) / 1000).toFixed(2);

const files = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg'));
console.log(`Extracted ${files.length} frames in ${elapsed}s`);
if (files.length > 0) {
  let totalSize = 0;
  files.forEach(f => totalSize += fs.statSync(`${outDir}/${f}`).size);
  console.log(`Sample frame: ${files[0]}, size: ${(fs.statSync(`${outDir}/${files[0]}`).size / 1024).toFixed(1)} KB`);
  console.log(`Total size for all ${files.length} frames: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
}
