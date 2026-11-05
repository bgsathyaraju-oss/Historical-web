import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingPageDock } from './components/FloatingPageDock';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PrintRepeatingAuthorFooter } from './components/PrintRepeatingAuthorFooter';
import { SeoHeadManager } from './components/SeoHeadManager';
import { resolveItemMetadataById } from './utils/seoMetadata';
import {
  resolveCanonicalArticleId,
  DUP_SYNONYM_TO_CANONICAL_DIR_MAP,
  MONO_SECTION_TO_CANONICAL_ARTICLE_MAP,
  HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP
} from './data/canonicalArticleMap';

// Eagerly loaded primary landing page for instant rendering
import { HomePage } from './pages/HomePage';

// Lazy-loaded global search modal and secondary route pages for optimal bundle splitting
const GlobalSearchModal = lazy(() =>
  import('./components/GlobalSearchModal').then(m => ({ default: m.GlobalSearchModal }))
);
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const HistoricalDocumentaryPage = lazy(() =>
  import('./pages/HistoricalDocumentaryPage').then(m => ({ default: m.HistoricalDocumentaryPage }))
);
const OdraDeshaPage = lazy(() =>
  import('./pages/OdraDeshaPage').then(m => ({ default: m.OdraDeshaPage }))
);
const GajapathiKingdomPage = lazy(() =>
  import('./pages/GajapathiKingdomPage').then(m => ({ default: m.GajapathiKingdomPage }))
);
const KingsQueensPage = lazy(() =>
  import('./pages/KingsQueensPage').then(m => ({ default: m.KingsQueensPage }))
);
const RoyalGenealogyPage = lazy(() =>
  import('./pages/RoyalGenealogyPage').then(m => ({ default: m.RoyalGenealogyPage }))
);
const HistoricalMapsPage = lazy(() =>
  import('./pages/HistoricalMapsPage').then(m => ({ default: m.HistoricalMapsPage }))
);
const HistoricalTimelinePage = lazy(() =>
  import('./pages/HistoricalTimelinePage').then(m => ({ default: m.HistoricalTimelinePage }))
);
const InscriptionsPage = lazy(() =>
  import('./pages/InscriptionsPage').then(m => ({ default: m.InscriptionsPage }))
);
const TemplesMonumentsPage = lazy(() =>
  import('./pages/TemplesMonumentsPage').then(m => ({ default: m.TemplesMonumentsPage }))
);
const HistoricalDocumentsPage = lazy(() =>
  import('./pages/HistoricalDocumentsPage').then(m => ({ default: m.HistoricalDocumentsPage }))
);
const ResearchArticlesPage = lazy(() =>
  import('./pages/ResearchArticlesPage').then(m => ({ default: m.ResearchArticlesPage }))
);
const HistoricalGalleryPage = lazy(() =>
  import('./pages/HistoricalGalleryPage').then(m => ({ default: m.HistoricalGalleryPage }))
);
const CultureTraditionsPage = lazy(() =>
  import('./pages/CultureTraditionsPage').then(m => ({ default: m.CultureTraditionsPage }))
);
const LiteraturePublicationsPage = lazy(() =>
  import('./pages/LiteraturePublicationsPage').then(m => ({ default: m.LiteraturePublicationsPage }))
);
const HistoricalReferencesPage = lazy(() =>
  import('./pages/HistoricalReferencesPage').then(m => ({ default: m.HistoricalReferencesPage }))
);
const CommunityHeritagePage = lazy(() =>
  import('./pages/CommunityHeritagePage').then(m => ({ default: m.CommunityHeritagePage }))
);
const CommunityActivitiesPage = lazy(() =>
  import('./pages/CommunityActivitiesPage').then(m => ({ default: m.CommunityActivitiesPage }))
);
const EventsAnnouncementsPage = lazy(() =>
  import('./pages/EventsAnnouncementsPage').then(m => ({ default: m.EventsAnnouncementsPage }))
);
const PublicMemberDirectoryPage = lazy(() =>
  import('./pages/PublicMemberDirectoryPage').then(m => ({ default: m.PublicMemberDirectoryPage }))
);
const MemberRegistrationPage = lazy(() =>
  import('./pages/MemberRegistrationPage').then(m => ({ default: m.MemberRegistrationPage }))
);
const MemberLoginPage = lazy(() =>
  import('./pages/MemberLoginPage').then(m => ({ default: m.MemberLoginPage }))
);
const PasswordRecoveryPage = lazy(() =>
  import('./pages/PasswordRecoveryPage').then(m => ({ default: m.PasswordRecoveryPage }))
);
const MemberDashboardPage = lazy(() =>
  import('./pages/MemberDashboardPage').then(m => ({ default: m.MemberDashboardPage }))
);
const EditProfilePage = lazy(() =>
  import('./pages/EditProfilePage').then(m => ({ default: m.EditProfilePage }))
);
const SubmitResearchPage = lazy(() =>
  import('./pages/SubmitResearchPage').then(m => ({ default: m.SubmitResearchPage }))
);
const ContactUsPage = lazy(() =>
  import('./pages/ContactUsPage').then(m => ({ default: m.ContactUsPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage }))
);
const TermsConditionsPage = lazy(() =>
  import('./pages/TermsConditionsPage').then(m => ({ default: m.TermsConditionsPage }))
);
const CopyrightPermissionsPage = lazy(() =>
  import('./pages/CopyrightPermissionsPage').then(m => ({ default: m.CopyrightPermissionsPage }))
);
const AccessibilityStatementPage = lazy(() =>
  import('./pages/AccessibilityStatementPage').then(m => ({ default: m.AccessibilityStatementPage }))
);
const AdminDashboardPage = lazy(() =>
  import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage }))
);
const UiDesignSystemPage = lazy(() =>
  import('./pages/UiDesignSystemPage').then(m => ({ default: m.UiDesignSystemPage }))
);
const CommunityProminentPersonsPage = lazy(() =>
  import('./pages/CommunityProminentPersonsPage').then(m => ({
    default: m.CommunityProminentPersonsPage
  }))
);
const KalingaWarPage = lazy(() =>
  import('./pages/KalingaWarPage').then(m => ({ default: m.KalingaWarPage }))
);
const CommunitySurnamesPage = lazy(() =>
  import('./pages/CommunitySurnamesPage').then(m => ({ default: m.CommunitySurnamesPage }))
);
const NorthIndianCommunitySurnamesPage = lazy(() =>
  import('./pages/NorthIndianCommunitySurnamesPage').then(m => ({
    default: m.NorthIndianCommunitySurnamesPage
  }))
);

function safeScrollToTop(): void {
  if (typeof window === 'undefined') return;
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch {
    try {
      window.scrollTo(0, 0);
    } catch {
      // Ignore in restricted WebViews
    }
  }
}

function getNormalizedAppPath(rawPath: string): string {
  const basePath = import.meta.env.BASE_URL || '/';
  let path = rawPath || '/';
  if (basePath !== '/' && path.startsWith(basePath)) {
    path = '/' + path.slice(basePath.length);
  }
  // Strip query and hash
  path = path.split('?')[0].split('#')[0];
  // Ensure leading slash
  if (!path.startsWith('/')) path = '/' + path;
  // Remove trailing slash if longer than 1 character
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path || '/';
}

function resolveRouteAndItemFromUrl(rawPath: string, rawSearch: string): {
  routePath: string;
  itemParam: string | null;
} {
  const normalized = getNormalizedAppPath(rawPath);
  let queryItem: string | null = null;
  try {
    const params = new URLSearchParams(rawSearch);
    queryItem =
      params.get('article') ||
      params.get('figure') ||
      params.get('person') ||
      params.get('id');
  } catch {
    queryItem = null;
  }

  // Support /share/<itemId>
  const shareMatch = normalized.match(/^\/share\/([^/]+)$/i);
  if (shareMatch) {
    const decodedId = decodeURIComponent(shareMatch[1]);
    const itemMeta = resolveItemMetadataById(decodedId, 'en');
    if (itemMeta) {
      return { routePath: itemMeta.canonicalRoute, itemParam: itemMeta.itemId };
    }
  }

  // Support /<route>/<itemId> (e.g. /kings-queens/fig_kapilendra_deva)
  const twoSegMatch = normalized.match(/^(\/[a-z0-9-]+)\/([^/]+)$/i);
  if (twoSegMatch) {
    const baseRoute = twoSegMatch[1];
    const decodedId = decodeURIComponent(twoSegMatch[2]);
    const itemMeta = resolveItemMetadataById(decodedId, 'en');
    if (itemMeta) {
      return { routePath: baseRoute, itemParam: itemMeta.itemId };
    }
  }

  if (queryItem) {
    // 1. Short monograph section ID -> Canonical full documentary article
    if (MONO_SECTION_TO_CANONICAL_ARTICLE_MAP[queryItem]) {
      return {
        routePath: '/documentary',
        itemParam: MONO_SECTION_TO_CANONICAL_ARTICLE_MAP[queryItem]
      };
    }

    // 2. Short historical progenitor card -> Canonical 10-section biography page in /kings-queens
    if (
      (normalized === '/historical-persons' || rawSearch.includes('tab=figures')) &&
      HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP[queryItem]
    ) {
      return {
        routePath: '/kings-queens',
        itemParam: HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP[queryItem]
      };
    }

    // 3. Consolidated short community synonym -> Canonical 11-section directory article
    if (DUP_SYNONYM_TO_CANONICAL_DIR_MAP[queryItem]) {
      queryItem = DUP_SYNONYM_TO_CANONICAL_DIR_MAP[queryItem];
    }

    // 4. Legacy article ID alias -> Canonical full article ID
    if (
      normalized === '/documentary' ||
      normalized === '/research' ||
      normalized === '/articles'
    ) {
      queryItem = resolveCanonicalArticleId(queryItem);
    }
  }

  return { routePath: normalized, itemParam: queryItem };
}

function consumeSpaRedirect(): void {
  if (typeof window === 'undefined') return;
  try {
    const storage = window.sessionStorage;
    if (!storage) return;
    const raw = storage.getItem('spa-redirect');
    if (!raw) return;
    storage.removeItem('spa-redirect');
    const parsed = JSON.parse(raw) as { path?: string; query?: string; hash?: string };
    const normalizedPath = getNormalizedAppPath(parsed.path || '/');
    const query = parsed.query || '';
    const hash = parsed.hash || '';
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    const fullUrl = `${basePath}${cleanPath}${query}${hash}`;
    window.history.replaceState({ path: fullUrl }, '', fullUrl);
  } catch {
    // Ignore malformed sessionStorage payload or disabled storage in Android WebView
  }
}

function AppContent() {
  const { language } = useLanguage();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    consumeSpaRedirect();
    return resolveRouteAndItemFromUrl(window.location.pathname, window.location.search).routePath;
  });
  const [searchParam, setSearchParam] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return resolveRouteAndItemFromUrl(window.location.pathname, window.location.search).itemParam;
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__PORTAL_MOUNTED__ = true;
    }

    const handlePopState = () => {
      try {
        const resolved = resolveRouteAndItemFromUrl(window.location.pathname, window.location.search);
        setCurrentPath(resolved.routePath);
        setSearchParam(resolved.itemParam);
      } catch {
        setCurrentPath('/');
        setSearchParam(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut ⌘K or Ctrl+K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (pathWithQuery: string) => {
    const [rawPath, query] = pathWithQuery.split('?');
    const resolved = resolveRouteAndItemFromUrl(rawPath, query ? `?${query}` : '');
    const path = resolved.routePath;
    const basePath = import.meta.env.BASE_URL || '/';
    setCurrentPath(path);
    setSearchParam(resolved.itemParam);
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullPath = `${basePath.replace(/\/$/, '')}${cleanPath}${query ? `?${query}` : ''}`;
    try {
      window.history.pushState({ path: fullPath }, '', fullPath);
    } catch {
      // Ignore history API restrictions in embedded WebViews
    }
    safeScrollToTop();
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigateTo} onOpenSearch={() => setSearchModalOpen(true)} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/documentary':
        return <HistoricalDocumentaryPage initialArticleId={searchParam} onNavigate={navigateTo} />;
      case '/odra-desha':
        return <OdraDeshaPage onNavigate={navigateTo} />;
      case '/kalinga-war':
      case '/ashoka-kalinga-war':
        return <KalingaWarPage onNavigate={navigateTo} />;
      case '/gajapathi-kings':
      case '/dynasties':
        return <GajapathiKingdomPage onNavigate={navigateTo} initialItemId={searchParam} />;
      case '/kings-queens':
      case '/documented-historical-figures':
      case '/historical-figures':
        return <KingsQueensPage onNavigate={navigateTo} initialFigureId={searchParam} />;
      case '/community-prominent-persons':
      case '/prominent-persons':
      case '/community-figures':
      case '/prominent-figures':
        return <CommunityProminentPersonsPage onNavigate={navigateTo} initialPersonId={searchParam} />;
      case '/historical-persons':
        return <CommunityHeritagePage onNavigate={navigateTo} initialTab="figures" initialItemId={searchParam} />;
      case '/genealogy':
        return <RoyalGenealogyPage onNavigate={navigateTo} />;
      case '/maps':
        return <HistoricalMapsPage onNavigate={navigateTo} />;
      case '/timeline':
        return <HistoricalTimelinePage onNavigate={navigateTo} initialEventId={searchParam} />;
      case '/inscriptions':
      case '/historical-records':
        return <InscriptionsPage onNavigate={navigateTo} initialInscriptionId={searchParam} />;
      case '/temples-monuments':
        return <TemplesMonumentsPage onNavigate={navigateTo} />;
      case '/documents':
        return <HistoricalDocumentsPage onNavigate={navigateTo} initialDocumentId={searchParam} />;
      case '/research':
      case '/articles':
        return <ResearchArticlesPage onNavigate={navigateTo} initialArticleId={searchParam} />;
      case '/gallery':
      case '/media':
        return <HistoricalGalleryPage initialItemId={searchParam || undefined} />;
      case '/culture-traditions':
        return <CultureTraditionsPage />;
      case '/literature':
      case '/publications':
        return <LiteraturePublicationsPage />;
      case '/references':
      case '/historical-sources':
        return <HistoricalReferencesPage onNavigate={navigateTo} initialReferenceId={searchParam} />;
      case '/community-heritage':
      case '/heritage':
        return <CommunityHeritagePage onNavigate={navigateTo} initialItemId={searchParam} />;
      case '/community-surnames':
      case '/surnames':
        return <CommunitySurnamesPage onNavigate={navigateTo} />;
      case '/community-surnames-north-indian-oad-community':
        return <NorthIndianCommunitySurnamesPage onNavigate={navigateTo} />;
      case '/community-activities':
        return <CommunityActivitiesPage onNavigate={navigateTo} />;
      case '/events':
        return <EventsAnnouncementsPage onNavigate={navigateTo} />;
      case '/directory':
      case '/members':
        return <PublicMemberDirectoryPage />;
      case '/register':
        return <MemberRegistrationPage onNavigate={navigateTo} />;
      case '/login':
        return <MemberLoginPage onNavigate={navigateTo} />;
      case '/password-recovery':
        return <PasswordRecoveryPage onNavigate={navigateTo} />;
      case '/dashboard':
        return <MemberDashboardPage onNavigate={navigateTo} />;
      case '/edit-profile':
        return <EditProfilePage onNavigate={navigateTo} />;
      case '/submit-research':
        return <SubmitResearchPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactUsPage />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
      case '/disclaimer':
        return <TermsConditionsPage />;
      case '/copyright':
        return <CopyrightPermissionsPage />;
      case '/accessibility':
        return <AccessibilityStatementPage />;
      case '/admin':
        return <AdminDashboardPage onNavigate={navigateTo} />;
      case '/design-system':
      case '/ui-components':
        return <UiDesignSystemPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} onOpenSearch={() => setSearchModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EBD9] text-[#292521] print:block print:min-h-0 print:bg-white print:text-black">
      {/* Dynamic SEO, Open Graph & Twitter Card Synchronizer */}
      <SeoHeadManager currentPath={currentPath} language={language} />

      {/* Global Header for inner routes (HomePage '/' renders its own Royal Maroon Header & Navigation) */}
      {currentPath !== '/' && (
        <Navbar
          currentPath={currentPath}
          onNavigate={navigateTo}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      )}

      {/* Main Page Content with Repeating Print Footer Spacer on Every Page */}
      <table className="print-document-frame">
        <tbody className="print-document-tbody">
          <tr className="print-document-tr">
            <td className="print-document-td">
              <main className="flex-1">
                <ErrorBoundary key={currentPath} onReset={() => navigateTo('/')}>
                  <Suspense
                    fallback={
                      <div className="min-h-[55vh] flex flex-col items-center justify-center p-8 text-center bg-[#F5EBD9]">
                        <div className="w-12 h-12 rounded-full border-4 border-[#0B1B3D]/20 border-t-[#D4AF37] animate-spin mb-4" />
                        <p className="font-serif font-bold text-[#0B1B3D] text-base">
                          Loading Royal Heritage Archive…
                        </p>
                      </div>
                    }
                  >
                    {renderCurrentPage()}
                  </Suspense>
                </ErrorBoundary>
              </main>
            </td>
          </tr>
        </tbody>
        <tfoot className="print-document-tfoot" aria-hidden="true">
          <tr className="print-document-tr">
            <td className="print-document-td">
              <div className="print-footer-spacer" />
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Repeating Author Footer on Every Printed / Exported PDF Page */}
      <PrintRepeatingAuthorFooter />

      {/* Global Footer for inner routes (HomePage '/' renders its own Royal Maroon Footer) */}
      {currentPath !== '/' && <Footer onNavigate={navigateTo} />}

      {/* Global Search Modal (Lazy-loaded on demand) */}
      {searchModalOpen && (
        <Suspense fallback={null}>
          <GlobalSearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigate={navigateTo}
          />
        </Suspense>
      )}

      {/* Universal Floating Home, Close & 8-Language Toggle Dock on Every Page */}
      <FloatingPageDock
        currentPath={currentPath}
        onNavigate={navigateTo}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
