export interface Article {
  slug: string;
  title: string;
  description: string;
  category: 'bon-moment' | 'mensuel' | 'calendrier-thematique';
  categoryLabel: string;
  date: string;
  readTime: number;
  image?: string;
  content: string;
}
