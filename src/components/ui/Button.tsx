import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#19747E] text-white hover:bg-[#156870] focus:ring-[#19747E] border-2 border-transparent hover:scale-[1.02]',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300 border-2 border-gray-200 hover:border-[#19747E]/40',
    accent: 'bg-gradient-to-r from-[#19747E] to-[#4A9B8F] text-white hover:opacity-90 focus:ring-[#19747E] border-2 border-transparent',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
