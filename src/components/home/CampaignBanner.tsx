'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export default function CampaignBanner() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#012D51] via-[#023E6E] to-[#01223D] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-lg border border-[#012D51]/50 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Glow Effects */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#C78703]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        {/* Text Details */}
        <div className="relative z-10 space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#F6DDAB] border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
            <span>{isBn ? 'বিশেষ সিজনাল ক্যাম্পেইন' : 'Seasonal Special Campaign'}</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            {isBn ? (
              <>
                আপনার পছন্দের পণ্যে{' '}
                <span className="text-[#F6DDAB]">৫০% পর্যন্ত ছাড়!</span>
              </>
            ) : (
              <>
                Up to <span className="text-[#F6DDAB]">50% OFF</span> on your favorite items
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {isBn
              ? 'প্রিমিয়াম সিল্ক স্ক্রাঞ্চি, কোমল বাচ্চাদের হেয়ার ক্লিপস এবং আরামদায়ক খাদি ফ্যাশনে সীমিত সময়ের অফার।'
              : 'Limited-time discounts on genuine mulberry silk scrunchies, kids hair accessories, and elegant fashion.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              href="/shop?filter=sale"
              className="inline-flex items-center gap-2 bg-[#C78703] hover:bg-[#B07502] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group"
            >
              <span>{isBn ? 'এখনই কিনুন ও ছাড় পান' : 'Shop Now & Save'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs text-white/70 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C78703]" />
              <span>{isBn ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on Delivery Available'}</span>
            </span>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-white/10 p-2 backdrop-blur-xs border border-white/20 shadow-xl shrink-0">
          <Image
            src="/images/products/prod-001.jpg"
            alt="Promotion"
            fill
            sizes="240px"
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
