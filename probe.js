const fs = require('fs');
const stats = fs.statSync('gemini_generated_video_70f3500a-ezremove.mp4');
console.log('Video size in MB:', (stats.size / (1024 * 1024)).toFixed(2));

const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

try {
  const result = execSync(`"${ffmpeg}" -i "gemini_generated_video_70f3500a-ezremove.mp4"`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
  console.log(result);
} catch (e) {
  console.log('FFMPEG Output:');
  console.log(e.stderr || e.stdout || e.message);
}


