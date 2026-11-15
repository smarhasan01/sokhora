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
      <div className="relative rounded-3xl bg-[#F4F5F7] border border-gray-200/90 overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="max-w-xl space-y-4 text-center lg:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#FF5B37] font-mono text-[11px] font-bold border border-gray-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {isBn ? 'বিশেষ সিজনাল অফার' : 'Limited Time Campaign'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {isBn ? 'বাছাইকৃত পণ্যে দারুণ সাশ্রয়' : 'Save Big on Selected Lifestyle Items'}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {isBn
              ? 'মালবেরি সিল্ক স্ক্রাঞ্চি, হস্তনির্মিত গহনা ও কসমেটিক্সে আকর্ষণীয় ছাড় উপভোগ করুন। প্রতিটি পণ্যে নিখুঁত কারুকাজ ও প্রিমিয়াম কোয়ালিটি।'
              : 'Get more discount as you browse through our handcrafted silk accessories, brass jewellery, and organic collections.'}
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF5B37] text-white hover:bg-[#FA4A23] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
            >
              <span>{isBn ? 'কালেকশন দেখুন' : 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-white border-4 border-white shrink-0">
          <Image
            src="/images/categories/fashion.jpg"
            alt="Selected Items Sale"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-[#FF5B37] text-white font-mono font-bold text-xs px-3 py-1.5 rounded-lg shadow-md">
            {isBn ? '৩০% পর্যন্ত ছাড়' : 'Up to 30% OFF'}
          </div>
        </div>

      </div>
    </section>
  );
}
