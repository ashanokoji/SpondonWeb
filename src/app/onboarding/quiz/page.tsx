'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, AlertTriangle, Info } from 'lucide-react';
import { SpondonButton } from '@/components/ui/SpondonButton';
import { StepProgressBar } from '@/components/ui/StepProgressBar';
import { CriteriaAccordion } from '@/components/ui/CriteriaAccordion';

export default function EligibilityQuizPage() {
  const router = useRouter();
  
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    if (agreed) {
      router.push('/onboarding/tips');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] px-6 py-8">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
        <div className="mb-8">
          <StepProgressBar currentStep={2} totalSteps={4} />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Eligibility Criteria</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please review the basic requirements for blood donation to ensure safety for both you and the recipient.
        </p>
        
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pb-4">
          <CriteriaAccordion 
            title="General Requirements" 
            icon={<Info size={20} />}
            defaultExpanded={true}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Must be between 18 and 60 years old.</li>
              <li>Must weigh at least 50 kg (110 lbs).</li>
              <li>Must be in good general health and feel well.</li>
              <li>Hemoglobin level must be normal.</li>
            </ul>
          </CriteriaAccordion>

          <CriteriaAccordion 
            title="Temporary Deferrals" 
            icon={<AlertTriangle size={20} />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Pregnancy:</strong> Not eligible during pregnancy and for 6 months after delivery.</li>
              <li><strong>Medication:</strong> Taking certain medications like antibiotics.</li>
              <li><strong>Tattoos/Piercings:</strong> Must wait 6 months after getting a tattoo or body piercing.</li>
              <li><strong>Surgery:</strong> Recent major surgery (wait times vary).</li>
              <li><strong>Vaccination:</strong> Recent vaccinations (wait times vary).</li>
            </ul>
          </CriteriaAccordion>

          <CriteriaAccordion 
            title="Permanent Deferrals" 
            icon={<HelpCircle size={20} />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Positive test for HIV, Hepatitis B, or Hepatitis C.</li>
              <li>History of certain types of cancer.</li>
              <li>Chronic health conditions like severe heart disease.</li>
            </ul>
          </CriteriaAccordion>

          <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
            <input 
              type="checkbox" 
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              I have read the eligibility criteria and to the best of my knowledge, I meet the requirements to donate blood safely.
            </label>
          </div>
        </div>

        <SpondonButton
          onClick={handleNext}
          className="w-full h-14 mt-4 shrink-0"
          variant="primary"
          disabled={!agreed}
        >
          I Meet the Criteria
        </SpondonButton>
      </div>
    </div>
  );
}
