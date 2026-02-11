import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmailForm } from '@/components/EmailForm';
import { getArticleBySlug, getAllArticles } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return { title: 'Article non trouvé' };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['Calendrier PME Québec'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({
    slug: article.slug,
  }));
}

// Simple markdown-like parser for content
function parseContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#19747E] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-8 border-t-2 border-gray-200" />')
    // Unordered lists
    .replace(/^- (.*)$/gim, '<li class="ml-6 list-disc text-gray-600">$1</li>')
    // Checkboxes
    .replace(/^- \[ \] (.*)$/gim, '<li class="ml-6 flex items-center gap-2"><span class="w-4 h-4 border-2 border-gray-300 rounded"></span><span class="text-gray-600">$1</span></li>')
    .replace(/^- \[x\] (.*)$/gim, '<li class="ml-6 flex items-center gap-2"><span class="w-4 h-4 bg-[#19747E] rounded flex items-center justify-center text-white text-xs">✓</span><span class="text-gray-600">$1</span></li>')
    // Ordered lists
    .replace(/^\d+\. (.*)$/gim, '<li class="ml-6 list-decimal text-gray-600">$1</li>')
    // Tables - simplified handling
    .replace(/\| (.*) \|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.some(c => c.includes('---'))) return '';
      const isHeader = !cells.some(c => c.includes('$') || c.includes('%'));
      const cellTag = isHeader ? 'th' : 'td';
      const cellClass = isHeader 
        ? 'px-4 py-2 text-left font-semibold text-gray-900 bg-gray-50' 
        : 'px-4 py-2 text-gray-600 border-t border-gray-200';
      return `<tr>${cells.map(c => `<${cellTag} class="${cellClass}">${c.trim()}</${cellTag}>`).join('')}</tr>`;
    })
    // Paragraphs
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<hr') || trimmed.startsWith('<tr')) {
        return trimmed;
      }
      return `<p class="text-gray-600 leading-relaxed mb-4">${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryColors = {
    'bon-moment': { bg: 'bg-amber-100', text: 'text-amber-700' },
    'mensuel': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'calendrier-thematique': { bg: 'bg-[#D1E8E2]', text: 'text-[#19747E]' },
  };

  const colors = categoryColors[article.category];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#19747E]">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/planificateur" className="hover:text-[#19747E]">Le Planificateur</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate max-w-[200px]">{article.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} mb-4`}>
            {article.categoryLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {article.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500 pb-8 border-b-2 border-gray-200">
            <span>📖 {article.readTime} min de lecture</span>
            <span>📅 {new Date(article.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: parseContent(article.content) }}
        />

        {/* CTA Newsletter */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <div className="bg-gradient-to-br from-[#D1E8E2] to-[#A9D6E5] rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              📬 Recevez nos prochains articles
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Guides pratiques, rappels d&apos;échéances et conseils pour entrepreneurs. Directement dans votre boîte courriel.
            </p>
            <EmailForm />
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Continuez votre lecture</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {getAllArticles()
              .filter(a => a.slug !== article.slug)
              .slice(0, 2)
              .map(related => (
                <Link
                  key={related.slug}
                  href={`/planificateur/${related.slug}`}
                  className="group bg-white rounded-2xl border-2 border-gray-200 p-5 hover:border-[#19747E]/40 transition-all"
                >
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[related.category].bg} ${categoryColors[related.category].text} mb-3`}>
                    {related.categoryLabel}
                  </span>
                  <h4 className="font-bold text-gray-900 group-hover:text-[#19747E] transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
