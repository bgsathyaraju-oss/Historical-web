import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile, UserPreferences } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  adminRegister: (data: any) => Promise<{ success: boolean; error?: string; user?: User }>;
  checkAdminEligibility: (email: string) => Promise<{ eligible: boolean; error?: string; role?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser().catch(() => {});
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error during login.' };
    }
  };

  const register = async (formData: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error during registration.' };
    }
  };

  const adminLogin = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Admin login failed.' };
      }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: 'Network error during admin login.' };
    }
  };

  const adminRegister = async (formData: any) => {
    try {
      const res = await fetch('/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Admin account creation failed.' };
      }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: 'Network error during admin account creation.' };
    }
  };

  const checkAdminEligibility = async (email: string) => {
    try {
      const res = await fetch('/api/auth/admin/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        return { eligible: false, error: data.error || 'Not authorized for admin registration.' };
      }
      return { eligible: true, role: data.role };
    } catch {
      return { eligible: false, error: 'Network error verifying admin eligibility.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update profile.' };
      }
      if (user) {
        setUser({
          ...user,
          profile: data.profile
        });
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Network error updating profile.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        adminLogin,
        adminRegister,
        checkAdminEligibility,
        logout,
        updateProfile,
        refreshUser: fetchCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
