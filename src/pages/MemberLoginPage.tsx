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
        <div className="w-12 h-12 rounded-full bg-[#762D35] border border-[#A87924] flex items-center justify-center mx-auto text-white shadow-sm">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
          Member Sign In
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948]">
          Enter your credentials to access your personalized research dashboard.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#fcedee] border border-[#dfa5ab] text-xs sm:text-sm text-[#762D35] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#762D35] shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-5 shadow-[0_8px_28px_rgba(75,51,31,0.12)]">
        <div>
          <label className="block text-xs font-semibold text-[#54351F] mb-1">
            Registered Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="member@example.org"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2] focus:outline-none focus:border-[#A87924]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#54351F]">
              Account Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate('/password-recovery')}
              className="text-[11px] text-[#76501F] hover:text-[#A87924] font-semibold hover:underline cursor-pointer"
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
              className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm rounded-xl bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2] focus:outline-none focus:border-[#A87924]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5948] hover:text-[#292521] cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#762D35] text-white hover:bg-[#5e2229] border border-[#A87924] shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </button>

        <div className="pt-2 text-center text-xs text-[#6B5948]">
          Not yet a member?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="text-[#76501F] hover:text-[#A87924] font-semibold hover:underline cursor-pointer"
          >
            Create an Account
          </button>
        </div>
      </form>

      {/* Quick Test Demo Credentials */}
      <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#54351F] block">
          Quick Test Credentials (Pre-seeded Accounts)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => fillQuickCreds('admin@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-[#FFFCF5] border border-[#D8C3A2] text-[#292521] hover:text-[#54351F] hover:border-[#A87924] text-left cursor-pointer"
          >
            <div className="font-semibold text-[11px] text-[#54351F]">Super Admin</div>
            <div className="text-[10px] text-[#6B5948]">Full privileges</div>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCreds('historian.editor@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-[#FFFCF5] border border-[#D8C3A2] text-[#292521] hover:text-[#54351F] hover:border-[#A87924] text-left cursor-pointer"
          >
            <div className="font-semibold text-[11px] text-[#54351F]">Historical Editor</div>
            <div className="text-[10px] text-[#6B5948]">Moderation queue</div>
          </button>

          <button
            type="button"
            onClick={() => fillQuickCreds('researcher.odra@suryavamsha-heritage.org', 'Heritage@2026')}
            className="p-2 rounded-lg bg-[#FFFCF5] border border-[#D8C3A2] text-[#292521] hover:text-[#54351F] hover:border-[#A87924] text-left cursor-pointer"
          >
            <div className="font-semibold text-[11px] text-[#54351F]">Registered Member</div>
            <div className="text-[10px] text-[#6B5948]">Community account</div>
          </button>
        </div>
      </div>
    </div>
  );
};
