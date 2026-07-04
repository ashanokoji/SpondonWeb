'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { BloodDropLoader } from '@/components/ui/BloodDropLoader';
import { SpondonButton } from '@/components/ui/SpondonButton';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // If not loading, auto redirect authenticated users or show landing
    if (!loading) {
      if (user) {
        router.push('/home');
      } else {
        // Keep splash screen for 2s total for visual effect, then show landing content
        const timer = setTimeout(() => setShowSplash(false), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [user, loading, router]);

  if (loading || showSplash) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] transition-colors duration-300">
        <BloodDropLoader size={80} />
        <h1 className="mt-8 text-4xl font-bold font-display text-[var(--color-primary)]">
          স্পন্দন
        </h1>
        <p className="mt-2 text-[var(--color-secondary)]">Give Blood, Save Lives</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[var(--bg)] to-[var(--surface-variant)] px-4 transition-colors duration-300">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface)] shadow-lg shadow-red-500/10">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="var(--color-primary)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white">
          Spondon
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Join the community-driven blood donation platform for Bangladesh.
          Find donors quickly and securely.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4">
        <SpondonButton
          onClick={() => router.push('/login')}
          className="w-full h-14 text-lg"
          variant="primary"
        >
          Login
        </SpondonButton>
        
        <SpondonButton
          onClick={() => router.push('/signup')}
          className="w-full h-14 text-lg"
          variant="outline"
        >
          Create an Account
        </SpondonButton>
      </div>
    </div>
  );
}
