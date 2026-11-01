import React, { useState } from 'react';
import {
  Scroll,
  Landmark,
  BookOpen,
  ShieldCheck,
  Compass,
  ExternalLink,
  ArrowRight,
  Info,
  Eye,
  Calendar,
  MapPin,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { KALINGA_WAR_CONTENT, KalingaWarScene } from '../data/kalingaWarData';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { LanguageCode } from '../types';

interface KalingaWarPageProps {
  onNavigate: (path: string) => void;
}

export const KalingaWarPage: React.FC<KalingaWarPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const currentLang = (language as LanguageCode) || 'en';
  const content = KALINGA_WAR_CONTENT[currentLang] || KALINGA_WAR_CONTENT.en;

  const [selectedModalItem, setSelectedModalItem] = useState<ContentDetailItem | null>(null);
  const [activeSceneFilter, setActiveSceneFilter] = useState<'all' | 'archaeological' | 'reconstruction'>('all');

  const resolveAssetUrl = (rawPath: string): string => {
    if (!rawPath) return '';
    if (rawPath.startsWith('http://') || rawPath.startsWith('https://')) return rawPath;
    const base = (import.meta as any).env?.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}/${rawPath.replace(/^\//, '')}`;
  };

  const openSceneDossier = (scene: KalingaWarScene) => {
    setSelectedModalItem({
      id: scene.id,
      title: `${scene.sceneNumber}: ${scene.title}`,
      subtitle: scene.visualTypeBadge,
      category: 'Kalinga War (c. 261 BCE)',
      badge: scene.isArtisticReconstruction ? 'Artistic / Sculptural Reconstruction' : 'Authenticated Archaeological / Epigraphic Record',
      evidenceCategory: scene.isArtisticReconstruction ? 'scholarly_interpretation' : 'verified_archaeological',
      verificationStatus: 'Published',
      datesOrEra: 'c. 261 BCE (8th Regnal Year of Emperor Ashoka)',
      location: 'Kalinga (Dhauli, Sisupalgarh & Jaugada, Odisha)',
      imageUrl: resolveAssetUrl(scene.imageUrl),
      imageCaption: scene.caption,
      summary: scene.narrative,
      content: [
        scene.narrative,
        scene.caption,
        scene.secondaryCaption,
        scene.historicalNote,
        `${content.scenesHeader.sourceAttributionLabel}: ${scene.attribution}`
      ].join('\n\n'),
      tags: [
        'Kalinga War',
        'c. 261 BCE',
        'Emperor Ashoka',
        'Major Rock Edict XIII',
        'Dhauli',
        'Jaugada',
        'Sisupalgarh',
        'Dhamma'
      ],
      sources: content.references.slice(0, 3).map(ref => ({
        title: ref.title,
        author: ref.authorOrAuthority,
        year: 'c. 261 BCE / Modern Critical Edition',
        details: ref.description,
        type: ref.categoryLabel,
        verified: true,
        url: ref.url
      }))
    });
  };

  const filteredScenes = content.scenes.filter(scene => {
    if (activeSceneFilter === 'archaeological') return !scene.isArtisticReconstruction;
    if (activeSceneFilter === 'reconstruction') return scene.isArtisticReconstruction;
    return true;
  });

  const scrollToSection = (elementId: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EBD9] text-[#292521] pb-20">
      {/* =====================================================================
          HERO HEADER & EXHIBITION MARQUEE
      ====================================================================== */}
      <section className="relative overflow-hidden border-b border-[#D8C3A2] bg-gradient-to-b from-[#FFFCF5] via-[#FFF9EF] to-[#F5EBD9] pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Title, Introduction & Section Jump Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest uppercase text-[#A87924] font-semibold">
                  <span>{content.badge}</span>
                </div>

                <h1 className="font-royal-heading text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#54351F] leading-tight tracking-wide">
                  {content.pageTitle}
                </h1>

                <p className="text-sm sm:text-base text-[#76501F] leading-relaxed font-medium">
                  {content.subtitle}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-[#A87924]/50 via-[#D8C3A2] to-transparent" />

                <p className="text-sm sm:text-[15px] text-[#292521] leading-relaxed">
                  {content.introParagraph}
                </p>
              </div>

              {/* Section Jump Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => scrollToSection('kalinga-background')}
                  className="px-3.5 py-2 rounded-lg bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] text-xs font-semibold text-[#54351F] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {content.sections.background.code} · {content.sections.background.title.split(':')[0]}
                </button>
                <button
                  onClick={() => scrollToSection('kalinga-battle')}
                  className="px-3.5 py-2 rounded-lg bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] text-xs font-semibold text-[#54351F] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {content.sections.battle.code} · {content.sections.battle.title}
                </button>
                <button
                  onClick={() => scrollToSection('kalinga-tragedy')}
                  className="px-3.5 py-2 rounded-lg bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] text-xs font-semibold text-[#54351F] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {content.sections.tragedy.code} · {content.sections.tragedy.title.split(':')[0]}
                </button>
                <button
                  onClick={() => scrollToSection('kalinga-scenes')}
                  className="px-3.5 py-2 rounded-lg bg-[#762D35] hover:bg-[#5E2229] border border-[#762D35] text-xs font-bold text-[#FFFFFF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {content.scenesHeader.badge.split('•')[0].trim()} (1–7)
                </button>
                <button
                  onClick={() => scrollToSection('kalinga-references')}
                  className="px-3.5 py-2 rounded-lg bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] text-xs font-medium text-[#6B5948] hover:text-[#292521] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {content.referencesHeader.badge}
                </button>
              </div>
            </div>

            {/* Right Column: Hero Focal Visual (Dhauli Rock-Cut Elephant & Edict Outcrop) */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                onClick={() => openSceneDossier(content.scenes[5])}
                className="group relative flex-1 rounded-2xl overflow-hidden border border-[#D8C3A2] bg-[#FFF9EF] shadow-lg cursor-pointer flex flex-col justify-end min-h-[280px] sm:min-h-[340px]"
              >
                <img
                  src={resolveAssetUrl('/assets/archive/kalinga_dhauli_elephant_edict.jpg')}
                  alt={content.scenes[6].imageAlt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative z-10 p-5 sm:p-6 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#fae29c] font-semibold">
                    {content.scenes[6].visualTypeBadge}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-100 leading-relaxed">
                    {content.scenes[6].caption}
                  </p>
                  <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#fae29c] group-hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{content.scenesHeader.viewDossierBtn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              SECTION F: QUICK HISTORICAL SUMMARY PANEL
          ================================================================== */}
          <div
            id="kalinga-quick-summary"
            className="mt-10 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-5 sm:p-7 shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-[#D8C3A2]">
              <h2 className="font-royal-heading text-lg sm:text-xl font-bold text-[#54351F] flex items-center gap-2.5">
                <Landmark className="w-5 h-5 text-[#A87924] shrink-0" />
                <span>{content.quickSummary.sectionTitle}</span>
              </h2>
              <span className="text-xs text-[#6B5948] font-medium">
                {content.quickSummary.dateValue}
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.conflictLabel}
                </dt>
                <dd className="text-sm font-bold text-[#54351F]">
                  {content.quickSummary.conflictValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.dateLabel}
                </dt>
                <dd className="text-sm font-bold text-[#54351F] tabular-nums">
                  {content.quickSummary.dateValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.rulerLabel}
                </dt>
                <dd className="text-sm font-bold text-[#54351F]">
                  {content.quickSummary.rulerValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.polityLabel}
                </dt>
                <dd className="text-xs sm:text-sm font-semibold text-[#292521]">
                  {content.quickSummary.polityValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1 sm:col-span-2">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.sourceLabel}
                </dt>
                <dd className="text-xs sm:text-sm font-semibold text-[#292521]">
                  {content.quickSummary.sourceValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.sitesLabel}
                </dt>
                <dd className="text-xs sm:text-sm font-semibold text-[#292521]">
                  {content.quickSummary.sitesValue}
                </dd>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1">
                <dt className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {content.quickSummary.significanceLabel}
                </dt>
                <dd className="text-xs sm:text-sm font-semibold text-[#76501F]">
                  {content.quickSummary.significanceValue}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* =====================================================================
          EPISTEMIC METHODOLOGY & SOURCE DISTINCTION BANNER
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-5 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#762D35]/10 border border-[#762D35]/30 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#762D35]" />
            </div>
            <div className="space-y-1">
              <h2 className="font-royal-heading text-base sm:text-lg font-bold text-[#54351F]">
                {content.epistemicBannerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                {content.epistemicBannerText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#D8C3A2]">
            <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5">
              <div className="text-xs font-bold text-[#54351F]">
                {content.epistemicLegend.inscriptionalTitle}
              </div>
              <p className="text-xs text-[#6B5948] leading-relaxed">
                {content.epistemicLegend.inscriptionalDesc}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5">
              <div className="text-xs font-bold text-[#54351F]">
                {content.epistemicLegend.scholarlyTitle}
              </div>
              <p className="text-xs text-[#6B5948] leading-relaxed">
                {content.epistemicLegend.scholarlyDesc}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5">
              <div className="text-xs font-bold text-[#54351F]">
                {content.epistemicLegend.artisticTitle}
              </div>
              <p className="text-xs text-[#6B5948] leading-relaxed">
                {content.epistemicLegend.artisticDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HISTORICAL DOCUMENTARY NARRATIVE (SECTIONS A, B, C, D, E)
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* SECTION A: HISTORICAL BACKGROUND */}
        <article
          id="kalinga-background"
          className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm"
        >
          <div className="space-y-1.5 border-b border-[#D8C3A2] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.sections.background.code} · {content.sections.background.subtitle}
            </div>
            <h2 className="font-royal-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#54351F]">
              {content.sections.background.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-[#292521] leading-relaxed">
              <p>{content.sections.background.p1}</p>
              <p>{content.sections.background.p2}</p>
              <p>{content.sections.background.p3}</p>
            </div>

            <div className="lg:col-span-4 rounded-xl bg-[#FFF9EF] border border-[#A87924]/40 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#54351F]">
                <Scale className="w-4 h-4 text-[#A87924] shrink-0" />
                <span>{content.sections.background.evidenceBoxTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                {content.sections.background.evidenceBoxText}
              </p>
            </div>
          </div>
        </article>

        {/* SECTION B: THE BATTLE OF KALINGA */}
        <article
          id="kalinga-battle"
          className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm"
        >
          <div className="space-y-1.5 border-b border-[#D8C3A2] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.sections.battle.code} · {content.sections.battle.subtitle}
            </div>
            <h2 className="font-royal-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#54351F]">
              {content.sections.battle.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#292521] leading-relaxed max-w-4xl">
            <p>{content.sections.battle.p1}</p>
            <p>{content.sections.battle.p2}</p>
            <p>{content.sections.battle.p3}</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-start gap-3">
            <Info className="w-5 h-5 text-[#A87924] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
              {content.sections.battle.historiographicalNote}
            </p>
          </div>
        </article>

        {/* SECTION C: THE HUMAN TRAGEDY & MAJOR ROCK EDICT XIII */}
        <article
          id="kalinga-tragedy"
          className="rounded-2xl bg-[#FFFCF5] border-2 border-[#A87924]/50 p-6 sm:p-8 lg:p-10 space-y-6 shadow-md"
        >
          <div className="space-y-1.5 border-b border-[#D8C3A2] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.sections.tragedy.code} · {content.sections.tragedy.subtitle}
            </div>
            <h2 className="font-royal-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#54351F]">
              {content.sections.tragedy.title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#292521] leading-relaxed max-w-4xl">
            {content.sections.tragedy.p1}
          </p>

          {/* Attributed Major Rock Edict XIII Figures */}
          <div className="rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] p-5 sm:p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="font-royal-heading text-base sm:text-lg font-bold text-[#54351F]">
                {content.sections.tragedy.edictHeading}
              </h3>
              <p className="text-xs text-[#6B5948]">
                {content.sections.tragedy.edictAttribution}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-1.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#762D35] tabular-nums font-royal-heading">
                  {content.sections.tragedy.statDeathsNumber}
                </div>
                <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                  {content.sections.tragedy.statDeathsLabel}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-1.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#762D35] tabular-nums font-royal-heading">
                  {content.sections.tragedy.statDeportedNumber}
                </div>
                <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                  {content.sections.tragedy.statDeportedLabel}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-1.5">
                <div className="text-xl sm:text-2xl font-extrabold text-[#54351F] font-royal-heading">
                  {content.sections.tragedy.statAftermathNumber}
                </div>
                <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                  {content.sections.tragedy.statAftermathLabel}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D8C3A2] text-xs sm:text-sm text-[#6B5948] leading-relaxed">
              {content.sections.tragedy.methodologicalCaveat}
            </div>
          </div>
        </article>

        {/* SECTION D: ASHOKA'S REMORSE AND DHAMMA */}
        <article
          id="kalinga-remorse"
          className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm"
        >
          <div className="space-y-1.5 border-b border-[#D8C3A2] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.sections.remorse.code} · {content.sections.remorse.subtitle}
            </div>
            <h2 className="font-royal-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#54351F]">
              {content.sections.remorse.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#292521] leading-relaxed max-w-4xl">
            <p>{content.sections.remorse.p1}</p>
            <p>{content.sections.remorse.p2}</p>
            <p>{content.sections.remorse.p3}</p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs sm:text-sm text-[#292521] leading-relaxed">
            {content.sections.remorse.scholarlyDebateNote}
          </div>
        </article>

        {/* SECTION E: HISTORICAL LEGACY */}
        <article
          id="kalinga-legacy"
          className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm"
        >
          <div className="space-y-1.5 border-b border-[#D8C3A2] pb-4">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.sections.legacy.code} · {content.sections.legacy.subtitle}
            </div>
            <h2 className="font-royal-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#54351F]">
              {content.sections.legacy.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#292521] leading-relaxed max-w-4xl">
            <p>{content.sections.legacy.p1}</p>
            <p>{content.sections.legacy.p2}</p>
            <p>{content.sections.legacy.p3}</p>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-[#FFF9EF] border border-[#A87924]/50 space-y-2">
            <h3 className="font-royal-heading text-base sm:text-lg font-bold text-[#54351F]">
              {content.sections.legacy.conclusionTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#292521] leading-relaxed">
              {content.sections.legacy.conclusionText}
            </p>
          </div>
        </article>
      </section>

      {/* =====================================================================
          SECTION 2: SCENE-BY-SCENE VISUAL STORYTELLING (SCENES 1 TO 7)
      ====================================================================== */}
      <section
        id="kalinga-scenes"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8C3A2] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
              {content.scenesHeader.badge}
            </div>
            <h2 className="font-royal-heading text-2xl sm:text-3xl font-extrabold text-[#54351F]">
              {content.scenesHeader.title}
            </h2>
            <p className="text-sm sm:text-base text-[#6B5948] leading-relaxed">
              {content.scenesHeader.subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs for Scene Types */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FFF9EF] border border-[#D8C3A2] rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveSceneFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSceneFilter === 'all'
                  ? 'bg-[#762D35] text-[#FFFFFF] shadow-sm'
                  : 'text-[#6B5948] hover:text-[#292521]'
              }`}
            >
              All 7 Scenes
            </button>
            <button
              onClick={() => setActiveSceneFilter('archaeological')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSceneFilter === 'archaeological'
                  ? 'bg-[#762D35] text-[#FFFFFF] shadow-sm'
                  : 'text-[#6B5948] hover:text-[#292521]'
              }`}
            >
              Inscriptions & Monuments (3)
            </button>
            <button
              onClick={() => setActiveSceneFilter('reconstruction')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSceneFilter === 'reconstruction'
                  ? 'bg-[#762D35] text-[#FFFFFF] shadow-sm'
                  : 'text-[#6B5948] hover:text-[#292521]'
              }`}
            >
              Artistic Reliefs (4)
            </button>
          </div>
        </div>

        {/* 7 Historical Scenes List */}
        <div className="space-y-10">
          {filteredScenes.map((scene, index) => (
            <div
              key={scene.id}
              className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] overflow-hidden shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Visual Column (Alternating left/right on large desktop for editorial rhythm) */}
                <div
                  className={`lg:col-span-6 bg-[#FFF9EF] p-4 sm:p-6 flex flex-col justify-between space-y-4 border-b lg:border-b-0 border-[#D8C3A2] ${
                    index % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                  }`}
                >
                  {/* Primary Scene Image */}
                  <div
                    onClick={() => openSceneDossier(scene)}
                    className="group relative rounded-xl overflow-hidden border border-[#D8C3A2] bg-[#EFE3D0] aspect-video cursor-pointer"
                  >
                    <img
                      src={resolveAssetUrl(scene.imageUrl)}
                      alt={scene.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#FFFCF5]/95 border border-[#A87924]/50 text-[11px] font-semibold text-[#54351F] flex items-center gap-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-[#A87924]" />
                      <span>{content.scenesHeader.viewDossierBtn}</span>
                    </div>
                  </div>

                  {/* Primary Figure Caption */}
                  <p className="text-xs font-serif italic text-[#6B5948] leading-relaxed">
                    {scene.caption}
                  </p>

                  {/* Companion Archival Image Row */}
                  <div
                    onClick={() => openSceneDossier(scene)}
                    className="pt-2 border-t border-[#D8C3A2] flex flex-col sm:flex-row items-start sm:items-center gap-3.5 cursor-pointer group"
                  >
                    <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden border border-[#D8C3A2] shrink-0 bg-[#EFE3D0]">
                      <img
                        src={resolveAssetUrl(scene.secondaryImageUrl)}
                        alt={scene.secondaryImageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                        {content.scenesHeader.companionImageLabel}
                      </div>
                      <p className="text-xs text-[#6B5948] leading-relaxed">
                        {scene.secondaryCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative & Epigraphic Metadata Column */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#A87924] font-semibold">
                      <span className="uppercase tracking-widest">{scene.sceneNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span className={scene.isArtisticReconstruction ? 'text-[#76501F]' : 'text-emerald-800'}>
                        {scene.visualTypeBadge}
                      </span>
                    </div>

                    <h3
                      onClick={() => openSceneDossier(scene)}
                      className="font-royal-heading text-xl sm:text-2xl font-bold text-[#54351F] hover:text-[#A87924] transition-colors cursor-pointer"
                    >
                      {scene.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#292521] leading-relaxed">
                      {scene.narrative}
                    </p>

                    <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1.5">
                      <p className="text-xs sm:text-sm text-[#6B5948] leading-relaxed">
                        {scene.historicalNote}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8C3A2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-[11px] text-[#6B5948]">
                      <span className="font-semibold text-[#54351F]">{content.scenesHeader.sourceAttributionLabel}:</span>{' '}
                      {scene.attribution}
                    </div>

                    <button
                      onClick={() => openSceneDossier(scene)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#762D35] hover:bg-[#5E2229] text-xs font-bold text-[#FFFFFF] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#FFFFFF]" />
                      <span>{content.scenesHeader.viewDossierBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: SOURCES, EPIGRAPHIC EDITIONS & FURTHER READING
      ====================================================================== */}
      <section
        id="kalinga-references"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8"
      >
        <div className="space-y-2 border-b border-[#D8C3A2] pb-5">
          <div className="text-xs uppercase tracking-widest text-[#A87924] font-semibold">
            {content.referencesHeader.badge}
          </div>
          <h2 className="font-royal-heading text-2xl sm:text-3xl font-extrabold text-[#54351F]">
            {content.referencesHeader.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6B5948] max-w-3xl leading-relaxed">
            {content.referencesHeader.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.references.map(ref => (
            <div
              key={ref.id}
              className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] p-6 flex flex-col justify-between space-y-4 transition-colors shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="text-[11px] uppercase tracking-wider text-[#A87924] font-semibold">
                  {ref.categoryLabel}
                </div>
                <h3 className="font-royal-heading text-base sm:text-lg font-bold text-[#54351F] leading-snug">
                  {ref.title}
                </h3>
                <div className="text-xs font-medium text-[#76501F]">
                  {ref.authorOrAuthority}
                </div>
                <p className="text-xs sm:text-sm text-[#292521] leading-relaxed pt-1">
                  {ref.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8C3A2]">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76501F] hover:text-[#A87924] transition-colors"
                >
                  <span>{content.referencesHeader.visitSourceBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          CONNECTED PORTAL NAVIGATION LINKS
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="font-royal-heading text-lg font-bold text-[#54351F]">
            {content.relatedLinks.heading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <button
              onClick={() => onNavigate('/odra-desha')}
              className="p-4 rounded-xl bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold text-[#54351F]">
                {content.relatedLinks.odraDesha}
              </span>
              <ArrowRight className="w-4 h-4 text-[#A87924] shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('/inscriptions')}
              className="p-4 rounded-xl bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold text-[#54351F]">
                {content.relatedLinks.inscriptions}
              </span>
              <ArrowRight className="w-4 h-4 text-[#A87924] shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('/gajapathi-kings')}
              className="p-4 rounded-xl bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold text-[#54351F]">
                {content.relatedLinks.gajapathiKings}
              </span>
              <ArrowRight className="w-4 h-4 text-[#A87924] shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('/timeline')}
              className="p-4 rounded-xl bg-[#FFF9EF] hover:bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] text-left flex items-center justify-between gap-2 transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-semibold text-[#54351F]">
                {content.relatedLinks.timeline}
              </span>
              <ArrowRight className="w-4 h-4 text-[#A87924] shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* Shared Content Detail Modal for Scene Deep-Dives */}
      <ContentDetailModal
        isOpen={!!selectedModalItem}
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
      />
    </div>
  );
};
