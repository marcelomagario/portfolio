import { Request, Response } from 'express';
import { Pool } from 'pg';

// Get all posts (public route)
export const getAllPosts = async (req: Request, res: Response, pool: Pool) => {
    try {
        const result = await pool.query('SELECT id, title, content, created_at, updated_at FROM posts ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error: any) {
        console.error('Error fetching all posts:', error.message);
        res.status(500).json({ message: 'Internal server error while fetching posts.' });
    }
};

// Get a single post by ID (public route)
export const getPostById = async (req: Request, res: Response, pool: Pool) => {
    const { id } = req.params; 

    try {
        const result = await pool.query('SELECT id, title, content, created_at, updated_at FROM posts WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        console.error(`Error fetching post with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Internal server error while fetching post.' });
    }
};

// Create a new post (private/CMS route)
export const createPost = async (req: Request, res: Response, pool: Pool) => {
    const { title, content, tags } = req.body; // 'tags' will be an array of tag names

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required for a post.' });
    }

    try {

        await pool.query('BEGIN');

        // Insert the new post
        const postResult = await pool.query(
            'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at, updated_at',
            [title, content]
        );
        const newPost = postResult.rows[0];

        // Handle tags if provided
        if (tags && tags.length > 0) {
            for (const tagName of tags) {
                // Check if tag exists or create it
                let tagId;
                const existingTag = await pool.query('SELECT id FROM tags WHERE name = $1', [tagName]);

                if (existingTag.rows.length > 0) {
                    tagId = existingTag.rows[0].id;
                } else {
                    const newTag = await pool.query('INSERT INTO tags (name) VALUES ($1) RETURNING id', [tagName]);
                    tagId = newTag.rows[0].id;
                }
                // Link post to tag in post_tags table
                await pool.query('INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)', [newPost.id, tagId]);
            }
        }

        await pool.query('COMMIT'); 
        res.status(201).json({ message: 'Post created successfully.', post: newPost });

    } catch (error: any) {
        await pool.query('ROLLBACK'); 
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Internal server error during post creation.' });
    }
};

// Update an existing post (private/CMS route)
export const updatePost = async (req: Request, res: Response, pool: Pool) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required for updating a post.' });
    }

    try {
        await pool.query('BEGIN');

        // Update the post
        const postResult = await pool.query(
            'UPDATE posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, title, content, created_at, updated_at',
            [title, content, id]
        );

        if (postResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ message: 'Post not found for update.' });
        }

        const updatedPost = postResult.rows[0];

        // Clear existing tags for the post and add new ones
        await pool.query('DELETE FROM post_tags WHERE post_id = $1', [id]);

        if (tags && tags.length > 0) {
            for (const tagName of tags) {
                let tagId;
                const existingTag = await pool.query('SELECT id FROM tags WHERE name = $1', [tagName]);

                if (existingTag.rows.length > 0) {
                    tagId = existingTag.rows[0].id;
                } else {
                    const newTag = await pool.query('INSERT INTO tags (name) VALUES ($1) RETURNING id', [tagName]);
                    tagId = newTag.rows[0].id;
                }
                await pool.query('INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)', [id, tagId]);
            }
        }

        await pool.query('COMMIT');

        res.status(200).json({ message: 'Post updated successfully.', post: updatedPost });

    } catch (error: any) {
        await pool.query('ROLLBACK');
        console.error(`Error updating post with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Internal server error during post update.' });
    }
};

// Delete a post (private/CMS route)
export const deletePost = async (req: Request, res: Response, pool: Pool) => {
    const { id } = req.params;

    try {

        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found for deletion.' });
        }

        res.status(200).json({ message: 'Post deleted successfully.', id: result.rows[0].id });

    } catch (error: any) {
        console.error(`Error deleting post with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Internal server error during post deletion.' });
    }
};