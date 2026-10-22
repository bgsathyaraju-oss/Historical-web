import React from 'react';
import { BookOpen, Scroll, ExternalLink, Award, FileText } from 'lucide-react';

export const LiteraturePublicationsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>Classical Odia & Sanskrit Corpus</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Literature, Legal Codices & Court Publications
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          The Suryavamshi Gajapathi court patronized monumental literary works that defined medieval Indian law, vernacular epic poetry, and devotional aesthetics.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            title: 'Sarasvati Vilasa (Medieval Sanskrit Legal Digest)',
            author: 'Composed by Prataparudra Deva Gajapathi (c. 1515 CE)',
            lang: 'Sanskrit',
            desc: 'A comprehensive Sanskrit legal and civil digest dealing with vyavahara (jurisprudence), the division of property, inheritance rules, and the rights of subjects. Critically edited by Dr. R. Shama Sastri in 1927 based on palm-leaf folios in Mysore and Madras.',
            significance: 'Recognized as one of the definitive Smriti digests of southern and eastern India, providing priceless evidence of Gajapathi land tenure.'
          },
          {
            title: 'Sarala Mahabharata (The Pioneer of Vernacular Odia Literature)',
            author: 'Composed by Adikabi Sarala Dasa (under Kapilendra Deva’s patronage, c. 1450 CE)',
            lang: 'Classical Odia',
            desc: 'A monumental translation and regional contextualization of the Mahabharata composed in the vernacular Odia Dandi Vritta meter. Reflected the contemporary martial valor, warfare methods, and social life of Kapilendra Deva’s empire.',
            significance: 'Considered the founding literary monument of the Odia language and literature.'
          },
          {
            title: 'Abhinava Gitagovinda & Nama-malika',
            author: 'Attributed to Purushottama Deva Gajapathi (c. 1475 CE)',
            lang: 'Sanskrit',
            desc: 'Devotional lyric poems written in emulation of Jayadeva’s Gitagovinda, dedicated to Lord Jagannatha, along with lexicographical and philosophical texts compiled under the king’s personal scholarship.',
            significance: 'Demonstrated the deep devotional and Sanskrit literary scholarship of the Gajapathi monarchs.'
          }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                {item.lang}
              </span>
              <span className="text-xs text-stone-400">{item.author}</span>
            </div>

            <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-stone-100">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
              {item.desc}
            </p>

            <div className="pt-2 border-t border-stone-800 text-xs text-[#e8c872]">
              <strong className="text-stone-300">Historical Significance:</strong> {item.significance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
