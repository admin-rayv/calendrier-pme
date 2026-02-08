import { ReactNode } from 'react';

type Category = 'fiscal' | 'subvention' | 'legal' | 'event' | 'emploi';

interface BadgeProps {
  category: Category;
  children?: ReactNode;
}

const categoryStyles: Record<Category, string> = {
  fiscal: 'bg-[#6B9ECF]/15 text-[#4a78a8]',
  subvention: 'bg-[#7DB895]/15 text-[#5a916f]',
  legal: 'bg-[#E8A87C]/15 text-[#c48555]',
  event: 'bg-[#9B8DC2]/15 text-[#7a6ba8]',
  emploi: 'bg-[#D4A5B5]/15 text-[#a8778a]',
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
