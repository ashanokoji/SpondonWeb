'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SpondonTextField } from '@/components/ui/SpondonTextField';
import { SpondonButton } from '@/components/ui/SpondonButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      await loginWithGoogle();
      router.push('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[var(--bg)] to-[var(--surface-variant)] px-6">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface)] shadow-lg shadow-[var(--color-primary)]/10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="var(--color-primary)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Sign in to continue saving lives
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={20} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          {error && (
            <p className="text-sm text-[var(--color-urgency-critical)] mt-[-10px]">
              {error}
            </p>
          )}

          <div className="flex justify-end mt-[-5px]">
            <Link 
              href="/forgot-password" 
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <SpondonButton
            type="submit"
            className="w-full h-14 mt-4"
            variant="primary"
            isLoading={isLoading}
          >
            Login
          </SpondonButton>
          
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-[var(--on-bg)] opacity-10"></div>
            <span className="flex-shrink-0 mx-4 text-sm text-[var(--on-surface)] opacity-50">or</span>
            <div className="flex-grow border-t border-[var(--on-bg)] opacity-10"></div>
          </div>

          <SpondonButton
            type="button"
            className="w-full h-14"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </div>
          </SpondonButton>
        </form>

        <p className="mt-8 text-center text-[var(--on-surface)]">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-[var(--color-primary)] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
