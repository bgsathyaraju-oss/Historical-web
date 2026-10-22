import React from 'react';
import { HeartHandshake, Shield, Sparkles, BookOpen, Sun, Award } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';

export const CultureTraditionsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#220710] via-[#1a1122] to-[#111728] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
            <HeartHandshake className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Living Traditions & Sacred Practices</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            Culture, Martial Heritage & Living Traditions
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            Preserving the unbroken spiritual, martial, and royal ceremonial traditions that characterize the Suryavamsha Odiyaraju Kshatriya heritage, from the Jagannatha temple rituals to traditional martial akhadas.
          </p>
        </div>
      </div>

      {/* Core Cultural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-4 shadow-lg">
          <div className="p-3 w-fit rounded-xl bg-[#580014] text-[#d4af37]">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Solar Dynastic Veneration
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Adoration of the Sun God (Surya) as the primordial progenitor of the Suryavamsha lineage. Observed through traditional morning Aditya Hridaya recitations and sacred rituals on Samba Dashami and Ratha Saptami.
          </p>
          <div className="pt-2 text-xs text-[#e8c872] font-semibold">
            Status: Living Cultural Heritage
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-4 shadow-lg">
          <div className="p-3 w-fit rounded-xl bg-stone-800 text-stone-300">
            <Shield className="w-6 h-6 text-[#d4af37]" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Martial Akhadas & Weapon Traditions
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            The traditional military discipline of the Kshatriya warrior clans. Maintained through Khanda (sword) worship during Vijayadashami, archery practices, and the defensive training traditions preserved in regional garrison villages.
          </p>
          <div className="pt-2 text-xs text-[#e8c872] font-semibold">
            Status: Martial Living Tradition
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-4 shadow-lg">
          <div className="p-3 w-fit rounded-xl bg-stone-800 text-stone-300">
            <Award className="w-6 h-6 text-[#d4af37]" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Servitorship to Jagannatha
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            The supreme theological distinction of Gajapathi sovereignty: ruling as the "First Servitor" (Adya Sevaka) of Lord Jagannatha. Kings performed the Chera Panhara (sweeping the chariots with a golden broom) to symbolize that temporal power is subordinate to the Divine.
          </p>
          <div className="pt-2 text-xs text-[#e8c872] font-semibold">
            Status: Documented Royal Ritual
          </div>
        </div>
      </div>
    </div>
  );
};
