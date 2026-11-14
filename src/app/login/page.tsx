'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  const handleDemoAdmin = () => {
    loginAsAdmin();
    router.push('/admin');
  };

  const handleDemoCustomer = async () => {
    await login('customer@example.com', 'password123');
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-taupe-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-40 h-12 mx-auto">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-serif font-bold text-charcoal-950">Welcome Back</h1>
            <p className="text-xs text-charcoal-500">
              Sign in to manage your orders, saved addresses, and receipts.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-4 border-t border-taupe-200 space-y-2">
            <p className="text-[11px] text-center text-charcoal-500 font-medium">Quick One-Click Demo Access:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="py-2 px-3 rounded-lg border border-taupe-300 bg-taupe-50 hover:bg-taupe-100 text-charcoal-800 text-[11px] font-semibold flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-sage-600" /> Demo Customer
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2 px-3 rounded-lg border border-charcoal-800 bg-charcoal-900 hover:bg-charcoal-800 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sage-400" /> Demo Admin
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-charcoal-600">
            Don't have an account yet?{' '}
            <Link href="/register" className="font-semibold text-charcoal-950 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
