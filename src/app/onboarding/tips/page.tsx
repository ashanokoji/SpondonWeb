'use client';

import { useRouter } from 'next/navigation';
import { Coffee, Droplets, Bed, HeartPulse } from 'lucide-react';
import { SpondonButton } from '@/components/ui/SpondonButton';
import { StepProgressBar } from '@/components/ui/StepProgressBar';

export default function TipsPreviewPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] px-6 py-8">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <StepProgressBar currentStep={3} totalSteps={4} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tips for Donors</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Keep these simple tips in mind for a smooth and comfortable donation experience.
        </p>
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">
              <Droplets size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Stay Hydrated</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Drink plenty of water before and after your donation to help replenish fluids.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300">
              <Coffee size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Eat a Healthy Meal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Don't donate on an empty stomach. Eat a light meal 2-3 hours before donating.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300">
              <Bed size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Rest Well</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Get a good night's sleep before your donation day.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300">
              <HeartPulse size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Avoid Strenuous Activity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Take it easy for the rest of the day after donating. No heavy lifting!
              </p>
            </div>
          </div>
        </div>

        <SpondonButton
          onClick={() => router.push('/onboarding/complete')}
          className="w-full h-14 mt-8"
          variant="primary"
        >
          Got it
        </SpondonButton>
      </div>
    </div>
  );
}
