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

// Parse markdown tables
function parseTable(tableLines: string[]): string {
  if (tableLines.length < 2) return '';
  
  const rows: string[][] = [];
  let hasHeader = false;
  
  for (const line of tableLines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    
    // Check if it's a separator line
    if (trimmed.match(/^\|[\s\-:|]+\|$/)) {
      hasHeader = true;
      continue;
    }
    
    const cells = trimmed
      .split('|')
      .slice(1, -1) // Remove empty first and last from split
      .map(c => c.trim());
    
    if (cells.length > 0) {
      rows.push(cells);
    }
  }
  
  if (rows.length === 0) return '';
  
  let html = '<div class="overflow-x-auto my-6"><table class="w-full border-collapse rounded-xl overflow-hidden border-2 border-gray-200">';
  
  rows.forEach((row, index) => {
    const isHeaderRow = hasHeader && index === 0;
    const cellTag = isHeaderRow ? 'th' : 'td';
    const cellClass = isHeaderRow
      ? 'px-4 py-3 text-left font-semibold text-gray-900 bg-[#D1E8E2]/50'
      : 'px-4 py-3 text-gray-600 border-t border-gray-200';
    
    html += '<tr>';
    row.forEach(cell => {
      html += `<${cellTag} class="${cellClass}">${cell}</${cellTag}>`;
    });
    html += '</tr>';
  });
  
  html += '</table></div>';
  return html;
}

// Improved markdown parser
function parseContent(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let i = 0;
  let inList = false;
  let listItems: string[] = [];
  
  const flushList = () => {
    if (listItems.length > 0) {
      const isOrdered = listItems[0].startsWith('<li class="ordered');
      const tag = isOrdered ? 'ol' : 'ul';
      result.push(`<${tag} class="my-4 space-y-2">${listItems.join('')}</${tag}>`);
      listItems = [];
      inList = false;
    }
  };
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Empty line
    if (!trimmed) {
      flushList();
      i++;
      continue;
    }
    
    // Table detection
    if (trimmed.startsWith('|')) {
      flushList();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      result.push(parseTable(tableLines));
      continue;
    }
    
    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      result.push(`<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">${trimmed.slice(4)}</h3>`);
      i++;
      continue;
    }
    
    if (trimmed.startsWith('## ')) {
      flushList();
      result.push(`<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">${trimmed.slice(3)}</h2>`);
      i++;
      continue;
    }
    
    // Horizontal rule
    if (trimmed === '---') {
      flushList();
      result.push('<hr class="my-8 border-t-2 border-gray-200" />');
      i++;
      continue;
    }
    
    // Checkbox list items
    if (trimmed.startsWith('- [ ] ')) {
      inList = true;
      const text = formatInlineMarkdown(trimmed.slice(6));
      listItems.push(`<li class="flex items-start gap-3 text-gray-600"><span class="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded flex-shrink-0"></span><span>${text}</span></li>`);
      i++;
      continue;
    }
    
    if (trimmed.startsWith('- [x] ')) {
      inList = true;
      const text = formatInlineMarkdown(trimmed.slice(6));
      listItems.push(`<li class="flex items-start gap-3 text-gray-600"><span class="w-5 h-5 mt-0.5 bg-[#19747E] rounded flex-shrink-0 flex items-center justify-center text-white text-xs">✓</span><span>${text}</span></li>`);
      i++;
      continue;
    }
    
    // Unordered list items
    if (trimmed.startsWith('- ')) {
      inList = true;
      const text = formatInlineMarkdown(trimmed.slice(2));
      listItems.push(`<li class="ml-6 list-disc text-gray-600">${text}</li>`);
      i++;
      continue;
    }
    
    // Ordered list items
    const orderedMatch = trimmed.match(/^(\d+)\. (.*)$/);
    if (orderedMatch) {
      inList = true;
      const text = formatInlineMarkdown(orderedMatch[2]);
      listItems.push(`<li class="ordered ml-6 list-decimal text-gray-600">${text}</li>`);
      i++;
      continue;
    }
    
    // Regular paragraph
    flushList();
    
    // Collect paragraph lines
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() && 
           !lines[i].trim().startsWith('#') && 
           !lines[i].trim().startsWith('|') &&
           !lines[i].trim().startsWith('- ') &&
           !lines[i].trim().match(/^\d+\. /) &&
           lines[i].trim() !== '---') {
      paraLines.push(lines[i].trim());
      i++;
    }
    
    if (paraLines.length > 0) {
      const text = formatInlineMarkdown(paraLines.join(' '));
      result.push(`<p class="text-gray-600 leading-relaxed mb-4">${text}</p>`);
    }
  }
  
  flushList();
  return result.join('\n');
}

// Format inline markdown (bold, italic, links)
function formatInlineMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#19747E] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
}

// Schema.org Article markup
function getArticleSchema(article: { title: string; description: string; date: string; slug: string; readTime: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Calendrier PME Québec',
      url: 'https://calendrierpme.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calendrier PME Québec',
      url: 'https://calendrierpme.ca',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://calendrierpme.ca/planificateur/${article.slug}`,
    },
    wordCount: article.readTime * 200, // Estimate
    inLanguage: 'fr-CA',
  };
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
  const articleSchema = getArticleSchema(article);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org Article markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-[#19747E]" itemProp="item"><span itemProp="name">Accueil</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li>/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/planificateur" className="hover:text-[#19747E]" itemProp="item"><span itemProp="name">Le Planificateur</span></Link>
              <meta itemProp="position" content="2" />
            </li>
            <li>/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-900 font-medium truncate max-w-[200px]" itemProp="name">{article.title}</span>
              <meta itemProp="position" content="3" />
            </li>
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
            <time dateTime={article.date}>
              📅 {new Date(article.date).toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </header>

        {/* Content */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: parseContent(article.content) }}
        />

        {/* CTA Newsletter */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <div className="bg-gradient-to-br from-[#D1E8E2] to-[#A9D6E5] rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              📬 Recevez nos prochains articles
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Guides pratiques, rappels d&apos;échéances et conseils pour entrepreneurs. Directement dans votre boîte courriel.
            </p>
            <EmailForm />
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Continuez votre lecture</h2>
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
                  <h3 className="font-bold text-gray-900 group-hover:text-[#19747E] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
