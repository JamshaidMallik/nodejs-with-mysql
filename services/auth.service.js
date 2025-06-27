import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

export const register = async ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate({ name, email, password });
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
