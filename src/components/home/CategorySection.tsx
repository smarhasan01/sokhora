'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORY_STYLES: Record<string, { bg: string; border: string }> = {
  'fashion-clothing': { bg: 'bg-[#F2F6FA]', border: 'border-[#D9E5F2]' },
  'cosmetics-beauty': { bg: 'bg-[#FBF6F7]', border: 'border-[#F4DFE4]' },
  'kids-hairbands-clips': { bg: 'bg-[#FDF9F0]', border: 'border-[#F8ECCB]' },
  'scrunchies-hair-accessories': { bg: 'bg-[#F6F5FA]', border: 'border-[#E4E0F0]' },
  'jewellery-fashion-accessories': { bg: 'bg-[#FBF8F0]', border: 'border-[#F2E7CA]' },
  'gifts-lifestyle': { bg: 'bg-[#F2F7F8]', border: 'border-[#DAEAEF]' },
  'other-everyday': { bg: 'bg-[#F6F7F8]', border: 'border-[#EAECEF]' },
};

export default function CategorySection() {
  const categories = getCategories();
  const { isBn, formatNumber } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EAECEF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
            {isBn ? 'সেরা ক্যাটাগরি' : 'Best Categories'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'আপনার পছন্দের ক্যাটাগরি বেছে নিন' : 'Explore our curated lifestyle collections'}
          </p>
        </div>

        {/* Navigation arrows (Reference 1 style) */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#012D51] hover:text-[#C78703] transition-colors mr-2"
          >
            <span>{isBn ? 'সকল ক্যাটাগরি' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-[#EAECEF] bg-white flex items-center justify-center text-stone-600 hover:text-[#012D51] hover:border-[#012D51] transition-all btn-press shadow-xs"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-[#012D51] bg-[#012D51] flex items-center justify-center text-white hover:bg-[#C78703] hover:border-[#C78703] transition-all btn-press shadow-xs"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 7 Category Cards with smooth zoom and subtle lift */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => {
          const style = CATEGORY_STYLES[cat.slug] || { bg: 'bg-[#F6F7F8]', border: 'border-[#EAECEF]' };
          const displayName = isBn && cat.nameBn ? cat.nameBn : cat.name;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center transition-all"
            >
              <div
                className={`w-full aspect-square rounded-2xl ${style.bg} border ${style.border} p-3 flex items-center justify-center shadow-xs card-lift relative overflow-hidden`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={displayName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="mt-2.5">
                <h3 className="font-semibold text-xs sm:text-sm text-[#252525] group-hover:text-[#012D51] transition-colors line-clamp-1">
                  {displayName}
                </h3>
                <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                  {formatNumber(cat.itemCount || 12)}+ {isBn ? 'পণ্য' : 'Items'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
