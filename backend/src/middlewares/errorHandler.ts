import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = statusCode;
    }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('An error occurred:', err); 
    
    let statusCode = err.statusCode || 500;
    let message = err.message || 'An unexpected error occurred.';

    // Handle specific types of errors if needed
    // For example, if you have database errors, validation errors, etc.
    // if (err.name === 'ValidationError') {
    //     statusCode = 400;
    //     message = err.message; // Or format validation errors differently
    // }

    // Prevent leaking sensitive error details in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'An internal server error occurred.';
    }

    res.status(statusCode).json({ message });
};

export default errorHandler;