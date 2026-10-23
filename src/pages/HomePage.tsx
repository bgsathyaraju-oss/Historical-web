import React, { useEffect, useState } from 'react';
import {
  Compass,
  Crown,
  ShieldCheck,
  Landmark,
  Scroll,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SiteStatistics, Article, HistoricalEvent, GalleryItem } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { TimelineViewer } from '../components/TimelineViewer';
import { LightboxModal } from '../components/LightboxModal';
import { ArticleBriefModal } from '../components/ArticleBriefModal';
import { PublisherCreditCard } from '../components/PublisherCreditCard';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const { t, language, getArticleContent, getMetadataLabel } = useLanguage();
  const [stats, setStats] = useState<SiteStatistics | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<HistoricalEvent[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<GalleryItem[]>([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedBriefArticle, setSelectedBriefArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [statsRes, artsRes, timelineRes, galRes] = await Promise.all([
          fetch('/api/content/statistics'),
          fetch(`/api/content/articles?lang=${language}`),
          fetch('/api/content/timeline'),
          fetch('/api/content/gallery')
        ]);

        if (statsRes.ok) {
          const s = await statsRes.json();
          setStats(s.statistics);
        }
        if (artsRes.ok) {
          const a = await artsRes.json();
          setFeaturedArticles(a.articles.slice(0, 3));
        }
        if (timelineRes.ok) {
          const tm = await timelineRes.json();
          setTimelineEvents(tm.events.slice(0, 4));
        }
        if (galRes.ok) {
          const g = await galRes.json();
          setGalleryPreview(g.gallery.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [language]);

  return (
    <div className="w-full space-y-12 pb-20">
      {/* TOP POSITION: WebSite Design and Published by Dr G.Sathyanarayana Raju */}
      <section className="pt-6 sm:pt-8 -mb-4">
        <PublisherCreditCard variant="hero-top" />
      </section>

      {/* SECTION A: Royal Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0c0d15] via-[#1b0a11] to-[#0c0d15] px-4 sm:px-6 lg:px-8 border-b border-[#c99738]/30">
        {/* Architectural Backdrop Glow & Subtle Motif */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#c99738_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#580014]/25 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8 py-16 sm:py-24">
          {/* Historical Emblem with Sun Rays */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1318]/90 border border-[#c99738]/50 shadow-[0_0_20px_rgba(201,151,56,0.25)] animate-in fade-in duration-500">
            <div className="w-5 h-5 rounded-full bg-[#c99738] flex items-center justify-center p-0.5">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3a000d]">
                <circle cx="50" cy="50" r="28" />
                <path d="M50 4 L53 26 L50 22 L47 26 Z M50 96 L53 74 L50 78 L47 74 Z M4 50 L26 53 L22 50 L26 47 Z M96 50 L74 53 L78 50 L74 47 Z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#fcedc7]">
              {t.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#fff3d4] via-[#e8c872] to-[#c99738] leading-[1.15] tracking-tight drop-shadow-sm">
            {t.hero.headline}
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-300 font-royal-serif font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => onNavigate('/documentary')}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#997022] via-[#c99738] to-[#997022] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-[0_4px_20px_rgba(201,151,56,0.3)] transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/dynasties')}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#161a26] text-[#e8c872] border border-[#c99738]/50 hover:bg-[#202738] hover:border-[#c99738] transition-all cursor-pointer flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-[#d4af37]" />
              <span>{t.hero.dynastiesBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('/gallery')}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#161a26] text-stone-200 border border-stone-700 hover:border-[#c99738]/60 hover:text-[#e8c872] transition-all cursor-pointer flex items-center gap-2"
            >
              <Landmark className="w-4 h-4 text-[#d4af37]" />
              <span>{t.hero.galleryBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('/register')}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#580014] text-[#fcedc7] border border-[#d4af37]/60 hover:bg-[#780016] transition-all cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#d4af37]" />
              <span>{t.hero.joinBtn}</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <div
              onClick={onOpenSearch}
              className="p-3 px-5 rounded-2xl bg-[#121622]/90 border border-stone-700/80 hover:border-[#c99738] flex items-center justify-between text-stone-400 text-xs sm:text-sm cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(201,151,56,0.15)] transition-all"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#d4af37]" />
                <span>{t.common.searchPlaceholder}</span>
              </div>
              <span className="text-[11px] bg-stone-800 px-2.5 py-0.5 rounded text-stone-300 font-mono">
                ⌘K / Click
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Featured Historical Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.home.pillarsBadge}</span>
          </div>
          <h2 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
            {t.home.pillarsTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-stone-400">
            {t.home.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.home.pillars.map((topic, i) => {
            const paths = ['/odra-desha', '/maps', '/gajapathi-kings', '/genealogy', '/inscriptions', '/temples-monuments', '/culture-traditions', '/literature'];
            const icons = [Compass, Landmark, Crown, Scroll, ShieldCheck, Landmark, BookOpen, BookOpen];
            const images = [
              'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80'
            ];
            const Icon = icons[i] || Compass;
            const path = paths[i] || '/';
            const img = images[i];
            return (
              <div
                key={i}
                className="group relative rounded-2xl bg-[#121622] border border-stone-800/80 hover:border-[#c99738]/60 overflow-hidden shadow-lg hover:shadow-[0_4px_25px_rgba(201,151,56,0.15)] transition-all flex flex-col"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={img}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-[#121622]/40 to-transparent"></div>
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#c99738]/40 text-[#d4af37]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(path)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#181f2f] hover:bg-[#580014] text-[#e8c872] hover:text-white border border-[#c99738]/30 hover:border-[#d4af37] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.common.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION C: Interactive Historical Timeline Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.home.timelineBadge}</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] mt-1">
              {t.home.timelineTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/timeline')}
            className="text-xs font-semibold text-[#e8c872] hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.home.viewFullTimeline}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <TimelineViewer events={timelineEvents} />
      </section>

      {/* SECTION D: Featured Research Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.home.researchBadge}</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] mt-1">
              {t.home.researchTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/research')}
            className="text-xs font-semibold text-[#e8c872] hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.home.viewAllResearch}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => {
            const { title: artTitle, summary: artSummary } = getArticleContent(art);
            return (
              <div
                key={art.id}
                onClick={() => setSelectedBriefArticle(art)}
                className="rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] p-5 space-y-4 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                title="Click to view Brief Information directly in Multilingual"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider">
                      {getMetadataLabel('category', art.category) || art.category}
                    </span>
                    <EvidenceBadge category={art.evidence_category} size="sm" />
                  </div>

                  <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors leading-snug">
                    {artTitle}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                    {artSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>By {art.author_name}</span>
                    <span>{art.publication_date}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#fae29c] font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>View Brief Information</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION E: Historical Gallery Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.home.galleryBadge}</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] mt-1">
              {t.home.galleryTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/gallery')}
            className="text-xs font-semibold text-[#e8c872] hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.home.viewFullGallery}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryPreview.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="group relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800 hover:border-[#c99738] cursor-pointer h-64 shadow-md transition-all"
            >
              <img
                src={item.image_url}
                alt={item.alt_text}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                  {item.category} • {item.period}
                </span>
                <h4 className="font-royal-heading font-bold text-sm text-stone-100 group-hover:text-[#fcedc7] transition-colors leading-tight mt-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION F: Website Archival Statistics (Computed from Real DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#170a10] via-[#1a1324] to-[#0e1424] border border-[#c99738]/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center space-y-3 mb-10">
            <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
              {t.stats.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 text-center">
            {[
              { label: t.stats.articles, val: stats?.published_articles || 3 },
              { label: t.stats.documents, val: stats?.digitized_documents || 2 },
              { label: t.stats.photos, val: stats?.historical_photographs || 6 },
              { label: t.stats.inscriptions, val: stats?.reviewed_inscriptions || 3 },
              { label: t.stats.translations, val: stats?.published_translations || 8 },
              { label: t.stats.members, val: stats?.registered_members || 3 },
              { label: t.stats.events, val: stats?.community_events || 3 }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-stone-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffe19c] to-[#c99738] font-royal-heading">
                  {stat.val}
                </div>
                <div className="text-[11px] font-medium text-stone-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION G: Community Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#141824] border border-[#c99738]/50 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#580014] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
            {t.home.communityTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {t.home.communitySubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/register')}
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-lg transition-all cursor-pointer"
            >
              {t.home.joinBtn}
            </button>
            <button
              onClick={() => onNavigate('/members')}
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#1c2333] text-stone-200 border border-stone-700 hover:border-[#c99738] hover:text-[#e8c872] transition-all cursor-pointer"
            >
              {t.home.directoryBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Preview */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      {/* Multilingual Article Brief Modal */}
      <ArticleBriefModal
        article={selectedBriefArticle}
        isOpen={!!selectedBriefArticle}
        onClose={() => setSelectedBriefArticle(null)}
        onReadFull={(art) => {
          setSelectedBriefArticle(null);
          onNavigate(`/documentary?article=${art.id}`);
        }}
      />
    </div>
  );
};
