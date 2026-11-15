'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountNav from '@/components/account/AccountNav';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Heart, ShoppingBag, Trash2, ChevronRight, ArrowRight } from 'lucide-react';

export default function AccountWishlistPage() {
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link href="/account" className="hover:text-charcoal-900">{t('myAccount')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('wishlist')}</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
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
          <div className="bg-white rounded-3xl p-12 text-center border border-taupe-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-base font-semibold text-charcoal-900">{t('wishlistEmptyTitle')}</h2>
            <p className="text-xs text-charcoal-500">
              {t('wishlistEmptySubtitle')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800"
            >
              <span>{t('shopNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const price = product.discountPrice ?? product.regularPrice;
              const displayName = isBn && product.nameBn ? product.nameBn : product.name;

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

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-600 hover:text-rose-600 hover:bg-white shadow-sm"
                      title={t('removeFromWishlist')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-taupe-500">
                        {product.brand || 'SHOKHORA'}
                      </p>
                      <Link href={`/product/${product.slug}`} className="block mt-1">
                        <h3 className="font-medium text-xs sm:text-sm text-charcoal-900 line-clamp-2 hover:text-charcoal-600">
                          {displayName}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-taupe-100 flex items-center justify-between">
                      <span className="font-mono font-bold text-sm sm:text-base text-charcoal-950">
                        {formatPrice(price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleMoveToBag(product)}
                        disabled={product.stock <= 0}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#477765] text-white text-xs font-bold hover:bg-[#10252B] disabled:opacity-50"
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
