import React, { useState } from 'react';
import { KeyRound, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface PasswordRecoveryPageProps {
  onNavigate: (path: string) => void;
}

export const PasswordRecoveryPage: React.FC<PasswordRecoveryPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.debug_token) {
        setResetToken(data.debug_token);
        setStep('reset');
      }
    } catch {
      setError('Network error requesting recovery token.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          new_password: newPassword,
          confirm_password: confirmPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Password updated successfully! Redirecting to sign in...');
        setTimeout(() => onNavigate('/login'), 2000);
      } else {
        setError(data.error || 'Failed to reset password.');
      }
    } catch {
      setError('Network error resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full bg-[#580014] border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
          Password Recovery
        </h1>
        <p className="text-xs text-stone-400">
          Secure, tokenized account credential recovery.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {step === 'request' ? (
        <form onSubmit={handleRequestToken} className="p-6 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-4 shadow-xl">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer"
          >
            {loading ? 'Generating Token...' : 'Generate Password Reset Token'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-xs text-stone-400 hover:text-[#e8c872] flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="p-6 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-4 shadow-xl">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Reset Token
            </label>
            <input
              type="text"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Min 8 chars, uppercase, digit & symbol"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter new password"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer"
          >
            {loading ? 'Updating Password...' : 'Save New Password & Log In'}
          </button>
        </form>
      )}
    </div>
  );
};
