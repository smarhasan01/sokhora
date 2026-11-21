'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

const TABS = [
  { slug: 'all', label: 'All', labelBn: 'সকল' },
  { slug: 'fashion-clothing', label: 'Fashion', labelBn: 'পোশাক' },
  { slug: 'cosmetics-beauty', label: 'Cosmetics', labelBn: 'কসমেটিক্স' },
  { slug: 'kids-hairbands-clips', label: 'Kids Clips', labelBn: 'কিডস ক্লিপ' },
  { slug: 'scrunchies-hair-accessories', label: 'Scrunchies', labelBn: 'স্ক্রাঞ্চি' },
  { slug: 'jewellery-fashion-accessories', label: 'Jewellery', labelBn: 'জুয়েলারি' },
  { slug: 'gifts-lifestyle', label: 'Gifts', labelBn: 'গিফট' },
];

export default function TrendingSection() {
  const { isBn } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const allProducts = getProducts().filter((p) => p.isPublished);
  const filtered =
    activeTab === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === activeTab);

  const displayProducts = filtered.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Title and Category Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 mb-6 border-b border-[#EAECEF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
            {isBn ? 'ট্রেন্ডিং পণ্য' : 'Trending Products'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'এই সপ্তাহের সর্বাধিক জনপ্রিয় পণ্যসমূহ' : 'Top trending lifestyle essentials this week'}
          </p>
        </div>

        {/* Category Filter Pills (Reference 1 style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {TABS.map((tab) => {
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
            href={`/shop${activeTab !== 'all' ? `?category=${activeTab}` : ''}`}
            className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-0.5 ml-2 whitespace-nowrap transition-colors"
          >
            <span>{isBn ? 'সব দেখুন' : 'See All'}</span>
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
