'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Scale, Calendar, Droplet, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { SpondonTextField } from '@/components/ui/SpondonTextField';
import { SpondonButton } from '@/components/ui/SpondonButton';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonorProfileSetupPage() {
  const { userData, user, loading } = useAuth();
  const router = useRouter();

  const [bloodGroup, setBloodGroup] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');
  const [isDonor, setIsDonor] = useState(true);
  const [lastDonationDate, setLastDonationDate] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      if (userData.bloodGroup) setBloodGroup(userData.bloodGroup);
      if (userData.weight) setWeight(userData.weight.toString());
      if (userData.dob) setDob(new Date((userData.dob as any).seconds * 1000).toISOString().split('T')[0]);
      if (userData.lastDonationDate) setLastDonationDate(new Date((userData.lastDonationDate as any).seconds * 1000).toISOString().split('T')[0]);
      setIsDonor(userData.isDonor ?? true);
    }
  }, [userData]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) return;

    if (!bloodGroup || !weight || !dob) {
      setError('Please fill in blood group, weight, and date of birth');
      return;
    }

    try {
      setIsLoading(true);
      
      const updateData: any = {
        bloodGroup,
        weight: Number(weight),
        dob: new Date(dob),
        isDonor,
      };

      if (lastDonationDate) {
        updateData.lastDonationDate = new Date(lastDonationDate);
      }

      await userService.updateUserProfile(user.uid, updateData);
      
      // Navigate to location setup
      router.push('/setup/location');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6 py-12">
      <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
        <div className="mb-10">
          <p className="text-sm font-medium text-[var(--color-primary)] mb-2">Step 1 of 2</p>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
            Donor Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Tell us about your health to see if you're eligible to donate blood.
          </p>
        </div>

        <form onSubmit={handleNext} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="label-large text-[var(--on-surface)] ml-1">
              Blood Group
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-[var(--on-surface)] opacity-50 z-10 pointer-events-none">
                <Droplet size={20} />
              </div>
              <select
                className="w-full h-14 bg-[var(--surface-variant)] border border-transparent rounded-xl px-4 pl-10 text-base text-[var(--on-bg)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 appearance-none"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>Select Blood Group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <SpondonTextField
            label="Weight (kg)"
            type="number"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            leftIcon={<Scale size={20} />}
          />

          <SpondonTextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            leftIcon={<Calendar size={20} />}
          />

          <SpondonTextField
            label="Last Donation Date (Optional)"
            type="date"
            value={lastDonationDate}
            onChange={(e) => setLastDonationDate(e.target.value)}
            leftIcon={<Calendar size={20} />}
          />

          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface)] border border-[var(--color-primary)]/20">
            <button
              type="button"
              onClick={() => setIsDonor(!isDonor)}
              className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                isDonor 
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                  : 'bg-transparent border-gray-400 text-transparent'
              }`}
            >
              <Check size={16} />
            </button>
            <div className="flex flex-col cursor-pointer" onClick={() => setIsDonor(!isDonor)}>
              <span className="font-semibold text-gray-900 dark:text-white">Register as Donor</span>
              <span className="text-xs text-gray-500">You will appear in donor search results</span>
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
            Continue
          </SpondonButton>
        </form>
      </div>
    </div>
  );
}
