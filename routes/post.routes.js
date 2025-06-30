import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createPost, getSinglePost, deletePost, getMyPosts, getAllPosts, updatePost } from '../controllers/post.controller.js';
import { uploadPostImage } from '../middlewares/upload.js';

const router = express.Router();

router.post('/create', authenticate, uploadPostImage.single('image'), createPost);
router.get('/:postId', authenticate, getSinglePost);
router.delete('/:postId', authenticate, deletePost);
router.post('/update_post', authenticate, uploadPostImage.single('image'), updatePost);
router.get('/my_post', authenticate, getMyPosts);
router.get('/', authenticate, getAllPosts);


export default router;