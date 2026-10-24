import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageCode, Article } from '../types';
import { translations, TranslationDictionary, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { translationManager, TranslationManager, ContentTranslationMap } from '../services/TranslationManager';
import {
  METADATA_LABELS,
  SITE_METADATA_TRANSLATIONS,
  UNIVERSAL_PHRASES,
  HISTORICAL_ENTITY_TRANSLATIONS,
  MetadataType
} from '../i18n/metadataTranslations';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS
} from '../data/historyContent';
import { CANONICAL_ARTICLES } from '../data/articlesRepository';
import { ARTICLE_TRANSLATIONS } from '../../server/contentTranslations';

export interface ArticleTranslationItem {
  title: string;
  summary: string;
  content: string;
  status?: string;
  source?: string;
}

export type ScriptName = 'Devanagari' | 'Telugu' | 'Kannada' | 'Tamil' | 'Odia' | 'Bengali' | 'Latin';

export const LANGUAGE_SCRIPT_MAP: Record<LanguageCode, ScriptName> = {
  en: 'Latin',
  hi: 'Devanagari',
  mr: 'Devanagari',
  te: 'Telugu',
  kn: 'Kannada',
  ta: 'Tamil',
  or: 'Odia',
  bn: 'Bengali'
};

export const SCRIPT_REGEX_MAP: Record<ScriptName, RegExp> = {
  Devanagari: /[\u0900-\u097F]/,
  Telugu: /[\u0C00-\u0C7F]/,
  Kannada: /[\u0C80-\u0CFF]/,
  Tamil: /[\u0B80-\u0BFF]/,
  Odia: /[\u0B00-\u0B7F]/,
  Bengali: /[\u0980-\u09FF]/,
  Latin: /[A-Za-z]/
};

const normalizeKey = (str: string): string => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/[\s\-_]+/g, '_');
};

const buildInitialTranslationMap = (): Record<string, Partial<Record<LanguageCode, ArticleTranslationItem>>> => {
  const map: Record<string, Partial<Record<LanguageCode, ArticleTranslationItem>>> = {};

  const registerEntry = (id: string, slug: string | undefined, lang: LanguageCode, item: ArticleTranslationItem) => {
    if (!item.title && !item.content) return;

    if (!map[id]) map[id] = {};
    map[id][lang] = item;

    const normId = normalizeKey(id);
    if (!map[normId]) map[normId] = {};
    map[normId][lang] = item;

    if (slug) {
      if (!map[slug]) map[slug] = {};
      map[slug][lang] = item;

      const normSlug = normalizeKey(slug);
      if (!map[normSlug]) map[normSlug] = {};
      map[normSlug][lang] = item;
    }
  };

  // 1. Ingest Canonical Articles (English baseline and embedded translations)
  CANONICAL_ARTICLES.forEach((art) => {
    registerEntry(art.id, art.slug, 'en', {
      title: art.original_title,
      summary: art.summary,
      content: art.original_content,
      status: 'published',
      source: 'canonical'
    });

    if (art.translations) {
      (Object.keys(art.translations) as LanguageCode[]).forEach((lang) => {
        const tr = art.translations?.[lang];
        if (tr && (tr.title || tr.content)) {
          registerEntry(art.id, art.slug, lang, {
            title: tr.title,
            summary: tr.summary,
            content: tr.content,
            status: tr.status || 'reviewed',
            source: 'embedded'
          });
        }
      });
    }
  });

  // 2. Ingest ARTICLE_TRANSLATIONS across all 8 languages (te, or, hi, kn, ta, mr, bn)
  Object.entries(ARTICLE_TRANSLATIONS).forEach(([artId, langObj]) => {
    const matchingArticle = CANONICAL_ARTICLES.find(a => a.id === artId);
    const slug = matchingArticle?.slug;

    (Object.entries(langObj) as [LanguageCode, ContentTranslationMap][]).forEach(([lang, tr]) => {
      if (tr && (tr.title || tr.content)) {
        registerEntry(artId, slug, lang, {
          title: tr.title,
          summary: tr.summary,
          content: tr.content,
          status: 'reviewed',
          source: 'canonical_translations'
        });
      }
    });
  });

  // 3. Ingest HISTORICAL_MONOGRAPH_SECTIONS
  HISTORICAL_MONOGRAPH_SECTIONS.forEach((mono) => {
    SUPPORTED_LANGUAGES.forEach(({ code }) => {
      const title = mono.section_title[code] || mono.section_title.en;
      const content = mono.content[code] || mono.content.en;
      if (title && content) {
        registerEntry(mono.id, undefined, code, {
          title,
          summary: mono.key_points ? mono.key_points.join(' • ') : '',
          content,
          status: 'canonical',
          source: 'monograph_treatise'
        });
      }
    });
  });

  return map;
};

/**
 * Universal 'translationMap' utility:
 * Handles fallback logic for all 8 languages, ensuring that article detail pages
 * display properly in all scripts (Devanagari, Telugu, Kannada, Tamil, Odia, Bengali)
 * without defaulting to English if the translation key exists.
 */
export const translationMap = {
  entries: buildInitialTranslationMap(),

  /**
   * Check if a translation key exists for this article in the target language.
   */
  has(articleIdOrSlug: string, lang: LanguageCode): boolean {
    if (!articleIdOrSlug) return false;
    const norm = normalizeKey(articleIdOrSlug);
    const entry = this.entries[articleIdOrSlug]?.[lang] || this.entries[norm]?.[lang];
    return Boolean(entry && (entry.title || entry.content));
  },

  /**
   * Get translation for an article by ID or slug in requested language.
   */
  get(articleIdOrSlug: string, lang: LanguageCode): ArticleTranslationItem | null {
    if (!articleIdOrSlug) return null;
    const norm = normalizeKey(articleIdOrSlug);
    return this.entries[articleIdOrSlug]?.[lang] || this.entries[norm]?.[lang] || null;
  },

  /**
   * Returns the expected script family for a language.
   */
  getScriptForLanguage(lang: LanguageCode): ScriptName {
    return LANGUAGE_SCRIPT_MAP[lang] || 'Latin';
  },

  /**
   * Detect script family of a string.
   */
  detectScript(text: string): ScriptName {
    if (!text) return 'Latin';
    if (SCRIPT_REGEX_MAP.Devanagari.test(text)) return 'Devanagari';
    if (SCRIPT_REGEX_MAP.Telugu.test(text)) return 'Telugu';
    if (SCRIPT_REGEX_MAP.Kannada.test(text)) return 'Kannada';
    if (SCRIPT_REGEX_MAP.Tamil.test(text)) return 'Tamil';
    if (SCRIPT_REGEX_MAP.Odia.test(text)) return 'Odia';
    if (SCRIPT_REGEX_MAP.Bengali.test(text)) return 'Bengali';
    return 'Latin';
  },

  /**
   * Validates if the text satisfies the expected script for a language,
   * avoiding accidental Latin text when an Indian script is required.
   */
  isExpectedScript(text: string, lang: LanguageCode): boolean {
    if (!text || lang === 'en') return true;
    const expectedScript = this.getScriptForLanguage(lang);
    if (expectedScript === 'Latin') return true;
    const regex = SCRIPT_REGEX_MAP[expectedScript];
    return regex ? regex.test(text) : true;
  },

  /**
   * Register or update a translation dynamically (e.g. from server response or user edit).
   */
  set(articleIdOrSlug: string, lang: LanguageCode, item: ArticleTranslationItem): void {
    if (!articleIdOrSlug || !lang) return;
    if (!this.entries[articleIdOrSlug]) this.entries[articleIdOrSlug] = {};
    this.entries[articleIdOrSlug][lang] = item;
    const norm = normalizeKey(articleIdOrSlug);
    if (!this.entries[norm]) this.entries[norm] = {};
    this.entries[norm][lang] = item;
  },

  /**
   * Core Article Resolution Routine:
   * Handles multi-tier fallback for all 8 languages, ensuring that article detail pages
   * display properly in all scripts (Devanagari, Telugu, Kannada, Tamil, Odia, Bengali)
   * without defaulting to English if the translation key exists.
   */
  resolve(
    article: Article,
    targetLang: LanguageCode,
    liveContentTranslations?: Record<string, ContentTranslationMap>
  ): {
    title: string;
    content: string;
    summary: string;
    isTranslated: boolean;
    status: string;
    script: ScriptName;
  } {
    const expectedScript = this.getScriptForLanguage(targetLang);

    // English baseline
    if (targetLang === 'en') {
      return {
        title: article.original_title || (article as any).title || '',
        content: article.original_content || (article as any).content || '',
        summary: article.summary || '',
        isTranslated: true,
        status: 'original',
        script: 'Latin'
      };
    }

    // Tier 1: Check live content translations from backend state if matching expected script
    if (liveContentTranslations && liveContentTranslations[article.id]) {
      const live = liveContentTranslations[article.id];
      if (live.title && live.content && this.isExpectedScript(live.title, targetLang)) {
        return {
          title: live.title,
          content: live.content,
          summary: live.summary || article.summary,
          isTranslated: true,
          status: 'live_synced',
          script: expectedScript
        };
      }
    }

    // Tier 2: Check embedded translations on the article object itself if matching expected script
    if (article.translations && article.translations[targetLang]) {
      const emb = article.translations[targetLang];
      if (emb.title && emb.content && this.isExpectedScript(emb.title, targetLang)) {
        return {
          title: emb.title,
          content: emb.content,
          summary: emb.summary || article.summary,
          isTranslated: true,
          status: emb.status || 'reviewed',
          script: expectedScript
        };
      }
    }

    // Tier 3: Check built-in translationMap by article ID
    const entryById = this.get(article.id, targetLang);
    if (entryById && (entryById.title || entryById.content) && this.isExpectedScript(entryById.title, targetLang)) {
      return {
        title: entryById.title,
        content: entryById.content,
        summary: entryById.summary || article.summary,
        isTranslated: true,
        status: entryById.status || 'reviewed',
        script: expectedScript
      };
    }

    // Tier 4: Check built-in translationMap by article slug
    if (article.slug) {
      const entryBySlug = this.get(article.slug, targetLang);
      if (entryBySlug && (entryBySlug.title || entryBySlug.content) && this.isExpectedScript(entryBySlug.title, targetLang)) {
        return {
          title: entryBySlug.title,
          content: entryBySlug.content,
          summary: entryBySlug.summary || article.summary,
          isTranslated: true,
          status: entryBySlug.status || 'reviewed',
          script: expectedScript
        };
      }
    }

    // Tier 5: Script-cognate fallback (never default to English if cognate script exists)
    // Devanagari family: mr <-> hi
    if (targetLang === 'mr' && this.has(article.id, 'hi')) {
      const cognate = this.get(article.id, 'hi')!;
      return {
        title: cognate.title,
        content: cognate.content,
        summary: cognate.summary || article.summary,
        isTranslated: true,
        status: 'devanagari_cognate_fallback',
        script: 'Devanagari'
      };
    }
    if (targetLang === 'hi' && this.has(article.id, 'mr')) {
      const cognate = this.get(article.id, 'mr')!;
      return {
        title: cognate.title,
        content: cognate.content,
        summary: cognate.summary || article.summary,
        isTranslated: true,
        status: 'devanagari_cognate_fallback',
        script: 'Devanagari'
      };
    }

    // Tier 6: Last resort fallback to English original
    return {
      title: article.original_title || (article as any).title || '',
      content: article.original_content || (article as any).content || '',
      summary: article.summary || '',
      isTranslated: false,
      status: 'fallback_original_en',
      script: 'Latin'
    };
  }
};

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  translationManager: TranslationManager;
  contentTranslations: Record<string, ContentTranslationMap>;
  isLoadingTranslations: boolean;
  translateText: (phraseOrKey: string, defaultText?: string) => string;
  getMetadataLabel: (type: MetadataType, key: string) => string;
  getEntityTranslation: (
    entityType: 'figure' | 'synonym' | 'region' | 'monument' | 'article',
    entityId: string,
    fallback?: { name?: string; title?: string; summary?: string }
  ) => { name: string; title: string; summary: string };
  getArticleContent: (article: Article) => {
    title: string;
    content: string;
    summary: string;
    isTranslated: boolean;
    status?: string;
  };
  translationMap: typeof translationMap;
  refreshTranslations: () => Promise<void>;
  saveTranslation: (
    articleId: string,
    data: { title: string; content: string; summary: string; translator_name?: string }
  ) => Promise<{ success: boolean; article?: Article; error?: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return translationManager.getCurrentLanguage();
  });

  const [contentTranslations, setContentTranslations] = useState<Record<string, ContentTranslationMap>>({});
  const [isLoadingTranslations, setIsLoadingTranslations] = useState<boolean>(false);

  // Synchronize document metadata (HTML lang, title, meta description, OG tags)
  const syncDocumentMetadata = useCallback((targetLang: LanguageCode) => {
    if (typeof document === 'undefined') return;

    document.documentElement.lang = targetLang;

    const siteMeta = SITE_METADATA_TRANSLATIONS[targetLang] || SITE_METADATA_TRANSLATIONS.en;
    if (siteMeta) {
      document.title = siteMeta.title;

      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', siteMeta.description);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', siteMeta.ogTitle);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', siteMeta.description);
      }
    }
  }, []);

  // Sync active language to HTML tag, TranslationManager, and metadata
  const setLanguage = useCallback((lang: LanguageCode) => {
    if (translations[lang]) {
      setLanguageState(lang);
      translationManager.setLanguage(lang);
      syncDocumentMetadata(lang);
    }
  }, [syncDocumentMetadata]);

  // Fetch content translations from backend when language changes
  const loadTranslations = useCallback(async (targetLang: LanguageCode, forceRefresh = false) => {
    setIsLoadingTranslations(true);
    try {
      const trMap = await translationManager.fetchTranslationsForLanguage(targetLang, forceRefresh);
      setContentTranslations(trMap || {});
      if (trMap) {
        Object.entries(trMap).forEach(([artId, item]) => {
          if (item && (item.title || item.content)) {
            translationMap.set(artId, targetLang, {
              title: item.title,
              summary: item.summary,
              content: item.content,
              status: 'live_synced',
              source: 'backend_api'
            });
          }
        });
      }
    } catch (err) {
      console.warn('Failed to fetch content translations for language', targetLang, err);
    } finally {
      setIsLoadingTranslations(false);
    }
  }, []);

  // Subscribe to TranslationManager events for real-time reactivity
  useEffect(() => {
    const unsubscribe = translationManager.subscribe((event) => {
      if (event.type === 'language-changed' && event.language) {
        setLanguageState(event.language);
        syncDocumentMetadata(event.language);
      } else if (event.type === 'translations-loaded' && event.data) {
        if (!event.language || event.language === language) {
          setContentTranslations(event.data);
        }
      } else if (event.type === 'cache-cleared') {
        loadTranslations(language, true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [language, loadTranslations, syncDocumentMetadata]);

  // Initial load and language switch trigger
  useEffect(() => {
    syncDocumentMetadata(language);
    loadTranslations(language);
  }, [language, loadTranslations, syncDocumentMetadata]);

  // Manual refresh helper
  const refreshTranslations = useCallback(async () => {
    await loadTranslations(language, true);
  }, [language, loadTranslations]);

  // Save translation helper
  const saveTranslation = useCallback(async (
    articleId: string,
    data: { title: string; content: string; summary: string; translator_name?: string }
  ) => {
    const res = await translationManager.saveArticleTranslation(articleId, language, data);
    if (res.success) {
      await loadTranslations(language, true);
    }
    return res;
  }, [language, loadTranslations]);

  // Full-Site Universal Text Translator Routine
  const translateText = useCallback((phraseOrKey: string, defaultText?: string): string => {
    if (!phraseOrKey) return defaultText || '';

    const normKey = normalizeKey(phraseOrKey);

    // 1. Direct key match in UNIVERSAL_PHRASES
    if (UNIVERSAL_PHRASES[phraseOrKey] && UNIVERSAL_PHRASES[phraseOrKey][language]) {
      return UNIVERSAL_PHRASES[phraseOrKey][language];
    }
    if (UNIVERSAL_PHRASES[normKey] && UNIVERSAL_PHRASES[normKey][language]) {
      return UNIVERSAL_PHRASES[normKey][language];
    }

    // 2. Direct match in t.common dictionary
    const tObj = (translations[language] || translations.en) as any;
    if (tObj?.common) {
      if (tObj.common[phraseOrKey]) return tObj.common[phraseOrKey];
      if (tObj.common[normKey]) return tObj.common[normKey];
    }

    // 3. Direct match in t.nav dictionary
    if (tObj?.nav) {
      if (tObj.nav[phraseOrKey]) return tObj.nav[phraseOrKey];
      if (tObj.nav[normKey]) return tObj.nav[normKey];
    }

    // 4. Check metadata labels across all categories
    for (const group of ['evidence', 'status', 'category', 'source_type', 'role'] as MetadataType[]) {
      const groupLabels = METADATA_LABELS[group];
      if (groupLabels[phraseOrKey] && groupLabels[phraseOrKey][language]) {
        return groupLabels[phraseOrKey][language];
      }
      if (groupLabels[normKey] && groupLabels[normKey][language]) {
        return groupLabels[normKey][language];
      }
    }

    // 5. Check historical entity canonical names
    if (HISTORICAL_ENTITY_TRANSLATIONS[normKey] && HISTORICAL_ENTITY_TRANSLATIONS[normKey][language]) {
      return HISTORICAL_ENTITY_TRANSLATIONS[normKey][language];
    }

    return defaultText || phraseOrKey;
  }, [language]);

  // Metadata Label Resolver Routine
  const getMetadataLabel = useCallback((type: MetadataType, key: string): string => {
    if (!key) return '';
    const group = METADATA_LABELS[type];
    if (!group) return key;

    // Direct key lookup
    if (group[key] && group[key][language]) {
      return group[key][language];
    }

    // Normalized key lookup
    const norm = normalizeKey(key);
    if (group[norm] && group[norm][language]) {
      return group[norm][language];
    }

    // Heuristic lookup for evidence categories
    if (type === 'evidence') {
      const k = key.toLowerCase();
      if (k.includes('verified') || k.includes('archaeological') || k.includes('epigraphic') || k.includes('primary')) {
        return group.verified_archaeological?.[language] || key;
      }
      if (k.includes('scholarly') || k.includes('academic') || k.includes('reviewed') || k.includes('published')) {
        return group.scholarly_interpretation?.[language] || key;
      }
      if (k.includes('traditional') || k.includes('lineage') || k.includes('vamsavali') || k.includes('chronicle')) {
        return group.traditional_account?.[language] || key;
      }
      if (k.includes('oral') || k.includes('memory') || k.includes('ballad')) {
        return group.oral_history?.[language] || key;
      }
      if (k.includes('belief') || k.includes('heritage') || k.includes('sacred')) {
        return group.community_belief?.[language] || key;
      }
      if (k.includes('contested') || k.includes('review') || k.includes('investigation')) {
        return group.contested_interpretation?.[language] || key;
      }
    }

    // Heuristic lookup for verification statuses
    if (type === 'status') {
      const k = key.toLowerCase();
      if (k.includes('draft')) return group['Draft']?.[language] || key;
      if (k.includes('research')) return group['Under Research']?.[language] || key;
      if (k.includes('verification') || k.includes('awaiting')) return group['Awaiting Source Verification']?.[language] || key;
      if (k.includes('reviewed')) return group['Reviewed']?.[language] || key;
      if (k.includes('published')) return group['Published']?.[language] || key;
      if (k.includes('contested')) return group['Contested Interpretation']?.[language] || key;
      if (k.includes('archived')) return group['Archived']?.[language] || key;
    }

    // Heuristic lookup for research categories
    if (type === 'category') {
      const k = key.toLowerCase();
      if (k.includes('maritime') || k.includes('citadel') || k.includes('kolletikota') || k.includes('sarasu') || k.includes('peddintlamma')) {
        return group.sacred_citadels_maritime?.[language] || group.temple_architecture?.[language] || key;
      }
      if (k.includes('antiquity') || (k.includes('suryavamsha') && k.includes('lineage'))) {
        return group.suryavamsha_lineage_antiquity?.[language] || group.lineage_genealogy?.[language] || key;
      }
      if (k.includes('oad') || k.includes('rajput') || (k.includes('od') && k.includes('heritage'))) {
        return group.oad_rajput_heritage?.[language] || group.community_history?.[language] || key;
      }
      if (k.includes('methodology') || (k.includes('genealogy') && k.includes('lineage'))) {
        return group.genealogy_methodology?.[language] || group.lineage_genealogy?.[language] || key;
      }
      if (k.includes('gajapathi') || k.includes('kapilendra') || k.includes('ruler')) {
        return group.suryavamsha_gajapathi_kings?.[language] || group.gajapathi_rulers?.[language] || key;
      }
      if (k.includes('geography') || k.includes('odra')) {
        return group.odra_desha_geography?.[language] || group.odra_desha?.[language] || key;
      }
      if (k.includes('inscription') || k.includes('epigraph')) {
        return group.inscriptions_epigraphy?.[language] || key;
      }
      if (k.includes('temple') || k.includes('architecture')) return group.temple_architecture?.[language] || key;
      if (k.includes('water') || k.includes('civic') || k.includes('engineering')) return group.water_civic_engineering?.[language] || key;
      if (k.includes('lineage') || k.includes('genealogy')) return group.lineage_genealogy?.[language] || key;
      if (k.includes('community')) return group.community_history?.[language] || key;
      if (k.includes('folklore') || k.includes('oral')) return group.folklore_oral_traditions?.[language] || key;
      if (k.includes('literature') || k.includes('manuscript')) return group.literature_manuscripts?.[language] || key;
    }

    // Heuristic lookup for user roles
    if (type === 'role') {
      const k = key.toLowerCase();
      if (k.includes('super_admin')) return group.super_admin?.[language] || key;
      if (k.includes('admin')) return group.admin?.[language] || key;
      if (k.includes('editor')) return group.historical_editor?.[language] || key;
      if (k.includes('reviewer')) return group.research_reviewer?.[language] || key;
      if (k.includes('translator')) return group.translator?.[language] || key;
      if (k.includes('moderator')) return group.community_moderator?.[language] || key;
      if (k.includes('member')) return group.member?.[language] || key;
      if (k.includes('visitor') || k.includes('guest')) return group.visitor?.[language] || key;
    }

    return group[key]?.en || key;
  }, [language]);

  // Entity Translation Resolver Routine
  const getEntityTranslation = useCallback((
    entityType: 'figure' | 'synonym' | 'region' | 'monument' | 'article',
    entityId: string,
    fallback?: { name?: string; title?: string; summary?: string }
  ): { name: string; title: string; summary: string } => {
    const normId = normalizeKey(entityId);

    if (entityType === 'figure') {
      const fig = HISTORICAL_FIGURES.find(f => f.id === entityId || normalizeKey(f.id) === normId);
      if (fig) {
        const name = fig.localized_name[language] || fig.localized_name.en || fig.canonical_name;
        const title = fig.titles[language] || fig.titles.en || '';
        const summary = fig.summary[language] || fig.summary.en || '';
        return { name, title, summary };
      }
      if (HISTORICAL_ENTITY_TRANSLATIONS[normId]) {
        const name = HISTORICAL_ENTITY_TRANSLATIONS[normId][language] || HISTORICAL_ENTITY_TRANSLATIONS[normId].en;
        return { name, title: '', summary: '' };
      }
    }

    if (entityType === 'synonym') {
      const syn = COMMUNITY_SYNONYMS.find(s => s.id === entityId || normalizeKey(s.id) === normId);
      if (syn) {
        const name = syn.native_scripts[language] || syn.title;
        const role = syn.historical_role[language] || syn.historical_role.en || '';
        return { name, title: syn.category, summary: role };
      }
    }

    if (entityType === 'region') {
      const reg = GEOGRAPHICAL_SPREAD.find(r => r.id === entityId || normalizeKey(r.id) === normId);
      if (reg) {
        const name = reg.localized_region[language] || reg.region_name;
        const overview = reg.regional_overview[language] || reg.regional_overview.en || '';
        return { name, title: reg.states_and_territories.join(', '), summary: overview };
      }
    }

    if (entityType === 'article') {
      if (contentTranslations[entityId]) {
        const tr = contentTranslations[entityId];
        return {
          name: tr.title,
          title: tr.title,
          summary: tr.summary
        };
      }
    }

    return {
      name: fallback?.name || fallback?.title || entityId,
      title: fallback?.title || fallback?.name || '',
      summary: fallback?.summary || ''
    };
  }, [language, contentTranslations]);

  // Article Content Resolver Routine with Multi-tier Script-Aware Fallback
  const getArticleContent = useCallback((article: Article) => {
    if (!article) {
      return {
        title: '',
        content: '',
        summary: '',
        isTranslated: false,
        status: 'empty'
      };
    }
    const resolved = translationMap.resolve(article, language, contentTranslations);
    return {
      title: resolved.title,
      content: resolved.content,
      summary: resolved.summary,
      isTranslated: resolved.isTranslated,
      status: resolved.status
    };
  }, [language, contentTranslations]);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translationManager,
        contentTranslations,
        isLoadingTranslations,
        translateText,
        getMetadataLabel,
        getEntityTranslation,
        getArticleContent,
        translationMap,
        refreshTranslations,
        saveTranslation
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export { SUPPORTED_LANGUAGES };
