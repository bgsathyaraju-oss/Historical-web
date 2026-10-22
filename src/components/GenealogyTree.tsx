import React, { useState } from 'react';
import { GenealogyNode } from '../types';
import { ShieldCheck, Scroll, HelpCircle, ChevronRight, User, Info } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface GenealogyTreeProps {
  nodes: GenealogyNode[];
  onSelectFigure?: (figureName: string) => void;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({ nodes, onSelectFigure }) => {
  const [selectedNode, setSelectedNode] = useState<GenealogyNode | null>(nodes[0] || null);

  // Group by generation
  const generations = Array.from(new Set(nodes.map(n => n.generation))).sort();

  const getGenerationLabel = (g: number) => {
    if (g === -2) return 'Suryavamsha Solar Ancestry • Universal Sovereign Root (Samrat Sagara)';
    if (g === -1) return 'Solar Race Progenitors • Gangavatarana Era (Maharshi Bhagiratha)';
    if (g === 0) return 'Maryada Purushottama Era • Ikshvaku Lineage Apex (Sri Rama)';
    if (g === 1) return 'Imperial Dynasty Foundation (Kapilendra Deva — 1434 CE)';
    return `Generation ${g}`;
  };

  return (
    <div className="w-full bg-[#111520] border border-[#c99738]/40 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Legend & Epistemic Disclaimer */}
      <div className="mb-6 p-4 rounded-xl bg-[#161c2a] border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#d4af37]" />
            <h4 className="text-xs sm:text-sm font-semibold text-[#fcedc7] font-royal-heading">
              Genealogical Classification Standard
            </h4>
          </div>
          <p className="text-xs text-stone-400">
            Documented primary relations are corroborated by contemporary copper-plates. Traditional lines preserve living community memory and vamsavali texts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Documented Epigraphic Link
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-600/50">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Traditional / Vamsavali Line
          </span>
        </div>
      </div>

      {/* Visual Tree Layout */}
      <div className="space-y-8 overflow-x-auto pb-4">
        {generations.map(gen => {
          const genNodes = nodes.filter(n => n.generation === gen);
          return (
            <div key={gen} className="relative">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 shadow-sm">
                  {getGenerationLabel(gen)}
                </span>
                <div className="flex-1 border-t border-stone-800"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {genNodes.map(node => {
                  const isDocumented = node.relationship_type.includes('documented') || node.relationship_type.includes('epigraphic');
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border relative ${
                        isSelected
                          ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                          : isDocumented
                          ? 'bg-[#151a26] border-emerald-900/40 hover:border-emerald-600/60 hover:bg-[#1a2130]'
                          : 'bg-[#151a26] border-indigo-900/40 hover:border-indigo-600/60 hover:bg-[#1a2130]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${isDocumented ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-950 text-indigo-400'}`}>
                            {isDocumented ? <ShieldCheck className="w-4 h-4" /> : <Scroll className="w-4 h-4" />}
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-stone-100 font-royal-heading leading-tight">
                              {node.name}
                            </h5>
                            {node.reign && (
                              <span className="text-[11px] text-[#d4af37] font-medium">
                                {node.reign}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {node.titles && (
                        <p className="text-xs text-stone-400 line-clamp-1 mb-2 italic">
                          "{node.titles}"
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-800/80 text-stone-400">
                        <span>{node.sources?.length || 0} Primary Sources</span>
                        <span className={`font-semibold ${isDocumented ? 'text-emerald-400' : 'text-indigo-400'}`}>
                          {isDocumented ? 'Corroborated' : 'Traditional'}
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
        <div className="mt-8 p-5 rounded-xl bg-[#161c2b] border border-[#c99738]/40 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-[#fcedc7] font-royal-heading">
                  {selectedNode.name}
                </h4>
                <EvidenceBadge
                  category={selectedNode.relationship_type.includes('documented') ? 'verified_archaeological' : 'traditional_account'}
                  size="sm"
                />
              </div>
              <p className="text-xs text-[#d4af37] font-medium mt-0.5">
                {selectedNode.reign ? `Reign / Era: ${selectedNode.reign}` : 'Historical Period Record'}
              </p>
            </div>
            {selectedNode.spouse && (
              <div className="text-xs text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
                <span className="text-stone-300 font-medium">Consort / Queen:</span> {selectedNode.spouse}
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
                Corroborating Historical Citations & Epigraphs
              </h5>
              <ul className="space-y-1.5">
                {selectedNode.sources.map((src, i) => (
                  <li key={i} className="text-xs text-stone-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
