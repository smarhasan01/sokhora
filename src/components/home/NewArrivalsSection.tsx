'use client';

import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

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
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-emerald-800 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              {isBn ? 'নতুন সিজন কালেকশন' : 'Fresh Season'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
              {isBn ? 'নতুন আগমন' : 'New In Store'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {isBn
                ? 'আপনার প্রতিদিনের সাজ এবং উৎসবের জন্য নতুন সংযোজন — আধুনিক ফ্যাশন ও এক্সেসরিজ।'
                : 'Explore freshly added lifestyle staples to elevate your daily routine and celebrations.'}
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
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
