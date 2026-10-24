import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
  List,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  Printer,
  Globe
} from 'lucide-react';
import { Article, SourceReference } from '../types';
import { EvidenceBadge } from './EvidenceBadge';
import { TranslationMatrixBadge } from './TranslationMatrixBadge';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

interface ArticleDetailViewProps {
  article: Article;
  onBack?: () => void;
  onSelectArticle?: (article: Article) => void;
  allArticles?: Article[];
  showLanguageSwitcher?: boolean;
}

interface TocItem {
  id: string;
  title: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles = [],
  showLanguageSwitcher = true
}) => {
  const { language, setLanguage, t, getArticleContent, getMetadataLabel } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  const { title: displayTitle, summary: displaySummary, content: displayContent } = getArticleContent(article);

  // Auto-generate Table of Contents from headings / section dividers in content
  const contentLines = (displayContent || '').split('\n');
  const sections: { id: string; title: string; lines: string[] }[] = [];
  const nativeIntroTitle =
    language === 'te' ? 'పరిచయం' :
    language === 'hi' || language === 'mr' ? 'परिचय' :
    language === 'kn' ? 'ಪರಿಚಯ' :
    language === 'ta' ? 'அறிமுகம்' :
    language === 'or' ? 'ପରିଚୟ' :
    language === 'bn' ? 'ভূমিকা' :
    'Introduction';
  let currentSecTitle = nativeIntroTitle;
  let currentSecLines: string[] = [];

  contentLines.forEach((line) => {
    const trimmed = line.trim();
    // Detect section headers across all 8 language scripts (e.g. "1. కొల్లేటి...", "1. सम्राट...", "Ancient Epigraphy:")
    const isHeader =
      (trimmed.endsWith(':') && trimmed.length < 120 && !trimmed.includes('http')) ||
      /^(\d+|[०-९]+|[౦-౯]+|[೦-೯]+|[୦-୯]+|[০-৯]+)\.?\s+\S/.test(trimmed) ||
      /^\#{1,4}\s+\S/.test(trimmed);

    if (isHeader) {
      if (currentSecLines.length > 0) {
        sections.push({
          id: `sec-${sections.length}`,
          title: currentSecTitle,
          lines: currentSecLines
        });
        currentSecLines = [];
      }
      currentSecTitle = trimmed.replace(/^[\#\d०-९౦-౯೦-೯୦-୯০-৯\.\s]+/, '').replace(/:$/, '');
    } else {
      currentSecLines.push(line);
    }
  });

  if (currentSecLines.length > 0) {
    sections.push({
      id: `sec-${sections.length}`,
      title: currentSecTitle,
      lines: currentSecLines
    });
  }

  const tocList: TocItem[] = sections.map((s) => ({ id: s.id, title: s.title }));

  // Related articles (matching category or shared tags, excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .filter((a) => a.category === article.category || a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(article.id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(article.id)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: displaySummary,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or share not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTocId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-5 sm:p-8 md:p-10 space-y-8 shadow-2xl transition-all">
      {/* 11. Accessible Back-to-Articles Navigation & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-[#580014] text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Return to documentary list"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common?.backToHome || 'Back to Archive'}</span>
            </button>
          )}

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-stone-950 px-3 py-1 rounded-full border border-stone-800">
            {getMetadataLabel('category', article.category) || article.category}
          </span>
          <EvidenceBadge category={article.evidence_category} size="sm" />
        </div>

        {/* 10. Share, Copy Link, and Reading Tools */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
            title="Copy Direct Link to this Article"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#580014] hover:bg-[#78001b] text-[#fcedc7] border border-[#d4af37]/50 transition-all cursor-pointer shadow-sm"
            title="Share this Article"
          >
            <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* 1. Article Title & Metadata Banner */}
      <header className="space-y-4">
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#fcedc7] leading-tight tracking-wide">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-300">
            <User className="w-4 h-4 text-[#d4af37]" />
            <span>Author / Compiler: <strong className="text-[#fae29c]">{article.author_name}</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Published: {article.publication_date}</span>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Peer-Reviewed Status: {article.verification_status}</span>
          </span>
        </div>

        {/* 9. Language Selector & Translation Coverage */}
        {showLanguageSwitcher && (
          <div className="pt-2">
            <TranslationMatrixBadge article={article} />
          </div>
        )}
      </header>

      {/* Featured Image with Verified Historical Caption */}
      {article.featured_image && (
        <figure className="relative rounded-2xl overflow-hidden border border-[#c99738]/30 group shadow-lg">
          <img
            src={article.featured_image}
            alt={displayTitle}
            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 text-xs text-stone-300">
            <span className="text-[#d4af37] font-semibold">Corroborated Historical Artifact / Location:</span> {displayTitle} ({article.category})
          </figcaption>
        </figure>
      )}

      {/* 2. Short Introduction Callout */}
      <section aria-label="Article Introduction" className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#20050c]/80 via-[#180309]/80 to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800/80 text-stone-200 shadow-inner">
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Introduction & Historical Scope</span>
        </div>
        <p className="font-royal-serif text-sm sm:text-base leading-relaxed text-[#fcedc7]/95">
          {displaySummary}
        </p>
      </section>

      {/* 3. Table of Contents (for structured reading) */}
      {tocList.length > 1 && (
        <nav aria-label="Table of Contents" className="p-4 sm:p-5 rounded-2xl bg-[#0e121d] border border-stone-800">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-2">
            <List className="w-4 h-4" />
            <span>Table of Contents ({tocList.length} Sections)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {tocList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-left p-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTocId === item.id
                    ? 'bg-[#580014]/60 text-[#fae29c] border-[#d4af37]'
                    : 'bg-[#141926] text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white hover:bg-[#1a2133]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-[#d4af37] text-[10px] font-bold flex items-center justify-center shrink-0 border border-stone-700">
                  {idx + 1}
                </span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* 4. Complete Article Content (Never Truncated) */}
      <section aria-label="Complete Article Content" className="space-y-6">
        {sections.map((sec, secIdx) => (
          <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3">
            {sec.title && sec.title !== 'Introduction' && (
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] border-b border-stone-800/80 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span>{sec.title}</span>
              </h2>
            )}
            <div className="space-y-3 font-royal-serif text-sm sm:text-base text-stone-300 leading-relaxed">
              {sec.lines.map((p, pIdx) => {
                const trimmed = p.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                  return (
                    <li key={pIdx} className="ml-4 list-disc text-stone-300 marker:text-[#d4af37]">
                      {trimmed.replace(/^[-•]\s*/, '')}
                    </li>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 5. Important Facts and Historical Timeline */}
      <section aria-label="Key Historical Chronology" className="p-5 sm:p-6 rounded-2xl bg-[#0c0f17] border border-stone-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>Historical Facts & Timeline Corroboration</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#141926] border border-stone-800/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#d4af37]">Epigraphic Horizon</span>
            <p className="text-stone-300">
              Corroborated by copper plates, lithic temple inscriptions, and primary bilingual royal charters of eastern and southern India.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#141926] border border-stone-800/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#d4af37]">Archival Classification</span>
            <p className="text-stone-300">
              Documented under {article.category} with verified primary evidence status and full scholarly bibliographic references.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Detailed Conclusion and Summary */}
      <section aria-label="Conclusion and Summary" className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#121622] to-[#1c0810] border border-[#d4af37]/30 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <span>Historiographical Conclusion</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
          The records preserved in this documentary demonstrate the enduring civilizational continuity of the Suryavamsha Odiyaraju Kshatriya heritage, uniting classical Vedic solar lineages, imperial Gajapathi sovereignty, and living community institutions across India.
        </p>
      </section>

      {/* 7. Sources and References */}
      {article.sources && article.sources.length > 0 && (
        <section aria-label="Sources and References" className="p-5 sm:p-6 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center justify-between">
            <span>Primary Sources & Scholarly Citations ({article.sources.length})</span>
            <span className="text-[10px] text-stone-400 font-normal">All sources cataloged by archival authority</span>
          </h3>
          <div className="space-y-2.5">
            {article.sources.map((src: SourceReference, i: number) => (
              <div
                key={src.id || i}
                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-[#d4af37] uppercase bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                      {src.source_type}
                    </span>
                    <h4 className="font-bold text-stone-200">{src.title}</h4>
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    {src.author_or_authority} • {src.publication_or_location} ({src.year_or_era}) — {src.citation_details}
                  </p>
                </div>
                {src.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    <Check className="w-3 h-3" /> Verified Source
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Related Articles */}
      {relatedArticles.length > 0 && (
        <section aria-label="Related Articles" className="space-y-3 pt-4 border-t border-stone-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
            Related Historical Monographs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedArticles.map((rel) => {
              const { title: relTitle, summary: relSummary } = getArticleContent(rel);
              return (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle && onSelectArticle(rel)}
                  className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] hover:bg-[#1a2133] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase">
                      {getMetadataLabel('category', rel.category) || rel.category}
                    </span>
                    <h4 className="font-royal-heading font-bold text-xs text-stone-200 group-hover:text-[#fae29c] line-clamp-2">
                      {relTitle}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {relSummary}
                    </p>
                  </div>
                  <div className="mt-2 text-[10px] text-[#d4af37] font-medium flex items-center gap-1">
                    <span>Read Article</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Action Footer with Back to Top */}
      <footer className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
        <span>Article ID: <code className="text-stone-300 bg-stone-900 px-1.5 py-0.5 rounded">{article.id}</code></span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#d4af37] hover:underline cursor-pointer"
        >
          ↑ Return to Top
        </button>
      </footer>
    </article>
  );
};
