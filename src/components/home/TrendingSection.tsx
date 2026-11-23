'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight } from 'lucide-react';

const APPROVED_TABS = [
  { id: 'all', name: 'All', nameBn: 'সকল পণ্য' },
  { id: 'fashion-clothing', name: 'Fashion', nameBn: 'পোশাক ও ফ্যাশন' },
  { id: 'cosmetics-beauty', name: 'Cosmetics', nameBn: 'কসমেটিক্স' },
  { id: 'kids-hairbands-clips', name: 'Kids Clips', nameBn: 'কিডস ক্লিপস' },
  { id: 'scrunchies-hair-accessories', name: 'Scrunchies', nameBn: 'সিল্ক স্ক্রাঞ্চি' },
  { id: 'everyday-products', name: 'Everyday', nameBn: 'দৈনন্দিন পণ্য' },
];

export default function TrendingSection() {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const allProducts = getProducts();

  const filteredProducts =
    activeTab === 'all'
      ? allProducts.slice(0, 5)
      : allProducts
          .filter(
            (p) =>
              p.category === activeTab ||
              (activeTab === 'everyday-products' && p.category === 'other-everyday')
          )
          .slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header with Underline & View All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E2E5E8]">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-[#202833]">
            {isBn ? 'জনপ্রিয় ' : 'Trending '}
            <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
              {isBn ? 'ট্রেন্ডিং পণ্য' : 'Popular Products'}
            </span>
          </h2>
        </div>

        {/* MegaMart Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {APPROVED_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#012D51] text-white shadow-xs'
                  : 'bg-[#F7F8FA] text-gray-600 hover:text-[#012D51] hover:bg-gray-200/60'
              }`}
            >
              {isBn ? tab.nameBn : tab.name}
            </button>
          ))}
        </div>

        <Link
          href={`/shop${activeTab !== 'all' ? `?category=${activeTab}` : ''}`}
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group shrink-0 hidden sm:flex"
        >
          <span>{isBn ? 'সব দেখুন' : 'See All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 5-Column Filtered Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 animate-fade-in" key={activeTab}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-4 text-center sm:hidden">
        <Link
          href={`/shop${activeTab !== 'all' ? `?category=${activeTab}` : ''}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#012D51] hover:text-[#C78703]"
        >
          <span>{isBn ? 'সব দেখুন' : 'See All'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
