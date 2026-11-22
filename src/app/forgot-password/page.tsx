'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { isBn, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <div className="w-full max-w-md bg-[#F6F7F8] rounded-3xl p-8 sm:p-10 border border-[#EAECEF] shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-44 h-12 mx-auto mb-2">
              <Image
                src="/images/shokhora-official-logo.png"
                alt="SHOKHORA"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
              {isBn ? 'পাসওয়ার্ড পুনরুদ্ধার' : 'Reset Your Password'}
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto font-mono">
              {isBn
                ? 'আপনার রেজিস্টার্ড ইমেইল অ্যাড্রেস লিখুন। আমরা পাসওয়ার্ড রিসেট লিংক পাঠিয়ে দেব।'
                : 'Enter your registered customer email address and we will send you password reset instructions.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-emerald-950">
                {isBn ? 'রিসেট লিংক পাঠানো হয়েছে!' : 'Reset Link Sent!'}
              </h2>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {isBn
                  ? `আমরা ${email} ঠিকানায় নির্দেশনাবলী পাঠিয়েছি। অনুগ্রহ করে আপনার ইনবক্স চেক করুন।`
                  : `Instructions have been sent to ${email}. Please check your email inbox.`}
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#012D51] hover:text-[#C78703] underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'লগইন পেজে ফিরে যান' : 'Back to Sign In'}</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1.5 font-mono">
                  {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs sm:text-sm focus:border-[#012D51] focus:outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 btn-press"
              >
                <span>{loading ? (isBn ? 'পাঠানো হচ্ছে...' : 'Sending...') : (isBn ? 'রিসেট লিংক পাঠান' : 'Send Reset Link')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EAECEF] text-center">
            <Link
              href="/login"
              className="text-xs font-bold text-[#012D51] hover:text-[#C78703] transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isBn ? 'লগইন পেজে ফিরে যান' : 'Back to Customer Sign In'}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
