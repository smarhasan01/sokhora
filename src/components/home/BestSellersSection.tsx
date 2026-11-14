'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Flame } from 'lucide-react';

export default function BestSellersSection() {
  const { isBn, t } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const bestSellers = allProducts
    .filter((p) => p.isBestSeller)
    .slice(0, 4);

  const displayProducts =
    bestSellers.length >= 4
      ? bestSellers
      : allProducts.slice(0, 4);

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-taupe-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{isBn ? 'গ্রাহকদের পছন্দের শীর্ষে' : 'Customer Favorites'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 tracking-tight">
              {t('bestSellersTitle')}
            </h2>
            <p className="text-xs text-taupe-600 mt-1 max-w-xl">
              {t('bestSellersSubtitle')}
            </p>
          </div>

          <Link
            href="/shop?sort=popularity"
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
