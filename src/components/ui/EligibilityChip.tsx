import React from 'react';
import { DeferralType } from '@/types';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface EligibilityChipProps {
  status: DeferralType | string;
  className?: string;
}

export function EligibilityChip({ status, className = '' }: EligibilityChipProps) {
  let bgColor = 'var(--surface-variant)';
  let textColor = 'var(--on-surface)';
  let label = 'Unknown';
  let Icon = Clock;

  if (status === DeferralType.ELIGIBLE || status === 'ELIGIBLE') {
    bgColor = 'var(--color-eligible)';
    textColor = '#FFFFFF';
    label = 'Eligible';
    Icon = CheckCircle2;
  } else if (status === DeferralType.TEMPORARY || status === 'TEMPORARY') {
    bgColor = 'var(--color-deferred)';
    textColor = '#FFFFFF';
    label = 'Deferred';
    Icon = Clock;
  } else if (status === DeferralType.PERMANENT || status === 'PERMANENT') {
    bgColor = 'var(--color-ineligible)';
    textColor = '#FFFFFF';
    label = 'Ineligible';
    Icon = XCircle;
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <Icon size={14} className="mr-1.5" />
      <span className="label-large">{label}</span>
    </div>
  );
}
