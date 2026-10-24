import React, { useState } from 'react';
import { Crown, ShieldCheck, MapPin, Landmark, BookOpen, Scroll, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';

interface GajapathiKingdomPageProps {
  onNavigate: (path: string) => void;
}

export const GajapathiKingdomPage: React.FC<GajapathiKingdomPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'chronology' | 'administration' | 'military' | 'culture'>('chronology');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-[#20050d] via-[#151a28] to-[#0c0f17] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.gajapathi.badge}</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {t.gajapathi.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {t.gajapathi.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'chronology', label: t.gajapathi.tabChronology },
          { id: 'administration', label: t.gajapathi.tabAdministration },
          { id: 'military', label: t.gajapathi.tabMilitary },
          { id: 'culture', label: t.gajapathi.tabCulture }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#c99738] text-[#300207] shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'chronology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                1434 – 1466 CE
              </span>
              <h3 className="font-royal-heading font-bold text-lg text-stone-100">
                Kapilendra Deva (Founder)
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ushered in the Suryavamsha dynasty, defeated the Sultan of Bengal, annexed coastal Andhra up to the Krishna, and dispatched his son Hamvira to the Kaveri River. Erected the Meghanada Pacheri at Puri.
              </p>
              <button onClick={() => onNavigate('/kings-queens')} className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 pt-2">
                <span>View Full Profile</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                1466 – 1497 CE
              </span>
              <h3 className="font-royal-heading font-bold text-lg text-stone-100">
                Purushottama Deva
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Consolidated imperial borders after succession disputes with Hamvira Deva. Re-conquered Udayagiri and Kondavidu, commemorated in the traditional Kanchi-Kaveri campaign. Composed Abhinava Gitagovinda.
              </p>
              <button onClick={() => onNavigate('/kings-queens')} className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 pt-2">
                <span>View Full Profile</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                1497 – 1540 CE
              </span>
              <h3 className="font-royal-heading font-bold text-lg text-stone-100">
                Prataparudra Deva
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Sustained the empire against three simultaneous fronts (Bengal Sultans, Qutb Shahis, and Krishna Deva Raya of Vijayanagara). Authored the Sarasvati Vilasa and patronized Sri Chaitanya Mahaprabhu.
              </p>
              <button onClick={() => onNavigate('/kings-queens')} className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 pt-2">
                <span>View Full Profile</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'administration' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 space-y-6">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            Imperial Administration & Military Feudal Structure
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            The Suryavamshi state was administered through a hierarchical feudal-military apparatus. The king held supreme authority as <em>Rautaraya</em> (viceroy of Lord Jagannatha), ensuring that political authority derived sacred legitimacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-1.5">
              <h4 className="font-bold text-[#e8c872]">Mahapatras & Ministers</h4>
              <p className="text-stone-400 text-xs">
                Chief administrators governing territorial provinces (Dandapata) such as Kalinga Dandapata, Kondavidu Dandapata, and Dakshina Rajya.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 space-y-1.5">
              <h4 className="font-bold text-[#e8c872]">Nayakas & Fortress Commanders</h4>
              <p className="text-stone-400 text-xs">
                Hereditary Kshatriya military governors stationed in key mountain forts (Durgas) such as Udayagiri, Kondapalli, and Bellamkonda.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'military' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 space-y-6">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            Military Organisation & The Gajasena (War Elephant Corps)
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            The Gajapathi armies were renowned across medieval India for maintaining one of the largest and most terrifying war-elephant divisions in the subcontinent, numbering between 1,000 and 2,500 combat elephants supported by massive infantry archers (Paikas).
          </p>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200">
            <strong>Epigraphic Findspots:</strong> Verified Gajapathi military inscriptions stretch continuously from the banks of the Hooghly in Bengal, through coastal Odisha, down to Draksharama, Kondavidu, Srisailam, Simhachalam, and Srirangam in the Kaveri River basin.
          </div>
        </div>
      )}

      {activeTab === 'culture' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 space-y-6">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            Cultural Renaissance under the Gajapathis
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            The Suryavamsha period witnessed the crystallization of classical Odia literature. Kapilendra Deva patronized Sarala Dasa, who composed the seminal Odia Mahabharata, making epic literature accessible to all sections of society. Royal works in Sanskrit flourished, including Purushottama Deva’s <em>Nama-malika</em> and Prataparudra Deva’s encyclopedic legal digest <em>Sarasvati Vilasa</em>.
          </p>
        </div>
      )}
    </div>
  );
};
