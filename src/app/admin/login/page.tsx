'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertTriangle, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated as admin, go straight to dashboard
  React.useEffect(() => {
    if (isAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await adminLogin(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setError(
        res.error ||
          'Access Denied: You do not have permission to access the SHOKHORA Admin Portal.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center items-center p-4 selection:bg-sage-600 selection:text-white">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-charcoal-900 via-charcoal-950 to-black opacity-80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <div className="relative w-44 h-14 mx-auto bg-white/5 rounded-2xl p-2 border border-white/10 backdrop-blur-md">
            <Image
              src="/images/Logo-01.png"
              alt="SHOKHORA"
              fill
              priority
              className="object-contain px-2"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-950 border border-sage-800 text-sage-300 text-[11px] font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5 text-sage-400" />
            <span>Private Admin Portal</span>
          </div>

          <h1 className="text-xl font-serif font-bold text-white tracking-tight">
            Restricted Staff Access
          </h1>
          <p className="text-xs text-taupe-400 leading-relaxed max-w-xs mx-auto">
            Authorized personnel only. Access is monitored and verified against owner permissions.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-950/60 border border-rose-800 rounded-2xl text-rose-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-taupe-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="owner@shokhora.com or admin@shokhora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-sage-500 focus:outline-none transition-all placeholder:text-charcoal-500"
              />
              <Mail className="w-4 h-4 text-charcoal-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-taupe-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-white text-xs sm:text-sm focus:ring-2 focus:ring-sage-500 focus:outline-none transition-all placeholder:text-charcoal-500"
              />
              <Lock className="w-4 h-4 text-charcoal-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-sage-600 hover:bg-sage-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 tracking-wide"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Notice */}
        <div className="pt-4 border-t border-charcoal-800 text-center">
          <p className="text-[11px] text-charcoal-400 flex items-center justify-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-sage-500" />
            <span>Unauthorized access attempts are logged and denied.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
