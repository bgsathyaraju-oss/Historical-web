import { LanguageCode, LanguageOption, Article } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { getAllArticles, getArticleByIdOrSlug } from '../data/articlesRepository';

export interface ContentTranslationMap {
  title: string;
  summary: string;
  content: string;
  status?: string;
  translator_name?: string;
  last_updated?: string;
}

export type TranslationEventType = 
  | 'language-changed' 
  | 'translations-loaded' 
  | 'articles-loaded' 
  | 'article-saved' 
  | 'cache-cleared' 
  | 'error';

export interface TranslationEvent {
  type: TranslationEventType;
  language?: LanguageCode;
  data?: any;
  error?: Error;
}

export type TranslationListener = (event: TranslationEvent) => void;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL for stale-while-revalidate
const STORAGE_PREFIX = 'suryavamsha_tr_';

export class TranslationManager {
  private currentLanguage: LanguageCode = 'en';
  private inMemoryArticles = new Map<string, CacheEntry<Article[]>>();
  private inMemorySingleArticle = new Map<string, CacheEntry<Article>>();
  private inMemoryTranslations = new Map<LanguageCode, CacheEntry<Record<string, ContentTranslationMap>>>();
  private listeners = new Set<TranslationListener>();
  private pendingRequests = new Map<string, Promise<any>>();

  constructor(initialLang?: LanguageCode) {
    if (initialLang) {
      this.currentLanguage = initialLang;
    } else if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('suryavamsha_lang') as LanguageCode;
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        this.currentLanguage = saved;
      }
    }
  }

  /**
   * Subscribe to translation events (e.g. language changed, articles updated, translations loaded)
   */
  public subscribe(listener: TranslationListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(event: TranslationEvent): void {
    this.listeners.forEach(fn => {
      try {
        fn(event);
      } catch (err) {
        console.error('Translation listener error:', err);
      }
    });
  }

  /**
   * Get the current active language
   */
  public getCurrentLanguage(): LanguageCode {
    return this.currentLanguage;
  }

  /**
   * Change current language, persist in localStorage, and notify listeners
   */
  public setLanguage(lang: LanguageCode): void {
    if (this.currentLanguage === lang) return;
    this.currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('suryavamsha_lang', lang);
      document.documentElement.lang = lang;
    }
    this.emit({ type: 'language-changed', language: lang });
    // Proactively fetch content translations for the new language
    this.fetchArticles(lang).catch(() => {});
    this.fetchTranslationsForLanguage(lang).catch(() => {});
  }

  /**
   * Get supported languages list
   */
  public getSupportedLanguages(): LanguageOption[] {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Invalidate and clear all caches (memory + local storage)
   */
  public clearCache(): void {
    this.inMemoryArticles.clear();
    this.inMemorySingleArticle.clear();
    this.inMemoryTranslations.clear();

    if (typeof window !== 'undefined') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    }

    this.emit({ type: 'cache-cleared' });
  }

  /**
   * Invalidate cache for a specific language
   */
  public invalidateLanguage(lang: LanguageCode): void {
    this.inMemoryTranslations.delete(lang);
    for (const key of Array.from(this.inMemoryArticles.keys())) {
      if (key.includes(`lang=${lang}`)) {
        this.inMemoryArticles.delete(key);
      }
    }
    for (const key of Array.from(this.inMemorySingleArticle.keys())) {
      if (key.endsWith(`_${lang}`)) {
        this.inMemorySingleArticle.delete(key);
      }
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`${STORAGE_PREFIX}translations_${lang}`);
        localStorage.removeItem(`${STORAGE_PREFIX}articles_${lang}`);
      } catch (e) {
        // Ignore storage errors
      }
    }
  }

  /**
   * Read from persistent localStorage with expiration check
   */
  private getFromLocalStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CacheEntry<T>;
      return parsed.data;
    } catch {
      return null;
    }
  }

  /**
   * Write to persistent localStorage
   */
  private writeToLocalStorage<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
    } catch {
      // Storage full or unavailable - safe to ignore
    }
  }

  /**
   * Fetch articles overlayed with the requested language translation
   */
  public async fetchArticles(
    lang: LanguageCode = this.currentLanguage,
    options: { category?: string; tag?: string; status?: string; forceRefresh?: boolean } = {}
  ): Promise<Article[]> {
    const cacheKey = `articles_lang=${lang}_cat=${options.category || 'all'}_tag=${options.tag || 'all'}_status=${options.status || 'all'}`;

    // 1. Check in-memory cache if not forcing refresh
    if (!options.forceRefresh) {
      const memoryHit = this.inMemoryArticles.get(cacheKey);
      if (memoryHit && Date.now() - memoryHit.timestamp < CACHE_TTL_MS) {
        return memoryHit.data;
      }

      // Check persistent localStorage
      const storageHit = this.getFromLocalStorage<Article[]>(cacheKey);
      if (storageHit) {
        this.inMemoryArticles.set(cacheKey, { data: storageHit, timestamp: Date.now() });
        // Return cached immediately and refresh asynchronously
        this.executeFetchArticles(lang, options, cacheKey).catch(() => {});
        return storageHit;
      }
    }

    // 2. Prevent duplicate concurrent requests
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    const fetchPromise = this.executeFetchArticles(lang, options, cacheKey);
    this.pendingRequests.set(cacheKey, fetchPromise);

    try {
      return await fetchPromise;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async executeFetchArticles(
    lang: LanguageCode,
    options: { category?: string; tag?: string; status?: string },
    cacheKey: string
  ): Promise<Article[]> {
    try {
      const params = new URLSearchParams();
      params.set('lang', lang);
      if (options.category && options.category !== 'All') params.set('category', options.category);
      if (options.tag) params.set('tag', options.tag);
      if (options.status && options.status !== 'All') params.set('status', options.status);

      const res = await fetch(`/api/content/articles?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch articles`);
      }
      const data = await res.json();
      const articles: Article[] = data.articles || [];

      // Update in-memory & localStorage caches
      this.inMemoryArticles.set(cacheKey, { data: articles, timestamp: Date.now() });
      this.writeToLocalStorage(cacheKey, articles);

      // Cache individual articles for fast lookup
      articles.forEach(article => {
        const singleKey = `${article.id}_${lang}`;
        this.inMemorySingleArticle.set(singleKey, { data: article, timestamp: Date.now() });
        if (article.slug) {
          this.inMemorySingleArticle.set(`${article.slug}_${lang}`, { data: article, timestamp: Date.now() });
        }
      });

      this.emit({ type: 'articles-loaded', language: lang, data: articles });
      return articles;
    } catch (err: any) {
      this.emit({ type: 'error', language: lang, error: err });
      // 1. Fallback to cache if available
      const fallback = this.getFromLocalStorage<Article[]>(cacheKey);
      if (fallback && fallback.length > 0) return fallback;
      // 2. Fallback to built-in canonical repository so articles NEVER fail on static GitHub Pages
      const repoFallback = getAllArticles(lang);
      if (repoFallback && repoFallback.length > 0) {
        let filtered = repoFallback;
        if (options.category && options.category !== 'All') {
          filtered = filtered.filter(a => a.category.toLowerCase() === options.category!.toLowerCase());
        }
        if (options.tag) {
          filtered = filtered.filter(a => a.tags.some(t => t.toLowerCase() === options.tag!.toLowerCase()));
        }
        if (options.status && options.status !== 'All') {
          filtered = filtered.filter(a => a.verification_status.toLowerCase() === options.status!.toLowerCase());
        }
        return filtered;
      }
      throw err;
    }
  }

  /**
   * Fetch single article by ID or slug in requested language
   */
  public async fetchArticle(
    idOrSlug: string,
    lang: LanguageCode = this.currentLanguage,
    forceRefresh = false
  ): Promise<Article | null> {
    const cacheKey = `article_${idOrSlug}_${lang}`;

    if (!forceRefresh) {
      const memoryHit = this.inMemorySingleArticle.get(cacheKey);
      if (memoryHit && Date.now() - memoryHit.timestamp < CACHE_TTL_MS) {
        return memoryHit.data;
      }
      const storageHit = this.getFromLocalStorage<Article>(cacheKey);
      if (storageHit) {
        this.inMemorySingleArticle.set(cacheKey, { data: storageHit, timestamp: Date.now() });
        return storageHit;
      }
    }

    try {
      const res = await fetch(`/api/content/articles/${encodeURIComponent(idOrSlug)}?lang=${lang}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch article`);
      }
      const data = await res.json();
      const article: Article = data.article;
      if (article) {
        this.inMemorySingleArticle.set(cacheKey, { data: article, timestamp: Date.now() });
        this.writeToLocalStorage(cacheKey, article);
        return article;
      }
      return getArticleByIdOrSlug(idOrSlug, lang);
    } catch {
      const fallback = this.getFromLocalStorage<Article>(cacheKey);
      if (fallback) return fallback;
      const repoFallback = getArticleByIdOrSlug(idOrSlug, lang);
      if (repoFallback) return repoFallback;
      return null;
    }
  }

  /**
   * Fetch all article translations dictionary for a specific language
   */
  public async fetchTranslationsForLanguage(
    lang: LanguageCode = this.currentLanguage,
    forceRefresh = false
  ): Promise<Record<string, ContentTranslationMap>> {
    const cacheKey = `translations_${lang}`;

    if (!forceRefresh) {
      const memoryHit = this.inMemoryTranslations.get(lang);
      if (memoryHit && Date.now() - memoryHit.timestamp < CACHE_TTL_MS) {
        return memoryHit.data;
      }
      const storageHit = this.getFromLocalStorage<Record<string, ContentTranslationMap>>(cacheKey);
      if (storageHit) {
        this.inMemoryTranslations.set(lang, { data: storageHit, timestamp: Date.now() });
        return storageHit;
      }
    }

    try {
      const res = await fetch(`/api/content/translations/${lang}`);
      if (!res.ok) {
        // Fallback: derive translations map from fetchArticles if translations route is not yet responded
        const articles = await this.fetchArticles(lang);
        const map: Record<string, ContentTranslationMap> = {};
        for (const a of articles) {
          map[a.id] = {
            title: (a as any).display_title || a.original_title,
            summary: (a as any).display_summary || a.summary,
            content: (a as any).display_content || a.original_content,
            status: (a as any).translation_status
          };
        }
        this.inMemoryTranslations.set(lang, { data: map, timestamp: Date.now() });
        this.writeToLocalStorage(cacheKey, map);
        this.emit({ type: 'translations-loaded', language: lang, data: map });
        return map;
      }

      const data = await res.json();
      const translations: Record<string, ContentTranslationMap> = data.translations || {};

      this.inMemoryTranslations.set(lang, { data: translations, timestamp: Date.now() });
      this.writeToLocalStorage(cacheKey, translations);
      this.emit({ type: 'translations-loaded', language: lang, data: translations });
      return translations;
    } catch (err: any) {
      const fallback = this.getFromLocalStorage<Record<string, ContentTranslationMap>>(cacheKey);
      if (fallback) return fallback;
      return {};
    }
  }

  /**
   * Save / submit a new or updated translation for an article to the backend
   */
  public async saveArticleTranslation(
    articleId: string,
    lang: LanguageCode,
    data: {
      title: string;
      content: string;
      summary: string;
      translator_name?: string;
    }
  ): Promise<{ success: boolean; article?: Article; error?: string }> {
    try {
      const res = await fetch(`/api/content/articles/${encodeURIComponent(articleId)}/translations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang,
          title: data.title,
          content: data.content,
          summary: data.summary,
          translator_name: data.translator_name
        })
      });

      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || 'Failed to save translation' };
      }

      // Invalidate relevant caches for this language
      this.invalidateLanguage(lang);

      // Emit event
      this.emit({
        type: 'article-saved',
        language: lang,
        data: { articleId, article: resData.article }
      });

      return { success: true, article: resData.article };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error saving translation' };
    }
  }

  /**
   * Synchronously resolve the best display title, content, and summary for an article
   * using language overlay, cached translations map, or article fallback
   */
  public getArticleContent(
    article: Article,
    targetLang: LanguageCode = this.currentLanguage
  ): {
    title: string;
    content: string;
    summary: string;
    isTranslated: boolean;
    status?: string;
  } {
    // 1. If article already has display_* injected by backend for this language
    if ((article as any).display_title && targetLang !== 'en') {
      return {
        title: (article as any).display_title,
        content: (article as any).display_content,
        summary: (article as any).display_summary,
        isTranslated: Boolean((article as any).has_translation),
        status: (article as any).translation_status
      };
    }

    // 2. Check embedded translations field on article
    if (targetLang !== 'en' && article.translations && article.translations[targetLang]) {
      const tr = article.translations[targetLang];
      return {
        title: tr.title,
        content: tr.content,
        summary: tr.summary,
        isTranslated: true,
        status: tr.status
      };
    }

    // 3. Check in-memory translations map for this language
    const langMap = this.inMemoryTranslations.get(targetLang)?.data;
    if (targetLang !== 'en' && langMap && langMap[article.id]) {
      const tr = langMap[article.id];
      return {
        title: tr.title,
        content: tr.content,
        summary: tr.summary,
        isTranslated: true,
        status: tr.status
      };
    }

    // 4. Fallback to original English
    return {
      title: article.original_title,
      content: article.original_content,
      summary: article.summary,
      isTranslated: targetLang === 'en' || article.original_language === targetLang,
      status: 'original'
    };
  }

  /**
   * Pre-fetches translations for all 8 supported languages in background
   */
  public async prefetchAllLanguages(): Promise<void> {
    const promises = SUPPORTED_LANGUAGES.map(lang => 
      this.fetchTranslationsForLanguage(lang.code).catch(() => {})
    );
    await Promise.all(promises);
  }
}

// Global Singleton Instance
export const translationManager = new TranslationManager();
export default translationManager;
