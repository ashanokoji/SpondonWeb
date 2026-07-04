'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SpondonTextField } from '@/components/ui/SpondonTextField';
import { SpondonButton } from '@/components/ui/SpondonButton';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <button 
          onClick={() => router.back()} 
          className="absolute top-6 left-6 p-2 rounded-full bg-[var(--surface)] shadow-md text-[var(--on-surface)] hover:text-[var(--color-primary)] transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="mb-10 flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface)] shadow-lg shadow-[var(--color-primary)]/10">
            <Lock size={32} className="text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
            Reset Password
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-[var(--surface)] shadow-sm animate-in fade-in zoom-in duration-300">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We've sent a password reset link to <br />
                <span className="font-semibold">{email}</span>
              </p>
            </div>
            <SpondonButton
              onClick={() => router.push('/login')}
              className="w-full mt-2"
              variant="primary"
            >
              Back to Login
            </SpondonButton>
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-6">
            <SpondonTextField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={20} />}
              error={error}
            />

            <SpondonButton
              type="submit"
              className="w-full h-14"
              variant="primary"
              isLoading={isLoading}
            >
              Send Reset Link
            </SpondonButton>
          </form>
        )}

        <p className="mt-8 text-center text-[var(--on-surface)]">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
