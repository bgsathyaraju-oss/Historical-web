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
  GEOGRAPHICAL_SPREAD
} from '../data/historyContent';

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
  refreshTranslations: () => Promise<void>;
  saveTranslation: (
    articleId: string,
    data: { title: string; content: string; summary: string; translator_name?: string }
  ) => Promise<{ success: boolean; article?: Article; error?: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const normalizeKey = (str: string): string => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/[\s\-_]+/g, '_');
};

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
      if (k.includes('odra')) return group.odra_desha?.[language] || key;
      if (k.includes('gajapathi') || k.includes('ruler')) return group.gajapathi_rulers?.[language] || key;
      if (k.includes('inscription') || k.includes('epigraphy')) return group.inscriptions_epigraphy?.[language] || key;
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

  // Article Content Resolver Routine with Multi-tier Fallback
  const getArticleContent = useCallback((article: Article) => {
    // Tier 1: Check backend content translations loaded in state
    if (language !== 'en' && contentTranslations[article.id]) {
      const tr = contentTranslations[article.id];
      if (tr.title && tr.content) {
        return {
          title: tr.title,
          content: tr.content,
          summary: tr.summary || article.summary,
          isTranslated: true,
          status: tr.status || 'reviewed'
        };
      }
    }

    // Tier 2: Check embedded translations on the article object itself
    if (language !== 'en' && article.translations && article.translations[language]) {
      const emb = article.translations[language];
      if (emb.title && emb.content) {
        return {
          title: emb.title,
          content: emb.content,
          summary: emb.summary || article.summary,
          isTranslated: true,
          status: emb.status || 'reviewed'
        };
      }
    }

    // Tier 3: Delegate to translationManager
    return translationManager.getArticleContent(article, language);
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
