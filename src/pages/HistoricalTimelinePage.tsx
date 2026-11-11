import React, { useState, useEffect } from 'react';
import { HistoricalEvent, Article } from '../types';
import {
  Calendar,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Clock,
  ChevronRight,
  Scroll,
  Crown,
  Hash,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCanonicalTimelineEvents } from '../data/archivalSeedData';
import { HistoricalRecordsExplorer } from '../components/HistoricalRecordDetailView';
import {
  MYTHOLOGY_TO_HISTORY_STAGES,
  SEVEN_HISTORICAL_CATEGORIES
} from '../data/sevenCategoriesExpansionData';
import { getAllArticles, getArticleByIdOrSlug } from '../data/articlesRepository';
import { ARTICLE_STRUCTURED_METADATA_MAP } from '../data/expandedDynastiesAndCategoriesArticles';
import { ArticleDetailView } from '../components/ArticleDetailView';

interface HistoricalTimelinePageProps {
  onNavigate?: (path: string) => void;
  initialEventId?: string | null;
}

export const HistoricalTimelinePage: React.FC<HistoricalTimelinePageProps> = ({
  onNavigate,
  initialEventId
}) => {
  const { t, language, translateText } = useLanguage();
  const [events, setEvents] = useState<HistoricalEvent[]>(() =>
    getCanonicalTimelineEvents(language)
  );
  const [selectedStageId, setSelectedStageId] = useState<string>(
    MYTHOLOGY_TO_HISTORY_STAGES[0].id
  );
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const allArticles = getAllArticles(language);
  const timelineCategory = SEVEN_HISTORICAL_CATEGORIES.find(
    c => c.id === 'cat_historical_timeline'
  );

  useEffect(() => {
    setEvents(getCanonicalTimelineEvents(language));
    fetch(`/api/content/timeline?lang=${language}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d?.events && d.events.length > 0) setEvents(d.events);
      })
      .catch(() => {});
  }, [language]);

  useEffect(() => {
    if (activeArticle) {
      const refreshed = getArticleByIdOrSlug(activeArticle.id, language);
      if (refreshed) setActiveArticle(refreshed);
    }
  }, [language]);

  const activeStage =
    MYTHOLOGY_TO_HISTORY_STAGES.find(s => s.id === selectedStageId) ||
    MYTHOLOGY_TO_HISTORY_STAGES[0];

  const handleOpenArticle = (articleId: string) => {
    const found = getArticleByIdOrSlug(articleId, language);
    if (found) {
      setActiveArticle(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(`/documentary?article=${encodeURIComponent(articleId)}`);
    }
  };

  if (activeArticle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleDetailView
          article={activeArticle}
          allArticles={allArticles}
          onBack={() => setActiveArticle(null)}
          onNavigate={onNavigate}
          onSelectArticle={art => {
            setActiveArticle(art);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          basePath="/timeline"
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* SECTION 1: MYTHOLOGY TO HISTORICAL TIMELINE (8 CHRONOLOGICAL STAGES) */}
      {!initialEventId && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          {/* Category 1 Introduction Card */}
          <div className="rounded-3xl bg-[#FFFCF5] border-2 border-[#A87924] p-6 sm:p-8 shadow-md space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762D35] text-white border border-[#A87924] text-xs font-extrabold uppercase tracking-wider">
                  <Hash className="w-3.5 h-3.5 text-[#F5EBD9]" />
                  <span>Category 1 • Ref: HT-0001</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EF] text-[#54351F] border border-[#A87924] text-xs font-bold">
                  <Layers className="w-3.5 h-3.5 text-[#762D35]" />
                  <span>8 Chronological Stages • 20 Dated Archival Records</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenArticle('art_cat_mythology_to_history_timeline')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {translateText('Read Full Chronological Methodology Monograph (HT-0001)')}
                </span>
              </button>
            </div>

            <div>
              <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
                {timelineCategory
                  ? timelineCategory.title[language] || timelineCategory.title.en
                  : translateText('Mythology to Historical Timeline')}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#76501F] mt-1">
                {timelineCategory
                  ? timelineCategory.subtitle[language] || timelineCategory.subtitle.en
                  : ''}
              </p>
              <p className="font-royal-serif text-sm sm:text-base text-[#292521] mt-3 leading-relaxed">
                {timelineCategory
                  ? timelineCategory.introduction[language] || timelineCategory.introduction.en
                  : ''}
              </p>
            </div>

            {/* 8-Stage Horizontal / Grid Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {MYTHOLOGY_TO_HISTORY_STAGES.map(stage => {
                const isSelected = stage.id === activeStage.id;
                const stageTitle = stage.title[language] || stage.title.en;
                const stageDate = stage.approxDateLabel[language] || stage.approxDateLabel.en;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#762D35] text-white border-[#A87924] shadow-md'
                        : 'bg-[#FFF9EF] text-[#292521] border-[#A87924]/70 hover:bg-[#F5EBD9] hover:border-[#A87924]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${
                          isSelected
                            ? 'bg-[#FFFCF5] text-[#762D35] border-[#A87924]'
                            : 'bg-[#762D35] text-white border-[#A87924]'
                        }`}
                      >
                        Stage {stage.stageOrder} • {stage.refNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected ? 'text-[#F5EBD9]' : 'text-[#76501F]'
                        }`}
                      >
                        {stage.epistemicTier === 'verified_historical' || stage.epistemicTier === 'early_epigraphic'
                          ? translateText('Epigraphic')
                          : translateText('Traditional / Literary')}
                      </span>
                    </div>
                    <h3
                      className={`font-royal-heading font-bold text-xs sm:text-sm leading-snug ${
                        isSelected ? 'text-white' : 'text-[#54351F]'
                      }`}
                    >
                      {stageTitle}
                    </h3>
                    <div
                      className={`text-[11px] font-medium flex items-center gap-1 ${
                        isSelected ? 'text-[#F5EBD9]' : 'text-[#76501F]'
                      }`}
                    >
                      <Clock className="w-3 h-3 shrink-0" />
                      <span className="truncate">{stageDate}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Panel */}
            <div className="rounded-2xl bg-[#FFF9EF] border-2 border-[#A87924] p-5 sm:p-7 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Symbolic Illustration & Visual Provenance */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="rounded-2xl overflow-hidden border border-[#A87924] bg-[#FFFCF5] shadow-sm">
                    <img
                      src={activeStage.symbolicIllustration}
                      alt={activeStage.title[language] || activeStage.title.en}
                      className="w-full h-56 sm:h-64 object-cover"
                    />
                    <div className="p-3 bg-[#762D35] text-white text-xs space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[#F5EBD9]">
                          Stage {activeStage.stageOrder} ({activeStage.refNumber})
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#FFFCF5] text-[#54351F] text-[10px] font-bold">
                          {activeStage.epistemicLabel[language] || activeStage.epistemicLabel.en}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/95 leading-snug">
                        {activeStage.illustrationCaption[language] || activeStage.illustrationCaption.en}
                      </p>
                      <p className="text-[10px] text-[#F5EBD9]/90 italic">
                        {activeStage.visualTypeBadge[language] || activeStage.visualTypeBadge.en}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stage Content, Epistemic Note, Monuments & Linked Articles */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#762D35] text-white text-xs font-bold border border-[#A87924]">
                      Stage {activeStage.stageOrder} of 8 • {activeStage.stageCode}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFFCF5] text-[#54351F] text-xs font-bold border border-[#A87924]">
                      {activeStage.approxDateLabel[language] || activeStage.approxDateLabel.en}
                    </span>
                  </div>

                  <h3 className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#54351F]">
                    {activeStage.title[language] || activeStage.title.en}
                  </h3>

                  <p className="font-royal-serif text-sm sm:text-base text-[#292521] font-semibold leading-relaxed">
                    {activeStage.conciseOverview[language] || activeStage.conciseOverview.en}
                  </p>

                  <p className="font-royal-serif text-xs sm:text-sm text-[#292521] leading-relaxed bg-[#FFFCF5] p-4 rounded-xl border border-[#A87924]/70">
                    {activeStage.detailedAnalysis[language] || activeStage.detailedAnalysis.en}
                  </p>

                  {/* Chronological Uncertainty & Epistemic Boundary Note */}
                  <div className="p-3.5 rounded-xl bg-[#FFFCF5] border-l-4 border-[#762D35] border-y border-r border-[#A87924] text-xs space-y-1">
                    <div className="font-bold text-[#762D35] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>
                        {translateText('Chronological Uncertainty & Epistemic Classification:')}
                      </span>
                    </div>
                    <p className="text-[#54351F] leading-relaxed">
                      {activeStage.chronologicalUncertaintyNote[language] ||
                        activeStage.chronologicalUncertaintyNote.en}
                    </p>
                  </div>

                  {/* Key Monuments & Epigraphic Corroboration */}
                  <div className="p-3.5 rounded-xl bg-[#FFFCF5] border border-[#A87924]/60 text-xs">
                    <div className="font-bold text-[#762D35] uppercase text-[10px] mb-1.5 flex items-center gap-1">
                      <Scroll className="w-3.5 h-3.5" />
                      <span>{translateText('Key Monuments, Inscriptions & Primary Corroboration')}</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#292521]">
                      {activeStage.keyMonumentsAndInscriptions.map((item: string, i: number) => (
                        <li key={i} className="leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Linked Full Articles for this Stage */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#54351F]">
                      {translateText('Detailed Historical Articles for This Chronological Stage:')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeStage.linkedArticleIds.map(artId => {
                        const art = getArticleByIdOrSlug(artId, language);
                        const meta = ARTICLE_STRUCTURED_METADATA_MAP[artId];
                        if (!art) return null;
                        return (
                          <button
                            key={artId}
                            type="button"
                            onClick={() => handleOpenArticle(artId)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] text-xs font-bold transition-all cursor-pointer shadow-sm"
                          >
                            {meta && (
                              <span className="px-1.5 py-0.5 rounded bg-[#FFFCF5] text-[#762D35] text-[10px] font-extrabold">
                                {meta.refNumber}
                              </span>
                            )}
                            <span className="line-clamp-1 max-w-xs">{art.original_title}</span>
                            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-CATEGORY EPISTEMIC DATE CLASSIFICATION BREAKDOWN */}
              {activeStage.dateClassificationBreakdown && (
                <div className="pt-4 border-t border-[#A87924]/50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm font-royal-heading font-extrabold text-[#54351F] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#762D35]" />
                      <span>
                        {translateText(
                          'Four-Tier Epistemic Chronology Distinction (Inscriptional • Approximate • Disputed • Traditional)'
                        )}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#762D35] text-[#F5EBD9] text-[10px] font-bold border border-[#A87924]">
                      {activeStage.refNumber} • {translateText('Chronological Audit Standard')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#FFFCF5] border-l-4 border-[#1F5E3B] border-y border-r border-[#A87924]/70 space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#1F5E3B]">
                        1. {translateText('Established Inscriptional Dates')}
                      </div>
                      <p className="text-[#292521] leading-relaxed">
                        {activeStage.dateClassificationBreakdown.establishedInscriptional[language] ||
                          activeStage.dateClassificationBreakdown.establishedInscriptional.en}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FFFCF5] border-l-4 border-[#A87924] border-y border-r border-[#A87924]/70 space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#76501F]">
                        2. {translateText('Approximate Dynastic Reign Dates')}
                      </div>
                      <p className="text-[#292521] leading-relaxed">
                        {activeStage.dateClassificationBreakdown.approximateDynastic[language] ||
                          activeStage.dateClassificationBreakdown.approximateDynastic.en}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FFFCF5] border-l-4 border-[#762D35] border-y border-r border-[#A87924]/70 space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#762D35]">
                        3. {translateText('Disputed Historical Interpretations')}
                      </div>
                      <p className="text-[#292521] leading-relaxed">
                        {activeStage.dateClassificationBreakdown.disputedInterpretations[language] ||
                          activeStage.dateClassificationBreakdown.disputedInterpretations.en}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FFFCF5] border-l-4 border-[#54351F] border-y border-r border-[#A87924]/70 space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#54351F]">
                        4. {translateText('Traditional Chronological Claims')}
                      </div>
                      <p className="text-[#292521] leading-relaxed">
                        {activeStage.dateClassificationBreakdown.traditionalClaims[language] ||
                          activeStage.dateClassificationBreakdown.traditionalClaims.en}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PARALLEL REGIONAL CHRONOLOGICAL TRACKS */}
              {activeStage.parallelTracks && activeStage.parallelTracks.length > 0 && (
                <div className="pt-4 border-t border-[#A87924]/50 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm font-royal-heading font-extrabold text-[#54351F] flex items-center gap-2">
                      <Crown className="w-4 h-4 text-[#762D35]" />
                      <span>
                        {translateText(
                          'Parallel Regional Chronological Tracks (Simultaneous Dynasties & Polities)'
                        )}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#76501F]">
                      {translateText(
                        'Represents co-existing regional dynasties without forcing non-overlapping date boxes'
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeStage.parallelTracks.map(track => (
                      <div
                        key={track.corridorId}
                        className="p-4 rounded-xl bg-[#FFFCF5] border border-[#A87924] shadow-xs space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-royal-heading font-extrabold text-xs sm:text-sm text-[#762D35]">
                              {track.corridorLabel[language] || track.corridorLabel.en}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#762D35] text-[#F5EBD9] text-[10px] font-bold border border-[#A87924]">
                              {track.dateType}
                            </span>
                          </div>

                          <div className="text-[11px] font-bold text-[#54351F] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#A87924] shrink-0" />
                            <span>{track.dateSpan}</span>
                          </div>

                          <p className="font-royal-serif text-xs text-[#292521] leading-relaxed">
                            {track.dynastiesAndPolities[language] || track.dynastiesAndPolities.en}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#A87924]/40 text-[10px] text-[#76501F] font-medium">
                          <span className="font-bold text-[#54351F]">
                            {translateText('Primary Anchor:')}
                          </span>{' '}
                          {track.epigraphicAnchor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: DATED ARCHIVAL TIMELINE EVENTS EXPLORER */}
      <HistoricalRecordsExplorer
        defaultCategory="timeline"
        basePath="/timeline"
        initialRecordId={initialEventId}
        onNavigate={onNavigate}
        externalEvents={events}
        pageBadge={t.timeline.badge}
        pageTitle={t.timeline.title}
        pageSubtitle={t.timeline.subtitle}
        headerIcon={<Calendar className="w-4 h-4" />}
      />
    </div>
  );
};
