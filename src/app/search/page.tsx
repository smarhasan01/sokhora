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
  const router = useRouter();

  const { isBn, t, formatNumber } = useLanguage();
  const [query, setQuery] = useState(initialQuery);

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
    if (!q) return allProducts;

    return allProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchBn = product.nameBn?.toLowerCase().includes(q);
      const matchBrand = product.brand?.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchTag = product.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchSku = product.sku.toLowerCase().includes(q);
      return matchName || matchBn || matchBrand || matchCat || matchTag || matchSku;
    });
  }, [allProducts, query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handlePillClick = (searchTag: string) => {
    setQuery(searchTag);
    router.push(`/search?q=${encodeURIComponent(searchTag)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal-950">
            {t('searchPageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-taupe-600">
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
              className="w-full bg-white border-2 border-taupe-300 rounded-full py-3.5 pl-5 pr-14 text-sm sm:text-base text-charcoal-900 focus:outline-none focus:border-charcoal-900 shadow-sm"
              autoFocus
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-charcoal-400 hover:text-charcoal-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors shadow-sm"
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Suggestions Pills */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-taupe-500 uppercase tracking-wider block mb-2">
              <Sparkles className="w-3 h-3 inline mr-1 text-sage-600" />
              {t('searchSuggestions')}
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {POPULAR_SEARCHES.map((pill) => (
                <button
                  key={pill.q}
                  type="button"
                  onClick={() => handlePillClick(pill.q)}
                  className="px-3 py-1 rounded-full text-xs bg-white border border-taupe-200 text-charcoal-700 hover:border-charcoal-800 hover:text-charcoal-950 transition-colors shadow-2xs"
                >
                  {isBn ? pill.labelBn : pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-taupe-200 text-xs">
          <div>
            {query.trim() ? (
              <p className="text-charcoal-700">
                {t('searchResultsFor')}{' '}
                <strong className="text-charcoal-950">&ldquo;{query}&rdquo;</strong> —{' '}
                <span className="font-mono font-bold text-charcoal-900">{formatNumber(results.length)}</span>{' '}
                {t('items')}
              </p>
            ) : (
              <p className="text-charcoal-600">
                {isBn ? 'সমস্ত পণ্য ব্রাউজ করা হচ্ছে' : 'Browsing all available products'} (
                <span className="font-mono font-bold">{formatNumber(results.length)}</span>)
              </p>
            )}
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1"
          >
            <span>{t('shopTitle')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Results Grid or Empty State */}
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-taupe-200 shadow-sm space-y-6 max-w-lg mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
              <PackageX className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-charcoal-900 mb-1">
                {t('noSearchResults')}
              </h2>
              <p className="text-xs text-taupe-600 leading-relaxed">
                {isBn
                  ? 'বানান চেক করে আবার চেষ্টা করুন, অথবা নিচের জনপ্রিয় ক্যাটাগরিগুলো থেকে ঘুরে আসুন।'
                  : 'Check your spelling or try more general keywords like silk, kurti, jewellery, or hair.'}
              </p>
            </div>

            {/* Quick Category Buttons in Empty State */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-charcoal-800 mb-3 uppercase tracking-wider">
                {t('popularCategories')}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {categories.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="p-2.5 rounded-xl bg-ivory-100 border border-taupe-200 hover:bg-taupe-100 text-charcoal-800 font-medium text-center transition-colors truncate"
                  >
                    {isBn && c.nameBn ? c.nameBn : c.name}
                  </Link>
                ))}
              </div>
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
    <Suspense fallback={<div className="min-h-screen bg-ivory-100 flex items-center justify-center text-xs">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
