'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { FileText, Shield, ChevronRight } from 'lucide-react';

export default function TermsConditionsPage() {
  const { isBn, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('termsConditionsTitle')}</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block mb-1">
              {isBn ? 'সেবার শর্তাবলী' : 'Service Agreement'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('termsConditionsTitle')}
            </h1>
            <p className="text-xs text-taupe-500 mt-1">
              {isBn ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬ • বাংলাদেশ' : 'Last Updated: January 2026 • Bangladesh'}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-charcoal-800 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '১. সেবার সাধারণ নিয়মাবলী' : '1. Overview of Terms'}
              </h2>
              <p>
                {isBn
                  ? 'শখোরা (SHOKHORA) ওয়েবসাইট ব্যবহার ও পণ্য অর্ডারের মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মতি প্রকাশ করছেন।'
                  : 'By browsing the SHOKHORA platform and placing orders, you agree to comply with our commercial terms and operational standards.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '২. মূল্য ও স্টক উপলব্ধতা' : '2. Pricing and Product Availability'}
              </h2>
              <p>
                {isBn
                  ? 'ওয়েবসাইটে প্রদর্শিত সকল মূল্য বাংলাদেশি টাকা (৳) তে হিসাবকৃত। স্টক সীমাবদ্ধতার কারণে কোনো পণ্যের অর্ডার সাময়িকভাবে অনুপলব্ধ হতে পারে।'
                  : 'All product prices are quoted in Bangladeshi Taka (৳). We reserve the right to modify or adjust pricing without prior notice due to raw material and artisan costs.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '৩. কপিরাইট ও মেধাস্বত্ব' : '3. Intellectual Property'}
              </h2>
              <p>
                {isBn
                  ? 'শখোরার লোগো, পণ্যের ছবি, বিবরণ ও ব্র্যান্ডের সমস্ত উপাদান শখোরার সংরক্ষিত মেধাস্বত্ব। অনুমতি ব্যতিরেকে বাণিজ্যিক উদ্দেশ্যে এগুলো ব্যবহার করা আইনত দণ্ডনীয়।'
                  : 'The SHOKHORA logo, brand typography, photography, and editorial designs remain the protected intellectual property of SHOKHORA Bangladesh.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
