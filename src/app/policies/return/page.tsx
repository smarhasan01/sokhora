'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { RefreshCw, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

export default function ReturnPolicyPage() {
  const { isBn, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('returnPolicyTitle')}</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block mb-1">
              {isBn ? 'গ্রাহক অধিকার ও সুরক্ষা' : 'Customer Protection'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('returnPolicyTitle')}
            </h1>
            <p className="text-xs text-taupe-500 mt-1">
              {isBn ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬ • ৭ দিনের এক্সচেঞ্জ' : 'Last Updated: January 2026 • 7-Day Exchange'}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-charcoal-800 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '১. সহজ ৭ দিনের এক্সচেঞ্জ সুবিধা' : '1. 7-Day Hassle-Free Exchange'}
              </h2>
              <p>
                {isBn
                  ? 'শখোরা থেকে কেনা যেকোনো পণ্যে সাইজ বা রঙের পরিবর্তনের প্রয়োজন হলে পার্সেল পাওয়ার ৭ দিনের মধ্যে এক্সচেঞ্জ করার আবেদন করা যাবে।'
                  : 'Items purchased from SHOKHORA are eligible for exchange within 7 days of receiving the package for size or design adjustments.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '২. এক্সচেঞ্জের শর্তাবলী' : '2. Conditions for Return / Exchange'}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-charcoal-700 pl-2">
                <li>{isBn ? 'পণ্যটি অবশ্যই অব্যবহৃত ও অক্ষত অবস্থায় থাকতে হবে।' : 'The product must be unused and in original, undamaged condition.'}</li>
                <li>{isBn ? 'মূল প্যাকেজিং ও ট্যাগ সংযুক্ত থাকতে হবে।' : 'Original price tags and brand packaging must remain intact.'}</li>
                <li>{isBn ? 'অর্ডারের ক্যাশ মেমো বা ডিজিটাল ইনভয়েস দেখাতে হবে।' : 'A valid order number or digital receipt must be presented.'}</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '৩. ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্যের ক্ষেত্রে' : '3. Damaged or Defective Items'}
              </h2>
              <p>
                {isBn
                  ? 'ডেলিভারির সময় যদি কোনো পণ্য ক্ষতিগ্রস্ত বা ভুল পাওয়া যায়, ডেলিভারি রাইডারের উপস্থিতিতেই আমাদের হটলাইনে (01568923850) জানান। আমরা অবিলম্বে সম্পূর্ণ বিনামূল্যে প্রতিস্থাপন করব।'
                  : 'If an item arrives damaged or incorrect, notify our customer care hotline (01568923850) upon delivery. We will arrange a free immediate replacement.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
