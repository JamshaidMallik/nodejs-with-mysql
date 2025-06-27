import db from '../config/db.js'; // 👈 this was missing

import { register, login } from '../services/auth.service.js';

export const registerUser = async (req, res) => {
  try {
    const result = await register(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await login(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const [rows] = await db.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [userId]
    );
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    res.json({
      status: 'success',
      data: rows[0],
    });
  } catch (err) {
    console.error('❌ Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



