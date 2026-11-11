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
import { ReferenceIdBadge } from './ReferenceIdBadge';

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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#292521]/65 backdrop-blur-sm animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-keyword-modal-title"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFCF5] border-2 border-[#A87924] rounded-2xl shadow-[0_14px_45px_rgba(75,51,31,0.25)] overflow-hidden flex flex-col text-[#292521]"
          onClick={e => e.stopPropagation()}
        >
          {/* Sticky Top Navigation Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-[#F1E4D0] border-b border-[#D8C3A2]">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFCF5] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              aria-label={backButtonLabel}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{ui.backButton}</span>
              <span className="hidden md:inline text-[11px] opacity-80 font-normal">
                ({backButtonLabel})
              </span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#54351F] truncate">
              <Tag className="w-4 h-4 shrink-0 text-[#A87924]" />
              <span className="truncate">{ui.keywordModalHeader}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF5] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#D8C3A2] hover:border-[#A87924] text-xs sm:text-sm font-bold transition-all cursor-pointer"
              aria-label={ui.closeButton}
            >
              <span>{ui.closeButton}</span>
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Scrollable Keyword Content */}
          <div
            ref={scrollContainerRef}
            className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FFFCF5]"
          >
            <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#A87924]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#76501F] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#A87924]" />
                  {ui.articlesMatchingKeyword}
                </span>
                <h2
                  id="gallery-keyword-modal-title"
                  className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#54351F]"
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
                  className="px-4 py-2.5 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-center shadow-sm"
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
                    className="group rounded-2xl overflow-hidden bg-[#FFF9EF] border border-[#D8C3A2] hover:border-[#A87924] transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative bg-[#EFE3D0]">
                        <img
                          src={matched.item.image_url}
                          alt={matched.item.alt_text}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#762D35]/95 px-2.5 py-1 rounded-full border border-[#A87924]">
                            {matched.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-[11px] text-[#76501F] font-semibold">
                          {matched.item.period} • {matched.item.location}
                        </div>
                        <h3 className="font-royal-heading font-bold text-base text-[#54351F] group-hover:text-[#762D35] transition-colors">
                          {matched.item.title}
                        </h3>
                        <p className="text-xs text-[#292521] line-clamp-3 leading-relaxed">
                          {matched.fullDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 border-t border-[#D8C3A2] flex items-center justify-between">
                      <span className="text-[11px] text-[#6B5948] truncate max-w-[60%]">
                        {matched.item.source}
                      </span>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          onSelectArticle(matched.item.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#E9D9BE] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/50 text-xs font-bold transition-all cursor-pointer"
                      >
                        {ui.viewDetails} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] text-center space-y-4">
                <Tag className="w-10 h-10 text-[#A87924] mx-auto opacity-80" />
                <h3 className="font-royal-heading font-bold text-lg text-[#54351F]">
                  {ui.noRelatedArticlesFound}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5948] max-w-xl mx-auto leading-relaxed">
                  {ui.noKeywordArticlesFoundDesc}
                </p>
              </div>
            )}

            {/* All Available Keywords Browser */}
            <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A87924]" />
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
                          ? 'bg-[#762D35] text-white border-[#A87924] shadow-sm'
                          : 'bg-[#FFFCF5] text-[#54351F] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#E9D9BE]'
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#292521]/65 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-article-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFCF5] border-2 border-[#A87924] rounded-2xl shadow-[0_14px_45px_rgba(75,51,31,0.25)] overflow-hidden flex flex-col text-[#292521]"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Top Header with Back & Close Buttons */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 sm:px-6 py-3.5 bg-[#F1E4D0] border-b border-[#D8C3A2]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFCF5] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
            aria-label={backButtonLabel}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{ui.backButton}</span>
            <span className="hidden md:inline text-[11px] opacity-80 font-normal">
              ({backButtonLabel})
            </span>
          </button>

          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#762D35] text-white border border-[#A87924] truncate">
              {currentArticle.categoryLabel}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EDF7F0] text-[#14532D] border border-[#2D7A4D]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {ui.verifiedPrimaryBadge}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF5] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#D8C3A2] hover:border-[#A87924] text-xs sm:text-sm font-bold transition-all cursor-pointer"
            aria-label={ui.closeButton}
          >
            <span>{ui.closeButton}</span>
            <X className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* Scrollable Article Content Body */}
        <div
          ref={scrollContainerRef}
          className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8 flex-1 bg-[#FFFCF5]"
        >
          {/* Article Title & Key Metadata Banner */}
          <div className="space-y-4 border-b border-[#D8C3A2] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#54351F] font-semibold">
              <ReferenceIdBadge itemId={item.id} />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF9EF] border border-[#D8C3A2]">
                <Calendar className="w-3.5 h-3.5 text-[#A87924]" />
                {item.period}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF9EF] border border-[#D8C3A2]">
                <MapPin className="w-3.5 h-3.5 text-[#A87924]" />
                {item.location}
              </span>
              {currentArticle.dynasties.map((dyn, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFE3D0] text-[#54351F] border border-[#A87924]/50"
                >
                  <Landmark className="w-3.5 h-3.5 text-[#A87924]" />
                  {dyn}
                </span>
              ))}
            </div>

            <h1
              id="gallery-article-modal-title"
              className="font-royal-heading font-extrabold text-xl sm:text-3xl text-[#54351F] leading-tight"
            >
              {item.title}
            </h1>

            {currentArticle.linkedArticleTitle && (
              <div className="royal-profile-title-box bg-[var(--profile-title-box-bg)] text-[var(--profile-title-box-text)] border border-[var(--profile-title-box-border)] text-xs flex flex-wrap items-center gap-x-4 gap-y-1 break-words">
                <span className="inline-flex items-center gap-1.5 text-[var(--profile-title-box-text)] font-semibold break-words">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--profile-title-box-text)] shrink-0" />
                  {currentArticle.linkedArticleTitle}
                </span>
                {currentArticle.linkedArticleAuthor && (
                  <span className="text-[var(--profile-title-box-text)] break-words">• {currentArticle.linkedArticleAuthor}</span>
                )}
              </div>
            )}
          </div>

          {/* Primary Archival Image & Multi-Image Gallery Switcher */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden bg-[#EFE3D0] border border-[#D8C3A2] shadow-md">
              <div className="max-h-[440px] flex items-center justify-center overflow-hidden bg-[#EFE3D0]">
                <img
                  src={activeSlide.url}
                  alt={activeSlide.alt}
                  className="w-full max-h-[440px] object-contain"
                />
              </div>
              <div className="royal-profile-title-box px-4 py-3 bg-[var(--profile-title-box-bg)] text-[var(--profile-title-box-text)] border-t border-[var(--profile-title-box-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs break-words">
                <span className="text-[var(--profile-title-box-text)] font-medium break-words">{activeSlide.caption}</span>
                <span className="text-[var(--profile-title-box-text)] font-semibold break-words">
                  {ui.archivalSourceLabel}: {activeSlide.source}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#A87924]" />
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
                          ? 'border-[#762D35] ring-2 ring-[#A87924]/40'
                          : 'border-[#D8C3A2] opacity-75 hover:opacity-100 hover:border-[#A87924]'
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
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9EF] border border-[#A87924]/50 space-y-3">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A87924]" />
              {ui.fullDescriptionHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#292521] leading-relaxed">
              {currentArticle.fullDescription}
            </p>
          </div>

          {/* Historical Background & Documentary Context */}
          <div className="space-y-4">
            <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] flex items-center gap-2 border-b border-[#D8C3A2] pb-2">
              <BookOpen className="w-5 h-5 text-[#A87924]" />
              {ui.historicalBackgroundHeading}
            </h2>
            <div className="space-y-3.5 text-sm text-[#292521] leading-relaxed">
              {currentArticle.historicalBackground.map((para, idx) => (
                <p
                  key={idx}
                  className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Archaeological & Epigraphic Evidence + Excerpt */}
          {currentArticle.archaeologicalAndEpigraphicFindings.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] flex items-center gap-2 border-b border-[#D8C3A2] pb-2">
                <ScrollText className="w-5 h-5 text-[#A87924]" />
                {ui.archaeologicalFindingsHeading}
              </h2>
              <ul className="space-y-2.5">
                {currentArticle.archaeologicalAndEpigraphicFindings.map((finding, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs sm:text-sm text-[#292521] flex items-start gap-2.5 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>

              {(currentArticle.transcriptionExcerpt || currentArticle.translationExcerpt) && (
                <div className="p-5 rounded-2xl bg-[#EFE3D0] border border-[#A87924]/50 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#54351F]">
                    {ui.epigraphicExcerptHeading}
                  </div>
                  {currentArticle.transcriptionExcerpt && (
                    <blockquote className="text-xs sm:text-sm italic text-[#54351F] font-mono bg-[#FFFCF5] p-3 rounded-lg border border-[#D8C3A2]">
                      {currentArticle.transcriptionExcerpt}
                    </blockquote>
                  )}
                  {currentArticle.translationExcerpt && (
                    <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
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
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] flex items-center gap-2 border-b border-[#D8C3A2] pb-2">
                <Calendar className="w-5 h-5 text-[#A87924]" />
                {ui.importantDatesHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentArticle.importantDates.map((dt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#762D35] text-white border border-[#A87924] text-xs font-bold">
                      {dt.dateText}
                    </span>
                    <h3 className="font-bold text-sm text-[#54351F]">{dt.eventTitle}</h3>
                    <p className="text-xs text-[#6B5948] leading-relaxed">{dt.significance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two-Column Grid: Historical Figures & Historical Places */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Historical People */}
            <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A87924]" />
                {ui.historicalPeopleHeading}
              </h3>
              <ul className="space-y-2">
                {currentArticle.historicalPeople.map((person, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#292521] flex items-start gap-2"
                  >
                    <span className="text-[#A87924] font-bold">•</span>
                    <span>{person}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical Places */}
            <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-3">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A87924]" />
                {ui.historicalPlacesHeading}
              </h3>
              <ul className="space-y-2">
                {currentArticle.historicalPlaces.map((place, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#292521] flex items-start gap-2"
                  >
                    <span className="text-[#A87924] font-bold">•</span>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary Sources & Scholarly References */}
          <div className="space-y-4">
            <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] flex items-center gap-2 border-b border-[#D8C3A2] pb-2">
              <Scale className="w-5 h-5 text-[#A87924]" />
              {ui.referencesHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentArticle.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2]">
                        {ref.type}
                      </span>
                      {ref.verified && (
                        <span className="text-[10px] text-[#14532D] flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#54351F]">{ref.title}</h4>
                    <p className="text-xs text-[#6B5948]">{ref.authorityOrLocation}</p>
                  </div>
                  <div className="pt-2 border-t border-[#D8C3A2] text-[11px] text-[#292521]">
                    {ref.details}
                  </div>
                </div>
              ))}
            </div>
            {language !== 'en' && (
              <p className="text-[11px] text-[#6B5948] italic">
                {ui.translationNoticeFallback}
              </p>
            )}
          </div>

          {/* Archival Provenance & Licensing Metadata Box */}
          <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#A87924]" />
              {ui.archivalMetadataHeading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#6B5948] block">{ui.creatorPhotographerLabel}:</span>
                <span className="text-[#292521] font-semibold">{item.creator_photographer}</span>
              </div>
              <div>
                <span className="text-[#6B5948] block">{ui.archivalSourceLabel}:</span>
                <span className="text-[#292521] font-semibold">{item.source}</span>
              </div>
              <div>
                <span className="text-[#6B5948] block">{ui.copyrightLicenseLabel}:</span>
                <span className="text-[#14532D] font-semibold">{item.copyright_license}</span>
              </div>
            </div>
          </div>

          {/* Clickable Keywords & Archival Topics Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#EFE3D0] border border-[#A87924]/50 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#A87924]" />
                {ui.keywordsHeading}
              </h3>
              <span className="text-[11px] text-[#6B5948]">{ui.exploreKeywordTooltip}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentArticle.keywords.map((kw: GalleryKeywordTag) => (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() => onSelectKeyword(kw.id, kw.label)}
                  title={ui.exploreKeywordTooltip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFFCF5] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#D8C3A2] hover:border-[#A87924] transition-all cursor-pointer shadow-sm"
                >
                  <Tag className="w-3 h-3" />
                  <span>{kw.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Related Historical Articles Section */}
          <div className="space-y-4 pt-2 border-t border-[#D8C3A2]">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#A87924]" />
                {ui.relatedArticlesHeading}
              </h2>
              <p className="text-xs text-[#6B5948]">{ui.relatedArticlesSubtitle}</p>
            </div>

            {relatedMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedMatches.map(({ article: rel, sharedKeywords }) => (
                  <div
                    key={rel.item.id}
                    onClick={() => onSelectArticle(rel.item.id)}
                    className="group rounded-xl overflow-hidden bg-[#FFF9EF] border border-[#D8C3A2] hover:border-[#A87924] transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="h-36 overflow-hidden relative bg-[#EFE3D0]">
                        <img
                          src={rel.item.image_url}
                          alt={rel.item.alt_text}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#762D35]/95 px-2 py-0.5 rounded-full border border-[#A87924]">
                            {rel.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1.5">
                        <div className="text-[10px] text-[#76501F] font-semibold truncate">
                          {rel.item.period} • {rel.item.location}
                        </div>
                        <h4 className="font-royal-heading font-bold text-sm text-[#54351F] group-hover:text-[#762D35] transition-colors line-clamp-2">
                          {rel.item.title}
                        </h4>
                        <p className="text-xs text-[#292521] line-clamp-2 leading-relaxed">
                          {rel.item.description}
                        </p>
                        {sharedKeywords.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {sharedKeywords.slice(0, 2).map(sk => (
                              <span
                                key={sk.id}
                                className="text-[10px] px-2 py-0.5 rounded bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2]"
                              >
                                #{sk.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-3.5 pb-3.5 pt-2 border-t border-[#D8C3A2] flex items-center justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#76501F] group-hover:translate-x-0.5 transition-transform">
                        {ui.viewDetails}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-center text-xs text-[#6B5948]">
                {ui.noRelatedArticlesFound}
              </div>
            )}
          </div>

          {/* Bottom Modal Action Bar for Mobile & Tablet Convenience */}
          <div className="pt-4 border-t border-[#D8C3A2] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E9D9BE] hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/50 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backButtonLabel}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
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
