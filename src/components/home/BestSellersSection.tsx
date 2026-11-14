'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowUpRight, Flame } from 'lucide-react';

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
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-amber-700 font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              {isBn ? 'জনপ্রিয়তার শীর্ষে' : 'Most Cherished'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
              {isBn ? 'গ্রাহকদের পছন্দের সেরা পণ্য' : 'The Bestseller Edit'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {isBn
                ? 'আমাদের সবচেয়ে প্রশংসিত লাইফস্টাইল পণ্য, যা গ্রাহকদের দৈনন্দিন জীবনে এনেছে অনাবিল প্রশান্তি।'
                : 'Loved for quality, tactile comfort, and timeless everyday elegance.'}
            </p>
          </div>

          <Link
            href="/shop?sort=popularity"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-900 pb-1 border-b border-stone-900 hover:text-stone-600 hover:border-stone-400 transition-all"
          >
            <span>{isBn ? 'সবগুলো দেখুন' : 'Explore All'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-column Luxury Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
