import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';

export const userService = {
    async updateUserProfile(userId: string, data: Partial<User>) {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, data);
    }
};
