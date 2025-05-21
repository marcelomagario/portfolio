import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (userId: number): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in ENV');
    }

    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};


interface AuthRequest extends Request {
    userId?: number; 
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
        if (token == null) {
        return res.sendStatus(401); 
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).send('Error in server configuration: JWT_SECRET not defined.');
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403); 
        }
        req.userId = (user as { userId: number }).userId; 
        next(); 
    });
};