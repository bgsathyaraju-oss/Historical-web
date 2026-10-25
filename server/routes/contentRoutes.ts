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
import {
  GENEALOGY_NODE_TRANSLATIONS,
  CLAIM_TRANSLATIONS,
  TIMELINE_EVENT_TRANSLATIONS,
  LOCATION_TRANSLATIONS,
  DOCUMENT_TRANSLATIONS,
  GALLERY_TRANSLATIONS
} from '../../src/data/multilingualSeedTranslations.ts';

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
contentRouter.get('/genealogy', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as LanguageCode) || 'en';
  const mapped = db.genealogy.map(node => {
    const tr = GENEALOGY_NODE_TRANSLATIONS[node.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...node,
        name: tr.name || node.name,
        titles: tr.titles || node.titles,
        reign: tr.reign || node.reign,
        spouse: tr.spouse || node.spouse,
        notes: tr.notes || node.notes,
        sources: tr.sources || node.sources
      };
    }
    return node;
  });
  res.json({ genealogy: mapped });
});

// Timeline Events
contentRouter.get('/timeline', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as LanguageCode) || 'en';
  const sorted = [...db.events_timeline].sort((a, b) => a.sort_year - b.sort_year).map(ev => {
    const tr = TIMELINE_EVENT_TRANSLATIONS[ev.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...ev,
        period: tr.period || ev.period,
        year_text: tr.year_text || ev.year_text,
        title: tr.title || ev.title,
        rulers_involved: tr.rulers_involved || ev.rulers_involved,
        political_development: tr.political_development || ev.political_development,
        monuments_inscriptions: tr.monuments_inscriptions || ev.monuments_inscriptions,
        primary_sources: tr.primary_sources || ev.primary_sources,
        uncertainty_notes: tr.uncertainty_notes || ev.uncertainty_notes
      };
    }
    return ev;
  });
  res.json({ events: sorted });
});

// Locations
contentRouter.get('/locations', (req: Request, res: Response) => {
  const db = getDb();
  const { region, lang } = req.query;
  const langCode = (lang as LanguageCode) || 'en';
  let list = db.locations;
  if (region && typeof region === 'string' && region !== 'All') {
    list = list.filter(l => l.region.toLowerCase() === region.toLowerCase());
  }
  const mapped = list.map(loc => {
    const tr = LOCATION_TRANSLATIONS[loc.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...loc,
        name: tr.name || loc.name,
        ancient_name: tr.ancient_name || loc.ancient_name,
        modern_district: tr.modern_district || loc.modern_district,
        modern_state: tr.modern_state || loc.modern_state,
        summary: tr.summary || loc.summary,
        archaeological_findings: tr.archaeological_findings || loc.archaeological_findings,
        inscriptions_found: tr.inscriptions_found || loc.inscriptions_found
      };
    }
    return loc;
  });
  res.json({ locations: mapped });
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
        historical_context: tr.summary || i.historical_context,
        english_translation: tr.summary ? `${tr.summary}\n\n[English Archival Translation]: ${i.english_translation}` : i.english_translation
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
contentRouter.get('/documents', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as LanguageCode) || 'en';
  const mapped = db.documents.map(doc => {
    const tr = DOCUMENT_TRANSLATIONS[doc.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...doc,
        title: tr.title || doc.title,
        original_language: tr.original_language || doc.original_language,
        approximate_date: tr.approximate_date || doc.approximate_date,
        author_authority: tr.author_authority || doc.author_authority,
        current_location: tr.current_location || doc.current_location,
        source_provenance: tr.source_provenance || doc.source_provenance,
        digitization_info: tr.digitization_info || doc.digitization_info,
        translation_excerpt: tr.translation_excerpt || doc.translation_excerpt,
        research_notes: tr.research_notes || doc.research_notes
      };
    }
    return doc;
  });
  res.json({ documents: mapped });
});

// Gallery
contentRouter.get('/gallery', (req: Request, res: Response) => {
  const db = getDb();
  const { category, lang } = req.query;
  const langCode = (lang as LanguageCode) || 'en';
  let list = db.gallery;
  if (category && typeof category === 'string' && category !== 'all') {
    list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
  }
  const mapped = list.map(item => {
    const tr = GALLERY_TRANSLATIONS[item.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...item,
        title: tr.title || item.title,
        period: tr.period || item.period,
        location: tr.location || item.location,
        description: tr.description || item.description
      };
    }
    return item;
  });
  res.json({ gallery: mapped });
});

// Historical Claims
contentRouter.get('/claims', (req: Request, res: Response) => {
  const db = getDb();
  const langCode = (req.query.lang as LanguageCode) || 'en';
  const mapped = db.claims.map(claim => {
    const tr = CLAIM_TRANSLATIONS[claim.id]?.[langCode];
    if (langCode !== 'en' && tr) {
      return {
        ...claim,
        topic: tr.topic || claim.topic,
        claim_statement: tr.claim_statement || claim.claim_statement,
        supporting_evidence: tr.supporting_evidence || claim.supporting_evidence,
        contradictory_evidence: tr.contradictory_evidence || claim.contradictory_evidence,
        source_reliability_notes: tr.source_reliability_notes || claim.source_reliability_notes,
        reviewer_comments: tr.reviewer_comments || claim.reviewer_comments
      };
    }
    return claim;
  });
  res.json({ claims: mapped });
});
