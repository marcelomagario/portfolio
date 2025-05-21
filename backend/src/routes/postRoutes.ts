import { Router } from 'express';
import { Pool } from 'pg';
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController';
import { authenticateToken } from '../utils/auth';

const createPostRouter = (pool: Pool) => {
    const router = Router();

    const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
        Promise.resolve(fn(req, res, pool)).catch(next);

    // Public routes for reading blog posts
    router.get('/', asyncHandler(getAllPosts));
    router.get('/:id', asyncHandler(getPostById));

    // Private/CMS routes (require authentication)
    router.post('/', authenticateToken, asyncHandler(createPost));
    router.put('/:id', authenticateToken, asyncHandler(updatePost));
    router.delete('/:id', authenticateToken, asyncHandler(deletePost));

    return router;
};

export default createPostRouter;