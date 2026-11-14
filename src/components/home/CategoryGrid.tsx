'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryGrid() {
  const categories = getCategories();
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <section id="categories" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-taupe-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold">
              {isBn ? 'কালেকশন গ্যালারি' : 'Explore Collections'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
              {isBn ? 'আপনার পছন্দের ক্যাটাগরি' : 'Shop by Curated Category'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {isBn
                ? 'প্রাকৃতিক উপাদান, দেশীয় কারুকাজ ও আধুনিক ডিজাইনের সমন্বয়ে সাজানো আমাদের প্রতিটি ক্যাটাগরি।'
                : 'Each collection is mindfully curated with natural fabrics, artisan metals, and everyday essentials.'}
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-900 pb-1 border-b border-stone-900 hover:text-stone-600 hover:border-stone-400 transition-all"
          >
            <span>{isBn ? 'সকল পণ্য দেখুন' : 'View Full Catalog'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Category Showcase — Luxury Portrait Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, index) => {
            const countStr = String(index + 1).padStart(2, '0');
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col rounded-[1.75rem] bg-[#FAF7F2] p-3 sm:p-4 border border-stone-200/80 hover:border-stone-400/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container with Editorial Aspect Ratio */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-200">
                  <Image
                    src={cat.image}
                    alt={isBn && cat.nameBn ? cat.nameBn : cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle top pill index */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-stone-800 shadow-sm">
                    {countStr}
                  </div>

                  {/* Corner Action Arrow */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-900 group-hover:bg-[#191817] group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Details Footer */}
                <div className="pt-4 pb-2 px-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                    <span>{formatNumber(cat.itemCount || 8)}+ {isBn ? 'টি পণ্য' : 'Items'}</span>
                    <span className="uppercase tracking-wider text-[9px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      {isBn ? 'ইন-স্টক' : 'In Stock'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-medium text-stone-900 mt-1 leading-snug group-hover:text-stone-700 transition-colors">
                    {isBn && cat.nameBn ? cat.nameBn : cat.name}
                  </h3>

                  <p className="text-[11px] text-stone-500 mt-0.5 truncate font-sans">
                    {isBn ? cat.name : cat.nameBn}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
