import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllArticles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Le Planificateur | Articles et guides pour PME',
  description: 'Conseils pratiques, guides mensuels et calendriers thématiques pour les entrepreneurs québécois. Sachez exactement quoi faire et quand le faire.',
  openGraph: {
    title: 'Le Planificateur | Calendrier PME Québec',
    description: 'Conseils pratiques et guides pour les PME québécoises.',
  },
};

export default function PlanificateurPage() {
  const articles = getAllArticles();
  
  const bonMomentArticles = articles.filter(a => a.category === 'bon-moment');
  const mensuelArticles = articles.filter(a => a.category === 'mensuel');
  const thematiqueArticles = articles.filter(a => a.category === 'calendrier-thematique');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#19747E]/10 text-[#19747E] mb-4">
            📚 Le Planificateur
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Guides et conseils pour{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19747E] to-[#4A9B8F]">
              entrepreneurs
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des articles pratiques pour savoir quoi faire et quand le faire. 
            Parce que le timing, c&apos;est tout en affaires.
          </p>
        </div>

        {/* Le bon moment pour... */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl">
              ⏰
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Le bon moment pour...</h2>
              <p className="text-gray-600">Savoir quand agir fait toute la différence</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {bonMomentArticles.map(article => (
              <Link 
                key={article.slug}
                href={`/planificateur/${article.slug}`}
                className="group bg-white rounded-3xl border-2 border-gray-200 p-6 hover:border-[#19747E]/40 hover:shadow-lg transition-all"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 mb-4">
                  {article.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#19747E] transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📖 {article.readTime} min de lecture</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Guides mensuels */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xl">
              📅
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Guides mensuels</h2>
              <p className="text-gray-600">Ce que vous devez faire chaque mois</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mensuelArticles.map(article => (
              <Link 
                key={article.slug}
                href={`/planificateur/${article.slug}`}
                className="group bg-white rounded-3xl border-2 border-gray-200 p-6 hover:border-[#19747E]/40 hover:shadow-lg transition-all"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mb-4">
                  {article.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#19747E] transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📖 {article.readTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Calendriers thématiques */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#19747E] to-[#4A9B8F] flex items-center justify-center text-white text-xl">
              🗓️
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Calendriers thématiques</h2>
              <p className="text-gray-600">Plans complets pour chaque étape</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {thematiqueArticles.map(article => (
              <Link 
                key={article.slug}
                href={`/planificateur/${article.slug}`}
                className="group bg-white rounded-3xl border-2 border-gray-200 p-6 hover:border-[#19747E]/40 hover:shadow-lg transition-all"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#D1E8E2] text-[#19747E] mb-4">
                  {article.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#19747E] transition-colors mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📖 {article.readTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Newsletter */}
        <section className="bg-gradient-to-br from-[#19747E] to-[#4A9B8F] rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ne manquez plus aucune échéance
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Recevez nos guides mensuels et rappels d&apos;échéances directement dans votre boîte courriel.
          </p>
          <Link 
            href="/#infolettre"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#19747E] font-semibold hover:bg-gray-100 transition-colors"
          >
            S&apos;inscrire à l&apos;infolettre →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
