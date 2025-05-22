import { Router, Request, Response, NextFunction } from 'express';
import { Pool } from 'pg'; // Precisamos do Pool para este router
import { getAllTags } from '../controllers/tagController';

const asyncHandler = (fn: Function, pool: Pool) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, pool)).catch(next);

const createTagRouter = (pool: Pool) => {
    const router = Router();

    // GET /api/tags
    router.get('/', asyncHandler(getAllTags, pool));

    return router;
};

export default createTagRouter;