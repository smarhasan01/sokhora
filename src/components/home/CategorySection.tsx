'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function CategorySection() {
  const categories = getCategories();
  const { isBn, formatNumber } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {isBn ? 'ক্যাটাগরি অনুযায়ী কেনাকাটা' : 'Shop by Categories'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBn ? 'আপনার পছন্দের ক্যাটাগরি বেছে নিন' : 'Explore our curated lifestyle collections'}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group bg-white rounded-2xl border border-gray-200/90 p-3 hover:border-[#FF5B37]/50 hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-[#F6F7F9] mb-3 group-hover:scale-105 transition-transform border border-gray-100">
              <Image
                src={cat.image}
                alt={isBn && cat.nameBn ? cat.nameBn : cat.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold text-xs text-gray-900 group-hover:text-[#FF5B37] transition-colors line-clamp-1">
                {isBn && cat.nameBn ? cat.nameBn : cat.name}
              </h3>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                {formatNumber(cat.itemCount || 10)}+ {isBn ? 'টি পণ্য' : 'Items'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
