'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isBn, t } = useLanguage();

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
      router.push('/account');
    } else {
      setError(res.error || (isBn ? 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।' : 'Invalid email or password.'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-44 h-12 mx-auto mb-2">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
              {isBn ? 'গ্রাহক লগইন' : 'Customer Sign In'}
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto font-mono">
              {isBn
                ? 'আপনার অর্ডার হিস্ট্রি, ট্র্যাকিং এবং ডেলিভারি ঠিকানা দেখতে সাইন ইন করুন।'
                : 'Sign in to access your orders, saved addresses, and wishlist.'}
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-2 focus:ring-charcoal-900 focus:outline-none transition-all"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                  {isBn ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-terracotta-600 hover:text-terracotta-700 hover:underline font-medium"
                >
                  {isBn ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-2 focus:ring-charcoal-900 focus:outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? (isBn ? 'যাচাই করা হচ্ছে...' : 'Verifying...') : (isBn ? 'লগইন করুন' : 'Sign In')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Link for Customers */}
          <div className="pt-4 border-t border-taupe-200 text-center">
            <p className="text-xs text-charcoal-600">
              {isBn ? 'কোনো কাস্টমার অ্যাকাউন্ট নেই?' : "Don't have a customer account?"}{' '}
              <Link
                href="/register"
                className="font-bold text-charcoal-900 hover:text-terracotta-600 underline transition-colors"
              >
                {isBn ? 'অ্যাকাউন্ট খুলুন' : 'Create Account'}
              </Link>
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-taupe-500">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>{isBn ? 'সুরক্ষিত গ্রাহক অ্যাকাউন্ট পোর্টাল' : 'Secure Customer Account Portal'}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
