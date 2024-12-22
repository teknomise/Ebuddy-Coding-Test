//src/repository/userCollection.ts

import { User } from '@shared/user';
import { db } from '../config/firebaseConfig';

const USERS_COLLECTION = 'USERS';

const usersCollection = db.collection(USERS_COLLECTION);

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    const doc = await usersCollection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();

    if (!data) {
      return null;
    }

    return data as User;
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    throw new Error('Failed to fetch user');
  }
};

export const updateUserById = async (id: string, data: Partial<User>): Promise<void> => {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }

    await usersCollection.doc(id).set(data, { merge: true });
  } catch (error) {
    console.error(`Error updating user by ID (${id}):`, error);
    throw new Error('Failed to update user');
  }
};
