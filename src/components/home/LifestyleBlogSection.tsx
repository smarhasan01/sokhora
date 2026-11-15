'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default function LifestyleBlogSection() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header matching reference */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {isBn ? 'লাইফস্টাইল জার্নাল ও টিপস' : 'Lifestyle & Style Journal'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBn ? 'সিল্ক কেয়ার, রূপচর্চা ও ফ্যাশন নিয়ে আমাদের বিশেষ আয়োজন' : 'Stay up to date with the latest trends, styling guides, and hair care rituals'}
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-[#FF5B37] hover:underline flex items-center gap-1"
        >
          <span>{isBn ? 'সবগুলো দেখুন' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Large Featured Article Card as in Reference */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            <Image
              src="/images/categories/scrunchies.jpg"
              alt="Mulberry Silk Care"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-[#FF5B37] text-white text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-md shadow">
              {isBn ? 'সিল্ক গাইড' : 'Hair Health'}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>14 Nov 2026</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>4 min read</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#FF5B37] transition-colors">
              {isBn
                ? 'মালবেরি সিল্ক কেন চুলের জন্য সেরা? জেনে নিন দৈনন্দিন যত্নের উপায়'
                : 'Why Pure 19-Momme Mulberry Silk is the Ultimate Hair Savior'}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
              {isBn
                ? 'সাধারণ সুতি বা পলিয়েস্টারের হেয়ার টাই ব্যবহারের ফলে চুলে টান পড়ে এবং আগা ফেটে যায়। খাঁটি মালবেরি সিল্কের পিচ্ছিল গঠন চুলকে সুরক্ষিত রাখে ও ফ্রিজ দূর করে।'
                : 'Unlike regular cotton or synthetic bands that cause friction and breakage, pure silk keeps hair moisture intact and glides effortlessly without causing creases or headaches.'}
            </p>

            <div className="pt-2">
              <Link
                href="/category/scrunchies-hair-accessories"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5B37] group-hover:underline"
              >
                <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read Full Guide'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Stack of 3 Articles as in Reference */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Item 1 */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#FF5B37]/40 hover:shadow-sm transition-all group space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF0ED] text-[#FF5B37]">
              {isBn ? 'জুয়েলারি' : 'Jewellery'}
            </span>
            <Link href="/category/jewellery-fashion-accessories" className="block">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5B37] transition-colors line-clamp-2">
                {isBn
                  ? 'ঐতিহ্যবাহী ব্রাস গহনার যত্ন: যেভাবে নতুনের মতো চকচকে রাখবেন'
                  : 'How to Care for Handcrafted Antique Brass & Pearl Jewellery'}
              </h4>
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">12 Nov 2026 &bull; 3 min read</p>
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#FF5B37]/40 hover:shadow-sm transition-all group space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF0ED] text-[#FF5B37]">
              {isBn ? 'কিডস কেয়ার' : 'Kids Care'}
            </span>
            <Link href="/category/kids-hairbands-clips" className="block">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5B37] transition-colors line-clamp-2">
                {isBn
                  ? 'শিশুদের নরম চুলের জন্য নিরাপদ হেয়ার ক্লিপ নির্বাচন করার সহজ উপায়'
                  : 'How to Choose the Most Gentle Hair Clips & Bows for Toddlers'}
              </h4>
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">10 Nov 2026 &bull; 2 min read</p>
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-[#FF5B37]/40 hover:shadow-sm transition-all group space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF0ED] text-[#FF5B37]">
              {isBn ? 'অর্গানিক বিউটি' : 'Skincare'}
            </span>
            <Link href="/category/cosmetics-beauty" className="block">
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF5B37] transition-colors line-clamp-2">
                {isBn
                  ? 'প্রাকৃতিক গোলাপজলের গুণাগুণ: ত্বক সতেজ রাখতে সহজ বিউটি রুটিন'
                  : 'The Daily Magic of Pure Rosewater & Botanical Lip Nourishment'}
              </h4>
            </Link>
            <p className="text-[11px] text-gray-400 font-mono">08 Nov 2026 &bull; 4 min read</p>
          </div>

        </div>

      </div>
    </section>
  );
}
