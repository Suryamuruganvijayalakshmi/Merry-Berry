const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

[9.2, 9.5, 9.8, 9.9].forEach(t => {
  try {
    execSync(`"${ffmpeg}" -ss ${t} -i "gemini_generated_video_70f3500a-ezremove.mp4" -vframes 1 -q:v 2 "sample_frames/end_${t}.jpg" -y`);
    console.log('Extracted', t);
  } catch (e) {
    console.log('Error at', t, e.message);
  }
});
