import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'accent';
}

export function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  const variants = {
    default: 'bg-white border-2 border-gray-200 hover:border-[#19747E]/40',
    glass: 'bg-white/60 backdrop-blur-sm border border-gray-200/50',
    accent: 'bg-gradient-to-br from-[#D1E8E2] to-white border-2 border-[#19747E]/20',
  };

  return (
    <div 
      className={`rounded-2xl p-6 transition-all duration-200 ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
