'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NewArrivalsSection() {
  const { isBn, t } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const newArrivals = allProducts
    .filter((p) => p.isNewArrival)
    .slice(0, 4);

  const displayProducts =
    newArrivals.length >= 4
      ? newArrivals
      : allProducts.slice(4, 8);

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-taupe-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>{isBn ? 'নতুন আগমন' : 'Just Added'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 tracking-tight">
              {t('newArrivalsTitle')}
            </h2>
            <p className="text-xs text-taupe-600 mt-1 max-w-xl">
              {t('newArrivalsSubtitle')}
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="text-xs sm:text-sm font-semibold text-charcoal-900 hover:text-terracotta-600 flex items-center gap-1.5 group transition-colors"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
