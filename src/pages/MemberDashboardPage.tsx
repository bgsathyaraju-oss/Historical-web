import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  User,
  Shield,
  BookOpen,
  Calendar,
  Lock,
  Globe,
  Trash2,
  Edit3,
  Bookmark,
  FileText,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import { CommunitySubmission, LanguageCode } from '../types';
import { ExportProjectModal } from '../components/ExportProjectModal';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export const MemberDashboardPage: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, logout, refreshUser } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'bookmarks' | 'settings'>('overview');
  const [privacyVisibility, setPrivacyVisibility] = useState(user?.profile?.profile_visibility || 'members');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);

  // Email verification state
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState<string | null>(null);
  const [verifyErr, setVerifyErr] = useState<string | null>(null);

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const fetchDashboardData = () => {
    if (!user) return;
    fetch('/api/community/submissions/my')
      .then(r => r.json())
      .then(d => setSubmissions(d.submissions || []))
      .catch(console.error);

    fetch('/api/community/bookmarks')
      .then(r => r.json())
      .then(d => setBookmarks(d.bookmarks || []))
      .catch(console.error);

    fetch('/api/community/events')
      .then(r => r.json())
      .then(d => {
        const myEvents = (d.events || []).filter((e: any) => e.is_registered);
        setEvents(myEvents);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleVerifyEmail = async () => {
    setVerifyingEmail(true);
    setVerifyMsg(null);
    setVerifyErr(null);

    try {
      // Step 1: Request verification token
      const reqRes = await fetch('/api/auth/verify-email/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email })
      });
      const reqData = await reqRes.json();

      if (!reqRes.ok) {
        setVerifyErr(reqData.error || 'Failed to request email verification.');
        setVerifyingEmail(false);
        return;
      }

      if (reqData.verified) {
        setVerifyMsg('Email is already verified.');
        await refreshUser();
        setVerifyingEmail(false);
        return;
      }

      // Step 2: Auto-confirm with debug token for direct testing flow
      if (reqData.debug_token) {
        const confRes = await fetch('/api/auth/verify-email/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: reqData.debug_token })
        });
        const confData = await confRes.json();
        if (confRes.ok) {
          setVerifyMsg('Email address has been successfully verified!');
          await refreshUser();
        } else {
          setVerifyErr(confData.error || 'Failed to confirm email verification.');
        }
      } else {
        setVerifyMsg(reqData.message);
      }
    } catch {
      setVerifyErr('Network error requesting email verification.');
    } finally {
      setVerifyingEmail(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-[#292521]">You must be logged in to view your member dashboard.</p>
        <button
          onClick={() => onNavigate('/login')}
          className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-[#762D35] text-white"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErr(null);
    setPasswordMsg(null);

    if (newPass !== confirmPass) {
      setPasswordErr('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: currentPass,
          new_password: newPass,
          confirm_password: confirmPass
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg('Password changed successfully.');
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setPasswordErr(data.error || 'Failed to update password.');
      }
    } catch {
      setPasswordErr('Network error updating password.');
    }
  };

  const handleUpdatePrivacy = async (visibility: any) => {
    setPrivacyVisibility(visibility);
    try {
      await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_visibility: visibility })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you certain you wish to request deletion of your account? This will anonymize your profile records.')) return;

    try {
      const res = await fetch('/api/auth/account', { method: 'DELETE' });
      if (res.ok) {
        await logout();
        onNavigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Email Verification Alert Banner */}
      {!user.email_verified && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FDF6E7] border border-[#D8B467] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#A87924] shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#54351F]">
                Your email address is unverified
              </h4>
              <p className="text-[11px] sm:text-xs text-[#6B4A1B]">
                Verify your email to confirm membership status and receive archival notifications.
              </p>
            </div>
          </div>
          <button
            onClick={handleVerifyEmail}
            disabled={verifyingEmail}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5e2229] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{verifyingEmail ? 'Verifying...' : 'Verify Email Address Now'}</span>
          </button>
        </div>
      )}

      {verifyMsg && (
        <div className="p-3.5 rounded-xl bg-[#edf7f0] border border-[#92c5a6] text-xs text-[#1c5236] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#1c5236] shrink-0" />
          <span>{verifyMsg}</span>
        </div>
      )}

      {verifyErr && (
        <div className="p-3.5 rounded-xl bg-[#fcedee] border border-[#dfa5ab] text-xs text-[#762D35] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#762D35] shrink-0" />
          <span>{verifyErr}</span>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-[0_8px_28px_rgba(75,51,31,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {user.profile?.profile_photo_url ? (
            <img
              src={user.profile.profile_photo_url}
              alt={user.profile.full_name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#A87924] shadow-md shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-[#762D35] border-2 border-[#A87924] flex items-center justify-center text-white text-2xl font-bold font-royal-heading shrink-0">
              {user.profile?.full_name?.charAt(0) || 'M'}
            </div>
          )}
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF9EF] border border-[#D8C3A2] text-[11px] font-semibold text-[#54351F] uppercase tracking-wider">
                <Shield className="w-3 h-3 text-[#A87924]" />
                <span>Role: {user.role.replace('_', ' ')}</span>
              </div>
              <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                user.email_verified
                  ? 'bg-[#edf7f0] border border-[#92c5a6] text-[#1c5236]'
                  : 'bg-[#FDF6E7] border border-[#D8B467] text-[#6B4A1B]'
              }`}>
                {user.email_verified ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                <span>{user.email_verified ? 'Verified Email' : 'Unverified Email'}</span>
              </div>
            </div>
            <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
              Welcome, {user.profile?.full_name || user.email}
            </h1>
            <p className="text-xs text-[#6B5948]">
              {user.profile?.district ? `${user.profile.district}, ${user.profile.state_or_province}, ${user.profile.country}` : user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] hover:bg-[#dec9a6] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Download complete project ZIP"
          >
            <Download className="w-3.5 h-3.5 text-[#76501F]" />
            <span>Export ZIP</span>
          </button>
          <button
            onClick={() => onNavigate('/edit-profile')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] hover:bg-[#dec9a6] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#76501F]" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => onNavigate('/submit-research')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5e2229] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Submit Research</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8C3A2] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Dashboard Overview' },
          { id: 'submissions', label: `My Research Submissions (${submissions.length})` },
          { id: 'bookmarks', label: `Bookmarks (${bookmarks.length})` },
          { id: 'settings', label: 'Privacy & Security Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#762D35] text-white shadow-sm'
                : 'bg-[#E9D9BE] text-[#54351F] hover:bg-[#dec9a6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F] flex items-center gap-2">
              <User className="w-4 h-4 text-[#A87924]" /> Profile Visibility
            </h3>
            <p className="text-xs text-[#6B5948]">
              Current Setting: <strong className="text-[#54351F] uppercase">{privacyVisibility}</strong>
            </p>
            <div className="pt-2 text-xs text-[#6B5948]">
              Your exact date of birth and home address are never published in public views.
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#A87924]" /> Active Language
            </h3>
            <p className="text-xs text-[#6B5948]">
              Current preferred UI language: <strong className="text-[#54351F]">{language.toUpperCase()}</strong>
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {SUPPORTED_LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as LanguageCode)}
                  className={`text-[11px] px-2 py-0.5 rounded cursor-pointer ${
                    language === l.code ? 'bg-[#762D35] text-white font-bold' : 'bg-[#FFF9EF] text-[#54351F] border border-[#D8C3A2] hover:bg-[#E9D9BE]'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A87924]" /> Archival Contributions
            </h3>
            <p className="text-xs text-[#6B5948]">
              You have submitted <strong className="text-[#54351F]">{submissions.length}</strong> items to the Editorial Board.
            </p>
            <button
              onClick={() => onNavigate('/submit-research')}
              className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] hover:underline block pt-2 cursor-pointer"
            >
              Upload new manuscript or photo →
            </button>
          </div>

          {/* Registered Community Events */}
          <div className="md:col-span-3 p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-royal-heading font-bold text-base text-[#54351F] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A87924]" /> Registered Heritage Events & Gatherings
              </h3>
              <button
                onClick={() => onNavigate('/events')}
                className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] hover:underline cursor-pointer"
              >
                Browse All Events →
              </button>
            </div>
            {events.length === 0 ? (
              <p className="text-xs text-[#6B5948]">
                You have not registered for any upcoming events yet. Check out upcoming heritage seminars and symposia.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((ev: any) => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#76501F] font-semibold">
                      <span>{ev.date}</span>
                      <span className="px-2 py-0.5 rounded bg-[#edf7f0] text-[#1c5236] border border-[#92c5a6] text-[10px]">
                        Registered
                      </span>
                    </div>
                    <h4 className="font-royal-heading font-bold text-sm text-[#54351F]">{ev.title}</h4>
                    <p className="text-xs text-[#292521] line-clamp-2">{ev.description}</p>
                    <p className="text-[11px] text-[#6B5948]">📍 {ev.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Submissions */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="p-12 text-center text-[#6B5948] bg-[#FFFCF5] rounded-3xl border border-[#D8C3A2] space-y-3">
              <p>You have not submitted any historical research or manuscripts yet.</p>
              <button
                onClick={() => onNavigate('/submit-research')}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#762D35] text-white cursor-pointer"
              >
                Submit Historical Material
              </button>
            </div>
          ) : (
            submissions.map(sub => (
              <div
                key={sub.id}
                className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#76501F]">
                    {sub.submission_type}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    sub.status === 'approved' ? 'bg-[#edf7f0] text-[#1c5236] border border-[#92c5a6]' :
                    sub.status === 'needs_correction' ? 'bg-[#FDF6E7] text-[#6B4A1B] border border-[#D8B467]' :
                    'bg-[#FFF9EF] text-[#6B5948] border border-[#D8C3A2]'
                  }`}>
                    Status: {sub.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
                  {sub.title}
                </h3>
                <p className="text-xs text-[#292521] leading-relaxed">
                  {sub.description}
                </p>

                {sub.reviewer_notes && (
                  <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs text-[#292521]">
                    <strong className="text-[#54351F]">Editorial Reviewer Notes:</strong> {sub.reviewer_notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D8C3A2]">
            <div>
              <h3 className="font-royal-heading font-bold text-lg text-[#54351F]">
                Saved Archival Items & Bookmarks
              </h3>
              <p className="text-xs text-[#6B5948]">
                Quick access to articles, inscriptions, and documentary records you bookmarked.
              </p>
            </div>
            <span className="text-xs text-[#76501F] font-semibold">
              {bookmarks.length} bookmarked
            </span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] text-center space-y-3">
              <Bookmark className="w-10 h-10 text-[#A87924] mx-auto" />
              <p className="text-xs text-[#6B5948]">You have not bookmarked any articles or inscriptions yet.</p>
              <button
                onClick={() => onNavigate('/documentary')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5e2229] cursor-pointer"
              >
                Explore Documentary Archive
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map((bm, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#76501F]">
                      {bm.item_type}
                    </span>
                    <h4 className="font-royal-heading font-bold text-sm text-[#54351F]">
                      Item ID: {bm.item_id}
                    </h4>
                    <p className="text-[11px] text-[#6B5948]">
                      Saved: {new Date(bm.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#D8C3A2] flex items-center justify-between">
                    <button
                      onClick={() => onNavigate(bm.item_type === 'article' ? `/documentary?article=${bm.item_id}` : '/documentary')}
                      className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] hover:underline cursor-pointer"
                    >
                      Open Record →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Privacy Visibility Controls */}
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-4">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
              Member Profile Visibility Setting
            </h3>
            <p className="text-xs text-[#6B5948] leading-relaxed">
              Control who can see your biographical details and profession in the Public Directory.
            </p>

            <div className="space-y-2">
              {[
                { val: 'public', label: 'Public (Visible to all visitors)' },
                { val: 'members', label: 'Registered Members Only (Recommended)' },
                { val: 'private', label: 'Private (Hidden from directory)' }
              ].map(opt => (
                <label key={opt.val} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] cursor-pointer">
                  <input
                    type="radio"
                    name="profile_visibility"
                    value={opt.val}
                    checked={privacyVisibility === opt.val}
                    onChange={() => handleUpdatePrivacy(opt.val)}
                    className="text-[#762D35]"
                  />
                  <span className="text-xs text-[#292521] font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div className="p-6 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-4">
            <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
              Change Account Password
            </h3>

            {passwordMsg && <div className="text-xs text-[#1c5236] font-semibold">{passwordMsg}</div>}
            {passwordErr && <div className="text-xs text-[#762D35] font-semibold">{passwordErr}</div>}

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-xs text-[#54351F] font-semibold mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={e => setCurrentPass(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFFFF] text-[#292521] border border-[#D8C3A2]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#54351F] font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  required
                  placeholder="Min 8 chars, uppercase, digit & symbol"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#54351F] font-semibold mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-[#FFFFFF] text-[#292521] border border-[#D8C3A2]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5e2229] cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Account Deletion Request */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-[#fcedee] border border-[#dfa5ab] space-y-3">
            <h3 className="font-royal-heading font-bold text-base text-[#762D35]">
              Account Deletion & Data Privacy Compliance
            </h3>
            <p className="text-xs text-[#292521] leading-relaxed">
              In accordance with data protection regulations, you can permanently request the deletion of your account and anonymization of personal credentials.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5e2229] flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account & Purge Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Export Project Modal */}
      <ExportProjectModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
};
