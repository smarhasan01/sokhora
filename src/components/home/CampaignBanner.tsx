'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CampaignBanner() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl bg-[#F6F7F8] border border-[#EAECEF] overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-4 text-center lg:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#012D51] font-mono text-[11px] font-bold border border-[#EAECEF] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
            <span>{isBn ? 'সীমিত সময়ের স্পেশাল অফার' : 'Limited Time Campaign'}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#012D51] leading-tight">
            {isBn ? 'আপনার প্রিয় পণ্যে ৫০% পর্যন্ত ছাড়' : 'Up to 50% OFF on your favorite items'}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isBn
              ? 'সীমিত সময়ের সুযোগ — স্টক শেষ হওয়ার আগেই আপনার পছন্দের সিল্ক স্ক্রাঞ্চি, ব্রাস জুয়েলারি ও লাইফস্টাইল পণ্য সংগ্রহ করুন!'
              : 'Limited time only — grab your deal before it’s gone! Handcrafted silk scrunchies, brass jewellery, and everyday essentials.'}
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md btn-press group"
            >
              <span>{isBn ? 'কেনাকাটা করুন ও সাশ্রয় পান' : 'Shop Now & Save Big!'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Lifestyle Photography with subtle hover zoom */}
        <div className="relative w-72 h-64 sm:w-88 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-white border-4 border-white shrink-0 group">
          <Image
            src="/images/categories/fashion.jpg"
            alt="Up to 50% OFF on your favorite items"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-[#012D51] text-white font-mono font-bold text-xs px-3 py-1.5 rounded-full shadow-md border border-[#C78703]/50">
            {isBn ? '৫০% পর্যন্ত ছাড়' : 'Up to 50% OFF'}
          </div>
        </div>

      </div>
    </section>
  );
}
