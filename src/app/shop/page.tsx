'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories, getBrands } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  Filter,
  SlidersHorizontal,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  PackageX,
  X,
} from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';

  const { isBn, t, formatPrice, formatNumber } = useLanguage();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popularity'>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const allProducts = getProducts().filter((p) => p.isPublished);
  const categories = getCategories();
  const brands = getBrands();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesBn = product.nameBn?.toLowerCase().includes(q);
          const matchesBrand = product.brand?.toLowerCase().includes(q);
          const matchesSku = product.sku.toLowerCase().includes(q);
          const matchesTag = product.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchesName && !matchesBn && !matchesBrand && !matchesSku && !matchesTag) return false;
        }

        // Category
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'all') {
          if (!product.brand || product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
            return false;
          }
        }

        // Price
        const effectivePrice = product.discountPrice ?? product.regularPrice;
        if (effectivePrice > maxPrice) {
          return false;
        }

        // In Stock
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

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
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [allProducts, searchQuery, selectedCategory, selectedBrand, maxPrice, inStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(3000);
    setInStockOnly(false);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#191C1F]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            {t('shopTitle')}
          </h1>
          <p className="text-xs text-taupe-600 mt-1">
            {t('showingProducts')} {formatNumber(filteredProducts.length)} {t('items')}
          </p>
        </div>

        {/* Top Controls: Mobile Filter Toggle + Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-taupe-200">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-taupe-300 rounded-lg text-xs font-semibold text-charcoal-800 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-sage-600" /> {t('filters')}
          </button>

          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-charcoal-500 font-medium hidden sm:inline">{t('sortBy')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-taupe-300 text-charcoal-800 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-charcoal-800"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="popularity">{t('sortPopularity')}</option>
              <option value="price-asc">{t('sortPriceLowHigh')}</option>
              <option value="price-desc">{t('sortPriceHighLow')}</option>
              <option value="rating">{isBn ? 'গ্রাহক রেটিং' : 'Top Rated'}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters (Desktop + Mobile) */}
          <aside
            className={`lg:block ${
              mobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
            } lg:relative lg:bg-transparent lg:p-0 rounded-2xl lg:rounded-none lg:border-none border-taupe-200 shadow-sm lg:shadow-none space-y-6`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-taupe-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-sage-600" /> {t('filters')}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-taupe-600 hover:text-charcoal-900 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" /> {t('clearFilters')}
                </button>
                {mobileFilterOpen && (
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden p-1 rounded-md text-charcoal-700 hover:bg-taupe-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Keyword Search Filter */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                {isBn ? 'শব্দ দিয়ে খুঁজুন' : 'Keyword'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-taupe-300 rounded-lg pl-3 pr-8 py-2 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
                <Search className="w-3.5 h-3.5 text-charcoal-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                {t('categoryFilter')}
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center ${
                    selectedCategory === 'all'
                      ? 'bg-[#FF5B37] text-white font-bold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{t('navAllProducts')}</span>
                  <span className="text-[10px] opacity-75">{formatNumber(allProducts.length)}</span>
                </button>

                {categories.map((cat) => {
                  const count = allProducts.filter((p) => p.category === cat.slug).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center ${
                        selectedCategory === cat.slug
                          ? 'bg-[#FF5B37] text-white font-bold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{isBn && cat.nameBn ? cat.nameBn : cat.name}</span>
                      <span className="text-[10px] opacity-75">{formatNumber(count)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                {t('brandFilter')}
              </label>
              <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBrand('all');
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center ${
                    selectedBrand === 'all'
                      ? 'bg-[#FF5B37] text-white font-bold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{isBn ? 'সকল ব্র্যান্ড' : 'All Brands'}</span>
                  <span className="text-[10px] opacity-75">{formatNumber(allProducts.length)}</span>
                </button>

                {brands.map((b) => {
                  const count = allProducts.filter((p) => p.brand === b.name).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(b.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex justify-between items-center ${
                        selectedBrand === b.name
                          ? 'bg-[#FF5B37] text-white font-bold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{isBn && b.nameBn ? b.nameBn : b.name}</span>
                      <span className="text-[10px] opacity-75">{formatNumber(count)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                  {t('priceFilter')}
                </label>
                <span className="text-xs font-bold font-mono text-charcoal-950">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-charcoal-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-400 font-mono mt-1">
                <span>{formatPrice(200)}</span>
                <span>{formatPrice(3000)}</span>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-2 border-t border-taupe-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-700 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-taupe-300 text-charcoal-900 focus:ring-charcoal-800"
                />
                <span className="font-medium">{t('inStockOnly')}</span>
              </label>
            </div>

            {mobileFilterOpen && (
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-charcoal-950 text-white text-xs font-semibold rounded-xl"
              >
                {isBn ? 'ফিল্টার প্রয়োগ করুন' : 'Apply Filters'}
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-taupe-200 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-charcoal-900">
                  {t('noProductsFound')}
                </h3>
                <p className="text-xs text-taupe-600 max-w-sm mx-auto">
                  {isBn
                    ? 'আপনার ফিল্টারের সাথে মিলে এমন কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন বা রিসেট করুন।'
                    : 'We couldn’t find any products matching your selected filters. Try broadening your criteria.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors"
                >
                  {t('clearFilters')}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2 pt-6 border-t border-taupe-200">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-taupe-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white text-charcoal-700 transition-colors"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1 text-xs font-mono font-medium">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-[#FF5B37] text-white font-bold shadow-sm'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {formatNumber(pageNum)}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-taupe-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white text-charcoal-700 transition-colors"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory-100 flex items-center justify-center text-xs">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
