import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  User,
  Shield,
  ChevronDown,
  BookOpen,
  Landmark,
  Compass,
  Crown,
  Users,
  Scroll,
  LogOut,
  Sparkles,
  Download,
  Package
} from 'lucide-react';
import { ExportProjectModal } from './ExportProjectModal';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isAdminOrEditor = user && ['super_admin', 'admin', 'historical_editor', 'research_reviewer', 'translator', 'community_moderator'].includes(user.role);

  const navigateTo = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0e16]/95 backdrop-blur-md border-b border-[#c99738]/30 shadow-lg">
      {/* Top Banner Notice */}
      <div className="bg-[#42000c] text-[#fcedc7] text-[11px] py-1 px-4 border-b border-[#c99738]/20 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Suryavamsha Odiyaraju Kshatriya • Digital Historical Documentary & Archival Repository</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-stone-300 text-[11px]">
          <span>Verified Epigraphic Standard</span>
          <span>•</span>
          <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors">
            Methodology
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Sun Emblem */}
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Royal Sun Emblem */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#580014] to-[#80001c] border-2 border-[#d4af37] p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#d4af37]">
                <circle cx="50" cy="50" r="22" fill="#d4af37" />
                <path d="M50 4 L53 26 L50 22 L47 26 Z M50 96 L53 74 L50 78 L47 74 Z M4 50 L26 53 L22 50 L26 47 Z M96 50 L74 53 L78 50 L74 47 Z M16 16 L34 31 L29 29 L31 34 Z M84 84 L66 69 L71 71 L69 66 Z M84 16 L69 34 L71 29 L66 31 Z M16 84 L31 66 L29 71 L34 69 Z" fill="#d4af37" />
                <circle cx="50" cy="50" r="11" fill="#42000c" />
              </svg>
            </div>
            <div>
              <div className="font-royal-heading font-extrabold text-sm sm:text-base tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#fae29c] via-[#d4af37] to-[#aa7c11] leading-tight">
                SURYAVAMSHA ODIYARAJU KSHATRIYA
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#e5d5be] tracking-wider uppercase font-medium">
                Gajapathi Heritage & Historical Documentary Portal
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-stone-200">
            {/* Home */}
            <button
              onClick={() => navigateTo('/')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.home}
            </button>

            {/* Dropdown 1: Historical Documentary */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('doc')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/documentary', '/odra-desha', '/dynasties', '/gajapathi-kings', '/maps', '/timeline'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>{t.nav.documentary}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'doc' && (
                <div className="absolute top-full left-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/documentary')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.documentary} Overview
                  </button>
                  <button onClick={() => navigateTo('/odra-desha')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" /> {t.nav.odraDesha}
                  </button>
                  <button onClick={() => navigateTo('/dynasties')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.dynasties}
                  </button>
                  <button onClick={() => navigateTo('/gajapathi-kings')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#d4af37]" /> {t.nav.gajapathiKings}
                  </button>
                  <button onClick={() => navigateTo('/maps')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" /> {t.nav.maps}
                  </button>
                  <button onClick={() => navigateTo('/timeline')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.timeline}
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown 2: Archaeology & Inscriptions */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('arch')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/inscriptions', '/temples-monuments', '/documents', '/research', '/references'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>{t.nav.inscriptions}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'arch' && (
                <div className="absolute top-full left-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/inscriptions')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> Inscriptions & Epigraphy
                  </button>
                  <button onClick={() => navigateTo('/temples-monuments')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#d4af37]" /> {t.nav.temples}
                  </button>
                  <button onClick={() => navigateTo('/documents')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> Digitized Documents & Grants
                  </button>
                  <button onClick={() => navigateTo('/research')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.research}
                  </button>
                  <button onClick={() => navigateTo('/references')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.references}
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown 3: Genealogy & Heritage */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('gen')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/genealogy', '/gallery', '/culture-traditions', '/literature'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>{t.nav.genealogy}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'gen' && (
                <div className="absolute top-full left-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/genealogy')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> Royal Genealogy Tree
                  </button>
                  <button onClick={() => navigateTo('/gallery')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#d4af37]" /> {t.nav.gallery}
                  </button>
                  <button onClick={() => navigateTo('/culture-traditions')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.culture}
                  </button>
                  <button onClick={() => navigateTo('/literature')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.literature}
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown 4: Community & Portal */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('comm')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/directory', '/community-activities', '/events', '/submit-research', '/about', '/contact'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>{t.nav.directory}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'comm' && (
                <div className="absolute top-full right-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#e8c872] font-semibold">
                    <Shield className="w-4 h-4 text-[#d4af37]" /> Oad-Rajput & Kshatriya Heritage
                  </button>
                  <button onClick={() => navigateTo('/directory')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.directory}
                  </button>
                  <button onClick={() => navigateTo('/community-activities')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.activities}
                  </button>
                  <button onClick={() => navigateTo('/events')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.events}
                  </button>
                  <button onClick={() => navigateTo('/submit-research')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.submitResearch}
                  </button>
                  <div className="border-t border-stone-800 my-1"></div>
                  <button onClick={() => navigateTo('/about')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.about}
                  </button>
                  <button onClick={() => navigateTo('/contact')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.contact}
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Header Action Items: Search, Language, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-[#e8c872] border border-stone-700/60 transition-colors cursor-pointer"
              title="Search Archives & Records"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Export & Download Project ZIP Hub */}
            <button
              onClick={() => setExportModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-[#580014]/60 hover:bg-[#580014] text-[#fcedc7] hover:text-[#e8c872] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all flex items-center gap-1.5 cursor-pointer text-xs"
              title="Export Full Project ZIP (Frontend, Backend, Database, Setup)"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline font-semibold">Export ZIP</span>
            </button>

            {/* Member Auth Status or Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                {isAdminOrEditor && (
                  <button
                    onClick={() => navigateTo('/admin')}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#580014] text-[#fcedc7] border border-[#d4af37]/60 hover:bg-[#780016] transition-all"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.nav.admin}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#181e2b] hover:bg-[#20293a] text-stone-200 border border-[#c99738]/40 hover:border-[#c99738] transition-all cursor-pointer"
                  title="Member Dashboard"
                >
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline font-semibold">{user.profile?.full_name?.split(' ')[0] || 'Dashboard'}</span>
                </button>

                <button
                  onClick={async () => {
                    await logout();
                    navigateTo('/');
                  }}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
                  title={t.nav.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('/login')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-300 hover:text-[#e8c872] transition-colors"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => navigateTo('/register')}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-md transition-all"
                >
                  {t.nav.register}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e121c] border-b border-[#c99738]/40 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto divide-y divide-stone-800 animate-in slide-in-from-top-2 duration-200">
          <div className="py-2 space-y-1">
            <button onClick={() => navigateTo('/')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.home}
            </button>
            <button onClick={() => navigateTo('/documentary')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.documentary}
            </button>
            <button onClick={() => navigateTo('/odra-desha')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.odraDesha}
            </button>
            <button onClick={() => navigateTo('/gajapathi-kings')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.gajapathiKings}
            </button>
            <button onClick={() => navigateTo('/dynasties')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.dynasties}
            </button>
            <button onClick={() => navigateTo('/maps')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.maps}
            </button>
            <button onClick={() => navigateTo('/timeline')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.timeline}
            </button>
          </div>

          <div className="py-2 space-y-1">
            <button onClick={() => navigateTo('/inscriptions')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.inscriptions}
            </button>
            <button onClick={() => navigateTo('/temples-monuments')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.temples}
            </button>
            <button onClick={() => navigateTo('/documents')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              Historical Documents & Grants
            </button>
            <button onClick={() => navigateTo('/genealogy')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.genealogy}
            </button>
            <button onClick={() => navigateTo('/gallery')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.gallery}
            </button>
            <button onClick={() => navigateTo('/research')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.research}
            </button>
          </div>

          <div className="py-2 space-y-1">
            <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-[#e8c872] font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" /> Oad-Rajput & Kshatriya Heritage
            </button>
            <button onClick={() => navigateTo('/directory')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.directory}
            </button>
            <button onClick={() => navigateTo('/community-activities')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.activities}
            </button>
            <button onClick={() => navigateTo('/events')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.events}
            </button>
            <button onClick={() => navigateTo('/submit-research')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.submitResearch}
            </button>
            <button onClick={() => navigateTo('/about')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.about}
            </button>
            <button onClick={() => navigateTo('/contact')} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.contact}
            </button>
          </div>

          {user && (
            <div className="py-3">
              <button
                onClick={() => navigateTo('/dashboard')}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg bg-[#182030] text-[#e8c872] flex items-center justify-between"
              >
                <span>Member Dashboard ({user.profile?.full_name || user.email})</span>
                <User className="w-4 h-4" />
              </button>
              {isAdminOrEditor && (
                <button
                  onClick={() => navigateTo('/admin')}
                  className="w-full mt-2 text-left px-3 py-2.5 text-sm font-semibold rounded-lg bg-[#580014] text-[#fcedc7] flex items-center justify-between"
                >
                  <span>Admin Panel</span>
                  <Shield className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setExportModalOpen(true);
                }}
                className="w-full mt-2 text-left px-3 py-2.5 text-sm font-semibold rounded-lg bg-[#2a0810] text-[#fcedc7] border border-[#d4af37]/40 flex items-center justify-between"
              >
                <span>Export & Download ZIP Package</span>
                <Download className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Export Project Modal */}
      <ExportProjectModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </header>
  );
};
