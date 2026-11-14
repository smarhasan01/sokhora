'use client';

import React, { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getCategories, getProducts, getBrands } from '@/lib/db/store';
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
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1">
        {/* Category Hero Banner */}
        <div className="relative bg-charcoal-900 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src={category.image}
              alt={displayName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/90 to-charcoal-900/70" />

          <div className="relative max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-taupe-400 mb-3">
              <Link href="/" className="hover:text-white transition-colors">
                {t('navHome')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/shop" className="hover:text-white transition-colors">
                {t('navAllProducts')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{displayName}</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              {displayName}
            </h1>
            <p className="text-sm text-sage-300 mt-1">{secondaryName}</p>
            {category.description && (
              <p className="text-xs sm:text-sm text-taupe-300 mt-2 max-w-xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls Bar: Brand Filters & Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-taupe-200">
            {/* Brand Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  selectedBrand === 'all'
                    ? 'bg-charcoal-900 text-white font-semibold'
                    : 'bg-white border border-taupe-300 text-charcoal-700 hover:bg-taupe-100'
                }`}
              >
                {isBn ? 'সকল ব্র্যান্ড' : 'All Brands'}
              </button>

              {brands.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    selectedBrand === b
                      ? 'bg-charcoal-900 text-white font-semibold'
                      : 'bg-white border border-taupe-300 text-charcoal-700 hover:bg-taupe-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 text-xs ml-auto">
              <span className="text-charcoal-500 font-medium hidden sm:inline">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-taupe-300 text-charcoal-800 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-charcoal-800"
              >
                <option value="newest">{t('sortNewest')}</option>
                <option value="popularity">{t('sortPopularity')}</option>
                <option value="price-asc">{t('sortPriceLowHigh')}</option>
                <option value="price-desc">{t('sortPriceHighLow')}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-xs text-charcoal-600">
            <span>
              {t('showingProducts')} <span className="font-bold text-charcoal-900">{formatNumber(filteredAndSortedProducts.length)}</span> {t('items')}
            </span>
            <Link
              href="/shop"
              className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1"
            >
              <span>{t('viewAll')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-taupe-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal-900">
                {t('noProductsFound')}
              </h3>
              <p className="text-xs text-taupe-600 max-w-sm mx-auto">
                {isBn
                  ? 'এই ক্যাটাগরিতে ফিল্টারের সাথে মিলে এমন কোনো পণ্য নেই।'
                  : 'No products found for this category with current filters.'}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('shopNow')}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
