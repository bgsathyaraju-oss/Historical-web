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
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { ExportProjectModal } from './ExportProjectModal';
import { LanguageSelector } from './LanguageSelector';
import { WhatsAppIcon } from './PublisherCreditCard';
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
      {/* Top Banner Notice: Publisher Attribution & Direct WhatsApp (Translated in 8 Languages) */}
      <div className="bg-gradient-to-r from-[#3d020e] via-[#1a0510] to-[#3d020e] text-[#fcedc7] text-[11px] py-1.5 px-3 sm:px-6 border-b border-[#c99738]/25 flex flex-wrap items-center justify-between gap-2 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-[#d4af37] shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`}
              alt={t.publisher?.publisherName || 'Dr G.Sathyanarayana Raju'}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-stone-300 hidden md:inline">{t.publisher?.designedAndPublishedBy || 'WebSite Design & Published by'}:</span>
          <span className="font-bold text-[#fae29c]">{t.publisher?.publisherName || 'Dr G.Sathyanarayana Raju'}</span>
          <span className="hidden lg:inline text-stone-300">• {t.publisher?.leaderTitle || 'Leader of Suryavamsha Odiyaraju Kshatriya Community'}</span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <a
            href={`https://wa.me/919480112897?text=${encodeURIComponent(t.publisher?.whatsappGreeting || 'Namaste Dr G. Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Heritage Portal')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] font-bold text-[10px] sm:text-[11px] transition-all shadow-sm"
            title={`${t.publisher?.contactWhatsApp || 'WhatsApp'}: +91 9480112897`}
          >
            <WhatsAppIcon className="w-3 h-3 fill-current" />
            <span>{t.publisher?.contactWhatsApp || 'WhatsApp: +91 9480112897'}</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 text-stone-400 text-[11px]">
            <span>•</span>
            <button onClick={() => navigateTo('/about')} className="hover:text-white transition-colors cursor-pointer">
              {t.nav?.about || 'About'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile Hamburger Toggle + Brand Emblem */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#181d28] hover:bg-[#222938] text-stone-200 hover:text-[#d4af37] border border-[#c99738]/40 hover:border-[#c99738] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c99738]"
              aria-label="Toggle navigation menu"
              title={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-[#d4af37]" />}
            </button>

            {/* Brand Logo & Sun Emblem */}
            <div
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            >
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
                  Historical Documentary & Royal Heritage Portal
                </div>
              </div>
            </div>
          </div>

          {/* Clean, Non-Duplicated Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-stone-200">
            {/* 1. Home */}
            <button
              onClick={() => navigateTo('/')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.home}
            </button>

            {/* 2. Kingdom History & Dynasties */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('kingdom')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/documentary', '/odra-desha', '/kalinga-war', '/gajapathi-kings', '/dynasties', '/timeline', '/maps', '/genealogy'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>Kingdom History</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'kingdom' && (
                <div className="absolute top-full left-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/documentary')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.documentary} Archive
                  </button>
                  <button onClick={() => navigateTo('/odra-desha')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" /> {t.nav.odraDesha}
                  </button>
                  <button onClick={() => navigateTo('/kalinga-war')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.kalingaWar || 'The Kalinga War (261 BCE)'}
                  </button>
                  <button onClick={() => navigateTo('/gajapathi-kings')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#d4af37]" /> {t.nav.gajapathiKings}
                  </button>
                  <button onClick={() => navigateTo('/dynasties')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> Kingdoms & Dynasties
                  </button>
                  <button onClick={() => navigateTo('/genealogy')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.genealogy}
                  </button>
                  <button onClick={() => navigateTo('/timeline')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.timeline}
                  </button>
                  <button onClick={() => navigateTo('/maps')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" /> {t.nav.maps || 'Kingdoms & Maps'}
                  </button>
                  <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityHeritage || 'Community Heritage'}
                  </button>
                </div>
              )}
            </div>

            {/* 3. Kings and Queens */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('figures')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/kings-queens', '/historical-persons', '/community-prominent-persons'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>Kings & Queens</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === 'figures' && (
                <div className="absolute top-full left-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button onClick={() => navigateTo('/community-prominent-persons')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold border-b border-stone-800/80">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityProminentPersons || 'Community Prominent Persons'}
                  </button>
                  <button onClick={() => navigateTo('/kings-queens')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-medium">
                    <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.documentedFigures || 'Documented Historical Figures'}
                  </button>
                  <button onClick={() => navigateTo('/historical-persons')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-medium">
                    <User className="w-4 h-4 text-[#d4af37]" /> {t.nav.historicalPersons || 'Historical Persons'}
                  </button>
                </div>
              )}
            </div>

            {/* 4. Archaeology & Publications */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('arch')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  ['/inscriptions', '/temples-monuments', '/documents', '/research', '/literature', '/references'].includes(currentPath)
                    ? 'text-[#e8c872] bg-[#221016]'
                    : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                }`}
              >
                <span>Archaeology & Research</span>
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
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> Digitized Grants & Documents
                  </button>
                  <button onClick={() => navigateTo('/literature')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> Books & Publications
                  </button>
                  <button onClick={() => navigateTo('/research')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4af37]" /> {t.nav.research}
                  </button>
                  <button onClick={() => navigateTo('/references')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> Historical References
                  </button>
                </div>
              )}
            </div>

            {/* 5. Culture & Heritage */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('comm')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      ['/culture-traditions', '/community-heritage', '/community-surnames', '/surnames', '/gallery', '/directory', '/community-activities', '/events', '/submit-research'].includes(currentPath)
                        ? 'text-[#e8c872] bg-[#221016]'
                        : 'hover:text-[#e8c872] hover:bg-stone-900/60'
                    }`}
                  >
                    <span>Culture & Heritage</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {activeDropdown === 'comm' && (
                    <div className="absolute top-full right-0 w-64 bg-[#121622] border border-[#c99738]/50 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold border-b border-stone-800/80">
                        <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityHeritage || 'Community Heritage'}
                      </button>
                      <button onClick={() => navigateTo('/community-surnames')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold">
                        <Shield className="w-4 h-4 text-[#d4af37]" /> {t.nav.communitySurnames || 'Community-Surnames'}
                      </button>
                      <button onClick={() => navigateTo('/community-prominent-persons')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#fae29c] font-semibold">
                        <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityProminentPersons || 'Community Prominent Persons'}
                      </button>
                  <button onClick={() => navigateTo('/culture-traditions')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" /> {t.nav.culture || 'Culture & Traditions'}
                  </button>
                  <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2 text-[#e8c872] font-semibold">
                    <Shield className="w-4 h-4 text-[#d4af37]" /> Oad-Rajput & Kshatriya Heritage
                  </button>
                  <button onClick={() => navigateTo('/gallery')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#d4af37]" /> {t.nav.gallery || 'Photo Gallery & Artifacts'}
                  </button>
                  <button onClick={() => navigateTo('/directory')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.directory || 'Community Directory'}
                  </button>
                  <button onClick={() => navigateTo('/community-activities')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.activities || 'Community Activities'}
                  </button>
                  <button onClick={() => navigateTo('/events')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" /> {t.nav.events || 'Events & Notices'}
                  </button>
                  <button onClick={() => navigateTo('/submit-research')} className="w-full text-left px-4 py-2 text-xs hover:bg-[#201520] hover:text-[#e8c872] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.submitResearch || 'Submit Research'}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Link: The Kalinga War */}
            <button
              onClick={() => navigateTo('/kalinga-war')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/kalinga-war' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.kalingaWar || 'The Kalinga War'}
            </button>

            {/* Direct Link: Community Heritage */}
            <button
              onClick={() => navigateTo('/community-heritage')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/community-heritage' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.communityHeritage || 'Community Heritage'}
            </button>

            {/* Direct Link: About */}
            <button
              onClick={() => navigateTo('/about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/about' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.about}
            </button>

            {/* Direct Link: Contact */}
            <button
              onClick={() => navigateTo('/contact')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPath === '/contact' ? 'text-[#e8c872] bg-[#221016]' : 'hover:text-[#e8c872] hover:bg-stone-900/60'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Right Tools: Global Search Modal, Auth, Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (⌘K) */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#181d28] hover:bg-[#222938] text-stone-300 hover:text-[#d4af37] border border-stone-800 hover:border-[#c99738]/50 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Search Portal (⌘K)"
            >
              <Search className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden xl:inline text-xs text-stone-400">Search</span>
              <kbd className="hidden xl:inline text-[10px] bg-stone-900 text-stone-400 px-1.5 py-0.5 rounded border border-stone-700">⌘K</kbd>
            </button>

            {/* Authentication Buttons (Preserved) */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#580014] hover:bg-[#78001b] border border-[#d4af37]/40 text-[#fae29c] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="Member Dashboard"
                >
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline truncate max-w-[100px]">
                    {user.profile?.full_name || 'Dashboard'}
                  </span>
                </button>

                {isAdminOrEditor && (
                  <button
                    onClick={() => navigateTo('/admin')}
                    className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-[#d4af37]/40 text-[#fae29c] text-xs font-semibold flex items-center transition-all cursor-pointer"
                    title="Admin Panel"
                  >
                    <Shield className="w-4 h-4 text-[#d4af37]" />
                  </button>
                )}

                <button
                  onClick={() => logout()}
                  className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => navigateTo('/login')}
                  className="px-2.5 py-1 text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-900/60 rounded-lg transition-colors cursor-pointer"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => navigateTo('/register')}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-md transition-all cursor-pointer"
                >
                  {t.nav.register}
                </button>
              </div>
            )}

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-[#c99738]/30"></div>

            {/* Centralized 8-Language Selector */}
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Clean, Non-Duplicated Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e121c] border-b border-[#c99738]/40 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto divide-y divide-stone-800 animate-in slide-in-from-top-2 duration-200 space-y-4">
          {/* Group 1: Kingdom History */}
          <div className="pt-2 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] px-2 block mb-1">
              Kingdom History & Dynasties
            </span>
            <button onClick={() => navigateTo('/')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.home}
            </button>
            <button onClick={() => navigateTo('/documentary')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.documentary || 'Historical Documentary Archive'}
            </button>
            <button onClick={() => navigateTo('/odra-desha')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.odraDesha}
            </button>
            <button onClick={() => navigateTo('/kalinga-war')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#d4af37]" /> {t.nav.kalingaWar || 'The Kalinga War (261 BCE)'}
            </button>
            <button onClick={() => navigateTo('/gajapathi-kings')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.gajapathiKings}
            </button>
            <button onClick={() => navigateTo('/dynasties')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.dynasties || 'Kingdoms & Dynasties'}
            </button>
            <button onClick={() => navigateTo('/genealogy')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.genealogy || 'Royal Genealogy Tree'}
            </button>
            <button onClick={() => navigateTo('/timeline')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.timeline || 'Historical Timeline'}
            </button>
            <button onClick={() => navigateTo('/maps')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.maps || 'Kingdoms & Maps'}
            </button>
            <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityHeritage || 'Community Heritage'}
            </button>
          </div>

          {/* Group 2: Kings and Queens */}
          <div className="pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] px-2 block mb-1">
              Monarchs & Historical Figures
            </span>
            <button onClick={() => navigateTo('/community-prominent-persons')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityProminentPersons || 'Community Prominent Persons'}
            </button>
            <button onClick={() => navigateTo('/kings-queens')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.documentedFigures || 'Documented Historical Figures'}
            </button>
            <button onClick={() => navigateTo('/historical-persons')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-[#d4af37]" /> {t.nav.historicalPersons || 'Historical Persons'}
            </button>
          </div>

          {/* Group 3: Archaeology & Research */}
          <div className="pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] px-2 block mb-1">
              Archaeology & Research
            </span>
            <button onClick={() => navigateTo('/inscriptions')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.inscriptions || 'Inscriptions & Epigraphy'}
            </button>
            <button onClick={() => navigateTo('/temples-monuments')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.temples || 'Temples & Monuments'}
            </button>
            <button onClick={() => navigateTo('/documents')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              Digitized Grants & Documents
            </button>
            <button onClick={() => navigateTo('/literature')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.literature || 'Books & Publications'}
            </button>
            <button onClick={() => navigateTo('/research')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.research || 'Research Articles & Studies'}
            </button>
            <button onClick={() => navigateTo('/references')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.references || 'Historical References'}
            </button>
          </div>

          {/* Group 4: Culture & Community */}
          <div className="pt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] px-2 block mb-1">
              Culture & Community
            </span>
            <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#d4af37]" /> {t.nav.communityHeritage || 'Community Heritage'}
            </button>
            <button onClick={() => navigateTo('/community-surnames')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#fae29c] font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" /> {t.nav.communitySurnames || 'Community-Surnames'}
            </button>
            <button onClick={() => navigateTo('/culture-traditions')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.culture || 'Culture & Traditions'}
            </button>
            <button onClick={() => navigateTo('/community-heritage')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-[#e8c872] font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" /> Oad-Rajput & Kshatriya Heritage
            </button>
            <button onClick={() => navigateTo('/gallery')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.gallery || 'Photo Gallery & Artifacts'}
            </button>
            <button onClick={() => navigateTo('/directory')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.directory || 'Community Directory'}
            </button>
            <button onClick={() => navigateTo('/community-activities')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.activities || 'Community Activities'}
            </button>
            <button onClick={() => navigateTo('/events')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.events || 'Events & Notices'}
            </button>
            <button onClick={() => navigateTo('/submit-research')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              {t.nav.submitResearch || 'Submit Research'}
            </button>
          </div>

          {/* Group 5: Institutional Info & Export */}
          <div className="pt-3 space-y-1">
            <button onClick={() => navigateTo('/about')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              About Project & Epistemic Protocol
            </button>
            <button onClick={() => navigateTo('/contact')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-stone-800 text-stone-200">
              Contact Us
            </button>
          </div>

          {/* User Account / Auth Section */}
          {user ? (
            <div className="pt-3 space-y-2">
              <button
                onClick={() => navigateTo('/dashboard')}
                className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg bg-[#182030] text-[#e8c872] flex items-center justify-between"
              >
                <span>Member Dashboard ({user.profile?.full_name || user.email})</span>
                <User className="w-4 h-4" />
              </button>
              {isAdminOrEditor && (
                <button
                  onClick={() => navigateTo('/admin')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg bg-[#580014] text-[#fcedc7] flex items-center justify-between"
                >
                  <span>Admin Panel</span>
                  <Shield className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="pt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigateTo('/login')}
                  className="w-full text-center py-2 text-xs font-medium text-stone-200 bg-[#181d28] border border-stone-700/70 rounded-lg"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => navigateTo('/register')}
                  className="w-full text-center py-2 text-xs font-semibold text-[#290106] bg-gradient-to-r from-[#997022] to-[#c99738] rounded-lg shadow"
                >
                  {t.nav.register}
                </button>
              </div>
            </div>
          )}

          {/* Export Project ZIP Modal Trigger */}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setExportModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg bg-[#2a0810] text-[#fcedc7] border border-[#d4af37]/40 flex items-center justify-between cursor-pointer"
            >
              <span>Export & Download Full Project ZIP</span>
              <Download className="w-4 h-4 text-[#d4af37]" />
            </button>
          </div>
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
