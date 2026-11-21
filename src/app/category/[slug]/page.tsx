'use client';

import React, { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getCategories, getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, PackageOpen, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isBn, t, formatNumber } = useLanguage();

  const categories = getCategories();
  const category = categories.find((c) => c.slug === slug);

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popularity'>('newest');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const allProducts = getProducts();
  const categoryProducts = useMemo(() => {
    return allProducts.filter((p) => p.category === slug && p.isPublished);
  }, [allProducts, slug]);

  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    categoryProducts.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet);
  }, [categoryProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.regularPrice;
        const priceB = b.discountPrice ?? b.regularPrice;

        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'popularity':
            return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.rating || 0) - (a.rating || 0);
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [categoryProducts, selectedBrand, sortBy]);

  if (!category) {
    return notFound();
  }

  const displayName = isBn && category.nameBn ? category.nameBn : category.name;
  const secondaryName = isBn ? category.name : category.nameBn;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1">
        {/* Luxury Category Hero Banner (Deep Navy #012D51) */}
        <div className="relative bg-[#012D51] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#C78703]/30">
          <div className="absolute inset-0 opacity-25">
            <Image
              src={category.image}
              alt={displayName}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#012D51] via-[#012D51]/75 to-transparent" />

          <div className="relative max-w-7xl mx-auto space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#F8EEE2]/70 font-mono">
              <Link href="/" className="hover:text-white transition-colors">
                {t('navHome')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C78703]" />
              <Link href="/shop" className="hover:text-white transition-colors">
                {t('allProducts')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C78703]" />
              <span className="text-[#C78703] font-semibold">{displayName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C78703]">
                {isBn ? 'শখোরা কালেকশন' : 'SHOKHORA Collection'}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight">
                {displayName}
              </h1>
              {secondaryName && (
                <p className="text-sm font-sans text-[#F8EEE2]/70">{secondaryName}</p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#F8EEE2]/85 max-w-2xl leading-relaxed">
              {category.description ||
                (isBn
                  ? 'শখোরার বাছাইকৃত কোয়ালিটি লাইফস্টাইল পণ্য, যা আপনার দৈনন্দিন সাজ এবং উৎসবের আয়োজনে এনে দেবে পূর্ণতা।'
                  : 'Thoughtfully crafted pieces designed to elevate everyday rituals with tactile luxury and timeless elegance.')}
            </p>
          </div>
        </div>

        {/* Toolbar & Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
            {/* Brand Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 font-mono">
                {isBn ? 'ব্র্যান্ড:' : 'Brand:'}
              </span>
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 font-mono ${
                  selectedBrand === 'all'
                    ? 'bg-[#012D51] text-[#F8EEE2] shadow-xs'
                    : 'bg-white border border-[#EADFCF] text-stone-600 hover:bg-[#FAF5EE]'
                }`}
              >
                {isBn ? 'সকল' : 'All'} ({categoryProducts.length})
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 font-mono ${
                    selectedBrand === b
                      ? 'bg-[#012D51] text-[#F8EEE2] shadow-xs'
                      : 'bg-white border border-[#EADFCF] text-stone-600 hover:bg-[#FAF5EE]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs shrink-0">
              <span className="text-stone-500 font-mono font-medium">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 text-stone-800 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-stone-800 font-mono"
              >
                <option value="newest">{t('sortNewest')}</option>
                <option value="popularity">{t('sortPopularity')}</option>
                <option value="price-asc">{t('sortPriceLowHigh')}</option>
                <option value="price-desc">{t('sortPriceHighLow')}</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-stone-200 p-8">
              <PackageOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif font-medium text-lg text-stone-900">
                {isBn ? 'এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি' : 'No Products In This Category'}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                {isBn
                  ? 'অন্যান্য ব্র্যান্ড বা সম্পূর্ণ শপ ব্রাউজ করুন।'
                  : 'Try selecting a different brand or browse our entire catalog.'}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-full bg-[#191817] text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isBn ? 'সকল পণ্য দেখুন' : 'Explore All Products'}</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
