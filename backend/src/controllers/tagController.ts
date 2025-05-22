import { Request, Response } from 'express';
import { Pool } from 'pg';

export const getAllTags = async (req: Request, res: Response, pool: Pool) => {
    try {
        const result = await pool.query('SELECT id, name FROM tags ORDER BY name ASC');
        res.status(200).json(result.rows);
    } catch (error: any) {
        console.error('Error fetching all tags:', error);
        res.status(500).json({ message: 'Failed to retrieve tags.' });
    }
};