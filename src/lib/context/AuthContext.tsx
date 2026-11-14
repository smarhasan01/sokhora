'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, isFirebaseConfigured } from '@/lib/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phone?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, pass: string, fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsAdmin: () => void;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_AUTH_KEY = 'shokhora_auth_user_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase Auth is ready and configured
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          // Check if admin email or custom claim
          const adminEmails = ['admin@shokhora.com', 'owner@shokhora.com'];
          const isAdminUser = Boolean(
            fbUser.email && (adminEmails.includes(fbUser.email) || fbUser.email.endsWith('@shokhora.com'))
          );

          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Customer',
            isAdmin: isAdminUser,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Offline / Local mock mode
      try {
        const saved = localStorage.getItem(LOCAL_AUTH_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed reading local auth:', e);
      }
      setLoading(false);
    }
  }, []);

  const saveLocalUser = (u: AuthUser | null) => {
    setUser(u);
    if (typeof window !== 'undefined') {
      if (u) {
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(u));
      } else {
        localStorage.removeItem(LOCAL_AUTH_KEY);
      }
    }
  };

  const login = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    } else {
      // Local demo login
      const isAdminUser = email.toLowerCase().includes('admin') || email.toLowerCase().endsWith('@shokhora.com');
      const mockUser: AuthUser = {
        uid: `usr-${Date.now()}`,
        email,
        displayName: isAdminUser ? 'SHOKHORA Admin' : email.split('@')[0],
        isAdmin: isAdminUser,
      };
      saveLocalUser(mockUser);
      return { success: true };
    }
  };

  const register = async (email: string, pass: string, fullName: string, phone?: string) => {
    if (isFirebaseConfigured && auth) {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Registration failed' };
      }
    } else {
      const mockUser: AuthUser = {
        uid: `usr-${Date.now()}`,
        email,
        displayName: fullName,
        phone,
        isAdmin: false,
      };
      saveLocalUser(mockUser);
      return { success: true };
    }
  };

  const loginAsAdmin = () => {
    const adminUser: AuthUser = {
      uid: 'admin-master-001',
      email: 'admin@shokhora.com',
      displayName: 'System Administrator',
      isAdmin: true,
    };
    saveLocalUser(adminUser);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    saveLocalUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginAsAdmin,
        logout,
        isAdmin: Boolean(user?.isAdmin),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
