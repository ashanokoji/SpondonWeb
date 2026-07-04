'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { SpondonButton } from '@/components/ui/SpondonButton';
import { StepProgressBar } from '@/components/ui/StepProgressBar';

export default function OnboardingSetupPage() {
  const { userData, user, loading } = useAuth();
  const router = useRouter();
  
  const [isPhoneVisible, setIsPhoneVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await userService.updateUserProfile(user.uid, {
        isPhoneVisible
      });
      router.push('/onboarding/quiz');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] px-6 py-8">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <StepProgressBar currentStep={1} totalSteps={4} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Setup</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Personalize your profile and set your privacy preferences.</p>
        
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full bg-[var(--surface-variant)] flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
              {userData?.avatarUrl ? (
                <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-400">{userData?.name?.charAt(0) || 'U'}</span>
              )}
              
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </button>
            </div>
            <p className="mt-3 text-sm text-[var(--color-primary)] font-medium cursor-pointer">
              Upload Photo
            </p>
          </div>

          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--surface-variant)] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} className="text-[var(--color-primary)]" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Privacy Settings</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Phone Number Visibility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Allow other users to see your phone number when they need blood.
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setIsPhoneVisible(!isPhoneVisible)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPhoneVisible ? 'bg-[var(--color-primary)]' : 'bg-gray-300 dark:bg-gray-600'}`}
                role="switch"
                aria-checked={isPhoneVisible}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPhoneVisible ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <SpondonButton
          onClick={handleNext}
          className="w-full h-14 mt-8"
          variant="primary"
          isLoading={isLoading}
        >
          Continue
        </SpondonButton>
      </div>
    </div>
  );
}
