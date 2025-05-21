import { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword, generateToken } from '../utils/auth'; 

// Register a new user (admin for CMS)
export const registerUser = async (req: Request, res: Response, pool: Pool) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const userExistsQuery = 'SELECT * FROM users WHERE username = $1';
        const userExistsResult = await pool.query(userExistsQuery, [username]);

        if (userExistsResult.rows.length > 0) {
            return res.status(409).json({ message: 'User with this username already exists.' });
        }

        const passwordHash = await hashPassword(password);

        const insertUserQuery = 'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username';
        const result = await pool.query(insertUserQuery, [username, passwordHash]);
        const newUser = result.rows[0];

        res.status(201).json({ message: 'User registered successfully.', user: { id: newUser.id, username: newUser.username } });

    } catch (error: any) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
};

// Log in an existing user
export const loginUser = async (req: Request, res: Response, pool: Pool) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(userQuery, [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await comparePassword(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken(user.id);

        res.status(200).json({ message: 'Login successful.', token });

    } catch (error: any) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Internal server error during login.' });
    }
};