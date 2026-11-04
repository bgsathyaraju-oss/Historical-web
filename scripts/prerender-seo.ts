import fs from 'fs';
import path from 'path';
import {
  resolveSeoMetadata,
  injectSeoMetadataIntoHtml,
  getAllPrerenderTargets,
} from '../src/utils/seoMetadata.ts';

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

// 1. Ensure root dist/index.html and dist/404.html have normalized absolute URLs
const homeMeta = resolveSeoMetadata({
  pathname: '/',
  search: '',
  origin,
});
const enrichedHomeHtml = injectSeoMetadataIntoHtml(baseTemplate, homeMeta);
fs.writeFileSync(templatePath, enrichedHomeHtml, 'utf-8');
fs.writeFileSync(path.join(distDir, '404.html'), enrichedHomeHtml, 'utf-8');

let writtenCount = 2;

// 2. Optionally prerender static route subdirectories when deploying to purely static hosts
if (process.env.PRERENDER_STATIC_DIRS === 'true') {
  const targets = getAllPrerenderTargets();
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
}

console.log(`[Prerender SEO] Successfully generated ${writtenCount} SEO-enriched HTML entry points in dist/.`);
