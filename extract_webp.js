const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const outDir = 'public/frames_webp';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

console.log('Testing WebP extraction...');
execSync(`"${ffmpeg}" -i "gemini_generated_video_70f3500a-ezremove.mp4" -vf "fps=24,scale=1280:-1" -vcodec libwebp -q:v 70 "${outDir}/frame_%04d.webp" -y`);
const files = fs.readdirSync(outDir).filter(f => f.endsWith('.webp'));
console.log('Extracted webp frames:', files.length);
if (files.length > 0) {
  let total = 0;
  files.forEach(f => total += fs.statSync(`${outDir}/${f}`).size);
  console.log('Sample webp size:', (fs.statSync(`${outDir}/${files[0]}`).size / 1024).toFixed(1), 'KB');
  console.log('Total webp size:', (total / (1024 * 1024)).toFixed(2), 'MB');
}
