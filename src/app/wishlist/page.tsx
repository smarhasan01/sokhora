'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem, setIsCartOpen } = useCart();
  const { isBn, t, formatPrice, formatNumber } = useLanguage();

  const handleMoveToBag = (product: any) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-8 border-b border-taupe-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
              <span>{isBn ? 'সংরক্ষিত পণ্যসমূহ' : 'Saved Collection'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('wishlistTitle')}
            </h1>
            <p className="text-xs text-taupe-600 mt-1 max-w-md">
              {t('wishlistSubtitle')}
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-charcoal-600">
                {isBn ? 'মোট সংরক্ষিত:' : 'Total saved:'}{' '}
                <strong className="text-charcoal-900">{formatNumber(wishlist.length)}</strong> {t('items')}
              </span>
              <button
                type="button"
                onClick={clearWishlist}
                className="text-terracotta-600 hover:text-terracotta-700 font-semibold underline underline-offset-2 transition-colors"
              >
                {isBn ? 'সবগুলো মুছুন' : 'Clear All'}
              </button>
            </div>
          )}
        </div>

        {/* Content: Empty State vs Product Cards */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-taupe-200 shadow-sm max-w-lg mx-auto my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-10 h-10" />
            </div>

            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-charcoal-900 mb-2">
                {t('wishlistEmptyTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-taupe-600 leading-relaxed max-w-sm mx-auto">
                {t('wishlistEmptySubtitle')}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-charcoal-800 text-xs font-semibold transition-all shadow-md"
              >
                <span>{t('shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const price = product.discountPrice ?? product.regularPrice;
              const hasDiscount = product.discountPrice && product.discountPrice < product.regularPrice;
              const displayName = isBn && product.nameBn ? product.nameBn : product.name;
              const displayBrand = isBn && product.brandBn ? product.brandBn : (product.brand || 'SHOKHORA');

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-taupe-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-taupe-100">
                    <Link href={`/product/${product.slug}`} className="block w-full h-full">
                      <Image
                        src={product.images[0] || '/images/Logo-01.png'}
                        alt={displayName}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-600 hover:text-terracotta-600 hover:bg-white shadow-sm transition-all"
                      title={t('removeFromWishlist')}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-taupe-500">
                        {displayBrand}
                      </p>
                      <Link href={`/product/${product.slug}`} className="block mt-1">
                        <h3 className="font-medium text-xs sm:text-sm text-charcoal-900 line-clamp-2 hover:text-charcoal-600 transition-colors">
                          {displayName}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-taupe-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5 font-mono">
                        <span className="font-bold text-sm sm:text-base text-charcoal-950">
                          {formatPrice(price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-charcoal-400 line-through">
                            {formatPrice(product.regularPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleMoveToBag(product)}
                        disabled={product.stock <= 0}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors disabled:opacity-50"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('moveToCart')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
