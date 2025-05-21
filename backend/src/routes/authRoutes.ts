import { Router } from 'express';
import { Pool } from 'pg';
import { registerUser, loginUser } from '../controllers/authController';

const createAuthRouter = (pool: Pool) => {
    const router = Router();

    router.post('/register', (req, res) => {
        registerUser(req, res, pool);
    });

    router.post('/login', (req, res) => {
        loginUser(req, res, pool);
    });

    return router;
};

export default createAuthRouter;