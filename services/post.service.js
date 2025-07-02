import db from '../config/db.js';
import Joi from 'joi';
import path from "path";
import fs from "fs";

export const createPostService = async (userId, { title, description }, postImage) => {
    // Validate input
    const schema = Joi.object({
        title: Joi.string().min(5).required().messages({
            'string.min': 'Name must be at least 3 characters long.',
            'string.empty': 'Name cannot be empty.',
        }),
        description: Joi.string().max(2000).allow('').optional(),
    });

    const { error } = schema.validate({ title, description });
    if (error) throw { statusCode: 400, message: error.details[0].message };

    // Insert new post into DB
    const [result] = await db.query(
        'INSERT INTO posts (user_id, title, description, image) VALUES (?, ?, ?, ?)',
        [userId, title, description, postImage]
    );

    return {
        status: 'success',
        message: 'Post created successfully',
        postId: result.insertId,
    };
};

export const getPostService = async (postId) => {
    // Validate postId
    const schema = Joi.object({
        postId: Joi.number().integer().positive().required(),
    });

    const { error } = schema.validate({ postId });
    if (error) throw { statusCode: 400, message: error.details[0].message };

    // Fetch post from DB
    const [posts] = await db.query('SELECT * FROM posts WHERE id = ?', [postId]);
    if (!posts.length) throw {
        statusCode: 404, message: 'Post not found'
    };

    return {
        status: 'success',
        data: posts[0],
    };
}

export const deletePostService = async (postId) => {
    // Validate postId
    const schema = Joi.object({
        postId: Joi.number().integer().positive().required(),
    });

    const { error } = schema.validate({ postId });
    if (error) throw { statusCode: 400, message: error.details[0].message };

    // Fetch post to get image name
    const [posts] = await db.query('SELECT image FROM posts WHERE id = ?', [postId]);
    if (!posts.length) throw { statusCode: 404, message: 'Post not found' };

    const postImage = posts[0].image;

    // Delete post image if it exists
    if (postImage) {
        const imagePath = path.resolve('uploads/post-images', postImage);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`❌ Failed to delete post image ${imagePath}:`, err);
            } else {
                console.log(`🗑️ Deleted post image: ${imagePath}`);
            }
        });
    }


    // Delete post from DB
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [postId]);
    if (result.affectedRows === 0) throw {
        statusCode: 404, message: 'Post not found'
    };
    return {
        status: 'success',
        message: 'Post deleted successfully',
    };

};

export const getMyPostsService = async (userId) => {
    // Validate userId
    const schema = Joi.object({
        userId: Joi.number().integer().positive().required(),
    });

    const { error } = schema.validate({ userId });
    if (error) throw { statusCode: 400, message: error.details[0].message };

    // Fetch all posts for the user
    const [posts] = await db.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
    if (!posts.length) throw {
        statusCode: 404, message: 'No posts found for this user'
    };

    return {
        status: 'success',
        posts: posts,
    };
}

export const getAllPostsService = async () => {
    // Fetch all posts ordered by latest first
    const [posts] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    if (!posts.length) {
        throw {
            statusCode: 404,
            message: 'No posts found',
        };
    }

    return {
        status: 'success',
        posts,
    };
};

export const updatePostService = async (userId, { postId, title, description }, postImage) => {
    // Validate postId, title, description
    const schema = Joi.object({
        postId: Joi.number().integer().positive().required(),
        title: Joi.string().min(5).optional(),
        description: Joi.string().max(2000).allow('').optional(),
    });

    const { error } = schema.validate({ postId, title, description });
    if (error) throw { statusCode: 400, message: error.details[0].message };

    // Fetch existing post to verify ownership + existing image
    const [rows] = await db.query('SELECT user_id, image FROM posts WHERE id = ?', [postId]);
    if (!rows.length) throw { statusCode: 404, message: 'Post not found' };

    const post = rows[0];
    if (post.user_id !== userId) {
        throw { statusCode: 403, message: 'You are not authorized to update this post' };
    }

    const oldImage = post.image;

    // Build dynamic SET clauses
    let updates = [];
    let params = [];

    if (title) {
        updates.push('title = ?');
        params.push(title);
    }

    if (description !== undefined) {
        updates.push('description = ?');
        params.push(description);
    }

    if (postImage) {
        updates.push('image = ?');
        params.push(postImage);
    }

    if (updates.length === 0) {
        throw { statusCode: 400, message: 'Nothing to update' };
    }

    const query = `UPDATE posts SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    params.push(postId);

    await db.query(query, params);

    // ✅ Delete old image if new one uploaded
    if (postImage && oldImage) {
        const oldImagePath = path.resolve('uploads/post-images', oldImage);
        fs.unlink(oldImagePath, (err) => {
            if (err) console.error(`❌ Failed to delete old post image ${oldImagePath}:`, err);
            else console.log(`🗑️ Deleted old post image: ${oldImagePath}`);
        });
    }

    return {
        status: 'success',
        message: 'Post updated successfully',
    };
};

