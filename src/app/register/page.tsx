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
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full max-w-md bg-[#F6F7F8] rounded-3xl p-8 sm:p-10 border border-[#EAECEF] shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-44 h-12 mx-auto">
              <Image src="/images/shokhora-official-logo.png" alt="SHOKHORA" fill priority className="object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
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
              <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                {t('fullName')} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Nusrat Jahan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs focus:border-[#012D51] focus:outline-none"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                {t('phoneNumber')} *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs font-mono focus:border-[#012D51] focus:outline-none"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                {isBn ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs focus:border-[#012D51] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                {isBn ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *' : 'Password (min. 6 characters) *'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs focus:border-[#012D51] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs focus:border-[#012D51] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 btn-press"
            >
              <span>{loading ? (isBn ? 'প্রসেসিং হচ্ছে...' : 'Creating Account...') : (isBn ? 'অ্যাকাউন্ট খুলুন' : 'Register Customer Account')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#EAECEF] text-center">
            <p className="text-xs text-stone-600">
              {isBn ? 'পূর্বেই অ্যাকাউন্ট খুলেছেন?' : 'Already have an account?'}{' '}
              <Link
                href="/login"
                className="font-bold text-[#012D51] hover:text-[#C78703] underline transition-colors"
              >
                {isBn ? 'সাইন ইন করুন' : 'Sign In'}
              </Link>
            </p>
          </div>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C78703]" />
            <span>{isBn ? 'কাস্টমার প্রোফাইল ডেটা সুরক্ষিত' : 'Secure Customer Account Data'}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
