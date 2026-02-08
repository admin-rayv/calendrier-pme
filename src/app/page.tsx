import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmailForm } from '@/components/EmailForm';
import { JsonLd, homePageSchema } from '@/components/JsonLd';
import { getUpcomingEvents, formatDateFr, getDaysUntil, getCategoryMeta } from '@/lib/events';
import Link from 'next/link';

export default function Home() {
  const upcomingEvents = getUpcomingEvents(5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO/GEO */}
      <JsonLd data={homePageSchema} />
      {/* Header */}
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
              <a href="#categories" className="text-gray-600 hover:text-[#19747E] font-medium transition-colors">
                Catégories
              </a>
              <a href="#faq" className="text-gray-600 hover:text-[#19747E] font-medium transition-colors">
                FAQ
              </a>
            </nav>
            
            <Button variant="primary" className="text-sm sm:text-base">
              S&apos;inscrire
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#D1E8E2]/30 to-[#A9D6E5]/20 py-16 sm:py-24">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#19747E]/5 animate-float"></div>
            <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-[#A9D6E5]/20 animate-float-delay"></div>
            <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-[#D1E8E2]/40 animate-float"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#19747E]/10 border border-[#19747E]/20 text-[#19747E] text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19747E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#19747E]"></span>
                </span>
                100% gratuit pour les PME québécoises
              </div>
              
              <h1 className="animate-fade-in-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Calendrier des échéances PME
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19747E] to-[#4A9B8F]">Québec 2026</span>
              </h1>
              
              <p className="animate-fade-in-delay-2 text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Toutes les dates importantes pour votre PME au même endroit.
                Fiscal, subventions, légal — on s&apos;occupe de tout.
              </p>
              
              <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/calendrier">
                  <Button variant="primary" className="text-lg px-8 py-4 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                    Voir le calendrier →
                  </Button>
                </Link>
                <a href="#comment-ca-marche">
                  <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                    En savoir plus
                  </Button>
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>58+ échéances</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Mis à jour pour 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Rappels email gratuits</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche - Bento Style */}
        <section id="comment-ca-marche" className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              Comment ça marche
            </h2>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#D1E8E2]/60 to-white rounded-3xl border-2 border-[#19747E]/10 p-8 text-center hover:border-[#19747E]/30 transition-all duration-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-[#19747E]/20">
                  <span className="text-3xl">📅</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">1. Consultez</h4>
                <p className="text-gray-600">
                  Parcourez toutes les dates importantes organisées par catégorie
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#A9D6E5]/40 to-white rounded-3xl border-2 border-[#19747E]/10 p-8 text-center hover:border-[#19747E]/30 transition-all duration-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-[#19747E]/20">
                  <span className="text-3xl">🔔</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">2. Inscrivez-vous</h4>
                <p className="text-gray-600">
                  Recevez des notifications avant chaque échéance importante
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#D1E8E2]/60 to-white rounded-3xl border-2 border-[#19747E]/10 p-8 text-center hover:border-[#19747E]/30 transition-all duration-200">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-[#19747E]/20">
                  <span className="text-3xl">✅</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">3. Restez conforme</h4>
                <p className="text-gray-600">
                  Ne manquez plus jamais une date limite fiscale ou légale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aperçu des prochaines échéances - Bento Style */}
        <section className="py-12 sm:py-16 bg-[#D1E8E2]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              Prochaines échéances
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Voici les dates à ne pas manquer
            </p>
            <div className="max-w-3xl mx-auto space-y-3">
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntil(event.date);
                const categoryMeta = getCategoryMeta(event.category);
                return (
                  <div 
                    key={event.id} 
                    className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border-2 border-gray-200 p-5 hover:border-[#19747E]/40 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {categoryMeta?.emoji}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-500">{formatDateFr(event.date)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge category={event.category} />
                      <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                        daysUntil <= 7 
                          ? 'bg-red-50 text-red-700 border border-red-200' 
                          : daysUntil <= 30 
                            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                            : 'bg-gray-50 text-gray-700 border border-gray-200'
                      }`}>
                        {daysUntil === 0 ? "Aujourd&apos;hui" : daysUntil === 1 ? 'Demain' : `${daysUntil}j`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/calendrier">
                <Button variant="primary">Voir tout le calendrier</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories - Bento Grid */}
        <section id="categories" className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              5 catégories essentielles
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Tout ce dont votre PME a besoin pour rester organisée
            </p>
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {/* Fiscal - Large card */}
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-[#19747E]/10 to-[#19747E]/5 rounded-3xl border-2 border-[#19747E]/20 p-8 hover:border-[#19747E]/40 transition-all duration-200 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💰</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Fiscal</h4>
                <p className="text-gray-600 mb-4">
                  TPS/TVQ, T4, déclarations annuelles, acomptes provisionnels
                </p>
                <Badge category="fiscal" />
              </div>

              {/* Subventions */}
              <div className="col-span-1 bg-gradient-to-br from-[#4A9B8F]/10 to-transparent rounded-3xl border-2 border-[#4A9B8F]/20 p-6 hover:border-[#4A9B8F]/40 transition-all duration-200 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎁</div>
                <h4 className="font-bold text-gray-900 mb-1">Subventions</h4>
                <p className="text-gray-600 text-sm mb-3">
                  CRSNG, SODEC, RS&DE
                </p>
                <Badge category="subvention" />
              </div>

              {/* Légal */}
              <div className="col-span-1 bg-gradient-to-br from-[#C49A6C]/10 to-transparent rounded-3xl border-2 border-[#C49A6C]/20 p-6 hover:border-[#C49A6C]/40 transition-all duration-200 group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚖️</div>
                <h4 className="font-bold text-gray-900 mb-1">Légal</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Loi 25, équité salariale
                </p>
                <Badge category="legal" />
              </div>

              {/* Emploi - Wide card */}
              <div className="col-span-2 bg-gradient-to-r from-[#A89BB5]/10 to-[#A89BB5]/5 rounded-3xl border-2 border-[#A89BB5]/20 p-6 hover:border-[#A89BB5]/40 transition-all duration-200 group flex items-center gap-6">
                <div className="text-5xl group-hover:scale-110 transition-transform">👥</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Emploi</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Paie, jours fériés, salaire minimum, T4 employés
                  </p>
                  <Badge category="emploi" />
                </div>
              </div>

              {/* Événements - Full width accent */}
              <div className="col-span-2 md:col-span-4 bg-gradient-to-r from-[#6B9CAD]/10 via-[#A9D6E5]/10 to-[#6B9CAD]/10 rounded-3xl border-2 border-[#6B9CAD]/20 p-6 hover:border-[#6B9CAD]/40 transition-all duration-200 group">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="text-5xl group-hover:scale-110 transition-transform">📅</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Événements</h4>
                    <p className="text-gray-600 text-sm">
                      Salons, conférences, networking — ne manquez aucune opportunité
                    </p>
                  </div>
                  <Badge category="event" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Critical for GEO */}
        <section id="faq" className="py-12 sm:py-16 bg-[#D1E8E2]/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Les réponses aux questions les plus posées par les entrepreneurs québécois
            </p>
            
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/30 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h4 className="font-bold text-gray-900 pr-4">Quand dois-je produire ma déclaration T2 (impôts des sociétés)?</h4>
                  <span className="text-[#19747E] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>La déclaration T2 doit être produite dans les <strong>6 mois suivant la fin de votre exercice financier</strong>. Par exemple, si votre année fiscale se termine le 31 décembre, vous avez jusqu&apos;au 30 juin pour produire.</p>
                  <p className="mt-2">Le paiement des impôts est dû dans les 2 ou 3 mois selon votre situation (SPCC ou non).</p>
                  <a href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/societes/declarations-revenus-societes/produire-declaration-revenus-societes.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#19747E] hover:underline mt-3 text-sm font-medium">
                    Source: Agence du revenu du Canada →
                  </a>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/30 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h4 className="font-bold text-gray-900 pr-4">Quelles sont les dates limites pour la TPS/TVQ?</h4>
                  <span className="text-[#19747E] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Les dates varient selon votre période de déclaration:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Annuelle:</strong> 3 mois après la fin d&apos;exercice</li>
                    <li><strong>Trimestrielle:</strong> 1 mois après la fin du trimestre</li>
                    <li><strong>Mensuelle:</strong> 1 mois après la fin du mois</li>
                  </ul>
                  <p className="mt-2">La plupart des PME produisent trimestriellement.</p>
                  <a href="https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/declaration-de-la-tps-et-de-la-tvq/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#19747E] hover:underline mt-3 text-sm font-medium">
                    Source: Revenu Québec →
                  </a>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/30 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h4 className="font-bold text-gray-900 pr-4">C&apos;est quoi le crédit RS&DE et quand faire ma demande?</h4>
                  <span className="text-[#19747E] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Le <strong>RS&DE</strong> (Recherche scientifique et développement expérimental) est un crédit d&apos;impôt pour les entreprises qui font de l&apos;innovation. C&apos;est un des crédits les plus généreux au Canada!</p>
                  <p className="mt-2">La demande doit être faite avec votre déclaration T2, donc dans les <strong>6 mois suivant la fin de votre exercice</strong>.</p>
                  <a href="https://www.canada.ca/fr/agence-revenu/services/recherche-scientifique-developpement-experimental-programme-encouragements-fiscaux.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#19747E] hover:underline mt-3 text-sm font-medium">
                    Source: Programme RS&DE - ARC →
                  </a>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/30 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h4 className="font-bold text-gray-900 pr-4">Quand dois-je remettre les T4 et Relevé 1 à mes employés?</h4>
                  <span className="text-[#19747E] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Les feuillets <strong>T4</strong> (fédéral) et <strong>Relevé 1</strong> (Québec) doivent être remis aux employés au plus tard le <strong>28 février</strong> de l&apos;année suivante.</p>
                  <p className="mt-2">Par exemple, pour l&apos;année 2025, la date limite est le 28 février 2026.</p>
                  <a href="https://www.revenuquebec.ca/fr/entreprises/retenues-et-cotisations/produire-les-releves-et-le-sommaire/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#19747E] hover:underline mt-3 text-sm font-medium">
                    Source: Revenu Québec →
                  </a>
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/30 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h4 className="font-bold text-gray-900 pr-4">Quelles sont les obligations CNESST pour les employeurs?</h4>
                  <span className="text-[#19747E] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <p>Vous devez produire votre <strong>Déclaration des salaires</strong> à la CNESST avant le <strong>15 mars</strong> de chaque année.</p>
                  <p className="mt-2">Cette déclaration sert à calculer votre prime d&apos;assurance pour les accidents de travail. Le paiement peut être fait en un versement ou étalé sur l&apos;année.</p>
                  <a href="https://www.cnesst.gouv.qc.ca/fr/demarches-formulaires/employeurs/declaration-salaires" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#19747E] hover:underline mt-3 text-sm font-medium">
                    Source: CNESST →
                  </a>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Sources officielles */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
              Sources officielles
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Nos informations proviennent directement des organismes gouvernementaux
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="https://www.revenuquebec.ca" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/40 hover:bg-[#D1E8E2]/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#19747E]/10 flex items-center justify-center text-lg transition-colors">🏛️</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Revenu Québec</p>
                  <p className="text-xs text-gray-500">Taxes et impôts QC</p>
                </div>
              </a>
              
              <a href="https://www.canada.ca/fr/agence-revenu.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/40 hover:bg-[#D1E8E2]/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#19747E]/10 flex items-center justify-center text-lg transition-colors">🍁</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">ARC</p>
                  <p className="text-xs text-gray-500">Agence du revenu Canada</p>
                </div>
              </a>
              
              <a href="https://www.cnesst.gouv.qc.ca" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/40 hover:bg-[#D1E8E2]/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#19747E]/10 flex items-center justify-center text-lg transition-colors">🦺</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">CNESST</p>
                  <p className="text-xs text-gray-500">Santé et sécurité</p>
                </div>
              </a>
              
              <a href="https://www.investquebec.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-[#19747E]/40 hover:bg-[#D1E8E2]/10 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#19747E]/10 flex items-center justify-center text-lg transition-colors">💼</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Investissement QC</p>
                  <p className="text-xs text-gray-500">Subventions et prêts</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Email Section - Bento Style */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-[#19747E] via-[#19747E] to-[#4A9B8F] relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border-2 border-white/20 p-8 sm:p-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                  Recevez les rappels par email
                </h2>
                <p className="text-lg text-white/90 mb-8">
                  Inscrivez-vous gratuitement et ne manquez plus jamais une date importante.
                </p>
                <EmailForm variant="dark" className="max-w-md mx-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Bento Style */}
      <footer className="bg-gradient-to-b from-white to-[#D1E8E2]/30 border-t-2 border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              {/* Footer Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  C
                </div>
                <div>
                  <span className="font-extrabold text-xl text-gray-900">Calendrier</span>
                  <span className="font-extrabold text-xl text-[#19747E]">PME</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6 max-w-sm">
                L&apos;outil gratuit pour ne jamais manquer une échéance importante.
                Conçu pour les PME québécoises.
              </p>
              
              {/* Propulsé par RayV */}
              <a 
                href="https://rayv.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-gray-200 hover:border-[#19747E]/40 transition-all group"
              >
                <span className="text-gray-500 text-sm">Propulsé par</span>
                <span className="font-bold text-gray-900 group-hover:text-[#DE7D18] transition-colors">
                  Ray<span className="text-[#DE7D18]">V</span>
                </span>
              </a>
            </div>
            
            <div>
              <p className="font-bold text-lg mb-6 text-gray-900">Catégories</p>
              <ul className="space-y-3">
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Fiscal</Link></li>
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Subventions</Link></li>
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Légal</Link></li>
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Emploi</Link></li>
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Événements</Link></li>
              </ul>
            </div>
            
            <div>
              <p className="font-bold text-lg mb-6 text-gray-900">Liens</p>
              <ul className="space-y-3">
                <li><Link href="/calendrier" className="text-gray-600 hover:text-[#19747E] transition-colors">Calendrier</Link></li>
                <li><a href="#faq" className="text-gray-600 hover:text-[#19747E] transition-colors">FAQ</a></li>
                <li><a href="mailto:info@calendrierpme.ca" className="text-gray-600 hover:text-[#19747E] transition-colors">Contact</a></li>
              </ul>
              
              {/* Sources */}
              <p className="font-bold text-lg mt-8 mb-4 text-gray-900">Sources</p>
              <ul className="space-y-2">
                <li><a href="https://www.revenuquebec.ca" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors text-sm">Revenu Québec</a></li>
                <li><a href="https://www.canada.ca/fr/agence-revenu.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#19747E] transition-colors text-sm">ARC</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-2 border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Calendrier PME Québec. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-[#19747E] transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-[#19747E] transition-colors">Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
