const fs = require('fs');

const frames = fs.readdirSync('public/frames_webp').filter(x => x.endsWith('.webp'));
console.log('Webp frame count:', frames.length);
console.log('First frame:', frames[0]);
console.log('Last frame:', frames[frames.length - 1]);

const images = fs.readdirSync('public/images');
console.log('Public images:', images);

const hasVideo = fs.existsSync('public/merry_berry_animation.mp4');
console.log('Has original MP4 video in public:', hasVideo);
