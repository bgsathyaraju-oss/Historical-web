import React, { useState } from 'react';
import { GenealogyNode } from '../types';
import { ShieldCheck, Scroll, Info } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { ContentDetailModal, ContentDetailItem } from './ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { GENEALOGY_UI_TRANSLATIONS } from '../data/multilingualSeedTranslations';

interface GenealogyTreeProps {
  nodes: GenealogyNode[];
  onSelectFigure?: (figureName: string) => void;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({ nodes }) => {
  const { language } = useLanguage();
  const ui = GENEALOGY_UI_TRANSLATIONS[language] || GENEALOGY_UI_TRANSLATIONS.en;

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id || null);
  const [modalNodeId, setModalNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0] || null;
  const modalNode = modalNodeId ? nodes.find(n => n.id === modalNodeId) || null : null;

  // Group by generation
  const generations = Array.from(new Set(nodes.map(n => n.generation))).sort((a, b) => a - b);

  const getGenerationLabel = (g: number) => {
    if (g === -2) return ui.genMinus2;
    if (g === -1) return ui.genMinus1;
    if (g === 0) return ui.gen0;
    if (g === 1) return ui.gen1;
    if (g === 2) return ui.gen2;
    if (g === 3) return ui.gen3;
    if (g === 4) return ui.gen4;
    return `${ui.genealogicalTierLabel} ${g}`;
  };

  const getNodeImage = (node: GenealogyNode) => {
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const nodeImgMap: Record<string, string> = {
      gen_surya_ikshvaku: `${base}surya_konark_sculpture.jpg`,
      gen_rama_kusha: `${base}surya_konark_sculpture.jpg`,
      gen_jakesvara: `${base}copper_plate_charter.jpg`,
      gen_kapilendra: `${base}kapilendra_deva_portrait.jpg`,
      gen_hamvira: `${base}hamvira_deva_cavalry.jpg`,
      gen_purushottama: `${base}purushottama_deva.jpg`,
      gen_prataparudra: `${base}prataparudra_deva.jpg`,
      gen_virabhadra: `${base}virabhadra_deva_archer.jpg`,
      gen_kakharua_kalua: `${base}barabati_fort_gateway.jpg`
    };
    return nodeImgMap[node.id] || `${base}kapilendra_deva_portrait.jpg`;
  };

  const modalItem: ContentDetailItem | null = modalNode
    ? {
        id: modalNode.id,
        title: modalNode.name,
        subtitle: modalNode.titles || getGenerationLabel(modalNode.generation),
        badge:
          modalNode.relationship_type.includes('documented') || modalNode.relationship_type.includes('epigraphic')
            ? ui.documentedBadge
            : ui.traditionalBadge,
        era: modalNode.reign || ui.historicalPeriodRecord,
        dynasty: ui.suryavamshaLineage,
        imageUrl: getNodeImage(modalNode),
        imageLayout: 'portrait',
        content: modalNode.notes || modalNode.titles,
        metadata: [
          ...(modalNode.spouse ? [{ label: ui.consortLabel, value: modalNode.spouse }] : []),
          { label: ui.genealogicalTierLabel, value: getGenerationLabel(modalNode.generation) }
        ],
        sources: (modalNode.sources || []).map(s => ({ title: s }))
      }
    : null;

  return (
    <div className="w-full bg-[#111520] border border-[#c99738]/40 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Legend & Epistemic Disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-[#161c2a] border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#d4af37] shrink-0" />
            <h4 className="text-xs sm:text-sm font-semibold text-[#fcedc7] font-royal-heading">
              {ui.legendTitle}
            </h4>
          </div>
          <p className="text-xs text-stone-400">
            {ui.legendDesc}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span> {ui.documentedBadge}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-600/50">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span> {ui.traditionalBadge}
          </span>
        </div>
      </div>

      {/* Visual Tree Layout */}
      <div className="space-y-8 pb-4">
        {generations.map(gen => {
          const genNodes = nodes.filter(n => n.generation === gen);
          return (
            <div key={gen} className="relative">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 shadow-sm break-words">
                  {getGenerationLabel(gen)}
                </span>
                <div className="flex-1 border-t border-stone-800"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {genNodes.map(node => {
                  const isDocumented = node.relationship_type.includes('documented') || node.relationship_type.includes('epigraphic');
                  const isSelected = selectedNode?.id === node.id;
                  const nodeThumb = getNodeImage(node);

                  return (
                    <div
                      key={node.id}
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        setModalNodeId(node.id);
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border relative ${
                        isSelected
                          ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                          : isDocumented
                          ? 'bg-[#151a26] border-emerald-900/40 hover:border-emerald-600/60 hover:bg-[#1a2130]'
                          : 'bg-[#151a26] border-indigo-900/40 hover:border-indigo-600/60 hover:bg-[#1a2130]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2.5 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={nodeThumb}
                            alt={node.name}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.fallback) {
                                target.dataset.fallback = '1';
                                target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kapilendra_deva_portrait.jpg`;
                              }
                            }}
                            className="w-12 h-12 rounded-xl object-cover object-top shrink-0 border border-[#c99738]/40 bg-stone-950"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`p-1 rounded-md shrink-0 ${isDocumented ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-950 text-indigo-400'}`}>
                                {isDocumented ? <ShieldCheck className="w-3 h-3" /> : <Scroll className="w-3 h-3" />}
                              </span>
                              <h5 className="text-sm font-bold text-stone-100 font-royal-heading leading-tight break-words">
                                {node.name}
                              </h5>
                            </div>
                            {node.reign && (
                              <span className="text-[11px] text-[#d4af37] font-medium block mt-0.5">
                                {node.reign}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {node.titles && (
                        <p className="text-xs text-stone-400 line-clamp-2 mb-2 italic">
                          "{node.titles}"
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-800/80 text-stone-400">
                        <span>{ui.primarySourcesCount(node.sources?.length || 0)}</span>
                        <span className={`font-semibold ${isDocumented ? 'text-emerald-400' : 'text-indigo-400'}`}>
                          {isDocumented ? ui.corroboratedArrow : ui.traditionalArrow}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div
          onClick={() => setModalNodeId(selectedNode.id)}
          className="mt-8 p-5 rounded-xl bg-[#161c2b] border border-[#c99738]/40 hover:border-[#c99738] cursor-pointer transition-all animate-in fade-in duration-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-bold text-[#fcedc7] font-royal-heading">
                  {selectedNode.name}
                </h4>
                <EvidenceBadge
                  category={selectedNode.relationship_type.includes('documented') ? 'verified_archaeological' : 'traditional_account'}
                  size="sm"
                />
              </div>
              <p className="text-xs text-[#d4af37] font-medium mt-0.5">
                {selectedNode.reign ? `${ui.reignEraLabel}: ${selectedNode.reign}` : ui.historicalPeriodRecord}
              </p>
            </div>
            {selectedNode.spouse && (
              <div className="text-xs text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
                <span className="text-stone-300 font-medium">{ui.consortLabel}:</span> {selectedNode.spouse}
              </div>
            )}
          </div>

          {selectedNode.notes && (
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
              {selectedNode.notes}
            </p>
          )}

          {selectedNode.sources && selectedNode.sources.length > 0 && (
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2 font-royal-heading">
                {ui.citationsHeading}
              </h5>
              <ul className="space-y-1.5">
                {selectedNode.sources.map((src, i) => (
                  <li key={i} className="text-xs text-stone-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0"></span>
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <ContentDetailModal item={modalItem} onClose={() => setModalNodeId(null)} />
    </div>
  );
};


