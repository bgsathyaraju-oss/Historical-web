import fs from 'fs';
import path from 'path';
import {
  resolveSeoMetadata,
  injectSeoMetadataIntoHtml,
  getAllPrerenderTargets,
} from '../src/utils/seoMetadata';

const DEFAULT_PUBLIC_ORIGIN = 'https://historical-web.web.app';
const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[Prerender SEO] Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');
const origin = (
  process.env.PUBLIC_SITE_URL ||
  process.env.APP_URL ||
  process.env.VITE_PUBLIC_SITE_URL ||
  DEFAULT_PUBLIC_ORIGIN
).replace(/\/+$/, '');

// 1. Ensure root dist/index.html has normalized absolute URLs
const homeMeta = resolveSeoMetadata({
  pathname: '/',
  search: '',
  origin,
});
fs.writeFileSync(templatePath, injectSeoMetadataIntoHtml(baseTemplate, homeMeta), 'utf-8');
fs.writeFileSync(path.join(distDir, '404.html'), injectSeoMetadataIntoHtml(baseTemplate, homeMeta), 'utf-8');

// 2. Prerender all routes and individual article/figure/record pages
const targets = getAllPrerenderTargets();
let writtenCount = 1;

for (const target of targets) {
  const cleanRoute = target.routePath.replace(/^\/+|\/+$/g, '');

  if (!target.itemId) {
    if (!cleanRoute) continue;
    const meta = resolveSeoMetadata({
      pathname: target.routePath,
      search: '',
      origin,
    });
    const html = injectSeoMetadataIntoHtml(baseTemplate, meta);
    const targetDir = path.join(distDir, cleanRoute);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
    writtenCount++;
  } else {
    const queryKey = target.queryKey || 'id';
    const meta = resolveSeoMetadata({
      pathname: target.routePath,
      search: `?${queryKey}=${encodeURIComponent(target.itemId)}`,
      origin,
    });
    const html = injectSeoMetadataIntoHtml(baseTemplate, meta);

    // Write both /<route>/<itemId>/index.html and /share/<itemId>/index.html for static hosts
    const routeItemDir = path.join(distDir, cleanRoute, target.itemId);
    fs.mkdirSync(routeItemDir, { recursive: true });
    fs.writeFileSync(path.join(routeItemDir, 'index.html'), html, 'utf-8');
    writtenCount++;

    const shareItemDir = path.join(distDir, 'share', target.itemId);
    fs.mkdirSync(shareItemDir, { recursive: true });
    fs.writeFileSync(path.join(shareItemDir, 'index.html'), html, 'utf-8');
    writtenCount++;
  }
}

console.log(`[Prerender SEO] Successfully generated ${writtenCount} static SEO-enriched HTML pages in dist/.`);
