import { Calendar } from '@/components/Calendar';
import { Button } from '@/components/ui/Button';
import { JsonLd, calendarPageSchema } from '@/components/JsonLd';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendrier des échéances fiscales PME 2026',
  description: 'Calendrier interactif des dates limites fiscales, subventions et obligations légales pour les PME au Québec en 2026. Filtrez par catégorie: T2, TPS/TVQ, CNESST, RS&DE et plus.',
  alternates: {
    canonical: 'https://calendrierpme.ca/calendrier',
  },
  openGraph: {
    title: 'Calendrier des échéances PME Québec 2026',
    description: 'Calendrier interactif avec toutes les dates fiscales et légales importantes pour votre entreprise.',
    url: 'https://calendrierpme.ca/calendrier',
  },
};

export default function CalendrierPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO/GEO */}
      <JsonLd data={calendarPageSchema} />
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
        {/* Breadcrumb for SEO */}
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-[#19747E] transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Calendrier</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Calendrier des échéances fiscales et légales 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Toutes les dates importantes pour votre PME québécoise: déclarations T2, TPS/TVQ, 
            T4, CNESST, subventions et plus. Cliquez sur un événement pour voir les détails.
          </p>
        </div>

        <Calendar />
        
        {/* SEO Content */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            À propos du calendrier des échéances PME
          </h2>
          <div className="prose prose-gray text-gray-600 space-y-4">
            <p>
              Ce calendrier regroupe toutes les <strong>dates limites fiscales</strong> et 
              <strong> obligations légales</strong> importantes pour les petites et moyennes 
              entreprises au Québec en 2026.
            </p>
            <p>
              Vous y trouverez les échéances pour la <strong>déclaration T2</strong> (impôts des sociétés), 
              les remises de <strong>TPS/TVQ</strong>, les <strong>T4 et Relevé 1</strong> pour vos employés, 
              la <strong>déclaration CNESST</strong>, les dates limites pour le <strong>crédit RS&DE</strong>, 
              et bien plus encore.
            </p>
            <p>
              Utilisez les filtres par catégorie pour afficher uniquement les échéances qui vous concernent: 
              fiscal, subventions, légal, emploi ou événements.
            </p>
          </div>
          
          {/* Internal links */}
          <div className="mt-8 p-6 bg-[#D1E8E2]/20 rounded-2xl">
            <h3 className="font-bold text-gray-900 mb-3">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#faq" className="text-[#19747E] hover:underline">
                  → Questions fréquentes sur les échéances fiscales
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-[#19747E] hover:underline">
                  → Découvrir les 5 catégories d&apos;échéances
                </Link>
              </li>
              <li>
                <a href="https://www.revenuquebec.ca" target="_blank" rel="noopener noreferrer" className="text-[#19747E] hover:underline">
                  → Site officiel de Revenu Québec
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer - Bento Style */}
      <footer className="bg-gradient-to-b from-white to-[#D1E8E2]/30 border-t-2 border-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Calendrier PME Québec. Tous droits réservés.
            </p>
            <a 
              href="https://rayv.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#19747E] transition-colors"
            >
              Propulsé par <span className="font-bold text-gray-900">Ray<span className="text-[#DE7D18]">V</span></span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
