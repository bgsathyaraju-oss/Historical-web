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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292521]/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#FFFCF5] border-2 border-[#A87924] shadow-[0_14px_45px_rgba(75,51,31,0.25)] overflow-hidden flex flex-col max-h-[92vh] text-[#292521]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D8C3A2] bg-[#F1E4D0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#762D35] border border-[#A87924] text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-royal-heading font-extrabold text-lg sm:text-xl text-[#54351F]">
                {t.translationModal?.title || 'Contribute Translation'}
              </h2>
              <p className="text-xs text-[#6B5948]">
                {t.translationModal?.subtitle || 'Help transcribe and translate verified royal records across all 8 Indian languages'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#54351F] hover:text-white hover:bg-[#762D35] border border-[#D8C3A2] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Reference Banner */}
        <div className="p-4 bg-[#FFF9EF] border-b border-[#D8C3A2] text-xs flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#76501F] font-semibold uppercase tracking-wider text-[10px]">
              {t.translationModal?.sourceDoc || 'Source Document:'}
            </span>
            <h4 className="text-[#54351F] font-bold">{article.original_title}</h4>
            <span className="text-[11px] text-[#6B5948]">ID: {article.id} • Category: {article.category}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#FFFCF5]">
          {statusMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border ${
                statusMsg.type === 'success'
                  ? 'bg-[#EDF7F0] border-[#2D7A4D] text-[#14532D]'
                  : 'bg-[#FDECEC] border-[#B9382C] text-[#7F1D1D]'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-[#2D7A4D] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#B9382C] shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Language Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#54351F]">
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
                      ? 'bg-[#762D35] text-white border-[#A87924] shadow-sm'
                      : 'bg-[#FFF9EF] text-[#292521] border-[#D8C3A2] hover:bg-[#E9D9BE] hover:border-[#A87924]'
                  }`}
                >
                  <div className="font-bold">{l.nativeName}</div>
                  <div className="text-[10px] opacity-85">{l.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Translated Title */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-[#54351F]">
              {t.translationModal?.titleLabel || 'Translated Title'} ({selectedLangObj?.nativeName}) <span className="text-[#762D35]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={`Enter title in ${selectedLangObj?.nativeName}...`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D8C3A2] text-[#292521] placeholder-[#6B5948]/60 focus:border-[#A87924] focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Translated Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#54351F]">
              {t.translationModal?.summaryLabel || 'Executive Summary'}
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Brief summary in target language..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#D8C3A2] text-[#292521] placeholder-[#6B5948]/60 focus:border-[#A87924] focus:outline-none text-xs"
            />
          </div>

          {/* Full Translated Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#54351F]">
              {t.translationModal?.contentLabel || 'Full Translated Content'} <span className="text-[#762D35]">*</span>
            </label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Complete scholarly transcription and translation in ${selectedLangObj?.nativeName}...`}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D8C3A2] text-[#292521] placeholder-[#6B5948]/60 focus:border-[#A87924] focus:outline-none font-royal-serif text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Translator Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#54351F]">
              {t.translationModal?.authorLabel || 'Translator / Contributor Attribution'}
            </label>
            <input
              type="text"
              value={translatorName}
              onChange={e => setTranslatorName(e.target.value)}
              placeholder="Your name or research institution for credits..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#D8C3A2] text-[#292521] placeholder-[#6B5948]/60 focus:border-[#A87924] focus:outline-none text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#D8C3A2] flex items-center justify-between">
            <div className="text-[11px] text-[#6B5948]">
              {t.translationModal?.disclaimer || 'All contributions are archived and reviewed for epigraphic accuracy.'}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#E9D9BE] hover:bg-[#D8C3A2] text-[#54351F] border border-[#A87924]/50 text-xs font-semibold cursor-pointer"
              >
                {t.translationModal?.cancelBtn || t.common?.cancel || 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
