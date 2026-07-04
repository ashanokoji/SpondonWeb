'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: July 2026</p>

        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p>
            Welcome to Spondon. We are committed to protecting your personal information and your right to privacy.
            If you have any questions or concerns about our policy, or our practices with regards to your personal
            information, please contact us.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us when registering at the Services, expressing an 
            interest in obtaining information about us or our products and services, when participating in activities 
            on the Services or otherwise contacting us.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Personal Info Provided by You:</strong> We collect names; phone numbers; email addresses; and other similar information.</li>
            <li><strong>Medical Info:</strong> Blood group, weight, and donation history are collected strictly to facilitate blood donation matching.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Services for a variety of business purposes described below:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>To facilitate account creation and logon process.</li>
            <li>To manage user accounts and facilitate blood donation matching.</li>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your requests.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <p className="mt-2">
            Your phone number is hidden by default and only shared with users whose blood requests you accept, unless you explicitly change this in your privacy settings.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
            that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </div>
      </div>
    </div>
  );
}
