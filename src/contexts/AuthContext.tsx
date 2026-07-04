'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User as SpondonUser } from '../types';

interface AuthContextType {
    firebaseUser: FirebaseUser | null;
    userData: SpondonUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    firebaseUser: null,
    userData: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<SpondonUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);
            
            if (user) {
                // Subscribe to user document changes in Firestore
                const unsubscribeDoc = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUserData({ ...docSnapshot.data(), uid: docSnapshot.id } as SpondonUser);
                    } else {
                        setUserData(null);
                    }
                    setLoading(false);
                });

                return () => unsubscribeDoc();
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ firebaseUser, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
