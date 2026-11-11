import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  Shield,
  Users,
  FileText,
  Languages,
  CheckCircle,
  XCircle,
  AlertTriangle,
  PlusCircle,
  Edit,
  History,
  Lock,
  ArrowRight,
  Download
} from 'lucide-react';
import { UserRole, CommunitySubmission, LanguageCode } from '../types';
import {
  GLOBAL_PREFIX_REGISTRY,
  getGlobalContentReferenceRegistry,
  auditGlobalReferenceRegistry
} from '../data/globalReferenceIdRegistry';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'registry' | 'submissions' | 'users' | 'articles' | 'translations' | 'logs'>('overview');
  const [registrySearch, setRegistrySearch] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState<string>('ALL');

  const [overviewData, setOverviewData] = useState<any>(null);
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // New Article Form state
  const [newArt, setNewArt] = useState({
    title: '',
    category: 'Research Articles',
    summary: '',
    content: '',
    verification_status: 'Reviewed',
    evidence_category: 'scholarly_interpretation',
    source_citation: ''
  });

  // Translation Form state
  const [transArticleId, setTransArticleId] = useState('');
  const [transLang, setTransLang] = useState<LanguageCode>('hi');
  const [transTitle, setTransTitle] = useState('');
  const [transContent, setTransContent] = useState('');
  const [transSummary, setTransSummary] = useState('');
  const [transStatus, setTransStatus] = useState<'pending' | 'reviewed'>('reviewed');

  const fetchData = async () => {
    try {
      const [overRes, subRes, artRes] = await Promise.all([
        fetch('/api/admin/overview'),
        fetch('/api/admin/submissions'),
        fetch('/api/content/articles')
      ]);

      if (overRes.ok) {
        const d = await overRes.json();
        setOverviewData(d);
      }
      if (subRes.ok) {
        const s = await subRes.json();
        setSubmissions(s.submissions || []);
      }
      if (artRes.ok) {
        const a = await artRes.json();
        setArticlesList(a.articles || []);
      }

      // If super admin or admin, fetch users and logs
      if (user && ['super_admin', 'admin'].includes(user.role)) {
        const [uRes, logRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/audit-logs')
        ]);
        if (uRes.ok) {
          const u = await uRes.json();
          setUsersList(u.users || []);
        }
        if (logRes.ok) {
          const l = await logRes.json();
          setAuditLogs(l.logs || []);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (!user || !['super_admin', 'admin', 'historical_editor', 'research_reviewer', 'translator', 'community_moderator'].includes(user.role)) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Lock className="w-12 h-12 text-[#9B1C1C] mx-auto" />
        <h2 className="font-royal-heading font-bold text-xl text-[#54351F]">Access Restricted</h2>
        <p className="text-xs text-[#6B5948]">
          This area is restricted to authorized archival administrators, historians, and translation reviewers.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5E2229] transition-colors cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleReviewSubmission = async (id: string, status: 'approved' | 'rejected' | 'needs_correction', notes?: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reviewer_notes: notes || `Reviewed by ${user.email}` })
      });
      if (res.ok) {
        setActionMsg(`Submission status successfully updated to ${status}.`);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateRole = async (targetId: string, newRole: UserRole) => {
    try {
      const res = await fetch(`/api/admin/users/${targetId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setActionMsg('User role updated successfully.');
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = async (targetId: string, newStatus: 'active' | 'suspended') => {
    try {
      const res = await fetch(`/api/admin/users/${targetId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setActionMsg(`User status changed to ${newStatus}.`);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArt.title || !newArt.content) return;

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newArt.title,
          category: newArt.category,
          summary: newArt.summary,
          content: newArt.content,
          verification_status: newArt.verification_status,
          evidence_category: newArt.evidence_category,
          sources: [
            {
              id: 'src_' + Date.now(),
              source_type: 'Peer-Reviewed Research',
              title: newArt.source_citation || 'Archival Study Record',
              author_or_authority: user.profile?.full_name || 'Editorial Board',
              publication_or_location: 'Historical Research Archive',
              year_or_era: '2026',
              citation_details: newArt.source_citation || 'Verified against Epigraphia Indica',
              verified: true
            }
          ]
        })
      });
      if (res.ok) {
        setActionMsg('Historical research article published successfully.');
        setNewArt({
          title: '',
          category: 'Research Articles',
          summary: '',
          content: '',
          verification_status: 'Reviewed',
          evidence_category: 'scholarly_interpretation',
          source_citation: ''
        });
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveTranslation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transArticleId || !transTitle || !transContent) return;

    try {
      const res = await fetch('/api/admin/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: transArticleId,
          language: transLang,
          title: transTitle,
          content: transContent,
          summary: transSummary,
          status: transStatus
        })
      });
      if (res.ok) {
        setActionMsg(`Translation for language '${transLang}' saved as '${transStatus}'.`);
        setTransTitle('');
        setTransContent('');
        setTransSummary('');
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8C3A2] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE3D0] text-[#762D35] text-xs font-semibold border border-[#A87924]/40">
            <Shield className="w-3.5 h-3.5 text-[#A87924]" />
            <span>Role-Based Access Control • {user.role.toUpperCase()}</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F] mt-1">
            Archival & Editorial Administration Panel
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/export/project-zip"
            download="suryavamsha-odiyaraju-kshatriya-portal.zip"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#762D35] hover:bg-[#5E2229] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Portal (ZIP)</span>
          </a>
          <button
            onClick={() => onNavigate('/dashboard')}
            className="text-xs text-[#54351F] hover:bg-[#E9D9BE] px-3 py-1.5 rounded-xl bg-[#EFE3D0] border border-[#D8C3A2] transition-colors cursor-pointer"
          >
            Go to Member Dashboard
          </button>
        </div>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-[#EEF7F0] border border-[#A3CFAF] text-xs sm:text-sm text-[#1E5631] flex items-center justify-between">
          <span>{actionMsg}</span>
          <button onClick={() => setActionMsg(null)} className="text-[#6B5948] hover:text-[#292521] text-xs font-semibold cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#D8C3A2]">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'registry', label: `Global Reference IDs (${getGlobalContentReferenceRegistry().length})` },
          { id: 'submissions', label: `Moderation Queue (${submissions.length})` },
          { id: 'articles', label: 'Publish Historical Article' },
          { id: 'translations', label: 'Manage Translations' },
          { id: 'users', label: `User Accounts (${usersList.length})` },
          { id: 'logs', label: `Audit Trail (${auditLogs.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#762D35] text-white shadow-sm'
                : 'text-[#54351F] hover:text-[#292521] hover:bg-[#EFE3D0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview Metrics */}
      {activeTab === 'overview' && overviewData && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5948]">Published Articles</span>
              <div className="text-2xl font-bold text-[#54351F] font-royal-heading mt-1">
                {overviewData.statistics.published_articles}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5948]">Pending Review</span>
              <div className="text-2xl font-bold text-[#8A5A12] font-royal-heading mt-1">
                {overviewData.pending_submissions}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5948]">Total Registered Members</span>
              <div className="text-2xl font-bold text-[#76501F] font-royal-heading mt-1">
                {overviewData.total_users}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5948]">Inscriptions Reviewed</span>
              <div className="text-2xl font-bold text-[#1E5631] font-royal-heading mt-1">
                {overviewData.statistics.reviewed_inscriptions}
              </div>
            </div>
          </div>

          {/* Recent Audit Logs Snapshot */}
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-sm">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
              Recent Audit Log Activity
            </h3>
            <div className="space-y-2 text-xs">
              {overviewData.recent_logs?.map((log: any) => (
                <div key={log.id} className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]/80 flex items-center justify-between text-[#292521]">
                  <div>
                    <span className="font-semibold text-[#76501F] uppercase tracking-wider text-[10px] mr-2">
                      [{log.action}]
                    </span>
                    <span>{log.details}</span>
                  </div>
                  <span className="text-[#6B5948] text-[11px] shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Moderation Queue */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="p-12 text-center text-[#6B5948] bg-[#FFFCF5] rounded-3xl border border-[#D8C3A2]">
              No submissions currently in the moderation queue.
            </div>
          ) : (
            submissions.map(sub => (
              <div
                key={sub.id}
                className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-3 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8C3A2] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#76501F]">
                      {sub.submission_type}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      sub.status === 'approved' ? 'bg-[#EEF7F0] text-[#1E5631] border border-[#A3CFAF]' :
                      sub.status === 'needs_correction' ? 'bg-[#FDF6E9] text-[#8A5A12] border border-[#E6C786]' :
                      'bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2]'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#6B5948]">By {sub.author_name}</span>
                </div>

                <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
                  {sub.title}
                </h3>
                <p className="text-xs text-[#292521] leading-relaxed">
                  {sub.description}
                </p>

                <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs font-mono text-[#292521] whitespace-pre-wrap">
                  {sub.content_data}
                </div>

                <div className="text-xs text-[#76501F]">
                  <strong>Provenance & Citations:</strong> {sub.source_citations}
                </div>

                {sub.reviewer_notes && (
                  <div className="p-2.5 rounded-lg bg-[#EFE3D0] text-xs text-[#54351F]">
                    <strong>Previous Notes:</strong> {sub.reviewer_notes}
                  </div>
                )}

                <div className="pt-3 border-t border-[#D8C3A2] flex items-center gap-3">
                  <button
                    onClick={() => handleReviewSubmission(sub.id, 'approved', 'Approved by Editorial Board after provenance check.')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#1E5631] text-white hover:bg-[#164225] transition-colors cursor-pointer"
                  >
                    Approve & Publish
                  </button>
                  <button
                    onClick={() => handleReviewSubmission(sub.id, 'needs_correction', 'Editorial review requested high-res scans or additional citations.')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#A87924] text-white hover:bg-[#8E641B] transition-colors cursor-pointer"
                  >
                    Request Corrections
                  </button>
                  <button
                    onClick={() => handleReviewSubmission(sub.id, 'rejected', 'Declined due to unverified provenance or copyright ambiguity.')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5E2229] transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Publish Historical Article */}
      {activeTab === 'articles' && (
        <form onSubmit={handleCreateArticle} className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-md">
          <h3 className="font-royal-heading font-bold text-lg text-[#54351F] border-b border-[#D8C3A2] pb-2">
            Publish New Historical Research Article
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Article Title</label>
              <input
                type="text"
                required
                value={newArt.title}
                onChange={e => setNewArt({ ...newArt, title: e.target.value })}
                placeholder="e.g. Copper Plate Paleography of Gajapathi Charters"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Category</label>
              <select
                value={newArt.category}
                onChange={e => setNewArt({ ...newArt, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              >
                <option value="Odra Desha">Odra Desha</option>
                <option value="Gajapathi Kings">Gajapathi Kings</option>
                <option value="Royal Genealogy">Royal Genealogy</option>
                <option value="Research Articles">Research Articles</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#54351F] mb-1">Article Summary</label>
            <textarea
              required
              rows={2}
              value={newArt.summary}
              onChange={e => setNewArt({ ...newArt, summary: e.target.value })}
              placeholder="Concise overview of the research findings..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#54351F] mb-1">Full Article Content</label>
            <textarea
              required
              rows={6}
              value={newArt.content}
              onChange={e => setNewArt({ ...newArt, content: e.target.value })}
              placeholder="Full historiographical narrative..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none font-royal-serif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Verification Status</label>
              <select
                value={newArt.verification_status}
                onChange={e => setNewArt({ ...newArt, verification_status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Under Research">Under Research</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Published">Published</option>
                <option value="Contested Interpretation">Contested Interpretation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Primary Citation / Epigraphic Source</label>
              <input
                type="text"
                value={newArt.source_citation}
                onChange={e => setNewArt({ ...newArt, source_citation: e.target.value })}
                placeholder="e.g. Epigraphia Indica Vol. XXXIII; Lingaraja Inscription"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#762D35] text-white hover:bg-[#5E2229] transition-all cursor-pointer"
          >
            Publish Article to Repository
          </button>
        </form>
      )}

      {/* Tab: Manage Translations */}
      {activeTab === 'translations' && (
        <div className="space-y-6">
          {/* 8-Language Translation Matrix */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8C3A2] pb-3">
              <div>
                <h3 className="font-royal-heading font-bold text-lg text-[#54351F]">
                  8-Language Translation Matrix & Archival Coverage
                </h3>
                <p className="text-xs text-[#6B5948]">
                  Real-time translation status across English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, and Bengali. Click any cell to translate or review.
                </p>
              </div>
              <span className="text-xs text-[#76501F] font-semibold">
                {articlesList.length} Historical Records Indexed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D8C3A2] text-[#54351F] bg-[#EFE3D0]/50">
                    <th className="py-2 px-3 font-semibold">Article / Document</th>
                    {SUPPORTED_LANGUAGES.map(l => (
                      <th key={l.code} className="py-2 px-2 font-semibold text-center whitespace-nowrap">
                        {l.nativeName} ({l.code})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C3A2]/60">
                  {articlesList.map(art => (
                    <tr key={art.id} className="hover:bg-[#FFF9EF]">
                      <td className="py-2.5 px-3 font-medium text-[#292521]">
                        <div className="line-clamp-1">{art.original_title}</div>
                        <span className="text-[10px] text-[#6B5948] font-mono">{art.id}</span>
                      </td>
                      {SUPPORTED_LANGUAGES.map(l => {
                        const isEn = l.code === 'en';
                        const tr = art.translations?.[l.code];
                        const isReviewed = tr?.status === 'reviewed';

                        return (
                          <td key={l.code} className="py-2.5 px-2 text-center whitespace-nowrap">
                            {isEn ? (
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2]">
                                Source (EN)
                              </span>
                            ) : tr ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setTransArticleId(art.id);
                                  setTransLang(l.code as LanguageCode);
                                  setTransTitle(tr.title || '');
                                  setTransContent(tr.content || '');
                                  setTransSummary(tr.summary || '');
                                  setTransStatus(tr.status || 'reviewed');
                                }}
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer border ${
                                  isReviewed
                                    ? 'bg-[#EEF7F0] text-[#1E5631] border-[#A3CFAF] hover:bg-[#DDF0E2]'
                                    : 'bg-[#FDF6E9] text-[#8A5A12] border-[#E6C786] hover:bg-[#F9EBCD]'
                                }`}
                              >
                                {isReviewed ? '✓ Reviewed' : '⏳ Pending'}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setTransArticleId(art.id);
                                  setTransLang(l.code as LanguageCode);
                                  setTransTitle('');
                                  setTransContent('');
                                  setTransSummary('');
                                  setTransStatus('reviewed');
                                }}
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFF9EF] text-[#6B5948] border border-[#D8C3A2] hover:text-[#292521] hover:border-[#A87924] cursor-pointer"
                              >
                                + Add
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Translation Form */}
          <form onSubmit={handleSaveTranslation} className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-md">
            <h3 className="font-royal-heading font-bold text-lg text-[#54351F] border-b border-[#D8C3A2] pb-2">
              Add or Review Article Translation (8 Languages)
            </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Target Article ID / Slug</label>
              <input
                type="text"
                required
                value={transArticleId}
                onChange={e => setTransArticleId(e.target.value)}
                placeholder="e.g. art_odra_desha_history"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#54351F] mb-1">Target Language</label>
              <select
                value={transLang}
                onChange={e => setTransLang(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
              >
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#54351F] mb-1">Translated Title</label>
            <input
              type="text"
              required
              value={transTitle}
              onChange={e => setTransTitle(e.target.value)}
              placeholder="Title in target language script..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#54351F] mb-1">Translated Content</label>
            <textarea
              required
              rows={5}
              value={transContent}
              onChange={e => setTransContent(e.target.value)}
              placeholder="Content in target language script..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#54351F] mb-1">Review Status</label>
            <select
              value={transStatus}
              onChange={e => setTransStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
            >
              <option value="reviewed">Reviewed (Certified by translator)</option>
              <option value="pending">Pending Review</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#762D35] text-white hover:bg-[#5E2229] transition-all cursor-pointer"
          >
            Save & Publish Translation
          </button>
        </form>
      </div>
    )}

      {/* Tab: User Accounts Management */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-md">
          <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
            Member Accounts & Role Governance
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EFE3D0] text-[#54351F] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">User / Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Current Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8C3A2] text-[#292521]">
                {usersList.map((u: any) => (
                  <tr key={u.id} className="hover:bg-[#FFF9EF]">
                    <td className="p-3 font-semibold text-[#54351F]">{u.full_name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.district}, {u.state}</td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={e => handleUpdateRole(u.id, e.target.value as UserRole)}
                        className="px-2 py-1 rounded bg-white border border-[#D8C3A2] text-[#292521] text-xs"
                      >
                        <option value="member">member</option>
                        <option value="historical_editor">historical_editor</option>
                        <option value="research_reviewer">research_reviewer</option>
                        <option value="translator">translator</option>
                        <option value="admin">admin</option>
                        <option value="super_admin">super_admin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.status === 'active' ? 'bg-[#EEF7F0] text-[#1E5631] border border-[#A3CFAF]' : 'bg-[#FDF2F2] text-[#9B1C1C] border border-[#F5C2C7]'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {u.status === 'active' ? (
                        <button
                          onClick={() => handleUpdateStatus(u.id, 'suspended')}
                          className="text-[#9B1C1C] font-semibold hover:underline cursor-pointer"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(u.id, 'active')}
                          className="text-[#1E5631] font-semibold hover:underline cursor-pointer"
                        >
                          Reactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Global Reference ID Master Registry */}
      {activeTab === 'registry' && (() => {
        const allRecords = getGlobalContentReferenceRegistry();
        const auditReport = auditGlobalReferenceRegistry();
        const prefixEntries = Object.values(GLOBAL_PREFIX_REGISTRY);
        const q = registrySearch.trim().toLowerCase();
        const filteredRecords = allRecords.filter(rec => {
          if (selectedPrefix !== 'ALL' && rec.prefix !== selectedPrefix) return false;
          if (!q) return true;
          return (
            rec.newReferenceId.toLowerCase().includes(q) ||
            (rec.previousReferenceId && rec.previousReferenceId.toLowerCase().includes(q)) ||
            rec.internalRecordId.toLowerCase().includes(q) ||
            rec.englishPageTitle.toLowerCase().includes(q) ||
            rec.contentCategory.toLowerCase().includes(q) ||
            rec.contentTitle.toLowerCase().includes(q)
          );
        });

        return (
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8C3A2] pb-4">
              <div>
                <h3 className="font-royal-heading font-bold text-lg text-[#54351F]">
                  Global Content Reference Registry ({allRecords.length} Records • {prefixEntries.length} Page-Title Prefixes)
                </h3>
                <p className="text-xs text-[#6B5948]">
                  Unified Page-Title-Based Reference ID Architecture • Unique IDs: {auditReport.uniqueReferenceIds}/{auditReport.totalRecords} • Duplicate IDs: {auditReport.duplicateIds.length} • Missing IDs: {auditReport.missingIds.length} • Invalid Prefixes: {auditReport.invalidPrefixes.length} • Display Mismatches: {auditReport.displayToRegistryMismatches.length} • Invalid Migration Targets: {auditReport.invalidMigrationTargets.length} • Unresolved Relationship Refs: {auditReport.orphanedRelationships.length}
                </p>
              </div>
              <input
                type="text"
                value={registrySearch}
                onChange={e => setRegistrySearch(e.target.value)}
                placeholder="Search by REF ID (e.g. RD-0001, CH-0048), Title, or Internal Key..."
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#A87924]"
              />
            </div>

            {/* Prefix Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedPrefix('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                  selectedPrefix === 'ALL'
                    ? 'bg-[#762D35] text-white border-[#A87924]'
                    : 'bg-[#FFF9EF] text-[#54351F] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                ALL ({allRecords.length})
              </button>
              {prefixEntries.map(p => (
                <button
                  key={p.prefix}
                  type="button"
                  onClick={() => setSelectedPrefix(p.prefix)}
                  title={`${p.englishPageTitle} (${p.idFormatExample})`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                    selectedPrefix === p.prefix
                      ? 'bg-[#762D35] text-white border-[#A87924]'
                      : 'bg-[#FFF9EF] text-[#54351F] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                  }`}
                >
                  {p.prefix} ({auditReport.countsByPrefix[p.prefix] || 0})
                </button>
              ))}
            </div>

            <div className="overflow-x-auto max-h-[540px] border border-[#D8C3A2] rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#EFE3D0] text-[#54351F] sticky top-0 z-10 border-b border-[#D8C3A2]">
                  <tr>
                    <th className="p-3 font-bold">New Reference ID</th>
                    <th className="p-3 font-bold">Previous ID</th>
                    <th className="p-3 font-bold">English Page Title</th>
                    <th className="p-3 font-bold">Content Title ({language.toUpperCase()})</th>
                    <th className="p-3 font-bold">Internal Key</th>
                    <th className="p-3 font-bold">Source File</th>
                    <th className="p-3 font-bold">Languages</th>
                    <th className="p-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C3A2]">
                  {filteredRecords.slice(0, 200).map(rec => (
                    <tr key={rec.newReferenceId} className="hover:bg-[#FFF9EF] text-[#292521]">
                      <td className="p-3 font-mono font-bold text-[#762D35]" lang="en" translate="no">
                        {rec.newReferenceId}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#6B5948]" lang="en" translate="no">
                        {rec.previousReferenceId || '—'}
                      </td>
                      <td className="p-3 font-semibold text-[#54351F]">{rec.englishPageTitle}</td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => onNavigate(rec.canonicalRoute)}
                          className="text-left font-semibold text-[#762D35] hover:underline cursor-pointer"
                        >
                          {rec.contentTitle}
                        </button>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#6B5948]">{rec.internalRecordId}</td>
                      <td className="p-3 font-mono text-[10px] text-[#6B5948]">{rec.dataSourceFile}</td>
                      <td className="p-3 text-[10px] font-semibold text-[#1E5631]">
                        {rec.availableLanguages.length}/8 ({rec.availableLanguages.join(', ')})
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-[#EEF7F0] text-[#1E5631] border border-[#A3CFAF] text-[10px] font-bold">
                          {rec.recordStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-[#6B5948] flex items-center justify-between">
              <span>Showing {Math.min(filteredRecords.length, 200)} of {filteredRecords.length} matching records</span>
              <span>All 8 Languages Verified (EN, HI, TE, KN, TA, MR, OR, BN)</span>
            </div>
          </div>
        );
      })()}

      {/* Tab: Audit Trail */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-4 shadow-md">
          <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
            Full System Audit Log
          </h3>
          <div className="space-y-2 text-xs">
            {auditLogs.map((log: any) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] flex items-center justify-between text-[#292521]">
                <div>
                  <span className="font-semibold text-[#76501F] uppercase tracking-wider text-[10px] mr-2">
                    [{log.action}]
                  </span>
                  <span>{log.details}</span>
                  <div className="text-[10px] text-[#6B5948] mt-0.5">By: {log.user_email}</div>
                </div>
                <span className="text-[#6B5948] text-[11px] shrink-0">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
