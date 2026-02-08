import { ReactNode } from 'react';

type Category = 'fiscal' | 'subvention' | 'legal' | 'event' | 'emploi';

interface BadgeProps {
  category: Category;
  children?: ReactNode;
}

const categoryStyles: Record<Category, string> = {
  fiscal: 'bg-blue-100 text-blue-800',
  subvention: 'bg-green-100 text-green-800',
  legal: 'bg-amber-100 text-amber-800',
  event: 'bg-violet-100 text-violet-800',
  emploi: 'bg-pink-100 text-pink-800',
};

const categoryLabels: Record<Category, string> = {
  fiscal: '💰 Fiscal',
  subvention: '🎁 Subvention',
  legal: '⚖️ Légal',
  event: '📅 Événement',
  emploi: '👥 Emploi',
};

export function Badge({ category, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyles[category]}`}>
      {children || categoryLabels[category]}
    </span>
  );
}
