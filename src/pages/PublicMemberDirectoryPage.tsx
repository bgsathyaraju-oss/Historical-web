import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { Users, Search, Filter, MapPin, Briefcase, GraduationCap, Globe, Shield, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CANONICAL_MEMBERS } from '../data/archivalSeedData';

export const PublicMemberDirectoryPage: React.FC = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<UserProfile[]>(CANONICAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/community/directory')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d && Array.isArray(d.members) && d.members.length > 0) {
          setMembers(d.members);
        }
      })
      .catch(() => {
        // Fallback to CANONICAL_MEMBERS when running on static GitHub Pages
      })
      .finally(() => setLoading(false));
  }, []);

  const states = ['All', 'Odisha', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra'];

  const filtered = members.filter(m => {
    const matchesState = stateFilter === 'All' || m.state_or_province.toLowerCase() === stateFilter.toLowerCase();
    const s = search.toLowerCase();
    const matchesSearch =
      m.full_name.toLowerCase().includes(s) ||
      m.district.toLowerCase().includes(s) ||
      (m.profession && m.profession.toLowerCase().includes(s)) ||
      (m.education && m.education.toLowerCase().includes(s));
    return matchesState && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStateChange = (st: string) => {
    setStateFilter(st);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Users className="w-4 h-4" />
          <span>Global Community Network</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Public Member Directory
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Connect with scholars, researchers, and families of the Suryavamsha Odiyaraju Kshatriya community. Private personal data, date of birth, and home contact details are strictly protected in accordance with privacy laws.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {states.map(st => (
            <button
              key={st}
              onClick={() => handleStateChange(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                stateFilter === st
                  ? 'bg-[#c99738] text-[#300207] shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, district, profession..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      {/* Directory Grid & Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <Users className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-stone-200">No Members Found</h3>
          <p className="text-xs text-stone-400">
            No member profiles match your current search and state filter criteria.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setStateFilter('All');
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(member => (
            <div
              key={member.user_id}
              onClick={() => setSelectedMember(member)}
              className="p-6 rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738]/60 space-y-4 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {member.profile_photo_url ? (
                    <img
                      src={member.profile_photo_url}
                      alt={member.full_name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#c99738]/40 shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-[#580014] border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-lg font-bold font-royal-heading shrink-0">
                      {member.full_name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors truncate">
                      {member.full_name}
                    </h3>
                    <div className="text-xs text-[#d4af37] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{member.district}, {member.state_or_province}</span>
                    </div>
                  </div>
                </div>

                {member.profession && (
                  <div className="text-xs text-stone-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span className="truncate">{member.profession}</span>
                  </div>
                )}

                {member.education && (
                  <div className="text-xs text-stone-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span className="truncate">{member.education}</span>
                  </div>
                )}

                {member.biography && (
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {member.biography}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
                <span>{member.country}</span>
                <span className="text-[#e8c872] font-semibold">View Profile →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#121622] border border-stone-800 text-xs">
          <span className="text-stone-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} members
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 disabled:opacity-40 hover:bg-stone-800"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg font-semibold flex items-center justify-center ${
                  currentPage === p
                    ? 'bg-[#c99738] text-[#300207]'
                    : 'text-stone-400 hover:bg-stone-800'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 disabled:opacity-40 hover:bg-stone-800"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#111520] border border-[#c99738]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white text-xs px-2.5 py-1 rounded-lg border border-stone-700"
            >
              Close
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-stone-800 pb-5">
              {selectedMember.profile_photo_url ? (
                <img
                  src={selectedMember.profile_photo_url}
                  alt={selectedMember.full_name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37]"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#580014] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] text-2xl font-bold font-royal-heading">
                  {selectedMember.full_name.charAt(0)}
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7]">
                  {selectedMember.full_name}
                </h3>
                <p className="text-xs text-[#d4af37] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedMember.city_town_village}, {selectedMember.district}, {selectedMember.state_or_province}, {selectedMember.country}</span>
                </p>
                <p className="text-xs text-stone-400">
                  {selectedMember.profession} • {selectedMember.organization}
                </p>
              </div>
            </div>

            {selectedMember.biography && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  Biography & Background
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0c0f17] p-4 rounded-xl border border-stone-800">
                  {selectedMember.biography}
                </p>
              </div>
            )}

            {selectedMember.areas_of_historical_interest && selectedMember.areas_of_historical_interest.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  Historical Research Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.areas_of_historical_interest.map((int, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300">
                      {int}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedMember.research_contributions && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  Research & Archival Contributions
                </h4>
                <p className="text-xs text-stone-300 italic bg-[#161c2a] p-3 rounded-xl border border-stone-800">
                  {selectedMember.research_contributions}
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-800 flex items-center justify-between">
              <span>Privacy protected: Exact address & date of birth are confidential.</span>
              <button
                onClick={() => alert('Profile moderation report submitted to editorial team.')}
                className="text-stone-400 hover:text-rose-400 transition-colors"
              >
                Report Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
