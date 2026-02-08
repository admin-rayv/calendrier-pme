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
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-600 hover:opacity-80 transition-opacity">
              📅 Calendrier PME
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
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Calendrier PME Québec. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
