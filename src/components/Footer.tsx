import React from 'react';
import { ShieldCheck, BookOpen, Scroll, Compass, Mail, Heart, ExternalLink, Crown, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WhatsAppIcon } from './PublisherCreditCard';
import { handleWhatsAppLinkClick } from '../utils/androidBridge';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const whatsappGreeting = t.publisher?.whatsappGreeting || 'Namaste Dr.G Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
  const whatsappUrl = `https://wa.me/919480112897?text=${encodeURIComponent(whatsappGreeting)}`;

  return (
    <footer className="w-full bg-[#FFF9EF] border-t-2 border-[#A87924] text-[#292521]">
      {/* Research, Documentation & Compilation by Dr.G Sathyanarayana Raju */}
      <div className="bg-[#F5EBD9] border-b border-[#A87924]/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#A87924] shadow-md ring-2 ring-[#762D35]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`}
                  alt={t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#762D35] text-white p-1 rounded-full border border-[#A87924]">
                <Crown className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#76501F]">
                {t.publisher?.designedAndPublishedBy || 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju'}
              </div>
              <h3 className="font-royal-heading font-black text-xl text-[#54351F]">
                {t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#292521]">
                {t.publisher?.leaderTitle || 'Founder & Historical Documentation Contributor'}
              </p>
              <p className="text-xs text-[#76501F] font-medium">
                {t.publisher?.organization || 'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#762D35] hover:bg-[#5e2229] text-white shadow-sm transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>{t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}</span>
            </a>

            <a
              href="tel:+919480112897"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#FFFCF5] hover:bg-[#FFF9EF] text-[#54351F] border border-[#A87924] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#762D35]" />
              <span>+91 9480112897</span>
            </a>
          </div>
        </div>
      </div>

      {/* Methodological Integrity Banner */}
      <div className="bg-[#FFFCF5] border-b border-[#A87924]/40 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 text-xs sm:text-sm text-[#292521]">
          <div className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#A87924] shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#762D35]" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="font-bold text-[#54351F] uppercase tracking-wider text-xs">
              {t.evidenceNotice.title}
            </span>
            <p className="text-[#292521] text-xs leading-relaxed">
              {t.evidenceNotice.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#762D35] border border-[#A87924] p-1 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFFCF5]">
                  <circle cx="50" cy="50" r="24" fill="#A87924" />
                  <path d="M50 8 L54 30 L50 25 L46 30 Z M50 92 L54 70 L50 75 L46 70 Z M8 50 L30 54 L25 50 L30 46 Z M92 50 L70 54 L75 50 L70 46 Z" fill="#FFFCF5" />
                </svg>
              </div>
              <div>
                <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
                  SURYAVAMSHA ODIYARAJU KSHATRIYA
                </h3>
                <p className="text-[11px] text-[#76501F] font-semibold tracking-wider">
                  HISTORICAL DOCUMENTARY & COMMUNITY ARCHIVE
                </p>
              </div>
            </div>
            <p className="text-xs text-[#292521] leading-relaxed pr-4">
              Dedicated to empirical epigraphic research, historical geography of Odra Desha, Gajapathi dynasty inscriptions, royal genealogies, and preserving living cultural traditions across eight supported languages.
            </p>
            <div className="pt-2 text-xs text-[#292521]">
              <span className="font-bold text-[#54351F]">Supported Languages:</span> English, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ், मराठी, ଓଡ଼ିଆ, বাংলা.
            </div>
          </div>

          {/* Historical Documentary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider font-royal-heading">
              Historical Documentary
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/documentary')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.documentary}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/odra-desha')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.odraDesha}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/kalinga-war')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer">
                  {t.nav.kalingaWar || 'The Kalinga War (261 BCE)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gajapathi-kings')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.gajapathiKings}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dynasties')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.dynasties}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/maps')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.maps}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/timeline')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.timeline}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community-prominent-persons')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer">
                  {t.nav.communityProminentPersons || 'Community Prominent Persons'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community-heritage')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer">
                  {t.nav.communityHeritage || 'Community Heritage'}
                </button>
              </li>
            </ul>
          </div>

          {/* Epigraphy & Archaeology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider font-royal-heading">
              Epigraphy & Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/inscriptions')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.inscriptions}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/temples-monuments')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.temples}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/documents')} className="hover:text-[#e8c872] transition-colors">
                  Digitized Documents & Grants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/genealogy')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.genealogy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gallery')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/references')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.references}
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider font-royal-heading">
              Community & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/community-heritage')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer">
                  {t.nav.communityHeritage || 'Community Heritage'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community-surnames')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer text-left">
                  {t.nav.communitySurnames || 'Community Surnames [South-Indian-Oad-Community]'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community-surnames-north-indian-oad-community')} className="hover:text-[#e8c872] text-[#fae29c] font-semibold transition-colors cursor-pointer text-left">
                  {t.nav.communitySurnamesNorth || 'Community Surnames [North-Indian-Oad-Community]'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/directory')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.directory}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/events')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.events}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/submit-research')} className="hover:text-[#e8c872] transition-colors">
                  {t.nav.submitResearch}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-[#e8c872] transition-colors">
                  Privacy Policy & Data Rights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-[#e8c872] transition-colors">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/copyright')} className="hover:text-[#e8c872] transition-colors">
                  Copyright & Image Permissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/accessibility')} className="hover:text-[#e8c872] transition-colors">
                  Accessibility Statement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/design-system')} className="hover:text-[#e8c872] text-[#c99738] font-medium transition-colors">
                  Royal UI Component System
                </button>
              </li>
              <li>
                <a
                  href="/api/export/project-zip"
                  download="suryavamsha-odiyaraju-kshatriya-portal.zip"
                  className="hover:text-[#e8c872] text-[#fcedc7] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Export Project (ZIP)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#580014] border border-[#d4af37]/40 text-[#fcedc7]">Full</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Suryavamsha Odiyaraju Kshatriya Historical Documentation Project. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <button onClick={() => onNavigate('/about')} className="hover:underline">About</button>
            <span>•</span>
            <button onClick={() => onNavigate('/design-system')} className="hover:underline text-[#c99738]">Design System</button>
            <span>•</span>
            <button onClick={() => onNavigate('/contact')} className="hover:underline">Contact</button>
            <span>•</span>
            <button onClick={() => onNavigate('/privacy')} className="hover:underline">Privacy</button>
            <span>•</span>
            <button onClick={() => onNavigate('/accessibility')} className="hover:underline">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
