'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Search, X, PackageX, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const router = useRouter();

  const { isBn, t, formatNumber } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const allProducts = getProducts().filter((p) => p.isPublished);
  const categories = getCategories();

  const POPULAR_SEARCHES = [
    { label: 'Mulberry Silk', labelBn: 'মালবেরি সিল্ক', q: 'silk' },
    { label: 'Scrunchies', labelBn: 'স্ক্রাঞ্চি', q: 'scrunchie' },
    { label: 'Hair Claw Clip', labelBn: 'হেয়ার ক্লিপ', q: 'clip' },
    { label: 'Kids Bows', labelBn: 'কিডস বো', q: 'kids' },
    { label: 'Gold Jewellery', labelBn: 'গোল্ড জুয়েলারি', q: 'jewellery' },
    { label: 'Linen Kurti', labelBn: 'লিনেন কুর্তি', q: 'kurti' },
    { label: 'Scented Candle', labelBn: 'সুগন্ধি ক্যান্ডেল', q: 'candle' },
    { label: 'Tote Bag', labelBn: 'টোট ব্যাগ', q: 'tote' },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      const matchName = product.name.toLowerCase().includes(q);
      const matchBn = product.nameBn?.toLowerCase().includes(q);
      const matchBrand = product.brand?.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchTag = product.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchSku = product.sku.toLowerCase().includes(q);
      return matchName || matchBn || matchBrand || matchCat || matchTag || matchSku;
    });
  }, [allProducts, query, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      router.push(`/search?q=${encodeURIComponent(query.trim())}${catParam}`);
    }
  };

  const handlePillClick = (searchTag: string) => {
    setQuery(searchTag);
    const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
    router.push(`/search?q=${encodeURIComponent(searchTag)}${catParam}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#012D51] tracking-tight">
            {t('searchPageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {isBn
              ? 'শখোরার সম্পূর্ণ ক্যাটালগ থেকে যেকোনো পণ্য সহজেই খুঁজুন।'
              : 'Find your favorite lifestyle essentials, jewellery, and accessories.'}
          </p>

          {/* Prominent Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#F6F7F8] border-2 border-[#EAECEF] rounded-full py-3.5 pl-5 pr-14 text-sm sm:text-base text-[#252525] focus:outline-none focus:border-[#012D51] focus:bg-white shadow-xs"
              autoFocus
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#012D51] text-white hover:bg-[#C78703] transition-colors shadow-xs btn-press"
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Suggestions Pills */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-[#012D51] uppercase tracking-wider block mb-2 font-mono">
              <Sparkles className="w-3 h-3 inline mr-1 text-[#C78703]" />
              {t('searchSuggestions')}
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {POPULAR_SEARCHES.map((pill) => (
                <button
                  key={pill.q}
                  type="button"
                  onClick={() => handlePillClick(pill.q)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[#F6F7F8] border border-[#EAECEF] text-stone-700 hover:border-[#012D51] hover:text-[#012D51] transition-colors shadow-2xs btn-press"
                >
                  {isBn ? pill.labelBn : pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAECEF] text-xs">
          <div>
            {query.trim() ? (
              <p className="text-stone-700">
                {t('searchResultsFor')}{' '}
                <strong className="text-[#012D51]">&ldquo;{query}&rdquo;</strong> —{' '}
                <span className="font-mono font-bold text-[#012D51]">{formatNumber(results.length)}</span>{' '}
                {t('items')}
              </p>
            ) : (
              <p className="text-stone-600">
                {isBn ? 'সমস্ত পণ্য ব্রাউজ করা হচ্ছে' : 'Browsing all available products'} (
                <span className="font-mono font-bold text-[#012D51]">{formatNumber(results.length)}</span>)
              </p>
            )}
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-1 transition-colors"
          >
            <span>{t('shopTitle')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Results Grid or Empty State */}
        {results.length === 0 ? (
          <div className="bg-[#F6F7F8] rounded-3xl p-12 text-center border border-[#EAECEF] shadow-xs space-y-6 max-w-lg mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto text-stone-400 border border-[#EAECEF]">
              <PackageX className="w-8 h-8 text-[#012D51]" />
            </div>

            <div>
              <h2 className="font-bold text-xl text-[#012D51] mb-2">
                {isBn ? 'কোনো পণ্য পাওয়া যায়নি' : 'No Products Found'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isBn
                  ? 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য মেলেনি। অন্য শব্দ দিয়ে চেষ্টা করুন।'
                  : 'We could not find any products matching your search query. Try another keyword.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold uppercase tracking-wider transition-all shadow-xs btn-press"
              >
                <span>{isBn ? 'সব পণ্য দেখুন' : 'View All Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-xs font-mono text-stone-500">
          Loading Search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
