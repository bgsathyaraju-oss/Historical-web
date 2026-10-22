import React from 'react';
import { Award, BookOpen, Users, HeartHandshake, Calendar, ArrowRight } from 'lucide-react';

interface CommunityActivitiesPageProps {
  onNavigate: (path: string) => void;
}

export const CommunityActivitiesPage: React.FC<CommunityActivitiesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Award className="w-4 h-4" />
          <span>Educational & Cultural Outreach</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Community Activities & Heritage Initiatives
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Educational scholarships, manuscript digitization drives, youth historical literacy workshops, and annual heritage tours connecting families with their ancestral roots.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-[#580014] text-[#d4af37]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Digital Manuscript Preservation Drive
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Equipping trained local volunteers with high-resolution macro photography kits to digitize family-held palm-leaf manuscripts and copper-plates in rural settlements before physical degradation occurs.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-stone-800 text-[#d4af37]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Historical Research Fellowships
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Financial grants supporting graduate and doctoral students transcribing unpublished epigraphs of the Suryavamshi rulers, regional dialect variants, and medieval Odra administrative terminology.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-stone-800 text-[#d4af37]">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Annual Heritage Exploration Tours
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Guided multi-day heritage caravans visiting Barabati Fort, Puri, Konark, Kondavidu, and Udayagiri with leading academic epigraphists and architectural historians.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <div className="p-3 w-fit rounded-xl bg-stone-800 text-[#d4af37]">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-royal-heading font-bold text-lg text-stone-100">
            Community Matrimonial & Fraternal Forums
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Verified, secure communication networks allowing community families across state borders to connect respectfully while honoring traditional gotra and kula lineages.
          </p>
        </div>
      </div>
    </div>
  );
};
