'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { SpondonButton } from '@/components/ui/SpondonButton';
import { getAllDistricts, getUpazilasForDistrict, District, Upazila } from '@/data/bangladesh';

export default function LocationSetupPage() {
  const { userData, user, loading } = useAuth();
  const router = useRouter();

  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);
  
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDistricts(getAllDistricts());
  }, []);

  useEffect(() => {
    if (district) {
      setUpazilas(getUpazilasForDistrict(district));
      // Only reset upazila if the new district doesn't contain the currently selected upazila
      const currentUpazilas = getUpazilasForDistrict(district);
      if (!currentUpazilas.find(u => u.name === upazila)) {
        setUpazila('');
      }
    } else {
      setUpazilas([]);
    }
  }, [district]);

  useEffect(() => {
    if (userData) {
      if (userData.district) setDistrict(userData.district);
      if (userData.upazila) setUpazila(userData.upazila);
    }
  }, [userData]);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) return;

    if (!district || !upazila) {
      setError('Please select your district and upazila');
      return;
    }

    try {
      setIsLoading(true);
      
      await userService.updateUserProfile(user.uid, {
        district,
        upazila,
      });
      
      // Navigate to onboarding wizard
      router.push('/onboarding/welcome');
    } catch (err: any) {
      setError(err.message || 'Failed to update location');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6 py-12">
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
        <button 
          onClick={() => router.back()} 
          className="absolute top-6 left-6 p-2 rounded-full bg-[var(--surface)] shadow-md text-[var(--on-surface)] hover:text-[var(--color-primary)] transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="mb-10 mt-4">
          <p className="text-sm font-medium text-[var(--color-primary)] mb-2">Step 2 of 2</p>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
            Your Location
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This helps us match you with blood requests in your area.
          </p>
        </div>

        <form onSubmit={handleComplete} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="label-large text-[var(--on-surface)] ml-1">
              District
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-[var(--on-surface)] opacity-50 z-10 pointer-events-none">
                <MapPin size={20} />
              </div>
              <select
                className="w-full h-14 bg-[var(--surface-variant)] border border-transparent rounded-xl px-4 pl-10 text-base text-[var(--on-bg)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 appearance-none"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="" disabled>Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} ({d.bn_name})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="label-large text-[var(--on-surface)] ml-1">
              Upazila
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-[var(--on-surface)] opacity-50 z-10 pointer-events-none">
                <MapPin size={20} />
              </div>
              <select
                className="w-full h-14 bg-[var(--surface-variant)] border border-transparent rounded-xl px-4 pl-10 text-base text-[var(--on-bg)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 appearance-none disabled:opacity-50"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district || upazilas.length === 0}
              >
                <option value="" disabled>Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name} ({u.bn_name})</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-[var(--color-urgency-critical)]">
              {error}
            </p>
          )}

          <SpondonButton
            type="submit"
            className="w-full h-14 mt-4"
            variant="primary"
            isLoading={isLoading}
          >
            Complete Setup
          </SpondonButton>
        </form>
      </div>
    </div>
  );
}
