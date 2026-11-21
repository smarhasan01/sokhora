'use client';

import React from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function BrandShowcase() {
  const brands = getBrands();
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="py-4 border-y border-gray-200/80 flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/shop?brand=${encodeURIComponent(b.name)}`}
            className="group shrink-0 text-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="font-mono font-bold tracking-widest text-xs sm:text-sm text-gray-400 group-hover:text-[#012D51] uppercase transition-colors">
              {b.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
