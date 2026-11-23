'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function BestDealsSection() {
  const { isBn } = useLanguage();
  const allProducts = getProducts();

  // Grab discounted products first, prioritized for deals showcase
  const dealProducts = allProducts
    .filter((p) => p.discountPrice && p.discountPrice < p.regularPrice)
    .slice(0, 5);

  const displayProducts = dealProducts.length >= 5 ? dealProducts : allProducts.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* MegaMart Header: Underlined Accent Keyword + View All */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E2E5E8]">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-xl font-bold text-[#202833]">
            {isBn ? 'সেরা অফার লুফে নিন: ' : 'Grab the best deal on '}
            <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
              {isBn ? 'স্ক্রাঞ্চি ও ফ্যাশন' : 'Scrunchies & Fashion'}
            </span>
          </h2>
        </div>

        <Link
          href="/shop?filter=sale"
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group shrink-0"
        >
          <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 5-Column Responsive Product Cards Grid (MegaMart Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
