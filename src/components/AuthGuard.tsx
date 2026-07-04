'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { BloodDropLoader } from './ui/BloodDropLoader';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            // Public routes
            const isPublicRoute = ['/login', '/signup', '/forgot-password', '/privacy-policy', '/terms-of-service', '/'].includes(pathname);
            
            if (!user && !isPublicRoute) {
                router.push('/login');
            } else if (user && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
                router.push('/home'); // Redirect authenticated users away from auth pages
            }
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[var(--bg)]">
                <BloodDropLoader />
            </div>
        );
    }

    return <>{children}</>;
}
