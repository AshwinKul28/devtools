const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../src/app');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DOMAIN = 'https://techtoolbox.site';

function walk(dir, baseRoute = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath, path.join(baseRoute, file)));
    } else if (file === 'page.tsx') {
      let route = baseRoute.replace(/\\/g, '/');
      if (route === '') route = '/';
      results.push(route);
    }
  });
  return results;
}

const routes = walk(APP_DIR)
  .map(route => route === '/' ? route : route.replace(/\/index$/, ''));

const urls = routes.map(route => `  <url>\n    <loc>${DOMAIN}${route}</loc>\n    <priority>0.8</priority>\n  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log('Sitemap generated with', routes.length, 'routes.'); 