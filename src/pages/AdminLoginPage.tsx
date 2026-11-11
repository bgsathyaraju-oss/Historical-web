import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  X
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

interface AdminLoginPageProps {
  onNavigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const { user, adminLogin, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot Password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState<string | null>(null);
  const [forgotErrorMsg, setForgotErrorMsg] = useState<string | null>(null);

  const isAdminUser =
    user &&
    ['super_admin', 'admin', 'historical_editor', 'research_reviewer', 'translator', 'community_moderator'].includes(
      user.role
    );

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Please enter both your Email Address and Password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Attempt Firebase Authentication Client SDK login
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      } catch (fbErr: any) {
        // Log warning but proceed to server verification for unified session handling
        console.warn('[FIREBASE AUTH ATTEMPT]', fbErr?.code || fbErr?.message);
      }

      // 2. Authenticate through Server API with strict Role Guard
      const res = await adminLogin(cleanEmail, password);

      if (!res.success) {
        setErrorMessage(res.error || 'Invalid administrative credentials or insufficient privileges.');
        setLoading(false);
        return;
      }

      // 3. Navigate directly to Admin Dashboard
      onNavigate('/admin');
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during administrative login.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotErrorMsg(null);
    setForgotSuccessMsg(null);

    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail) {
      setForgotErrorMsg('Please provide your registered administrative email address.');
      return;
    }

    setForgotSubmitting(true);

    try {
      // 1. Send Firebase Auth reset email if available
      try {
        await sendPasswordResetEmail(auth, cleanEmail);
      } catch (fbErr: any) {
        console.warn('[FIREBASE RESET WARNING]', fbErr.message);
      }

      // 2. Call server reset endpoint
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json();

      setForgotSuccessMsg(
        data.message || 'Password recovery instructions have been dispatched to your email address.'
      );
    } catch {
      setForgotErrorMsg('Network error while processing password recovery. Please try again.');
    } finally {
      setForgotSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE3D0] text-[#762D35] text-xs font-bold border border-[#A87924]/40 shadow-sm">
          <Shield className="w-4 h-4 text-[#A87924]" />
          <span>Restricted Portal • Archival Administration</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
          Admin Portal Login
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-md mx-auto leading-relaxed">
          Authorized Editorial, Epigraphic, and Master Registry Access for Suryavamsha Odiyaraju Kshatriya Historical Heritage.
        </p>
      </div>

      {/* Currently logged in state */}
      {user && (
        <div className="p-5 rounded-2xl bg-[#FFF9EF] border-2 border-[#A87924]/50 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#D8C3A2] pb-2">
            <span className="text-xs font-bold text-[#54351F] uppercase tracking-wider">Active Session</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                isAdminUser
                  ? 'bg-[#EEF7F0] text-[#1E5631] border border-[#A3CFAF]'
                  : 'bg-[#FDF2F2] text-[#9B1C1C] border border-[#F5C2C7]'
              }`}
            >
              Role: {user.role}
            </span>
          </div>

          <div className="text-xs text-[#292521] space-y-1">
            <div>
              Signed in as: <strong>{user.profile?.full_name || user.email}</strong> ({user.email})
            </div>
            {isAdminUser ? (
              <p className="text-[#1E5631] font-semibold">
                ✓ You possess verified administrative credentials for the Heritage Portal.
              </p>
            ) : (
              <p className="text-[#9B1C1C] font-semibold">
                ⚠ This account is registered as a Member. Administrative privileges are required to access the Admin Dashboard.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {isAdminUser ? (
              <button
                type="button"
                onClick={() => onNavigate('/admin')}
                className="px-4 py-2 rounded-xl bg-[#762D35] hover:bg-[#5E2229] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('/dashboard')}
                className="px-4 py-2 rounded-xl bg-[#76501F] hover:bg-[#5D3D15] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Go to Member Dashboard
              </button>
            )}
            <button
              type="button"
              onClick={async () => {
                await logout();
                setEmail('');
                setPassword('');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#EFE3D0] hover:bg-[#E2D2B8] text-[#54351F] text-xs font-semibold border border-[#D8C3A2] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Login Error Notification */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#9B1C1C] flex items-start gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Authentication Failed</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Admin Login Form */}
      <form
        onSubmit={handleAdminLogin}
        className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-md space-y-5"
      >
        <div className="space-y-1 border-b border-[#D8C3A2] pb-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            Administrative Credentials
          </h2>
          <p className="text-[11px] text-[#6B5948]">
            Enter your authorized email address and secure password.
          </p>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="bgsathyaraju@gmail.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-mono text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none transition-colors"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setForgotEmail(email);
                setForgotModalOpen(true);
              }}
              className="text-[11px] font-semibold text-[#762D35] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white text-xs font-mono text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5948] hover:text-[#292521] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            loading
              ? 'bg-[#A87924] opacity-80 cursor-wait'
              : 'bg-[#762D35] hover:bg-[#5E2229] active:scale-[0.99]'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying Administrative Credentials...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Login to Admin Dashboard</span>
            </>
          )}
        </button>

        {/* Footer Navigation Links */}
        <div className="pt-4 border-t border-[#D8C3A2] space-y-2 text-center text-xs">
          <div>
            <span className="text-[#6B5948]">Initial Administrator Setup? </span>
            <button
              type="button"
              onClick={() => onNavigate('/admin-register')}
              className="font-bold text-[#762D35] hover:underline cursor-pointer"
            >
              Create Admin Account (Authorized Owner Only)
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 text-[#6B5948] text-[11px] pt-1">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="hover:text-[#292521] underline cursor-pointer"
            >
              Member Portal Login
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-[#292521] underline cursor-pointer"
            >
              Return to Heritage Portal
            </button>
          </div>
        </div>
      </form>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FFFCF5] rounded-3xl border-2 border-[#A87924]/60 p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setForgotModalOpen(false);
                setForgotSuccessMsg(null);
                setForgotErrorMsg(null);
              }}
              className="absolute top-4 right-4 text-[#6B5948] hover:text-[#292521] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <KeyRound className="w-5 h-5 text-[#A87924]" />
              <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
                Reset Admin Password
              </h3>
            </div>

            <p className="text-xs text-[#6B5948] leading-relaxed">
              Enter your registered administrator email address to receive password recovery instructions and a secure reset token.
            </p>

            {forgotErrorMsg && (
              <div className="p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#9B1C1C]">
                {forgotErrorMsg}
              </div>
            )}

            {forgotSuccessMsg && (
              <div className="p-3 rounded-xl bg-[#EEF7F0] border border-[#A3CFAF] text-xs text-[#1E5631] space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Reset Email Dispatched
                </div>
                <div>{forgotSuccessMsg}</div>
              </div>
            )}

            {!forgotSuccessMsg ? (
              <form onSubmit={handleForgotPassword} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#54351F] uppercase mb-1">
                    Administrative Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="bgsathyaraju@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-xs font-mono text-[#292521] border border-[#D8C3A2] focus:border-[#A87924] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#EFE3D0] text-xs font-semibold text-[#54351F] hover:bg-[#E2D2B8] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotSubmitting}
                    className="px-5 py-2 rounded-xl bg-[#762D35] text-xs font-bold text-white hover:bg-[#5E2229] transition-all shadow-sm cursor-pointer"
                  >
                    {forgotSubmitting ? 'Sending...' : 'Send Recovery Email'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#762D35] text-xs font-bold text-white hover:bg-[#5E2229] transition-all cursor-pointer"
                >
                  Close & Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
