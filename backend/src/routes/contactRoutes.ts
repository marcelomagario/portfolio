import { Router, Request, Response, NextFunction } from 'express'; 
import { sendContactEmail } from '../controllers/contactController';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res)).catch(next); 

const contactRouter = Router();

contactRouter.post('/', asyncHandler(sendContactEmail));

export default contactRouter;