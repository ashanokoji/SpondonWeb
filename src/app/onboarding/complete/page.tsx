'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, ArrowRight } from 'lucide-react';
import { SpondonButton } from '@/components/ui/SpondonButton';

export default function OnboardingCompletePage() {
  const router = useRouter();

  useEffect(() => {
    // Fire confetti on load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#C0152A', '#E63950', '#8B0F1F', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#C0152A', '#E63950', '#8B0F1F', '#ffffff']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6 py-12 items-center justify-center">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className="mb-8 h-32 w-32 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-lg shadow-green-500/20 border-4 border-white dark:border-gray-800"
        >
          <Check size={64} className="text-green-600 dark:text-green-400" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-4">
            You're All Set!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your profile has been created successfully. You are now part of the Spondon community!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <SpondonButton
            onClick={() => router.push('/home')}
            className="w-full h-14"
            variant="primary"
          >
            <div className="flex items-center justify-center gap-2">
              Go to Dashboard <ArrowRight size={20} />
            </div>
          </SpondonButton>
        </motion.div>
      </div>
    </div>
  );
}
