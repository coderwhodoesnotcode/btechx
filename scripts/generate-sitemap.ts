  import fs from 'fs';
  import path from 'path';
  import { fileURLToPath } from 'url';

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOMAIN = 'https://www.btechx.net';

  const routes: string[] = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/blog',
  ];

  function generateSitemap(routes: string[]): string {
    const urls = routes
      .map((route) => {
        return `  <url>
      <loc>${DOMAIN}${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.7'}</priority>
    </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
  </urlset>`;
  }

  const sitemap = generateSitemap(routes);
  const outputPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap written to ${outputPath}`);