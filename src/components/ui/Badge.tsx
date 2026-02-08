import { ReactNode } from 'react';

type Category = 'fiscal' | 'subvention' | 'legal' | 'event' | 'emploi';

interface BadgeProps {
  category: Category;
  children?: ReactNode;
}

const categoryStyles: Record<Category, string> = {
  fiscal: 'bg-[#19747E]/15 text-[#19747E]',
  subvention: 'bg-[#4A9B8F]/15 text-[#3d817a]',
  legal: 'bg-[#C49A6C]/15 text-[#a07d52]',
  event: 'bg-[#6B9CAD]/15 text-[#567d8a]',
  emploi: 'bg-[#A89BB5]/15 text-[#877a96]',
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
