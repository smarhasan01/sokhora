'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { isBn, t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(isBn ? 'পাসওয়ার্ড দুটি মেলেনি।' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError(isBn ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    // Public registration always assigns customer role
    const res = await register(email, password, fullName, phone);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || (isBn ? 'অ্যাকাউন্ট তৈরি করা যায়নি।' : 'Failed to create customer account.'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-44 h-12 mx-auto">
              <Image src="/images/Logo-01.png" alt="SHOKHORA" fill priority className="object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
              {isBn ? 'নতুন কাস্টমার অ্যাকাউন্ট' : 'Create Customer Account'}
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              {isBn
                ? 'অর্ডার ট্র্যাকিং ও দ্রুত ডেলিভারির জন্য আপনার তথ্য দিয়ে অ্যাকাউন্ট তৈরি করুন।'
                : 'Join SHOKHORA to easily track orders, save shipping details, and access member perks.'}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                {t('fullName')} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Nusrat Jahan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                {t('phoneNumber')} *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                {isBn ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                {isBn ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *' : 'Password (min. 6 characters) *'}
              </label>
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

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FF5B37] hover:bg-[#FA4A23] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              <span>{loading ? (isBn ? 'প্রসেসিং হচ্ছে...' : 'Creating Account...') : (isBn ? 'অ্যাকাউন্ট খুলুন' : 'Register Customer Account')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-taupe-200 text-center">
            <p className="text-xs text-charcoal-600">
              {isBn ? 'পূর্বেই অ্যাকাউন্ট খুলেছেন?' : 'Already have an account?'}{' '}
              <Link
                href="/login"
                className="font-bold text-charcoal-900 hover:text-terracotta-600 underline transition-colors"
              >
                {isBn ? 'সাইন ইন করুন' : 'Sign In'}
              </Link>
            </p>
          </div>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-taupe-500">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>{isBn ? 'কাস্টমার প্রোফাইল ডেটা সুরক্ষিত' : 'Secure Customer Account Data'}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
