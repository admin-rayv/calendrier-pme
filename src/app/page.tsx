import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">
              📅 Calendrier PME
            </h1>
            <Button variant="primary">S'inscrire aux rappels</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ne manquez plus aucune
            <span className="text-primary-600"> échéance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Toutes les dates importantes pour votre PME québécoise au même endroit.
            Échéances fiscales, subventions, obligations légales.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary">Voir le calendrier</Button>
            <Button variant="secondary">En savoir plus</Button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-semibold mb-2">Échéances fiscales</h3>
            <p className="text-gray-600 text-sm mb-4">
              TPS/TVQ, acomptes provisionnels, T4, déclarations
            </p>
            <Badge category="fiscal">Fiscal</Badge>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-lg font-semibold mb-2">Subventions</h3>
            <p className="text-gray-600 text-sm mb-4">
              PCAN, CanExport, BDC, programmes provinciaux
            </p>
            <Badge category="subvention">Subvention</Badge>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-lg font-semibold mb-2">Obligations légales</h3>
            <p className="text-gray-600 text-sm mb-4">
              CNESST, normes du travail, Loi 25, REQ
            </p>
            <Badge category="legal">Légal</Badge>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Événements</h3>
            <p className="text-gray-600 text-sm mb-4">
              Salons, formations, networking
            </p>
            <Badge category="event">Événement</Badge>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Recevez les rappels par email
          </h3>
          <p className="mb-6 opacity-90">
            Inscrivez-vous gratuitement pour ne jamais manquer une date importante.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
            />
            <Button variant="accent">S'inscrire</Button>
          </div>
        </Card>
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
