import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized access. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    const decodedToken = await auth().verifyIdToken(token);

    (req as Request & { user?: DecodedIdToken }).user = decodedToken;

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized access. Invalid token.' });
  }
};
