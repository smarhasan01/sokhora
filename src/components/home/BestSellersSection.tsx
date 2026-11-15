'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight, Flame } from 'lucide-react';

export default function BestSellersSection() {
  const { isBn } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const bestSellers = allProducts.filter((p) => p.isBestSeller);
  const displayProducts = bestSellers.length >= 4 ? bestSellers.slice(0, 4) : allProducts.slice(4, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EADFCF]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#C99A45] border border-[#EADFCF] flex items-center justify-center">
            <Flame className="w-4 h-4 fill-[#C99A45]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#10252B] tracking-tight">
              {isBn ? 'বেস্ট সেলার কালেকশন' : 'Best Sellers'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {isBn ? 'গ্রাহকদের পছন্দের শীর্ষে থাকা পণ্যসমূহ' : 'Our customer-favourite lifestyle essentials'}
            </p>
          </div>
        </div>

        <Link
          href="/shop?sort=popularity"
          className="text-xs font-bold text-[#477765] hover:text-[#10252B] flex items-center gap-0.5 transition-colors"
        >
          <span>{isBn ? 'সবগুলো দেখুন' : 'See All Product'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
