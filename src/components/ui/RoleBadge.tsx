import React from 'react';
import { CommunityRole } from '@/types';

interface RoleBadgeProps {
  role: CommunityRole | string;
  className?: string;
}

export function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  let bgColor = 'var(--surface-variant)';
  let textColor = 'var(--on-surface)';
  let label = 'Member';

  if (role === CommunityRole.ADMIN || role === 'ADMIN') {
    bgColor = 'var(--color-primary)';
    textColor = '#FFFFFF';
    label = 'Admin';
  } else if (role === CommunityRole.MODERATOR || role === 'MODERATOR') {
    bgColor = 'var(--color-secondary)';
    textColor = '#FFFFFF';
    label = 'Moderator';
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </span>
  );
}
