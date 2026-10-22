import { Router, type Request, type Response } from 'express';
import { getDb, saveDb, addAuditLog, computeStatistics } from '../db.ts';
import type { LanguageCode } from '../../src/types/index.ts';
import {
  ARTICLE_TRANSLATIONS,
  FIGURE_TRANSLATIONS,
  DYNASTY_TRANSLATIONS,
  INSCRIPTION_TRANSLATIONS,
  MONUMENT_TRANSLATIONS
} from '../contentTranslations.ts';

export const contentRouter = Router();

// Site Statistics
contentRouter.get('/statistics', (_req: Request, res: Response) => {
  const stats = computeStatistics();
  res.json({ statistics: stats });
});

// Articles
contentRouter.get('/articles', (req: Request, res: Response) => {
  const db = getDb();
  const { category, tag, status, lang } = req.query;

  let list = db.articles;

  if (category && typeof category === 'string' && category !== 'All') {
    list = list.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  if (tag && typeof tag === 'string') {
    list = list.filter(a => a.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  if (status && typeof status === 'string' && status !== 'All') {
    list = list.filter(a => a.verification_status.toLowerCase() === status.toLowerCase());
  }

  // Handle translation overlay if lang requested
  const langCode = (lang as LanguageCode) || 'en';
  const mapped = list.map(a => {
    const builtinTr = (ARTICLE_TRANSLATIONS as Record<string, any>)[a.id]?.[langCode];
    const userTr = (a.translations as Record<string, any> | undefined)?.[langCode];
    if (langCode !== 'en' && (userTr || builtinTr)) {
      const tr = userTr || builtinTr!;
      return {
        ...a,
        display_title: tr.title,
        display_content: tr.content,
        display_summary: tr.summary,
        translation_status: (tr as any).status || 'reviewed',
        has_translation: true
      };
    }
    return {
      ...a,
      display_title: a.original_title,
      display_content: a.original_content,
      display_summary: a.summary,
      has_translation: langCode === 'en'
    };
  });

  res.json({ articles: mapped });
});

// Single Article by id or slug
contentRouter.get('/articles/:idOrSlug', (req: Request, res: Response) => {
  const db = getDb();
  const { idOrSlug } = req.params;
  const lang = (req.query.lang as LanguageCode) || 'en';

  const article = db.articles.find(a => a.id === idOrSlug || a.slug === idOrSlug);
  if (!article) {
    return res.status(404).json({ error: 'Article not found.' });
  }

  let displayTitle = article.original_title;
  let displayContent = article.original_content;
  let displaySummary = article.summary;
  let translationStatus = undefined;
  let hasTranslation = true;

  if (lang !== 'en') {
    const builtinTr = (ARTICLE_TRANSLATIONS as Record<string, any>)[article.id]?.[lang];
    const userTr = (article.translations as Record<string, any> | undefined)?.[lang];
    if (userTr) {
      displayTitle = userTr.title;
      displayContent = userTr.content;
      displaySummary = userTr.summary;
      translationStatus = userTr.status;
    } else if (builtinTr) {
      displayTitle = builtinTr.title;
      displayContent = builtinTr.content;
      displaySummary = builtinTr.summary;
      translationStatus = 'reviewed';
    } else {
      hasTranslation = false;
    }
  }

  return res.json({
    article: {
      ...article,
      display_title: displayTitle,
      display_content: displayContent,
      display_summary: displaySummary,
      translation_status: translationStatus,
      has_translation: hasTranslation
    }
  });
});

// Translations Dictionary for a language
contentRouter.get('/translations/:lang', (req: Request, res: Response) => {
  const db = getDb();
  const lang = req.params.lang as LanguageCode;

  const translations: Record<string, { title: string; summary: string; content: string; status?: string; translator_name?: string }> = {};

  // 1. Collect from ARTICLE_TRANSLATIONS
  for (const [articleId, langMap] of Object.entries(ARTICLE_TRANSLATIONS as Record<string, any>)) {
    if (langMap[lang]) {
      translations[articleId] = {
        title: langMap[lang].title,
        summary: langMap[lang].summary,
        content: langMap[lang].content,
        status: 'reviewed'
      };
    }
  }

  // 2. Overlay with any article-level translations from db
  for (const article of db.articles) {
    const userTr = (article.translations as Record<string, any> | undefined)?.[lang];
    if (userTr) {
      translations[article.id] = {
        title: userTr.title,
        summary: userTr.summary,
        content: userTr.content,
        status: userTr.status,
        translator_name: userTr.translator_name
      };
    }
  }

  res.json({ language: lang, translations });
});

// Save or submit article translation
contentRouter.post('/articles/:id/translations', (req: Request, res: Response) => {
  const db = getDb();
  const { id } = req.params;
  const { language, title, content, summary, translator_name } = req.body;

  if (!language || !title || !content) {
    return res.status(400).json({ error: 'Language, title, and content are required.' });
  }

  const article = db.articles.find(a => a.id === id || a.slug === id);
  if (!article) {
    return res.status(404).json({ error: 'Article not found.' });
  }

  if (!article.translations) {
    article.translations = {} as any;
  }
  const trRecord = article.translations as Record<LanguageCode, any>;

  const user = (req as any).user;
  const translatorName = translator_name || (user?.profile?.full_name) || (user?.email) || 'Community Contributor';

  trRecord[language as LanguageCode] = {
    title,
    content,
    summary: summary || title,
    status: (user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'translator' || user?.role === 'historical_editor') ? 'reviewed' : 'pending',
    translator_name: translatorName,
    last_updated: new Date().toISOString()
  };

  saveDb(db);

  if (user) {
    addAuditLog(user.id, user.email, 'CREATE_TRANSLATION', 'article', article.id, `Translation added for language ${language}`);
  }

  return res.json({
    message: 'Translation saved successfully.',
    article
  });
});

// Historical Figures
contentRouter.get('/figures', (req: Request, res: Response) => {
  const db = getDb();
  const { dynasty, lang } = req.query;
  const langCode = (lang as any) || 'en';
  let list = db.figures;

  if (dynasty && typeof dynasty === 'string') {
    list = list.filter(f => f.dynasty_id === dynasty || f.dynasty_name.toLowerCase().includes(dynasty.toLowerCase()));
  }

  const mapped = list.map(f => {
    const tr = (FIGURE_TRANSLATIONS as Record<string, any>)[f.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...f,
        name: tr.name || f.name,
        dynasty_name: tr.dynasty_name || f.dynasty_name,
        biography: tr.biography || f.biography,
        known_titles: tr.known_titles || f.known_titles,
        associated_places: tr.associated_places || f.associated_places
      };
    }
    return f;
  });

  res.json({ figures: mapped });
});

// Single Figure
contentRouter.get('/figures/:id', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as any) || 'en';
  const figure = db.figures.find(f => f.id === req.params.id);
  if (!figure) return res.status(404).json({ error: 'Historical figure not found.' });

  const tr = (FIGURE_TRANSLATIONS as Record<string, any>)[figure.id]?.[langCode];
  if (langCode !== 'en' && tr) {
    return res.json({
      figure: {
        ...figure,
        name: tr.name || figure.name,
        dynasty_name: tr.dynasty_name || figure.dynasty_name,
        biography: tr.biography || figure.biography,
        known_titles: tr.known_titles || figure.known_titles,
        associated_places: tr.associated_places || figure.associated_places
      }
    });
  }

  res.json({ figure });
});

// Dynasties
contentRouter.get('/dynasties', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as any) || 'en';
  const mapped = db.dynasties.map(d => {
    const tr = (DYNASTY_TRANSLATIONS as Record<string, any>)[d.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...d,
        name: tr.name || d.name,
        capital: tr.capital || d.capital,
        origin_region: tr.origin_region || d.origin_region,
        overview: tr.overview || d.overview
      };
    }
    return d;
  });

  res.json({ dynasties: mapped });
});

// Genealogy Nodes
contentRouter.get('/genealogy', (_req: Request, res: Response) => {
  const db = getDb();
  res.json({ genealogy: db.genealogy });
});

// Timeline Events
contentRouter.get('/timeline', (_req: Request, res: Response) => {
  const db = getDb();
  const sorted = [...db.events_timeline].sort((a, b) => a.sort_year - b.sort_year);
  res.json({ events: sorted });
});

// Locations
contentRouter.get('/locations', (req: Request, res: Response) => {
  const db = getDb();
  const { region } = req.query;
  let list = db.locations;
  if (region && typeof region === 'string' && region !== 'All') {
    list = list.filter(l => l.region.toLowerCase() === region.toLowerCase());
  }
  res.json({ locations: list });
});

// Inscriptions
contentRouter.get('/inscriptions', (req: Request, res: Response) => {
  const db = getDb();
  const { ruler, language, lang } = req.query;
  const langCode = (lang as any) || 'en';
  let list = db.inscriptions;
  if (ruler && typeof ruler === 'string') {
    list = list.filter(i => i.ruler.toLowerCase().includes(ruler.toLowerCase()));
  }
  if (language && typeof language === 'string') {
    list = list.filter(i => i.language.toLowerCase().includes(language.toLowerCase()));
  }

  const mapped = list.map(i => {
    const tr = (INSCRIPTION_TRANSLATIONS as Record<string, any>)[i.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...i,
        name: tr.name || i.name,
        ruler: tr.ruler || i.ruler,
        location_found: tr.location || i.location_found,
        historical_context: tr.summary || i.historical_context
      };
    }
    return i;
  });

  res.json({ inscriptions: mapped });
});

// Monuments
contentRouter.get('/monuments', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as any) || 'en';
  const mapped = db.monuments.map(m => {
    const tr = (MONUMENT_TRANSLATIONS as Record<string, any>)[m.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...m,
        name: tr.name || m.name,
        location: tr.location || m.location,
        patron_ruler: tr.patron_ruler || m.patron_ruler,
        architectural_style: tr.architectural_style || m.architectural_style,
        historical_significance: tr.historical_significance || m.historical_significance
      };
    }
    return m;
  });

  res.json({ monuments: mapped });
});

// Documents
contentRouter.get('/documents', (_req: Request, res: Response) => {
  const db = getDb();
  res.json({ documents: db.documents });
});

// Gallery
contentRouter.get('/gallery', (req: Request, res: Response) => {
  const db = getDb();
  const { category } = req.query;
  let list = db.gallery;
  if (category && typeof category === 'string' && category !== 'all') {
    list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }
  res.json({ gallery: list });
});

// Historical Claims
contentRouter.get('/claims', (_req: Request, res: Response) => {
  const db = getDb();
  res.json({ claims: db.claims });
});
