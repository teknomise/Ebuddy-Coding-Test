//src/routes/userRoutes.ts

import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchUserData, updateUserData } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

router.use(authMiddleware);

router.get('/fetch-user-data/:id', asyncHandler(fetchUserData));

router.post('/update-user-data', asyncHandler(updateUserData));

export default router;
