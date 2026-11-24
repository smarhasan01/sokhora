'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { initialCategories } from '@/data/categories';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export default function CircularCategories() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header with Underline Accent & View All */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E5E8]">
        <h2 className="text-base sm:text-xl font-bold text-[#202833]">
          {isBn ? 'শীর্ষ ' : 'Shop From '}
          <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
            {isBn ? 'ক্যাটাগরি সমূহ' : 'Top Categories'}
          </span>
        </h2>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group"
        >
          <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* MegaMart Circular Category Cards (5 Approved Categories) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {initialCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-[#F7F8FA] transition-all"
          >
            {/* Circular Image Container (MegaMart Style) */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-white border-2 border-gray-200 group-hover:border-[#C78703] group-hover:shadow-md transition-all duration-300">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Category Name & Item Count */}
            <h3
              className="mt-3 text-xs sm:text-sm font-bold text-[#202833] group-hover:text-[#012D51] transition-colors truncate whitespace-nowrap overflow-hidden text-ellipsis block max-w-full"
              title={isBn ? category.nameBn : category.name}
            >
              {isBn ? category.nameBn : category.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
              {category.itemCount || 15}+ {isBn ? 'টি পণ্য' : 'Items'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
