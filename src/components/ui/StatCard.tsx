import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, color = 'var(--color-primary)', className = '' }: StatCardProps) {
  return (
    <div className={`flex items-center p-4 bg-[var(--surface)] rounded-[var(--radius-lg)] shadow-sm border border-black/5 dark:border-white/5 ${className}`}>
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-md)] mr-4"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <div className="label-medium text-[var(--on-surface)] opacity-70 mb-0.5">{title}</div>
        <div className="headline-medium text-[var(--on-bg)]">{value}</div>
      </div>
    </div>
  );
}
