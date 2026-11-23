'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function RecommendedProducts() {
  const { isBn } = useLanguage();
  const allProducts = getProducts();

  // Top rated / recommended products
  const recommended = allProducts
    .filter((p) => (p.rating || 0) >= 4.8)
    .slice(0, 5);

  const displayList = recommended.length >= 5 ? recommended : allProducts.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header with Underline & View All */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E5E8]">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-bold text-[#202833]">
            {isBn ? 'আপনার জন্য ' : 'Recommended '}
            <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
              {isBn ? 'বাছাইকৃত পণ্য' : 'For You'}
            </span>
          </h2>
        </div>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group"
        >
          <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {displayList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
