'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CATEGORY_STYLES: Record<string, { bg: string; border: string }> = {
  'fashion-clothing': { bg: 'bg-[#E8F3EF]', border: 'border-[#C1DDCF]' },
  'cosmetics-beauty': { bg: 'bg-[#FDF2F0]', border: 'border-[#F8D5D0]' },
  'kids-hairbands-clips': { bg: 'bg-[#FEF6E8]', border: 'border-[#F9E4B7]' },
  'scrunchies-hair-accessories': { bg: 'bg-[#F2EDFB]', border: 'border-[#D9CEF2]' },
  'jewellery-fashion-accessories': { bg: 'bg-[#FBF6EC]', border: 'border-[#EADFCF]' },
  'gifts-lifestyle': { bg: 'bg-[#EAF4F7]', border: 'border-[#C8E1EA]' },
  'other-everyday': { bg: 'bg-[#F5F2EB]', border: 'border-[#E0D8CB]' },
};

export default function CategorySection() {
  const categories = getCategories();
  const { isBn, formatNumber } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EADFCF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#10252B] tracking-tight">
            {isBn ? 'সেরা ক্যাটাগরি' : 'Best Categories'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'আপনার পছন্দের ক্যাটাগরি বেছে নিন' : 'Explore our curated lifestyle collections'}
          </p>
        </div>

        {/* Navigation arrows (matching Reference 1) */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#477765] hover:text-[#10252B] mr-2"
          >
            <span>{isBn ? 'সকল ক্যাটাগরি' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-[#EADFCF] bg-white flex items-center justify-center text-stone-600 hover:text-[#10252B] hover:border-[#C99A45] transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-[#477765] bg-[#477765] flex items-center justify-center text-white hover:bg-[#10252B] transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 7 Category Cards (Reference 1 style with pastel backgrounds) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => {
          const style = CATEGORY_STYLES[cat.slug] || { bg: 'bg-[#FAF5EE]', border: 'border-[#EADFCF]' };
          const displayName = isBn && cat.nameBn ? cat.nameBn : cat.name;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center transition-all"
            >
              <div
                className={`w-full aspect-square rounded-2xl ${style.bg} border ${style.border} p-3 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative overflow-hidden`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={displayName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="mt-2.5">
                <h3 className="font-semibold text-xs sm:text-sm text-[#10252B] group-hover:text-[#477765] transition-colors line-clamp-1">
                  {displayName}
                </h3>
                <p className="text-[10px] text-stone-500 font-mono mt-0.5">
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
