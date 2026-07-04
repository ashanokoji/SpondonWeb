'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Phone, Droplet, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SpondonTextField } from '@/components/ui/SpondonTextField';
import { SpondonButton } from '@/components/ui/SpondonButton';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      setStep(2);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!phone || !bloodGroup) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password, {
        name,
        phone,
        bloodGroup,
      });
      // Redirect to onboarding profile setup
      router.push('/setup/donor-profile');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            {step === 1 ? 'Step 1 of 2: Basic Info' : 'Step 2 of 2: Medical Info'}
          </p>
          
          <div className="flex gap-2 mt-6">
            <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-[var(--color-primary)]' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-[var(--color-primary)]' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
          </div>
        </div>

        <form onSubmit={step === 2 ? handleRegister : (e) => { e.preventDefault(); handleNext(); }} className="flex flex-col gap-5">
          {step === 1 && (
            <div className="flex flex-col gap-5 animate-in slide-in-from-right-4">
              <SpondonTextField
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User size={20} />}
              />
              
              <SpondonTextField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={20} />}
              />

              <SpondonTextField
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={20} />}
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5 animate-in slide-in-from-right-4">
              <SpondonTextField
                label="Phone Number"
                type="tel"
                placeholder="e.g. 01712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone size={20} />}
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="label-large text-[var(--on-surface)] ml-1">
                  Blood Group
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[var(--on-surface)] opacity-50 z-10 pointer-events-none">
                    <Droplet size={20} />
                  </div>
                  <select
                    className={`w-full h-14 bg-[var(--surface-variant)] border border-transparent rounded-xl px-4 pl-10 text-base text-[var(--on-bg)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 appearance-none`}
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
            </div>
          )}

          {error && (
            <p className="text-sm text-[var(--color-urgency-critical)] mt-[-10px]">
              {error}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            {step === 2 && (
              <SpondonButton
                type="button"
                className="w-14 h-14 shrink-0 flex items-center justify-center"
                variant="outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={24} />
              </SpondonButton>
            )}
            
            <SpondonButton
              type="submit"
              className="flex-1 h-14"
              variant="primary"
              isLoading={isLoading}
            >
              {step === 1 ? (
                <div className="flex items-center gap-2">
                  Next <ArrowRight size={20} />
                </div>
              ) : 'Complete Registration'}
            </SpondonButton>
          </div>
        </form>

        <p className="mt-8 text-center text-[var(--on-surface)]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
