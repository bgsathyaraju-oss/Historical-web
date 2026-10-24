import { ShieldCheck, BookOpen, Compass, Award, FileText, CheckCircle, Scale } from 'lucide-react';
import { PublisherCreditCard } from '../components/PublisherCreditCard';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014]/60 border border-[#d4af37]/40 text-[#fcedc7] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>{t.about?.badge || 'Epistemic Integrity & Research Mandate'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7]">
          {t.about?.title || 'About the Historical Documentation Project'}
        </h1>
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
          {t.about?.subtitle || 'The Suryavamsha Odiyaraju Kshatriya Historical Documentation Project is an independent digital archive and scholarly consortium dedicated to researching, transcribing, verifying, and preserving the epigraphy, royal genealogy, architectural monuments, and living heritage of medieval Odra Desha and the Suryavamshi Gajapathi Empire.'}
        </p>
      </div>

      {/* Mission & Mandate Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1a131b] to-[#121622] border border-[#c99738]/50 shadow-xl space-y-3">
        <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
          <BookOpen className="w-6 h-6 text-[#d4af37]" />
          <h2 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {t.about?.missionTitle || 'Our Mission & Archival Mandate'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
          {t.about?.missionDesc || 'To provide a globally accessible, scientifically rigorous digital repository that preserves medieval inscriptions, architecture, and living community lineages without distortion.'}
        </p>
      </div>

      {/* Core Epistemological Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#131724] border border-[#c99738]/50 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
          <Scale className="w-6 h-6 text-[#d4af37]" />
          <h2 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {t.about?.methodologyTitle || 'Historical Methodology & Demarcation Rules'}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          {t.about?.methodologyDesc || 'Historical truth cannot be fabricated or sustained on unexamined legends alone. In adherence to strict professional historiographical standards, this platform enforces the following core standards across all documentation and research articles:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <CheckCircle className="w-4 h-4" /> 1. Epigraphic Primary Corroboration
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Dates, regnal titles, and territorial boundaries are grounded primarily in contemporary stone inscriptions and copper-plate grants published in peer-reviewed corpuses such as Epigraphia Indica and South Indian Inscriptions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-2">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <CheckCircle className="w-4 h-4" /> 2. Transparent Demarcation of Traditions
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Traditional vamsavalis, temple chronicles (such as the Madala Panji), and regional oral genealogies are explicitly labeled as Traditional Chronicles or Living Memories rather than indisputable biological facts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-2">
            <span className="font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <CheckCircle className="w-4 h-4" /> 3. No Fabricated Artifacts or Portraits
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              We never fabricate simulated portraits or invented royal seals as authentic historical artifacts. Every gallery photograph, temple relief, and manuscript folio features verified provenance and licensing citations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-2">
            <span className="font-bold text-[#e8c872] flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <CheckCircle className="w-4 h-4" /> 4. Eight-Language Scientific Equity
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              All public documentation is provided across eight major Indian languages (English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, and Bengali) preserving original script quotations alongside reviewed translations.
            </p>
          </div>
        </div>
      </div>

      {/* Advisory & Editorial Structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#111520] border border-stone-800 space-y-2 text-center">
          <Award className="w-8 h-8 text-[#d4af37] mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-stone-100">
            Editorial Review Board
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Composed of university historians, epigraphists, and archival paleographers vetting submissions against published epigraphs.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111520] border border-stone-800 space-y-2 text-center">
          <BookOpen className="w-8 h-8 text-[#d4af37] mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-stone-100">
            Open Digital Archive
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Free public access to digitized copper-plate transcriptions, archaeological site maps, and scholarly monographs.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#111520] border border-stone-800 space-y-2 text-center">
          <Compass className="w-8 h-8 text-[#d4af37] mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-stone-100">
            Global Diaspora Preservation
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Documenting the historical migration routes and cultural memory of Suryavamsha Odiyaraju families across Karnataka, Andhra, and Tamil Nadu.
          </p>
        </div>
      </div>

      {/* Website Design and Publishing Leadership */}
      <div className="pt-4">
        <PublisherCreditCard variant="hero-top" />
      </div>
    </div>
  );
};
