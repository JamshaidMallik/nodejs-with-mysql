import fs from 'fs';
import path from 'path';

import {register, login, getUserProfile, updateUserProfile} from '../services/auth.service.js';

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
    const userId = req.user.userId; // authenticate middleware sets req.user
    const result = await getUserProfile(userId);
    res.json(result);
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};


export const updateProfile = async (req, res) => {
  const userId = req.user.userId;
  const { name, bio} = req.body;
  const profileImage = req.file ? req.file.filename : null;

  try {
    const result = await updateUserProfile(userId, { name, bio }, profileImage);
    res.json(result);

  } catch (error) {
    console.error('❌ Update profile error:', error);

    if (profileImage) {
      const filePath = path.resolve('uploads/profile-images', profileImage);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`❌ Failed to delete orphan file ${filePath}:`, err);
        } else {
          console.log(`🗑️ Deleted orphan file: ${filePath}`);
        }
      });
    }

    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};