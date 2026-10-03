const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

if (!fs.existsSync('sample_frames')) {
  fs.mkdirSync('sample_frames');
}

const times = [0, 1.5, 3, 5, 7, 9, 10];
times.forEach((t, i) => {
  execSync(`"${ffmpeg}" -ss ${t} -i "gemini_generated_video_70f3500a-ezremove.mp4" -vframes 1 -q:v 2 "sample_frames/frame_${i}_t${t}.jpg" -y`);
  console.log(`Extracted frame at t=${t}s`);
});
console.log('Done extracting sample frames!');
