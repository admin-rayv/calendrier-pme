'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-xl text-gray-900">Calendrier</span>
              <span className="font-extrabold text-xl text-[#19747E]">PME</span>
            </div>
          </Link>
          
          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] font-medium transition-colors">
              Calendrier
            </Link>
            <Link href="/planificateur" className="text-gray-600 hover:text-[#19747E] font-medium transition-colors">
              Le Planificateur
            </Link>
            <Link href="/#faq" className="text-gray-600 hover:text-[#19747E] font-medium transition-colors">
              FAQ
            </Link>
          </nav>
          
          <Link href="/#infolettre">
            <Button variant="primary" className="text-sm sm:text-base">
              S&apos;inscrire
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
