import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, UserRole } from '../types';

export const authService = {
    async register(email: string, password: string, userData: Partial<User>) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || email,
            name: userData.name || '',
            phone: userData.phone || '',
            avatarUrl: userData.avatarUrl || '',
            bloodGroup: userData.bloodGroup || '',
            dob: userData.dob || null,
            weight: userData.weight || 0,
            isDonor: userData.isDonor || false,
            lastDonationDate: null,
            donationInterval: 90,
            availabilityOverride: false,
            totalDonations: 0,
            communityIds: [],
            district: userData.district || '',
            upazila: userData.upazila || '',
            isPhoneVisible: userData.isPhoneVisible !== undefined ? userData.isPhoneVisible : true,
            badges: [],
            fcmToken: '',
            role: UserRole.USER,
            createdAt: new Date(),
            isBanned: false,
            bannedAt: null,
            ...userData
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
        return { user: firebaseUser, userData: newUser };
    },

    async login(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.exists() ? (userDoc.data() as User) : null;
        
        return { user: firebaseUser, userData };
    },

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const firebaseUser = userCredential.user;
        
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData: User;
        if (!userDoc.exists()) {
            userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: firebaseUser.displayName || '',
                phone: firebaseUser.phoneNumber || '',
                avatarUrl: firebaseUser.photoURL || '',
                bloodGroup: '',
                dob: null,
                weight: 0,
                isDonor: false,
                lastDonationDate: null,
                donationInterval: 90,
                availabilityOverride: false,
                totalDonations: 0,
                communityIds: [],
                district: '',
                upazila: '',
                isPhoneVisible: true,
                badges: [],
                fcmToken: '',
                role: UserRole.USER,
                createdAt: new Date(),
                isBanned: false,
                bannedAt: null,
            };
            await setDoc(userDocRef, userData);
        } else {
            userData = userDoc.data() as User;
        }

        return { user: firebaseUser, userData };
    },

    async logout() {
        return signOut(auth);
    },

    async resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email);
    }
};
