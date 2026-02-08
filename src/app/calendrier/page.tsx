import { Calendar } from '@/components/Calendar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Calendrier des échéances PME | Calendrier PME Québec',
  description: 'Consultez toutes les dates importantes pour votre PME québécoise: échéances fiscales, subventions, obligations légales et événements.',
};

export default function CalendrierPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-xl text-gray-900">Calendrier</span>
                <span className="font-extrabold text-xl text-[#19747E]">PME</span>
              </div>
            </Link>
            <Button variant="primary" className="text-sm sm:text-base">
              S&apos;inscrire aux rappels
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Calendrier des échéances
          </h1>
          <p className="text-gray-600">
            Cliquez sur un événement pour voir les détails
          </p>
        </div>

        <Calendar />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Calendrier PME Québec. Tous droits réservés.
            </p>
            <a 
              href="https://rayv.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Propulsé par <span className="font-bold">Ray<span className="text-[#DE7D18]">V</span></span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
