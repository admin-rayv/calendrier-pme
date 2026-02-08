import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#D1E8E2]/30 to-[#A9D6E5]/20 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white font-bold text-xl shadow-lg">
            C
          </div>
          <div>
            <span className="font-extrabold text-2xl text-gray-900">Calendrier</span>
            <span className="font-extrabold text-2xl text-[#19747E]">PME</span>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-[#19747E] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Retour à l&apos;accueil
            </Button>
          </Link>
          <Link href="/calendrier">
            <Button variant="secondary" className="w-full sm:w-auto">
              Voir le calendrier
            </Button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Pages populaires:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/calendrier" className="text-[#19747E] hover:underline">
              Calendrier 2026
            </Link>
            <Link href="/#faq" className="text-[#19747E] hover:underline">
              FAQ
            </Link>
            <Link href="/#categories" className="text-[#19747E] hover:underline">
              Catégories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
