import React, { useState, useEffect } from 'react';
import { HistoricalDocument } from '../types';
import { BookOpen, FileText, Scroll, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';

export const HistoricalDocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<HistoricalDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<HistoricalDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/documents')
      .then(r => r.json())
      .then(d => {
        setDocuments(d.documents || []);
        if (d.documents && d.documents.length > 0) {
          setSelectedDoc(d.documents[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>Archival Preservation & Manuscript Repository</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Digitized Historical Documents & Royal Chronicles
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          High-resolution records of palm-leaf manuscripts, temple chronicles (Madala Panji), legal codices (Sarasvati Vilasa), and copper-plate grants with provenance details and open educational licensing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Document Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1">
            Archival Catalog ({documents.length})
          </div>

          <div className="space-y-3">
            {documents.map(doc => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(201,151,56,0.18)]'
                      : 'bg-[#121622] border-stone-800/80 hover:border-stone-700 hover:bg-[#181f2f]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {doc.original_language}
                    </span>
                    <EvidenceBadge status={doc.verification_status} size="sm" />
                  </div>

                  <h3 className="font-royal-heading font-bold text-sm sm:text-base text-stone-100 leading-snug">
                    {doc.title}
                  </h3>

                  <div className="text-xs text-stone-400 mt-2 space-y-1">
                    <p><strong className="text-stone-300">Authority:</strong> {doc.author_authority}</p>
                    <p><strong className="text-stone-300">Approx Date:</strong> {doc.approximate_date}</p>
                    <p><strong className="text-stone-300">Repository:</strong> {doc.current_location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Document Dossier */}
        <div className="lg:col-span-7">
          {selectedDoc && (
            <div className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    {selectedDoc.approximate_date}
                  </span>
                  <h2 className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#fcedc7] mt-1">
                    {selectedDoc.title}
                  </h2>
                </div>
                <EvidenceBadge status={selectedDoc.verification_status} size="md" />
              </div>

              {/* Provenance Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#161c2a] p-4 rounded-xl border border-stone-800">
                <div>
                  <span className="text-stone-500 block">Author / Compiling Body:</span>
                  <strong className="text-stone-200">{selectedDoc.author_authority}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Current Custodial Collection:</span>
                  <strong className="text-stone-200">{selectedDoc.current_location}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Provenance & Custody:</span>
                  <strong className="text-stone-200">{selectedDoc.source_provenance}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Copyright & Licensing:</span>
                  <strong className="text-stone-200">{selectedDoc.copyright_license}</strong>
                </div>
              </div>

              {/* Research & Historiographical Notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  Scholarly Research & Historiographical Notes
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0c0f17] p-4 rounded-xl border border-stone-800">
                  {selectedDoc.research_notes}
                </p>
              </div>

              {/* Transcription & Translation Excerpts */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    Original Incised Text Excerpt ({selectedDoc.original_language})
                  </h4>
                  <div className="p-4 rounded-xl bg-[#171113] border border-[#c99738]/30 text-xs sm:text-sm font-mono text-[#fce8bb] leading-relaxed">
                    {selectedDoc.transcription_excerpt}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    Scholarly English Translation
                  </h4>
                  <div className="p-4 rounded-xl bg-[#141b2b] border border-stone-800 text-xs sm:text-sm font-royal-serif text-stone-200 leading-relaxed italic">
                    "{selectedDoc.translation_excerpt}"
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
