'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountNav from '@/components/account/AccountNav';
import ProductCard from '@/components/product/ProductCard';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Heart, ChevronRight, ArrowRight } from 'lucide-react';

export default function AccountWishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-mono">
          <Link href="/" className="hover:text-[#012D51]">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/account" className="hover:text-[#012D51]">{t('myAccount')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-semibold">{t('wishlist')}</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
            {t('wishlist')} ({formatNumber(wishlist.length)} {t('items')})
          </h1>

          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium underline"
            >
              {isBn ? 'সবগুলো মুছুন' : 'Clear All Wishlist'}
            </button>
          )}
        </div>

        <AccountNav />

        {wishlist.length === 0 ? (
          <div className="bg-[#F6F7F8] rounded-3xl p-12 text-center border border-[#EAECEF] shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto text-[#012D51] border border-[#EAECEF] shadow-xs">
              <Heart className="w-8 h-8 text-[#C78703]" />
            </div>
            <h2 className="font-bold text-lg text-[#012D51]">
              {t('wishlistEmptyTitle')}
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {t('wishlistEmptySubtitle')}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold uppercase tracking-wider transition-all shadow-xs btn-press"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
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
