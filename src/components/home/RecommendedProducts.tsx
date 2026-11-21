'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight, Sparkles } from 'lucide-react';

const RECOM_TABS = [
  { slug: 'all', label: 'All Product', labelBn: 'সকল পণ্য' },
  { slug: 'cosmetics-beauty', label: 'Health & Beauty', labelBn: 'বিউটি ও কেয়ার' },
  { slug: 'scrunchies-hair-accessories', label: 'Silk Scrunchies', labelBn: 'সিল্ক স্ক্রাঞ্চি' },
  { slug: 'jewellery-fashion-accessories', label: 'Jewellery', labelBn: 'জুয়েলারি' },
  { slug: 'kids-hairbands-clips', label: 'Kids & Baby', labelBn: 'কিডস ক্লিপ' },
];

export default function RecommendedProducts() {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const allProducts = getProducts().filter((p) => p.isPublished);
  const filtered =
    activeTab === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === activeTab);

  const displayProducts = filtered.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Title and Category Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 mb-6 border-b border-[#EAECEF]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FDF8ED] text-[#C78703] border border-[#F8ECCB] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#C78703]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
              {isBn ? 'সবচেয়ে জনপ্রিয় / সুপারিশকৃত' : 'Most Popular'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {isBn ? 'গ্রাহকদের পছন্দের শীর্ষে থাকা পণ্যসমূহ' : 'Handpicked lifestyle recommendations for you'}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {RECOM_TABS.map((tab) => {
            const isActive = activeTab === tab.slug;
            return (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 btn-press ${
                  isActive
                    ? 'bg-[#012D51] text-white shadow-xs'
                    : 'bg-[#F6F7F8] text-stone-700 hover:bg-stone-200/70 hover:text-[#012D51] border border-[#EAECEF]'
                }`}
              >
                {isBn ? tab.labelBn : tab.label}
              </button>
            );
          })}

          <Link
            href="/shop"
            className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-0.5 ml-2 whitespace-nowrap transition-colors"
          >
            <span>{isBn ? 'সব দেখুন' : 'See All Product'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
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
