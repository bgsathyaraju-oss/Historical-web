import React from 'react';
import { Scroll, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const HistoricalReferencesPage: React.FC = () => {
  const references = [
    {
      category: 'Epigraphic Publications (Primary)',
      items: [
        'Epigraphia Indica, Vol. XXXIII (1959–1960), pp. 275–292: "Veligalani Grant of Kapilendra Deva (Saka 1380)", edited by Dr. D.C. Sircar.',
        'South Indian Inscriptions (SII), Vol. IV, V, & VI: Epigraphs of Draksharama, Simhachalam, and Srikurmam.',
        'Epigraphia Carnatica, Vol. VII: Inscriptions relating to Prince Virabhadra Deva at Malebennur.',
        'Inscriptions of Orissa, Vol. V (Part I & II), edited by S.N. Rajaguru, Odisha State Museum, Bhubaneswar.'
      ]
    },
    {
      category: 'Standard Scholarly Monographs (Secondary)',
      items: [
        'Subrahmanyam, R., "The Suryavamsi Gajapatis of Orissa", Andhra University Press, Waltair, 1957.',
        'Mukherjee, Prabhat, "The History of the Gajapati Kings of Orissa and Their Successors", General Printers & Publishers, Calcutta, 1953.',
        'Sahu, N.K., "History of Orissa", Comprehensive Volumes I & II, Utkal University Press, 1981.',
        'Panigrahi, K.C., "History of Orissa (Hindu Period)", Kitab Mahal, Cuttack, 1981.',
        'Kulke, Hermann, "Kings and Cults: State Formation and Legitimation in India and Southeast Asia", Manohar, 1993.'
      ]
    },
    {
      category: 'Indigenous Chronicles & Archival Catalogues',
      items: [
        'Madala Panji (Prachi Edition), edited by Prof. A.B. Mohanty, Utkal University, Cuttack.',
        'Mackenzie Manuscripts (Local Kaifiyats of Coastal Andhra and Rayalaseema), Government Oriental Manuscripts Library, Chennai.',
        'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, edited by K.N. Mahapatra, State Archives, Bhubaneswar.'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Scroll className="w-4 h-4" />
          <span>Epigraphic Bibliography & Archival Sources</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Historical References & Scholarly Bibliography
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Every statement, regnal date, and boundary map on this portal is verified against published primary epigraphic records and peer-reviewed historical monographs.
        </p>
      </div>

      <div className="space-y-8">
        {references.map((section, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#121622] border border-stone-800 space-y-4 shadow-lg">
            <h3 className="font-royal-heading font-bold text-lg text-[#fcedc7] border-b border-stone-800 pb-3">
              {section.category}
            </h3>

            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm text-stone-300 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
