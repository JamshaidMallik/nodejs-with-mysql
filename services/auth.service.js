import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import path from 'path';
import fs from 'fs';


export const register = async ({ name, email, password, bio }) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().max(1000).allow('').optional(),
  });
  const { error } = schema.validate({ name, email, password, bio });
  if (error) throw { statusCode: 400, message: error.details[0].message };

  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length) throw { statusCode: 401, message: 'Email already in use' };

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  return {
    status: 'success',
    message: 'User registered successfully',
    userId: result.insertId,
  };
};

export const login = async ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate({ email, password });
  if (error) throw { statusCode: 400, message: error.details[0].message };

  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!users.length) throw { statusCode: 401, message: 'Invalid email or password' };

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { statusCode: 401, message: 'Invalid email or password' };

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    status: 'success',
    message: 'Logged in successfully',
    token,
  };
};

export const getUserProfile = async (userId) => {
  if (!userId) throw { statusCode: 400, message: 'Invalid or missing user ID' };
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  if (!rows.length) throw { statusCode: 404, message: 'User not found' };
  const user = rows[0];
  // Remove password from response
  delete user.password;
  return {
    status: 'success',
    data: user,
  };
};


export const updateUserProfile = async (userId, { name, bio }, profileImage) => {
  const schema = Joi.object({
    name: Joi.string().min(3).optional(),
    bio: Joi.string().max(1000).allow('').optional(),
  });
  const { error } = schema.validate({ name, bio });
  if (error) throw { statusCode: 400, message: error.details[0].message };

  // Fetch current profile image filename
  const [existingRows] = await db.query(
    'SELECT profile_image FROM users WHERE id = ?',
    [userId]
  );
  if (!existingRows.length) throw { statusCode: 404, message: 'User not found' };

  const oldProfileImage = existingRows[0].profile_image;

  // Build update parts
  let updates = [];
  let params = [];

  if (name) {
    updates.push('name = ?');
    params.push(name);
  }

  if (bio !== undefined) {
    updates.push('bio = ?');
    params.push(bio);
  }

  if (profileImage) {
    updates.push('profile_image = ?');
    params.push(profileImage);
  }

  if (updates.length === 0) {
    throw { statusCode: 400, message: 'Nothing to update' };
  }

  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
  params.push(userId);

  await db.query(query, params);

  // ✅ Delete old image if new one uploaded
  if (profileImage && oldProfileImage) {
    const oldImagePath = path.resolve('uploads/profile-images', oldProfileImage);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error(`❌ Failed to delete old profile image ${oldImagePath}:`, err);
      } else {
        console.log(`🗑️ Deleted old profile image: ${oldImagePath}`);
      }
    });
  }

  return {
    status: 'success',
    message: 'Profile updated successfully',
  };
};
