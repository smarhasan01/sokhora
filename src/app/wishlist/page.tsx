'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-8 border-b border-[#EAECEF] gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF8ED] border border-[#F8ECCB] text-[#C78703] text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
              <Heart className="w-3.5 h-3.5 fill-[#C78703] stroke-[#C78703]" />
              <span>{isBn ? 'সংরক্ষিত পণ্যসমূহ' : 'Saved Collection'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
              {t('wishlistTitle')}
            </h1>
            <p className="text-xs text-stone-500 mt-1 max-w-md">
              {t('wishlistSubtitle')}
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-stone-600">
                {isBn ? 'মোট সংরক্ষিত:' : 'Total saved:'}{' '}
                <strong className="text-[#012D51] font-mono font-bold">{formatNumber(wishlist.length)}</strong> {t('items')}
              </span>
              <button
                type="button"
                onClick={clearWishlist}
                className="text-stone-400 hover:text-rose-600 font-semibold underline underline-offset-2 transition-colors"
              >
                {isBn ? 'সবগুলো মুছুন' : 'Clear All'}
              </button>
            </div>
          )}
        </div>

        {/* Content: Empty State vs Product Cards */}
        {wishlist.length === 0 ? (
          <div className="bg-[#F6F7F8] rounded-3xl p-12 sm:p-16 text-center border border-[#EAECEF] shadow-xs max-w-lg mx-auto my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto text-[#012D51] border border-[#EAECEF] shadow-xs">
              <Heart className="w-10 h-10 text-[#C78703]" />
            </div>

            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#012D51] mb-2">
                {t('wishlistEmptyTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-sm mx-auto">
                {t('wishlistEmptySubtitle')}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold uppercase tracking-wider transition-all shadow-xs btn-press"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
