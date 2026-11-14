'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export default function HeroBanner() {
  const { isBn, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-taupe-200/80">
      {/* Subtle luxury ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
            {/* Seasonal Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-300/80 text-charcoal-800 text-xs font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="tracking-widest uppercase text-[10px] font-bold text-stone-500">
                {isBn ? 'নতুন সিজন' : 'New Season'}
              </span>
              <span className="text-stone-300">|</span>
              <span className="font-serif italic text-charcoal-900">
                {isBn ? 'শখোরা সিগনেচার কালেকশন' : 'SHOKHORA Signature Edit'}
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#191817] tracking-tight leading-[1.12]">
                {isBn ? (
                  <>
                    প্রতিদিনের স্নিগ্ধ <br />
                    <span className="italic font-normal text-stone-600">নান্দনিকতার ছোঁয়া।</span>
                  </>
                ) : (
                  <>
                    Elegance Woven Into <br />
                    <span className="italic font-normal text-stone-600">Every Lifestyle Detail.</span>
                  </>
                )}
              </h1>
              
              <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-stone-500">
                {isBn ? 'আপনার পছন্দ, আমাদের ভালোবাসা।' : 'Your Choice, Our Passion.'}
              </p>
            </div>

            {/* Refined Description */}
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {isBn
                ? 'খাঁটি মালবেরি সিল্ক স্ক্রাঞ্চি, শিশুদের সুন্দর হেয়ার ক্লিপ, অ্যান্টিক ব্রাস জুয়েলারি এবং অর্গানিক বিউটি এসেনশিয়ালসের এক অনন্য সমাহার — তৈরি হয়েছে আধুনিক রুচিশীল মানুষের জন্য।'
                : 'Discover handcrafted mulberry silk scrunchies, artisanal brass jewellery, delicate hair accessories for children, and botanical cosmetics curated for conscious daily living across Bangladesh.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#191817] text-white hover:bg-stone-800 text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>{isBn ? 'কালেকশন দেখুন' : 'Explore Collections'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/category/scrunchies-hair-accessories"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow"
              >
                <span>{isBn ? 'সিল্ক স্ক্রাঞ্চি' : 'Silk Scrunchies'}</span>
              </Link>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200/90 text-[11px] sm:text-xs text-stone-600">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                <div className="p-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{isBn ? 'সারাদেশে ডেলিভারি' : 'Nationwide COD'}</p>
                  <p className="text-[10px] text-stone-500">{isBn ? '৬৪টি জেলায়' : '64 Districts'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                <div className="p-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{isBn ? '১০০% খাঁটি মান' : '100% Authentic'}</p>
                  <p className="text-[10px] text-stone-500">{isBn ? 'যাচাইকৃত পণ্য' : 'Guaranteed'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                <div className="p-2 rounded-full bg-stone-100 text-stone-800 border border-stone-300/60 shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{isBn ? 'সহজ এক্সচেঞ্জ' : '7 Days Return'}</p>
                  <p className="text-[10px] text-stone-500">{isBn ? 'দরজায় এক্সচেঞ্জ' : 'Doorstep Policy'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition: Multi-layered Editorial Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Main Primary Editorial Image */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                <Image
                  src="/images/categories/scrunchies.jpg"
                  alt="SHOKHORA Handcrafted Silk & Lifestyle"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Embedded Headline on Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white border border-white/30 mb-2">
                    {isBn ? 'হস্তনির্মিত পিওর সিল্ক' : 'Pure Mulberry Silk'}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-white">
                    {isBn ? 'শখোরা লাক্সারি হেয়ার এক্সেসরিজ' : 'The Silk & Hair Accessory Edit'}
                  </h3>
                  <p className="text-xs text-stone-200 mt-1">
                    {isBn ? 'মূল্য শুরু ৳২৬০ থেকে' : 'Starting from ৳260'}
                  </p>
                </div>
              </div>

              {/* Floating Accent Card 1: Review Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-900">4.9 / 5.0</span>
                    <span className="text-[10px] text-stone-400">(1,250+ reviews)</span>
                  </div>
                  <p className="text-[11px] font-medium text-stone-600">
                    {isBn ? 'গ্রাহকদের পছন্দের শীর্ষে' : 'Loved Across Bangladesh'}
                  </p>
                </div>
              </div>

              {/* Floating Accent Card 2: Artisan Tag */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200 items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src="/images/categories/jewellery.jpg"
                    alt="Jewellery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                    {isBn ? 'হাতে তৈরি গহনা' : 'Artisanal Brass'}
                  </p>
                  <p className="text-xs font-semibold text-stone-900">
                    {isBn ? 'ব্রাস ও মুক্তার কালেকশন' : 'Heritage Chokers & Pearls'}
                  </p>
                  <Link
                    href="/category/jewellery-fashion-accessories"
                    className="text-[11px] text-stone-600 hover:text-stone-950 font-medium inline-flex items-center gap-1 mt-0.5"
                  >
                    {isBn ? 'কালেকশন দেখুন' : 'View Edit'} &rarr;
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
