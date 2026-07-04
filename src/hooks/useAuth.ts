import { useAuthContext } from '../contexts/AuthContext';
import { authService } from '../services/authService';

export const useAuth = () => {
    const { firebaseUser, userData, loading } = useAuthContext();

    return {
        user: firebaseUser,
        userData,
        loading,
        register: authService.register,
        login: authService.login,
        loginWithGoogle: authService.loginWithGoogle,
        logout: authService.logout,
        resetPassword: authService.resetPassword,
    };
};
