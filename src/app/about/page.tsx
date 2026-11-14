'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Sparkles, Heart, Award, Users, ChevronRight, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { isBn, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('aboutUsTitle')}</span>
        </nav>

        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            {isBn ? 'ঐতিহ্য ও লক্ষ্য' : 'Our Heritage & Vision'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-950">
            {isBn ? 'শখোরা (SHOKHORA) সম্পর্কে' : 'About SHOKHORA (শখোরা)'}
          </h1>
          <p className="text-sm text-taupe-700">
            {t('brandTagline')}
          </p>
        </div>

        {/* Hero image with original brand */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-taupe-200 bg-white">
          <Image
            src="/images/Shokhora Facebook Cover Photo.jpg"
            alt="SHOKHORA Bangladesh"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Brand Story Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8 text-charcoal-800 leading-relaxed text-sm">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-950">
              {isBn ? 'শখোরার পেছনের গল্প' : 'The Story of SHOKHORA'}
            </h2>
            <p>
              {isBn ? (
                <>
                  ঢাকায় প্রতিষ্ঠিত <strong>শখোরা (SHOKHORA)</strong> একটি আধুনিক বাংলাদেশি লাইফস্টাইল ব্র্যান্ড। আমাদের মূল লক্ষ্য—দেশের মানুষকে নিখুঁত কারুশিল্প, আরামদায়ক ফ্যাব্রিক এবং ক্লাসি ডিজাইনের দৈনন্দিন পণ্য উপহার দেওয়া।
                </>
              ) : (
                <>
                  Born in Dhaka, Bangladesh, <strong>SHOKHORA (শখোরা)</strong> was founded on a simple yet timeless belief: every individual deserves everyday products that blend authentic craftsmanship, tactile luxury, and effortless elegance.
                </>
              )}
            </p>
            <p>
              {isBn ? (
                <>
                  ১০০% খাঁটি মালবেরি সিল্ক স্ক্রাঞ্চি থেকে শুরু করে কোমল বাচ্চাদের হেয়ার ক্লিপ, অ্যান্টিক ব্রাস জুয়েলারি, ভেষজ অর্গানিক লিপবাম এবং সুগন্ধি মোমবাতি—প্রতিটি পণ্য আমরা যত্ন সহকারে তৈরি ও কিউরেট করি।
                </>
              ) : (
                <>
                  From 100% genuine mulberry silk scrunchies that pamper hair without breakage, to delicate hair clips for children and artisanal brass jewellery shaped by heritage artisans, we curate items that bring joy to daily routines.
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-taupe-200">
            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Sparkles className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">
                {isBn ? 'বিশুদ্ধ গুণমান' : 'Pure Quality'}
              </h3>
              <p className="text-xs text-charcoal-600">
                {isBn
                  ? 'আমরা খাঁটি প্রাকৃতিক উপাদান এবং দীর্ঘস্থায়ী উপকরণ ব্যবহার করি।'
                  : 'We select premium natural fabrics, non-toxic organic skincare botanicals, and long-lasting materials.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Heart className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">
                {isBn ? 'কারিগরদের ভালোবাসা' : 'Handcrafted Passion'}
              </h3>
              <p className="text-xs text-charcoal-600">
                {isBn
                  ? 'আমাদের প্রতিটি পণ্য স্থানীয় দক্ষ কারিগরদের ভালোবাসা ও মেধার প্রতীক।'
                  : 'Every piece tells a story of local craftsmanship, ethical sourcing, and artistic dedication.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Users className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">
                {isBn ? 'গ্রাহক সন্তুষ্টি' : 'Customer First'}
              </h3>
              <p className="text-xs text-charcoal-600">
                {isBn
                  ? 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি, ৭ দিনের এক্সচেঞ্জ এবং সার্বক্ষণিক গ্রাহক সেবা।'
                  : 'Delivering transparency through nationwide cash on delivery, 7-day exchange, and genuine customer care.'}
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors shadow-md"
            >
              <span>{t('shopNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
