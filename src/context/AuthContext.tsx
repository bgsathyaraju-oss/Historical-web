import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile, UserPreferences, UserRole } from '../types';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string; user?: User; isStaticHost?: boolean }>;
  adminRegister: (data: any) => Promise<{ success: boolean; error?: string; user?: User; isStaticHost?: boolean }>;
  checkAdminEligibility: (email: string) => Promise<{ eligible: boolean; error?: string; role?: string }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  setDirectUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function safeParseJson(res: Response): Promise<{ ok: boolean; data?: any; isHtml?: boolean }> {
  try {
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { ok: false, isHtml: contentType.includes('text/html') };
    }
    const data = await res.json();
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const jsonRes = await safeParseJson(res);
      if (jsonRes.ok && res.ok && jsonRes.data?.user) {
        setUser(jsonRes.data.user);
      } else if (!auth.currentUser) {
        setUser(null);
      }
    } catch {
      if (!auth.currentUser) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Listen to Firebase Auth state for static Firebase Hosting & cross-page persistence
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // First check if backend session is available
        try {
          const res = await fetch('/api/auth/me');
          const jsonRes = await safeParseJson(res);
          if (jsonRes.ok && res.ok && jsonRes.data?.user) {
            if (isMounted) {
              setUser(jsonRes.data.user);
              setLoading(false);
            }
            return;
          }
        } catch {
          // Backend offline or static host, proceed to Firestore verification
        }

        // Resolve role directly from Firestore admins collection or owner whitelist
        try {
          const normalizedEmail = (fbUser.email || '').toLowerCase().trim();
          const isOwner = normalizedEmail === 'bgsathyaraju@gmail.com';
          let role: UserRole = isOwner ? 'super_admin' : 'member';
          let adminData: any = null;

          try {
            const adminDoc = await getDoc(doc(db, 'admins', fbUser.uid));
            if (adminDoc.exists()) {
              adminData = adminDoc.data();
              if (adminData.isAuthorizedAdmin && adminData.role) {
                role = adminData.role;
              } else if (isOwner) {
                role = 'super_admin';
              }
            }
          } catch (e) {
            console.warn('[AUTH CONTEXT] Firestore admin check:', e);
          }

          if (isMounted) {
            setUser({
              id: fbUser.uid,
              email: fbUser.email || '',
              role,
              status: 'active',
              email_verified: fbUser.emailVerified ?? true,
              created_at: fbUser.metadata?.creationTime || new Date().toISOString(),
              profile: {
                user_id: fbUser.uid,
                full_name: fbUser.displayName || adminData?.fullName || fbUser.email || 'Administrator',
                gender: 'Prefer not to say',
                country: adminData?.country || 'India',
                state_or_province: adminData?.state || '',
                district: adminData?.city || '',
                city_town_village: adminData?.city || '',
                organization: 'Suryavamsha Odiyaraju Kshatriya Archival Council',
                current_work: role === 'super_admin' ? 'Website Owner & Archival Custodian' : 'Archival Administrator',
                biography: 'Authorized Archival & Editorial Administrator.',
                areas_of_historical_interest: ['Suryavamsha Gajapathi Dynasties', 'Kakatiya Dynasty History'],
                languages_known: ['English', 'Telugu', 'Kannada', 'Odia', 'Hindi'],
                profile_visibility: 'members'
              }
            });
            setLoading(false);
          }
        } catch {
          if (isMounted) setLoading(false);
        }
      } else {
        // No Firebase user, check server session cookie
        fetchCurrentUser().catch(() => {});
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const setDirectUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const jsonRes = await safeParseJson(res);
      if (jsonRes.isHtml) {
        return { success: false, error: 'Server authentication unavailable on static hosting.' };
      }
      if (!jsonRes.ok) {
        return { success: false, error: 'Communication error during login.' };
      }
      if (!res.ok) {
        return { success: false, error: jsonRes.data?.error || 'Login failed.' };
      }
      setUser(jsonRes.data.user);
      return { success: true };
    } catch {
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
      const jsonRes = await safeParseJson(res);
      if (jsonRes.isHtml) {
        return { success: false, error: 'Server registration unavailable on static hosting.' };
      }
      if (!jsonRes.ok) {
        return { success: false, error: 'Communication error during registration.' };
      }
      if (!res.ok) {
        return { success: false, error: jsonRes.data?.error || 'Registration failed.' };
      }
      setUser(jsonRes.data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Network error during registration.' };
    }
  };

  const adminLogin = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string; user?: User; isStaticHost?: boolean }> => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const jsonRes = await safeParseJson(res);
      if (jsonRes.isHtml) {
        return { success: false, isStaticHost: true, error: 'Static host without Express runtime.' };
      }
      if (!jsonRes.ok) {
        return { success: false, error: 'Communication error with admin authentication service.' };
      }
      if (!res.ok) {
        return { success: false, error: jsonRes.data?.error || 'Admin login failed.' };
      }
      setUser(jsonRes.data.user);
      return { success: true, user: jsonRes.data.user };
    } catch {
      return { success: false, error: 'Network error communicating with authentication service.' };
    }
  };

  const adminRegister = async (
    formData: any
  ): Promise<{ success: boolean; error?: string; user?: User; isStaticHost?: boolean }> => {
    try {
      const res = await fetch('/api/auth/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const jsonRes = await safeParseJson(res);
      if (jsonRes.isHtml) {
        return { success: true, isStaticHost: true };
      }
      if (!jsonRes.ok) {
        return { success: false, error: 'Communication error during admin registration.' };
      }
      if (!res.ok) {
        return { success: false, error: jsonRes.data?.error || 'Admin account creation failed.' };
      }
      setUser(jsonRes.data.user);
      return { success: true, user: jsonRes.data.user };
    } catch {
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
      const jsonRes = await safeParseJson(res);
      if (jsonRes.isHtml) {
        const isOwner = email.toLowerCase().trim() === 'bgsathyaraju@gmail.com';
        return { eligible: isOwner, role: isOwner ? 'super_admin' : undefined };
      }
      if (!res.ok) {
        return { eligible: false, error: jsonRes.data?.error || 'Not authorized for admin registration.' };
      }
      return { eligible: true, role: jsonRes.data?.role };
    } catch {
      return { eligible: false, error: 'Network error verifying admin eligibility.' };
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
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
      const jsonRes = await safeParseJson(res);
      if (!res.ok) {
        return { success: false, error: jsonRes.data?.error || 'Failed to update profile.' };
      }
      if (user) {
        setUser({
          ...user,
          profile: jsonRes.data?.profile || {
            ...(user.profile || {
              user_id: user.id,
              full_name: user.email,
              gender: 'Prefer not to say',
              country: 'India',
              state_or_province: '',
              district: '',
              city_town_village: ''
            }),
            ...profileData
          }
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
        refreshUser: fetchCurrentUser,
        setDirectUser
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
