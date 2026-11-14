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
import { AdminMember, UserRole } from '@/types';
import { isAuthorizedAdmin } from '@/lib/db/store';

export interface CustomerAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phone?: string;
  role: 'customer';
}

interface AuthContextType {
  // Customer authentication (Storefront only)
  user: CustomerAuthUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, pass: string, fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Dedicated Private Admin authentication (Separate session)
  adminUser: AdminMember | null;
  isAdmin: boolean;
  isOwner: boolean;
  adminLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string; member?: AdminMember }>;
  adminLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CUSTOMER_SESSION_KEY = 'shokhora_customer_session_v2';
const ADMIN_SESSION_KEY = 'shokhora_admin_session_v2';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerAuthUser | null>(null);
  const [adminUser, setAdminUser] = useState<AdminMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore sessions on mount
  useEffect(() => {
    // 1. Restore Customer session
    if (typeof window !== 'undefined') {
      try {
        const savedCustomer = localStorage.getItem(CUSTOMER_SESSION_KEY);
        if (savedCustomer) {
          const parsed = JSON.parse(savedCustomer);
          setUser({ ...parsed, role: 'customer' });
        }

        const savedAdmin = localStorage.getItem(ADMIN_SESSION_KEY);
        if (savedAdmin) {
          const parsedAdmin: AdminMember = JSON.parse(savedAdmin);
          // Verify with store that this admin was not revoked
          const check = isAuthorizedAdmin(parsedAdmin.email);
          if (check.authorized && check.member) {
            setAdminUser(check.member);
          } else {
            localStorage.removeItem(ADMIN_SESSION_KEY);
            setAdminUser(null);
          }
        }
      } catch (e) {
        console.error('Failed restoring auth sessions:', e);
      }
    }

    // 2. Firebase Auth state sync if configured
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || 'Customer',
            role: 'customer',
          });
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Customer Login (Storefront)
  const login = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, pass);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed.' };
      }
    } else {
      // Local customer account
      const customerUser: CustomerAuthUser = {
        uid: `cust-${Date.now()}`,
        email: cleanEmail,
        displayName: cleanEmail.split('@')[0],
        role: 'customer',
      };
      setUser(customerUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(customerUser));
      }
      return { success: true };
    }
  };

  // Customer Registration (Always role 'customer')
  const register = async (email: string, pass: string, fullName: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass || !fullName) {
      return { success: false, error: 'Please provide all required fields.' };
    }

    if (isFirebaseConfigured && auth) {
      try {
        await createUserWithEmailAndPassword(auth, cleanEmail, pass);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Registration failed.' };
      }
    } else {
      const newCustomer: CustomerAuthUser = {
        uid: `cust-${Date.now()}`,
        email: cleanEmail,
        displayName: fullName,
        phone,
        role: 'customer',
      };
      setUser(newCustomer);
      if (typeof window !== 'undefined') {
        localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(newCustomer));
      }
      return { success: true };
    }
  };

  // Customer Logout
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Firebase signout error:', e);
      }
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CUSTOMER_SESSION_KEY);
    }
  };

  // Private Admin Login (Strictly verifies against authorized admin_team)
  const adminLogin = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) {
      return { success: false, error: 'Please enter administrative email and password.' };
    }

    // Server/store check for authorized admin
    const check = isAuthorizedAdmin(cleanEmail);
    if (!check.authorized || !check.member) {
      return {
        success: false,
        error: 'Access Denied: You do not have permission to access the SHOKHORA Admin Portal. Please contact the website owner.',
      };
    }

    // Set authenticated admin session
    setAdminUser(check.member);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(check.member));
    }

    return { success: true, member: check.member };
  };

  // Private Admin Logout
  const adminLogout = async () => {
    setAdminUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  };

  const isAdmin = Boolean(adminUser && adminUser.status === 'active');
  const isOwner = Boolean(adminUser && adminUser.role === 'owner' && adminUser.status === 'active');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        adminUser,
        isAdmin,
        isOwner,
        adminLogin,
        adminLogout,
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
