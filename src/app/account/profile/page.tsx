'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountNav from '@/components/account/AccountNav';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { User, Phone, Mail, Calendar, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { isBn, t } = useLanguage();

  const [displayName, setDisplayName] = useState(user?.displayName || 'Nusrat Jahan');
  const [phone, setPhone] = useState(user?.phone || '01712345678');
  const [email, setEmail] = useState(user?.email || 'customer@shokhora.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link href="/account" className="hover:text-charcoal-900">{t('myAccount')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('profileSettings')}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 mb-6">
          {t('profileSettings')}
        </h1>

        <AccountNav />

        <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-taupe-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-charcoal-900">
              {isBn ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
            </h2>
            <p className="text-xs text-taupe-600 mt-1">
              {isBn
                ? 'আপনার নাম ও যোগাযোগের তথ্য আপডেট করুন যাতে দ্রুত ডেলিভারি সম্পন্ন করা যায়।'
                : 'Update your personal details for quick delivery processing and order receipts.'}
            </p>
          </div>

          {saved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{isBn ? 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!'}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                {t('fullName')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-1 focus:ring-charcoal-900 focus:outline-none"
                />
                <User className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                {t('phoneNumber')}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm font-mono focus:ring-1 focus:ring-charcoal-900 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-1 focus:ring-charcoal-900 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors shadow-sm"
              >
                {t('save')}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-taupe-100 flex items-center gap-2 text-xs text-taupe-500">
            <ShieldCheck className="w-4 h-4 text-sage-600" />
            <span>{isBn ? 'গ্রাহক অ্যাকাউন্ট রোল: Customer' : 'Customer Account Role: Customer'}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
