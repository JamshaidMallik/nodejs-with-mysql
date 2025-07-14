import fs from 'fs';
import path from 'path';
import { convertToHLS } from '../utils/videoToHLS.js';
import { createPostService, getPostService, deletePostService, getMyPostsService, getAllPostsService,  updatePostService } from '../services/post.service.js';

export const createPost = async (req, res) => {
    const userId = req.user.userId; // authenticate middleware sets req.user
    const { title, description } = req.body;

    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    const postImage = imageFile ? imageFile.filename : null;
    const videoPath = videoFile ? videoFile.path : null;
    const videoFilename = videoFile ? videoFile.filename : null;  // used for DB

    try {
        const result = await createPostService(userId, { title, description }, postImage, videoFilename);
        let hlsUrl = null;
        // ✅ Convert to HLS if video exists
        if (videoPath) {
            const videoBaseName = path.basename(videoPath, path.extname(videoPath)); // remove .mp4
            const inputFullPath = path.resolve(videoPath); // raw uploaded video
            const outputDir = path.resolve('uploads/hls', `video-${videoBaseName}`);
            await convertToHLS(inputFullPath, outputDir);
            hlsUrl = `${req.protocol}://${req.get('host')}/uploads/hls/video-${videoBaseName}/master.m3u8`;
        }

        res.status(200).json({
            ...result,
            image: postImage ? `/uploads/post-images/${postImage}` : null,
            video: videoFilename ? `/uploads/video-files/${videoFilename}` : null,
            hlsUrl,
        });

    } catch (e) {
        console.error('❌ Create post error:', e);
        if (postImage) {
            const filePath = path.resolve('uploads/post-images', postImage);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`❌ Failed to delete orphan file ${filePath}:`, err);
                else console.log(`🗑️ Deleted orphan file: ${filePath}`);
            });
        }

        // Clean orphan video & HLS

        if (videoPath) {
            const rawVideoPath = path.resolve(videoPath);
            const videoBaseName = path.basename(videoPath, path.extname(videoPath));
            const hlsFolder = path.resolve('uploads/hls', `video-${videoBaseName}`);

            fs.unlink(rawVideoPath, (err) => {
                if (err) console.error('❌ Failed to delete raw video:', err);
                else console.log(`🗑️ Deleted raw video: ${rawVideoPath}`);
            });

            fs.rm(hlsFolder, { recursive: true, force: true }, (err) => {
                if (err) console.error('❌ Failed to delete HLS folder:', err);
                else console.log(`🗑️ Deleted HLS folder: ${hlsFolder}`);
            });
        }

        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }
};

export const getSinglePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    try {
        const result = await getPostService(postId);
        console.log(`User ID: ${userId}`); // 🔥 Just the user ID
        res.status(200).json(result);
    } catch (e) {
        console.error('❌ Get post error:', e);
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }
}

export const getMyPosts = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await getMyPostsService(userId);
        res.status(200).json(result);
    } catch (e) {
        console.error('❌ Get all posts error:', e);
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const result = await getAllPostsService();
        console.log(`🔥 fetching all posts: ${result.data}`);
        res.status(200).json(result);
    } catch (e) {
        console.error('❌ Get all posts error:', e);
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId;
    try {
        const result = await deletePostService(postId);
        console.log(`🔥 User ID for deleting the post: ${userId}`);
        res.status(200).json(result);
    } catch (e) {
        console.error('❌ Delete post error:', e);
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }
}

export const updatePost = async (req, res) => {
    const userId = req.user.userId;
    const { postId, title, description } = req.body;
    const postImage = req.file ? req.file.filename : null;
    try {
        const result = await updatePostService(userId, { postId: Number(postId), title, description,  }, postImage);
        res.status(200).json(result);
    } catch (e) {
        console.error('❌ Update post error:', e);
        if (postImage) {
            const filePath = path.resolve('uploads/post-images', postImage);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`❌ Failed to delete orphan file ${filePath}:`, err);
                else console.log(`🗑️ Deleted orphan file: ${filePath}`);
            });
        }
        res.status(e.statusCode || 500).json({
            status: 'error',
            message: e.message || 'Something went wrong',
        });
    }
};


