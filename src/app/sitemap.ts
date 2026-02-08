import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calendrierpme.ca';
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/calendrier`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Section anchors for better crawling
    {
      url: `${baseUrl}/#faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#categories`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}
