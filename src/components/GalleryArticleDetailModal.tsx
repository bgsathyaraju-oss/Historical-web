import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  MapPin,
  Camera,
  Scale,
  BookOpen,
  Landmark,
  Users,
  ScrollText,
  Tag,
  Sparkles,
  FileText,
  ExternalLink,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { LanguageCode } from '../types';
import {
  EnrichedGalleryArticle,
  GalleryKeywordTag,
  GALLERY_UI_TRANSLATIONS,
  getRelatedGalleryArticles,
  filterGalleryArticlesByKeyword,
  getAllGalleryKeywords
} from '../data/galleryArticlesEnrichment';

export type ModalHistoryView =
  | { type: 'article'; articleId: string }
  | { type: 'keyword'; keywordQuery: string; keywordLabel: string };

interface GalleryArticleDetailModalProps {
  currentView: ModalHistoryView | null;
  historyStack: ModalHistoryView[];
  allArticles: EnrichedGalleryArticle[];
  language: LanguageCode;
  onSelectArticle: (articleId: string) => void;
  onSelectKeyword: (keywordQuery: string, keywordLabel: string) => void;
  onApplyKeywordToPage?: (keywordQuery: string, keywordLabel: string) => void;
  onBack: () => void;
  onClose: () => void;
}

export const GalleryArticleDetailModal: React.FC<GalleryArticleDetailModalProps> = ({
  currentView,
  historyStack,
  allArticles,
  language,
  onSelectArticle,
  onSelectKeyword,
  onApplyKeywordToPage,
  onBack,
  onClose
}) => {
  const ui = GALLERY_UI_TRANSLATIONS[language] || GALLERY_UI_TRANSLATIONS.en;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Reset active image index and scroll modal content to top whenever view changes
  useEffect(() => {
    setActiveImageIdx(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  // Lock background scrolling while modal is open without losing visitor's scroll position
  useEffect(() => {
    if (!currentView) return;
    const savedScrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // Ensure scroll position stays intact
      if (Math.abs(window.scrollY - savedScrollY) > 5) {
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [currentView, onClose]);

  if (!currentView) return null;

  const previousView =
    historyStack.length > 0 ? historyStack[historyStack.length - 1] : null;

  const backButtonLabel = previousView
    ? previousView.type === 'article'
      ? ui.backToPreviousArticle
      : ui.backToKeywordResults
    : ui.backToGallery;

  // Render Keyword Related-Content View inside Modal
  if (currentView.type === 'keyword') {
    const matchingArticles = filterGalleryArticlesByKeyword(
      currentView.keywordQuery,
      language,
      allArticles
    );
    const allKeywords = getAllGalleryKeywords(language);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-keyword-modal-title"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#0d1017] border-2 border-[#c99738]/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Sticky Top Navigation Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#2b0308] via-[#1a0b12] to-[#121622] border-b border-[#c99738]/40">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-[#c99738] text-[#fcedc7] hover:text-[#2b0308] border border-[#c99738]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              aria-label={backButtonLabel}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{ui.backButton}</span>
              <span className="hidden md:inline text-[11px] opacity-80 font-normal">
                ({backButtonLabel})
              </span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e8c872] truncate">
              <Tag className="w-4 h-4 shrink-0 text-[#d4af37]" />
              <span className="truncate">{ui.keywordModalHeader}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-red-950/90 text-stone-200 hover:text-amber-200 border border-stone-700 hover:border-[#c99738] text-xs sm:text-sm font-bold transition-all cursor-pointer"
              aria-label={ui.closeButton}
            >
              <span>{ui.closeButton}</span>
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Scrollable Keyword Content */}
          <div
            ref={scrollContainerRef}
            className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1"
          >
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2a0810]/90 to-[#121622] border border-[#c99738]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {ui.articlesMatchingKeyword}
                </span>
                <h2
                  id="gallery-keyword-modal-title"
                  className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#fcedc7]"
                >
                  “{currentView.keywordLabel}” ({matchingArticles.length})
                </h2>
              </div>

              {onApplyKeywordToPage && (
                <button
                  type="button"
                  onClick={() => {
                    onApplyKeywordToPage(currentView.keywordQuery, currentView.keywordLabel);
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#c99738] hover:bg-[#ddb04f] text-[#2b0308] font-bold text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-center shadow-md"
                >
                  {ui.keywordFilterActiveBanner} →
                </button>
              )}
            </div>

            {matchingArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {matchingArticles.map(matched => (
                  <div
                    key={matched.item.id}
                    onClick={() => onSelectArticle(matched.item.id)}
                    className="group rounded-2xl overflow-hidden bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-xl"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative bg-black">
                        <img
                          src={matched.item.image_url}
                          alt={matched.item.alt_text}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                            {matched.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-[11px] text-[#d4af37] font-semibold">
                          {matched.item.period} • {matched.item.location}
                        </div>
                        <h3 className="font-royal-heading font-bold text-base text-[#fcedc7] group-hover:text-[#e8c872] transition-colors">
                          {matched.item.title}
                        </h3>
                        <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                          {matched.fullDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 truncate max-w-[60%]">
                        {matched.item.source}
                      </span>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onSelectArticle(matched.item.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#c99738]/20 hover:bg-[#c99738] text-[#fcedc7] hover:text-[#2b0308] border border-[#c99738]/50 text-xs font-bold transition-all cursor-pointer"
                      >
                        {ui.viewDetails} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#141926] border border-stone-800 text-center space-y-4">
                <Tag className="w-10 h-10 text-[#d4af37] mx-auto opacity-80" />
                <h3 className="font-royal-heading font-bold text-lg text-[#fcedc7]">
                  {ui.noRelatedArticlesFound}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
                  {ui.noKeywordArticlesFoundDesc}
                </p>
              </div>
            )}

            {/* All Available Keywords Browser */}
            <div className="p-5 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {ui.popularKeywordsLabel}
              </h4>
              <div className="flex flex-wrap gap-2">
                {allKeywords.map(kw => {
                  const isActive =
                    kw.id.toLowerCase() === currentView.keywordQuery.toLowerCase() ||
                    kw.label.toLowerCase() === currentView.keywordQuery.toLowerCase();
                  return (
                    <button
                      key={kw.id}
                      type="button"
                      onClick={() => onSelectKeyword(kw.id, kw.label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#c99738] text-[#2b0308] border-[#fcedc7] shadow-md'
                          : 'bg-stone-900/90 text-stone-300 border-stone-700 hover:border-[#c99738] hover:text-[#fcedc7]'
                      }`}
                    >
                      # {kw.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Article Detail View
  const currentArticle =
    allArticles.find(a => a.item.id === currentView.articleId) || allArticles[0];
  if (!currentArticle) return null;

  const { item } = currentArticle;
  const images = currentArticle.galleryImages;
  const activeSlide = images[activeImageIdx] || images[0];
  const relatedMatches = getRelatedGalleryArticles(item.id, language, allArticles);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-article-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#0d1017] border-2 border-[#c99738]/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-stone-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Top Header with Back & Close Buttons */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#2b0308] via-[#1a0b12] to-[#121622] border-b border-[#c99738]/40">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-[#c99738] text-[#fcedc7] hover:text-[#2b0308] border border-[#c99738]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
            aria-label={backButtonLabel}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{ui.backButton}</span>
            <span className="hidden md:inline text-[11px] opacity-80 font-normal">
              ({backButtonLabel})
            </span>
          </button>

          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#580014] text-[#fcedc7] border border-[#d4af37]/50 truncate">
              {currentArticle.categoryLabel}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              {ui.verifiedPrimaryBadge}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-red-950/90 text-stone-200 hover:text-amber-200 border border-stone-700 hover:border-[#c99738] text-xs sm:text-sm font-bold transition-all cursor-pointer"
            aria-label={ui.closeButton}
          >
            <span>{ui.closeButton}</span>
            <X className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Scrollable Article Content Body */}
        <div
          ref={scrollContainerRef}
          className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8 flex-1"
        >
          {/* Article Title & Key Metadata Banner */}
          <div className="space-y-4 border-b border-stone-800 pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#d4af37] font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161b28] border border-stone-800">
                <Calendar className="w-3.5 h-3.5 text-[#c99738]" />
                {item.period}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161b28] border border-stone-800">
                <MapPin className="w-3.5 h-3.5 text-[#c99738]" />
                {item.location}
              </span>
              {currentArticle.dynasties.map((dyn, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2b0308]/70 text-[#fcedc7] border border-[#c99738]/40"
                >
                  <Landmark className="w-3.5 h-3.5 text-[#d4af37]" />
                  {dyn}
                </span>
              ))}
            </div>

            <h1
              id="gallery-article-modal-title"
              className="font-royal-heading font-extrabold text-xl sm:text-3xl text-[#fcedc7] leading-tight"
            >
              {item.title}
            </h1>

            {currentArticle.linkedArticleTitle && (
              <div className="text-xs text-stone-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1.5 text-[#e8c872]">
                  <BookOpen className="w-3.5 h-3.5" />
                  {currentArticle.linkedArticleTitle}
                </span>
                {currentArticle.linkedArticleAuthor && (
                  <span>• {currentArticle.linkedArticleAuthor}</span>
                )}
              </div>
            )}
          </div>

          {/* Primary Archival Image & Multi-Image Gallery Switcher */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-xl">
              <div className="max-h-[440px] flex items-center justify-center overflow-hidden bg-stone-950">
                <img
                  src={activeSlide.url}
                  alt={activeSlide.alt}
                  className="w-full max-h-[440px] object-contain"
                />
              </div>
              <div className="px-4 py-3 bg-[#121622] border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-stone-200 font-medium">{activeSlide.caption}</span>
                <span className="text-stone-400 shrink-0">
                  {ui.archivalSourceLabel}: {activeSlide.source}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {ui.imageGalleryHeading} ({images.length})
                </span>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 w-28 h-20 ${
                        activeImageIdx === idx
                          ? 'border-[#c99738] ring-2 ring-[#c99738]/40'
                          : 'border-stone-800 opacity-70 hover:opacity-100 hover:border-stone-600'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Complete Archival Description */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#161b28] to-[#121622] border border-[#c99738]/30 space-y-3">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e8c872] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              {ui.fullDescriptionHeading}
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              {currentArticle.fullDescription}
            </p>
          </div>

          {/* Historical Background & Documentary Context */}
          <div className="space-y-4">
            <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7] flex items-center gap-2 border-b border-stone-800 pb-2">
              <BookOpen className="w-5 h-5 text-[#d4af37]" />
              {ui.historicalBackgroundHeading}
            </h2>
            <div className="space-y-3.5 text-sm text-stone-300 leading-relaxed">
              {currentArticle.historicalBackground.map((para, idx) => (
                <p
                  key={idx}
                  className="p-4 rounded-xl bg-[#121622]/90 border border-stone-800/80 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Archaeological & Epigraphic Evidence + Excerpt */}
          {currentArticle.archaeologicalAndEpigraphicFindings.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7] flex items-center gap-2 border-b border-stone-800 pb-2">
                <ScrollText className="w-5 h-5 text-[#d4af37]" />
                {ui.archaeologicalFindingsHeading}
              </h2>
              <ul className="space-y-2.5">
                {currentArticle.archaeologicalAndEpigraphicFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 text-xs sm:text-sm text-stone-300 flex items-start gap-2.5 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>

              {(currentArticle.transcriptionExcerpt || currentArticle.translationExcerpt) && (
                <div className="p-5 rounded-2xl bg-[#1a0f16] border border-[#c99738]/40 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
                    {ui.epigraphicExcerptHeading}
                  </div>
                  {currentArticle.transcriptionExcerpt && (
                    <blockquote className="text-xs sm:text-sm italic text-amber-200/90 font-mono bg-black/40 p-3 rounded-lg border border-stone-800">
                      {currentArticle.transcriptionExcerpt}
                    </blockquote>
                  )}
                  {currentArticle.translationExcerpt && (
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {currentArticle.translationExcerpt}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Important Dates & Chronological Milestones */}
          {currentArticle.importantDates.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7] flex items-center gap-2 border-b border-stone-800 pb-2">
                <Calendar className="w-5 h-5 text-[#d4af37]" />
                {ui.importantDatesHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentArticle.importantDates.map((dt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#141926] border border-stone-800 space-y-1.5"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#2b0308] text-[#e8c872] border border-[#c99738]/40 text-xs font-bold">
                      {dt.dateText}
                    </span>
                    <h3 className="font-bold text-sm text-[#fcedc7]">{dt.eventTitle}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{dt.significance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two-Column Grid: Historical Figures & Historical Places */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Historical People */}
            <div className="p-5 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e8c872] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d4af37]" />
                {ui.historicalPeopleHeading}
              </h3>
              <ul className="space-y-2">
                {currentArticle.historicalPeople.map((person, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-stone-300 flex items-start gap-2"
                  >
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>{person}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical Places */}
            <div className="p-5 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e8c872] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                {ui.historicalPlacesHeading}
              </h3>
              <ul className="space-y-2">
                {currentArticle.historicalPlaces.map((place, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-stone-300 flex items-start gap-2"
                  >
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary Sources & Scholarly References */}
          <div className="space-y-4">
            <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7] flex items-center gap-2 border-b border-stone-800 pb-2">
              <Scale className="w-5 h-5 text-[#d4af37]" />
              {ui.referencesHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentArticle.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#141926] border border-stone-800 space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-800 text-[#e8c872]">
                        {ref.type}
                      </span>
                      {ref.verified && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#fcedc7]">{ref.title}</h4>
                    <p className="text-xs text-stone-400">{ref.authorityOrLocation}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-800/70 text-[11px] text-stone-400">
                    {ref.details}
                  </div>
                </div>
              ))}
            </div>
            {language !== 'en' && (
              <p className="text-[11px] text-stone-400 italic">
                {ui.translationNoticeFallback}
              </p>
            )}
          </div>

          {/* Archival Provenance & Licensing Metadata Box */}
          <div className="p-5 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {ui.archivalMetadataHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">{ui.creatorPhotographerLabel}:</span>
                <span className="text-stone-200 font-semibold">{item.creator_photographer}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{ui.archivalSourceLabel}:</span>
                <span className="text-stone-200 font-semibold">{item.source}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{ui.copyrightLicenseLabel}:</span>
                <span className="text-emerald-400 font-semibold">{item.copyright_license}</span>
              </div>
            </div>
          </div>

          {/* Clickable Keywords & Archival Topics Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1b1218] to-[#121622] border border-[#c99738]/40 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fcedc7] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#d4af37]" />
                {ui.keywordsHeading}
              </h3>
              <span className="text-[11px] text-stone-400">{ui.exploreKeywordTooltip}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentArticle.keywords.map((kw: GalleryKeywordTag) => (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() => onSelectKeyword(kw.id, kw.label)}
                  title={ui.exploreKeywordTooltip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-stone-900/90 hover:bg-[#c99738] text-[#e8c872] hover:text-[#2b0308] border border-[#c99738]/40 hover:border-[#fcedc7] transition-all cursor-pointer shadow-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{kw.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Related Historical Articles Section */}
          <div className="space-y-4 pt-2 border-t border-stone-800">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                {ui.relatedArticlesHeading}
              </h2>
              <p className="text-xs text-stone-400">{ui.relatedArticlesSubtitle}</p>
            </div>

            {relatedMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedMatches.map(({ article: rel, sharedKeywords }) => (
                  <div
                    key={rel.item.id}
                    onClick={() => onSelectArticle(rel.item.id)}
                    className="group rounded-xl overflow-hidden bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer flex flex-col justify-between shadow-md hover:shadow-xl"
                  >
                    <div>
                      <div className="h-36 overflow-hidden relative bg-black">
                        <img
                          src={rel.item.image_url}
                          alt={rel.item.alt_text}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2 py-0.5 rounded-full border border-[#d4af37]/40">
                            {rel.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1.5">
                        <div className="text-[10px] text-[#d4af37] font-semibold truncate">
                          {rel.item.period} • {rel.item.location}
                        </div>
                        <h4 className="font-royal-heading font-bold text-sm text-[#fcedc7] group-hover:text-[#e8c872] transition-colors line-clamp-2">
                          {rel.item.title}
                        </h4>
                        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                          {rel.item.description}
                        </p>
                        {sharedKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {sharedKeywords.slice(0, 2).map(sk => (
                              <span
                                key={sk.id}
                                className="text-[10px] px-2 py-0.5 rounded bg-stone-900 text-[#e8c872] border border-stone-700"
                              >
                                #{sk.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-3.5 pb-3.5 pt-2 border-t border-stone-800/70 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#e8c872] group-hover:translate-x-0.5 transition-transform">
                        {ui.viewDetails}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#141926] border border-stone-800 text-center text-xs text-stone-400">
                {ui.noRelatedArticlesFound}
              </div>
            )}
          </div>

          {/* Bottom Modal Action Bar for Mobile & Tablet Convenience */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#c99738] text-[#fcedc7] hover:text-[#2b0308] border border-[#c99738]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backButtonLabel}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c99738] hover:bg-[#ddb04f] text-[#2b0308] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md"
            >
              <span>{ui.closeButton}</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
