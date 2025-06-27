import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/api.routes.js';
import './config/db.js'; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
