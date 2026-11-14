'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  const categories = getCategories();
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <section id="categories" className="py-16 bg-white border-b border-taupe-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
              {isBn ? 'বাছাইকৃত কালেকশন' : 'Curated Collections'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('categoriesTitle')}
            </h2>
            <p className="text-xs text-taupe-600 mt-1 max-w-xl">
              {t('categoriesSubtitle')}
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1 group"
          >
            {t('viewAll')}{' '}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-taupe-100 border border-taupe-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-end p-5"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={isBn && cat.nameBn ? cat.nameBn : cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sage-300">
                  {formatNumber(cat.itemCount || 10)}+ {t('items')}
                </span>
                <h3 className="font-semibold text-sm sm:text-base leading-snug mt-0.5 group-hover:text-sage-200 transition-colors">
                  {isBn && cat.nameBn ? cat.nameBn : cat.name}
                </h3>
                <p className="text-[11px] text-taupe-300 mt-0.5">
                  {isBn ? cat.name : cat.nameBn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
