import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { FloatingPageDock } from './components/FloatingPageDock';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoricalDocumentaryPage } from './pages/HistoricalDocumentaryPage';
import { OdraDeshaPage } from './pages/OdraDeshaPage';
import { GajapathiKingdomPage } from './pages/GajapathiKingdomPage';
import { KingsQueensPage } from './pages/KingsQueensPage';
import { RoyalGenealogyPage } from './pages/RoyalGenealogyPage';
import { HistoricalMapsPage } from './pages/HistoricalMapsPage';
import { HistoricalTimelinePage } from './pages/HistoricalTimelinePage';
import { InscriptionsPage } from './pages/InscriptionsPage';
import { TemplesMonumentsPage } from './pages/TemplesMonumentsPage';
import { HistoricalDocumentsPage } from './pages/HistoricalDocumentsPage';
import { ResearchArticlesPage } from './pages/ResearchArticlesPage';
import { HistoricalGalleryPage } from './pages/HistoricalGalleryPage';
import { CultureTraditionsPage } from './pages/CultureTraditionsPage';
import { LiteraturePublicationsPage } from './pages/LiteraturePublicationsPage';
import { HistoricalReferencesPage } from './pages/HistoricalReferencesPage';
import { CommunityHeritagePage } from './pages/CommunityHeritagePage';
import { CommunityActivitiesPage } from './pages/CommunityActivitiesPage';
import { EventsAnnouncementsPage } from './pages/EventsAnnouncementsPage';
import { PublicMemberDirectoryPage } from './pages/PublicMemberDirectoryPage';
import { MemberRegistrationPage } from './pages/MemberRegistrationPage';
import { MemberLoginPage } from './pages/MemberLoginPage';
import { PasswordRecoveryPage } from './pages/PasswordRecoveryPage';
import { MemberDashboardPage } from './pages/MemberDashboardPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { SubmitResearchPage } from './pages/SubmitResearchPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { CopyrightPermissionsPage } from './pages/CopyrightPermissionsPage';
import { AccessibilityStatementPage } from './pages/AccessibilityStatementPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UiDesignSystemPage } from './pages/UiDesignSystemPage';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchParam, setSearchParam] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      const params = new URLSearchParams(window.location.search);
      setSearchParam(params.get('article') || params.get('figure') || params.get('id'));
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
    const [path, query] = pathWithQuery.split('?');
    setCurrentPath(path);
    if (query) {
      const params = new URLSearchParams(query);
      setSearchParam(params.get('article') || params.get('figure') || params.get('id'));
    } else {
      setSearchParam(null);
    }
    window.history.pushState({}, '', pathWithQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case '/gajapathi-kings':
      case '/dynasties':
        return <GajapathiKingdomPage onNavigate={navigateTo} />;
      case '/kings-queens':
        return <KingsQueensPage onNavigate={navigateTo} />;
      case '/genealogy':
        return <RoyalGenealogyPage onNavigate={navigateTo} />;
      case '/maps':
        return <HistoricalMapsPage onNavigate={navigateTo} />;
      case '/timeline':
        return <HistoricalTimelinePage onNavigate={navigateTo} />;
      case '/inscriptions':
        return <InscriptionsPage onNavigate={navigateTo} />;
      case '/temples-monuments':
        return <TemplesMonumentsPage onNavigate={navigateTo} />;
      case '/documents':
        return <HistoricalDocumentsPage />;
      case '/research':
        return <ResearchArticlesPage onNavigate={navigateTo} />;
      case '/gallery':
        return <HistoricalGalleryPage />;
      case '/culture-traditions':
        return <CultureTraditionsPage />;
      case '/literature':
        return <LiteraturePublicationsPage />;
      case '/references':
        return <HistoricalReferencesPage />;
      case '/community-heritage':
        return <CommunityHeritagePage onNavigate={navigateTo} />;
      case '/community-activities':
        return <CommunityActivitiesPage onNavigate={navigateTo} />;
      case '/events':
        return <EventsAnnouncementsPage onNavigate={navigateTo} />;
      case '/directory':
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
    <div className="min-h-screen flex flex-col bg-[#0b0d14] text-[#f5f3ed]">
      {/* Royal Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Royal Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigateTo}
      />

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
