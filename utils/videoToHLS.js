import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const convertToHLS = (inputPath) => {
    return new Promise((resolve, reject) => {
        const baseName = path.basename(inputPath, path.extname(inputPath)); // e.g. 1752493020929-video
        const folderName = `video-${baseName}`; // 🔥 ensures folder becomes: video-1752493020929-video
        const outputDir = path.join('uploads', 'hls', folderName); // uploads/hls/video-1752493020929-video

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, 'master.m3u8');

        ffmpeg(inputPath)
            .output(outputPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .addOptions([
                '-profile:v baseline',
                '-level 3.0',
                '-start_number 0',
                '-hls_time 10',
                '-hls_list_size 0',
                '-f hls',
            ])
            .on('start', (cmd) => {
                console.log('🔧 FFmpeg started:', cmd);
            })
            .on('end', () => {
                console.log('✅ HLS conversion completed');
                resolve();
            })
            .on('error', (err) => {
                console.error('❌ FFmpeg error:', err.message);
                reject(err);
            })
            .run();
    });
};
