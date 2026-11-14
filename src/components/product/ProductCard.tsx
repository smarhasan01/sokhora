'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const price = product.discountPrice ?? product.regularPrice;
  const hasDiscount = product.discountPrice && product.discountPrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100)
    : 0;

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;

    addItem(
      product,
      1,
      product.variations?.colors?.[0]?.name,
      product.variations?.sizes?.[0]
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const displayName = isBn && product.nameBn ? product.nameBn : product.name;
  const displayBrand = isBn && product.brandBn ? product.brandBn : (product.brand || 'SHOKHORA');

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)] hover:border-stone-400 transition-all duration-300">
      {/* Top Image Container — 4:5 Editorial Portrait Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF7F2]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/Logo-01.png'}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight bg-stone-900 text-amber-300 shadow-sm">
              -{formatNumber(discountPercent)}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-white/95 text-stone-800 border border-stone-300 shadow-sm">
              {isBn ? 'নতুন' : 'NEW'}
            </span>
          )}
          {product.isBestSeller && !hasDiscount && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-emerald-900 text-emerald-200 shadow-sm">
              {isBn ? 'বেস্টসেলার' : 'BESTSELLER'}
            </span>
          )}
        </div>

        {/* Wishlist Floating Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 shadow-sm ${
            inWishlist
              ? 'bg-white text-rose-600 scale-105 shadow-md'
              : 'bg-white/85 backdrop-blur-sm text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-600 text-rose-600' : ''
            }`}
          />
        </button>

        {/* Quick Add To Bag Slide-Up Button (Desktop) */}
        {product.stock > 0 ? (
          <div className="hidden lg:block absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <button
              onClick={handleQuickAdd}
              disabled={added}
              className={`w-full py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#191817] text-white hover:bg-stone-800'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ব্যাগে যোগ হয়েছে' : 'Added to Bag'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isBn ? 'ব্যাগে যোগ করুন' : 'Add to Bag'}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-white text-stone-900 text-xs font-bold uppercase tracking-wider shadow">
              {isBn ? 'স্টক শেষ' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="uppercase tracking-widest font-mono text-stone-400 font-semibold truncate">
              {displayBrand}
            </span>
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {isBn ? 'স্টকে আছে' : 'In Stock'}
              </span>
            ) : (
              <span className="text-[10px] text-stone-400 font-mono">
                {isBn ? 'স্টক নেই' : 'Sold Out'}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-stone-700 transition-colors">
            <h3 className="font-serif font-medium text-sm sm:text-base text-stone-900 leading-snug line-clamp-2">
              {displayName}
            </h3>
          </Link>
        </div>

        {/* Price & Mobile Add Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-mono font-bold text-stone-900">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs font-mono text-stone-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0 || added}
            className={`lg:hidden p-2 rounded-xl border transition-all ${
              added
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-stone-100 text-stone-900 border-stone-200 hover:bg-[#191817] hover:text-white'
            }`}
            aria-label="Add to bag"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
