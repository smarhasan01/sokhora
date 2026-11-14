'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedProducts() {
  const { isBn, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestsellers'>('featured');
  const allProducts = getProducts().filter((p) => p.isPublished);

  const featured = allProducts.filter((p) => p.isFeatured);
  const newArrivals = allProducts.filter((p) => p.isNewArrival);
  const bestSellers = allProducts.filter((p) => p.isBestSeller);

  const getActiveList = () => {
    switch (activeTab) {
      case 'new':
        return newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 8);
      case 'bestsellers':
        return bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 8);
      default:
        return featured.length > 0 ? featured : allProducts.slice(0, 8);
    }
  };

  const currentProducts = getActiveList().slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Refined Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {isBn ? 'বাছাইকৃত সিলেকশন' : 'Curated Selections'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
              {isBn ? 'বিশেষ নির্বাচিত পণ্য' : 'Signature Highlights'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {isBn
                ? 'সিল্ক, ব্রাস এবং অর্গানিক উপাদানে তৈরি আমাদের সেরা পণ্যসমূহ।'
                : 'Handpicked lifestyle essentials praising artisan craftsmanship and everyday comfort.'}
            </p>
          </div>

          {/* Filter Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-200/70 p-1.5 rounded-full text-xs font-semibold">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 sm:px-5 py-2 rounded-full transition-all text-xs uppercase tracking-wider ${
                activeTab === 'featured'
                  ? 'bg-[#191817] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isBn ? 'নির্বাচিত' : 'Featured'}
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 sm:px-5 py-2 rounded-full transition-all text-xs uppercase tracking-wider ${
                activeTab === 'new'
                  ? 'bg-[#191817] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isBn ? 'নতুন আগমন' : 'New In'}
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 sm:px-5 py-2 rounded-full transition-all text-xs uppercase tracking-wider ${
                activeTab === 'bestsellers'
                  ? 'bg-[#191817] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isBn ? 'বেস্টসেলার' : 'Popular'}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-stone-300 text-stone-900 hover:bg-[#191817] hover:text-white hover:border-[#191817] text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
          >
            <span>{isBn ? 'সকল পণ্য দেখুন' : 'Explore All Products'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
