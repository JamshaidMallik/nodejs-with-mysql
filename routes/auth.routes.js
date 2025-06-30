import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile} from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { uploadProfileImage } from '../middlewares/upload.js';
import multer from "multer";
export const acceptFormData = multer().none();


const router = express.Router();
router.post('/register', acceptFormData, registerUser);
router.post('/login', acceptFormData, loginUser);
router.get('/profile', authenticate, getProfile);
router.post('/update_profile', authenticate, uploadProfileImage.single('profile_image'), updateProfile);

export default router;
