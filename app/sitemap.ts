import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ahmedsoura-yongonlon.com';

  const routes = [
    '',
    '/ahmed-soura',
    '/cours',
    '/centre-interculturel',
    '/yongonlon-production',
    '/agenda',
    '/reservation',
    '/boutique',
    '/galerie',
    '/dons',
    '/contact',
    '/impressum',
    '/datenschutz',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/agenda' || route === '/boutique' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/reservation' || route === '/dons' ? 0.9 : 0.8,
  }));
}
