import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import './config/db.js'; 


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
