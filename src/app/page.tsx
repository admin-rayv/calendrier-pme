import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmailForm } from '@/components/EmailForm';
import { getUpcomingEvents, formatDateFr, getDaysUntil, getCategoryMeta } from '@/lib/events';
import Link from 'next/link';

export default function Home() {
  const upcomingEvents = getUpcomingEvents(5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-600">
              📅 Calendrier PME
            </h1>
            <Button variant="primary" className="text-sm sm:text-base">
              S&apos;inscrire
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Ne manquez plus aucune
                <span className="text-primary-600"> échéance</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Toutes les dates importantes pour votre PME québécoise au même endroit.
                Échéances fiscales, subventions, obligations légales et plus encore.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/calendrier">
                  <Button variant="primary" className="text-lg px-8 py-3 w-full sm:w-auto">
                    Voir le calendrier
                  </Button>
                </Link>
                <a href="#comment-ca-marche">
                  <Button variant="secondary" className="text-lg px-8 py-3 w-full sm:w-auto">
                    En savoir plus
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche - Clean lines */}
        <section id="comment-ca-marche" className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              Comment ça marche
            </h3>
            <div className="divide-y-2 divide-gray-100">
              <div className="flex items-start gap-6 py-8">
                <span className="text-4xl">📅</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">1. Consultez</h4>
                  <p className="text-gray-600">
                    Parcourez toutes les dates importantes organisées par catégorie
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 py-8">
                <span className="text-4xl">🔔</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">2. Inscrivez-vous</h4>
                  <p className="text-gray-600">
                    Recevez des notifications avant chaque échéance importante
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 py-8">
                <span className="text-4xl">✅</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">3. Restez conforme</h4>
                  <p className="text-gray-600">
                    Ne manquez plus jamais une date limite fiscale ou légale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aperçu des prochaines échéances - Clean lines */}
        <section className="py-12 sm:py-16 bg-[#D1E8E2]/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              Prochaines échéances
            </h3>
            <p className="text-center text-gray-600 mb-8">
              Voici les dates à ne pas manquer
            </p>
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => {
                  const daysUntil = getDaysUntil(event.date);
                  const categoryMeta = getCategoryMeta(event.category);
                  return (
                    <div 
                      key={event.id} 
                      className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl flex-shrink-0">{categoryMeta?.emoji}</span>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                        <p className="text-sm text-gray-500">{formatDateFr(event.date)}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Badge category={event.category} />
                        <span className={`text-sm font-bold ${
                          daysUntil <= 7 
                            ? 'text-red-600' 
                            : daysUntil <= 30 
                              ? 'text-amber-600' 
                              : 'text-gray-500'
                        }`}>
                          {daysUntil === 0 ? "Aujourd'hui" : daysUntil === 1 ? 'Demain' : `${daysUntil}j`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/calendrier">
                <Button variant="primary">Voir tout le calendrier</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories - Clean lines */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              5 catégories essentielles
            </h3>
            <p className="text-center text-gray-600 mb-12">
              Tout ce dont votre PME a besoin pour rester organisée
            </p>
            
            <div className="divide-y-2 divide-gray-100">
              <div className="flex items-center gap-6 py-6 group">
                <span className="text-4xl">💰</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">Fiscal</h4>
                  <p className="text-gray-600 text-sm">TPS/TVQ, T4, déclarations annuelles</p>
                </div>
                <Badge category="fiscal" />
              </div>
              
              <div className="flex items-center gap-6 py-6 group">
                <span className="text-4xl">🎁</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">Subventions</h4>
                  <p className="text-gray-600 text-sm">CRSNG, SODEC, RS&DE</p>
                </div>
                <Badge category="subvention" />
              </div>
              
              <div className="flex items-center gap-6 py-6 group">
                <span className="text-4xl">⚖️</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">Légal</h4>
                  <p className="text-gray-600 text-sm">Loi 25, équité salariale</p>
                </div>
                <Badge category="legal" />
              </div>
              
              <div className="flex items-center gap-6 py-6 group">
                <span className="text-4xl">👥</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">Emploi</h4>
                  <p className="text-gray-600 text-sm">Paie, jours fériés, salaire minimum</p>
                </div>
                <Badge category="emploi" />
              </div>
              
              <div className="flex items-center gap-6 py-6 group">
                <span className="text-4xl">📅</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900">Événements</h4>
                  <p className="text-gray-600 text-sm">Salons, conférences, networking</p>
                </div>
                <Badge category="event" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Email Section */}
        <section className="py-12 sm:py-16 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Recevez les rappels par email
              </h3>
              <p className="text-lg opacity-90 mb-8">
                Inscrivez-vous gratuitement et ne manquez plus jamais une date importante.
              </p>
              <EmailForm variant="dark" className="max-w-md mx-auto" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-xl font-bold mb-4">📅 Calendrier PME Québec</h4>
              <p className="text-gray-400 mb-4">
                L&apos;outil gratuit pour ne jamais manquer une échéance importante.
                Conçu pour les PME québécoises.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Catégories</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">💰 Fiscal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🎁 Subventions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">⚖️ Légal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">👥 Emploi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">📅 Événements</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Légal</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions d&apos;utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 Calendrier PME Québec. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
