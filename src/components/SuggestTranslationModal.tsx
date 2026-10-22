import React, { useState, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Article, LanguageCode } from '../types';
import { Globe, X, CheckCircle, AlertCircle, Save, Sparkles, BookOpen } from 'lucide-react';

interface SuggestTranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
  onTranslationSaved?: () => void;
}

export const SuggestTranslationModal: React.FC<SuggestTranslationModalProps> = ({
  isOpen,
  onClose,
  article,
  onTranslationSaved
}) => {
  const { language, translationManager, saveTranslation, contentTranslations, t } = useLanguage();
  const { user } = useAuth();

  const [targetLang, setTargetLang] = useState<LanguageCode>(language !== 'en' ? language : 'te');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [translatorName, setTranslatorName] = useState(
    user?.profile?.full_name || user?.email || ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-populate when target language changes
  useEffect(() => {
    if (!isOpen) return;

    // Check existing translation in memory / article
    const tr = article.translations?.[targetLang] || contentTranslations[article.id];
    if (tr && targetLang !== 'en') {
      setTitle(tr.title || '');
      setSummary(tr.summary || '');
      setContent(tr.content || '');
      if (tr.translator_name) {
        setTranslatorName(tr.translator_name);
      }
    } else {
      // Clear fields to let user enter fresh translation
      setTitle('');
      setSummary('');
      setContent('');
    }
    setStatusMsg(null);
  }, [targetLang, article, isOpen, contentTranslations]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setStatusMsg({ type: 'error', text: 'Please fill in both the title and full translated content.' });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await saveTranslation(article.id, {
        title: title.trim(),
        summary: summary.trim() || title.trim(),
        content: content.trim(),
        translator_name: translatorName.trim() || 'Community Contributor'
      });

      if (res.success) {
        setStatusMsg({
          type: 'success',
          text: `Translation for ${SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.nativeName} saved successfully!`
        });
        if (onTranslationSaved) {
          onTranslationSaved();
        }
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to submit translation.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#111520] border border-[#c99738]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-800 bg-[#161b2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#580014] border border-[#c99738]/40 text-[#fcedc7]">
              <Globe className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <h2 className="font-royal-heading font-extrabold text-lg sm:text-xl text-[#fcedc7]">
                {t.translationModal?.title || 'Contribute Translation'}
              </h2>
              <p className="text-xs text-stone-400">
                {t.translationModal?.subtitle || 'Help transcribe and translate verified royal records across all 8 Indian languages'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Reference Banner */}
        <div className="p-4 bg-stone-900/60 border-b border-stone-800 text-xs flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <div>
            <span className="text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
              {t.translationModal?.sourceDoc || 'Source Document:'}
            </span>
            <h4 className="text-stone-200 font-medium">{article.original_title}</h4>
            <span className="text-[11px] text-stone-500">ID: {article.id} • Category: {article.category}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {statusMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                  : 'bg-red-950/60 border-red-800 text-red-200'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Language Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300">
              {t.translationModal?.targetLangLabel || 'Select Target Translation Language'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUPPORTED_LANGUAGES.map(l => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => setTargetLang(l.code)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    targetLang === l.code
                      ? 'bg-[#580014] text-[#fcedc7] border-[#d4af37] shadow-md'
                      : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <div className="font-bold">{l.nativeName}</div>
                  <div className="text-[10px] text-stone-400 opacity-80">{l.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Translated Title */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-stone-300">
              {t.translationModal?.titleLabel || 'Translated Title'} ({selectedLangObj?.nativeName}) <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={`Enter title in ${selectedLangObj?.nativeName}...`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141926] border border-stone-700 text-stone-100 placeholder-stone-600 focus:border-[#d4af37] focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Translated Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300">
              {t.translationModal?.summaryLabel || 'Executive Summary'}
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Brief summary in target language..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#141926] border border-stone-700 text-stone-100 placeholder-stone-600 focus:border-[#d4af37] focus:outline-none text-xs"
            />
          </div>

          {/* Full Translated Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300">
              {t.translationModal?.contentLabel || 'Full Translated Content'} <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Complete scholarly transcription and translation in ${selectedLangObj?.nativeName}...`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141926] border border-stone-700 text-stone-100 placeholder-stone-600 focus:border-[#d4af37] focus:outline-none font-royal-serif text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Translator Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300">
              {t.translationModal?.authorLabel || 'Translator / Contributor Attribution'}
            </label>
            <input
              type="text"
              value={translatorName}
              onChange={e => setTranslatorName(e.target.value)}
              placeholder="Your name or research institution for credits..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#141926] border border-stone-700 text-stone-100 placeholder-stone-600 focus:border-[#d4af37] focus:outline-none text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
            <div className="text-[11px] text-stone-500">
              {t.translationModal?.disclaimer || 'All contributions are archived and reviewed for epigraphic accuracy.'}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
              >
                {t.translationModal?.cancelBtn || t.common?.cancel || 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-[#c99738] hover:bg-[#dfab43] text-[#300207] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{submitting ? (t.translationModal?.savingBtn || 'Saving...') : (t.translationModal?.submitBtn || t.common?.save || 'Save Translation')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
