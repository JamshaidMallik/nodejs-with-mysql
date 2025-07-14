import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createPost, getSinglePost, deletePost, getMyPosts, getAllPosts, updatePost } from '../controllers/post.controller.js';
import { uploadPostMedia } from '../middlewares/upload.js';

const router = express.Router();
router.post(
    '/create',
    authenticate,
    uploadPostMedia.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]),
    createPost
);
router.post(
    '/update_post',
    authenticate,
    uploadPostMedia.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]),
    updatePost
);
router.delete('/:postId', authenticate, deletePost);
router.get('/my_post', authenticate, getMyPosts);
router.get('/', authenticate, getAllPosts);
router.get('/:postId', authenticate, getSinglePost);


export default router;