'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { SpondonButton } from '@/components/ui/SpondonButton';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6 py-12 items-center justify-center">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className="mb-8 h-32 w-32 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
        >
          <Heart size={64} className="text-[var(--color-primary)]" fill="currentColor" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Welcome to Spondon
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You've taken the first step towards saving lives. Let's get you set up so you can start making a difference in your community.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <SpondonButton
            onClick={() => router.push('/onboarding/setup')}
            className="w-full h-14"
            variant="primary"
          >
            Let's Go
          </SpondonButton>
        </motion.div>
      </div>
    </div>
  );
}
