import fs from 'fs';
import path from 'path';
import { createPostService, getPostService, deletePostService, getMyPostsService, getAllPostsService,  updatePostService } from '../services/post.service.js';

export const createPost = async (req, res) => {
    const userId = req.user.userId; // authenticate middleware sets req.user
    const { title, description } = req.body;
    const postImage = req.file ? req.file.filename : null;

    try {
        const result = await createPostService(userId, { title, description }, postImage);
        res.status(200).json(result);

    } catch (e) {
        console.error('❌ Create post error:', e);
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


