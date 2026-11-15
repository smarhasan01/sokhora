'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RecommendedProducts() {
  const { isBn } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const recommended = allProducts.slice(4, 9).length === 5 ? allProducts.slice(4, 9) : allProducts.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FFF0ED] text-[#FF5B37] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#FF5B37]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {isBn ? 'আপনার জন্য সুপারিশকৃত পণ্য' : 'Recommended Products'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBn ? 'আপনার রুচির সাথে মানানসই চমৎকার পণ্যের সমাহার' : 'Thoughtfully recommended based on popular customer choices'}
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-[#FF5B37] hover:underline flex items-center gap-1"
        >
          <span>{isBn ? 'সবগুলো দেখুন' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
