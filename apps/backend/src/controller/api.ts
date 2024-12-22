//src/controller/api.ts

import { Request, Response, NextFunction } from 'express';
import { fetchUserById, updateUserById } from '../repository/userCollection';
import { User } from '@shared/user';

/**
 * Fetch user data by ID
 */
export const fetchUserData = async (
  req: Request<Record<string, string>, object, object, object>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string }; 

    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await fetchUserById(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error); 
  }
};


/**
 * Update user data by ID
 */export const updateUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, ...data } = req.body as Partial<User>;

    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: 'No data provided for update' });
      return;
    }

    await updateUserById(id, data);

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
