'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function CampaignBanner() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-[#012D51]/20 group bg-[#012D51]">
        {/* Official SHOKHORA Facebook Cover Banner Image */}
        <div className="relative w-full aspect-[2.6/1] min-h-[180px] sm:min-h-[260px] lg:min-h-[340px]">
          <Image
            src="/images/shokhora-facebook-banner.jpg"
            alt="SHOKHORA — Little Things, Big Love"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />

          {/* Transparent Clickable Link to Shop */}
          <Link
            href="/shop"
            className="absolute inset-0 z-10"
            aria-label="Order Now on SHOKHORA"
          />
        </div>

        {/* Bottom Quick-Action Strip */}
        <div className="bg-[#012D51] text-white px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#01223D]">
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="w-4 h-4 text-[#C78703]" />
            <span className="font-semibold">
              {isBn
                ? 'আপনার সোনামণির জন্য ভালোবাসায় তৈরি সুন্দর পোশাক ও আকর্ষণীয় এক্সেসরিজ'
                : 'Handcrafted with love for your little ones • Little Things, Big Love'}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-white/70 flex items-center gap-1.5 hidden md:flex">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C78703]" />
              <span>{isBn ? 'দেশজুড়ে ক্যাশ অন ডেলিভারি' : 'Cash on Delivery Nationwide'}</span>
            </span>

            <Link
              href="/shop?filter=sale"
              className="inline-flex items-center gap-1.5 bg-[#C78703] hover:bg-[#B07502] text-white px-4 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors"
            >
              <span>{isBn ? 'অর্ডার করুন' : 'Order Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
