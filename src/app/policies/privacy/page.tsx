'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { isBn, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('privacyPolicyTitle')}</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block mb-1">
              {isBn ? 'তথ্য সুরক্ষা ও গোপনীয়তা' : 'Data Privacy'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('privacyPolicyTitle')}
            </h1>
            <p className="text-xs text-taupe-500 mt-1">
              {isBn ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬ • বাংলাদেশ' : 'Last Updated: January 2026 • Bangladesh'}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-charcoal-800 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '১. আমরা যে তথ্য সংগ্রহ করি' : '1. Information We Collect'}
              </h2>
              <p>
                {isBn
                  ? 'অর্ডার প্রক্রিয়া এবং সঠিক ঠিকানায় পার্সেল পৌঁছে দেওয়ার জন্য আমরা আপনার নাম, ফোন নম্বর, ডেলিভারি ঠিকানা এবং ঐচ্ছিক ইমেইল সংগ্রহ করি।'
                  : 'To process orders and coordinate delivery, we collect your full name, phone number, physical address, and optional email address.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '২. তথ্যের নিরাপত্তা ও গোপনীয়তা' : '2. Data Protection Commitment'}
              </h2>
              <p>
                {isBn
                  ? 'শখোরা কোনো গ্রাহকের ব্যক্তিগত তথ্য তৃতীয় কোনো পক্ষের কাছে বিক্রি বা অপব্যবহার করে না। আপনার তথ্য শুধুমাত্র ডেলিভারি এবং কাস্টমার সাপোর্টের উদ্দেশ্যে ব্যবহৃত হয়।'
                  : 'SHOKHORA does not sell, rent, or trade your personal information. Customer data is strictly utilized for fulfillment, delivery logistics, and official store communication.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '৩. যোগাযোগ' : '3. Privacy Inquiries'}
              </h2>
              <p>
                {isBn
                  ? 'গোপনীয়তা সংক্রান্ত কোনো জিজ্ঞাসা থাকলে আমাদের ইমেইল করুন: info.shokhora@gmail.com অথবা কল করুন: 01568923850।'
                  : 'For any privacy-related questions or data deletion requests, email us at info.shokhora@gmail.com or call 01568923850.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
