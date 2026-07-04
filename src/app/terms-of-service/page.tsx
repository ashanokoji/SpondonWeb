'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] px-6 py-8">
      <div className="max-w-3xl w-full mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-8 flex items-center gap-2 text-[var(--on-surface)] hover:text-[var(--color-primary)] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: July 2026</p>

        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p>
            Please read these Terms of Service carefully before using the Spondon platform.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Spondon, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Use of Service</h2>
          <p>
            Spondon is a platform designed to connect blood donors with those in need. You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the platform.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account on our service.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Health and Medical Disclaimer</h2>
          <p>
            Spondon is a matching platform and does not provide medical advice. We do not verify the medical eligibility of donors. The responsibility for determining donor eligibility and ensuring safe blood transfusion lies entirely with the medical professionals at the donation facility or hospital.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall Spondon, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </div>
      </div>
    </div>
  );
}
