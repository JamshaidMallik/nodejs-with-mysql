import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, getProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const upload = multer();

router.post('/register', registerUser);
router.post('/login', upload.none(), loginUser);
router.get('/profile', authenticate, getProfile);



export default router;
