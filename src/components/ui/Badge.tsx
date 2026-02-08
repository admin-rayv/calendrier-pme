import { ReactNode } from 'react';

type Category = 'fiscal' | 'subvention' | 'legal' | 'event' | 'emploi';

interface BadgeProps {
  category: Category;
  children?: ReactNode;
}

// Colors adjusted for WCAG AA contrast ratio (4.5:1 minimum)
const categoryStyles: Record<Category, string> = {
  fiscal: 'bg-[#19747E]/10 text-[#145f66] border-[#19747E]/30',
  subvention: 'bg-[#4A9B8F]/10 text-[#2d6b62] border-[#4A9B8F]/30',
  legal: 'bg-[#C49A6C]/10 text-[#7a5c3a] border-[#C49A6C]/30',
  event: 'bg-[#6B9CAD]/10 text-[#3d6878] border-[#6B9CAD]/30',
  emploi: 'bg-[#A89BB5]/10 text-[#5f5470] border-[#A89BB5]/30',
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
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${categoryStyles[category]}`}>
      {children || categoryLabels[category]}
    </span>
  );
}
