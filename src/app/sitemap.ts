import { MetadataRoute } from 'next';

const baseUrl = 'https://calendrierpme.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calendrier`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
