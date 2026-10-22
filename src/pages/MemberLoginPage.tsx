import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff, AlertCircle, Shield, KeyRound, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const MemberLoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your registered email and password.');
      return;
    }

    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onNavigate('/dashboard');
    } else {
      setError(res.error || 'Invalid login credentials.');
    }
  };

  const fillQuickCreds = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#580014] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
          Member Sign In
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Enter your credentials to access your personalized research dashboard.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-xs sm:text-sm text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-5 shadow-2xl">
        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">
            Registered Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="member@example.org"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-stone-300">
              Account Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('/password-recovery')}
              className="text-[11px] text-[#e8c872] hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </button>

        <div className="pt-2 text-center text-xs text-stone-400">
          Not yet a member?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="text-[#e8c872] font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </form>

      {/* Quick Test Demo Credentials */}
      <div className="p-4 rounded-2xl bg-[#0e121c] border border-stone-800 text-xs space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block">
          Quick Test Credentials (Pre-seeded Accounts)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => fillQuickCreds('admin@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#e8c872] hover:border-stone-700 text-left"
          >
            <div className="font-semibold text-[11px]">Super Admin</div>
            <div className="text-[10px] text-stone-500">Full privileges</div>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCreds('historian.editor@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#e8c872] hover:border-stone-700 text-left"
          >
            <div className="font-semibold text-[11px]">Historical Editor</div>
            <div className="text-[10px] text-stone-500">Moderation queue</div>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCreds('researcher.odra@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#e8c872] hover:border-stone-700 text-left"
          >
            <div className="font-semibold text-[11px]">Registered Member</div>
            <div className="text-[10px] text-stone-500">Community account</div>
          </button>
        </div>
      </div>
    </div>
  );
};
