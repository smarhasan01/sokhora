'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export default function NewArrivalsSection() {
  const { isBn } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const displayProducts = allProducts.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header matching Reference 1 */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EAECEF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
            {isBn ? 'আপনার জন্য বাছাইকৃত' : 'For You'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'নতুন আগমন ও জনপ্রিয় ট্রেন্ডিং লাইফস্টাইল পণ্য' : 'New arrivals and handpicked lifestyle essentials'}
          </p>
        </div>

        <Link
          href="/shop?sort=newest"
          className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-0.5 transition-colors"
        >
          <span>{isBn ? 'সকল পণ্য দেখুন' : 'See All Product'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4-column Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
