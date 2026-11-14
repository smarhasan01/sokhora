'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Star, Heart, Check } from 'lucide-react';

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
    <div className="group relative bg-white rounded-2xl border border-taupe-200/80 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(40,30,20,0.08)] hover:border-taupe-300 transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container — Consistent 4:5 portrait ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/Logo-01.png'}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight bg-terracotta-500 text-white shadow-sm">
              -{formatNumber(discountPercent)}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-sage-600 text-white shadow-sm">
              {isBn ? 'নতুন' : 'NEW'}
            </span>
          )}
          {product.isBestSeller && !hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-charcoal-900 text-white shadow-sm">
              {isBn ? 'বেস্টসেলার' : 'BESTSELLER'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-200 shadow-sm ${
            inWishlist
              ? 'bg-white text-terracotta-500 scale-105 shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-charcoal-700 hover:text-terracotta-500 hover:bg-white'
          }`}
          title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-terracotta-500 stroke-terracotta-500' : 'stroke-current'
            }`}
          />
        </button>

        {/* Availability Badge */}
        {product.stock <= 0 ? (
          <div className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-charcoal-900 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {t('outOfStock')}
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <span className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded-md bg-amber-500/95 text-white text-[10px] font-medium backdrop-blur-sm shadow-sm">
            {isBn ? `মাত্র ${formatNumber(product.stock)}টি বাকি` : `Only ${product.stock} left`}
          </span>
        ) : null}

        {/* Quick Add to Cart Button (Bottom Right) */}
        {product.stock > 0 && (
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-2.5 right-2.5 z-10 p-2.5 rounded-full shadow-md transition-all duration-200 ${
              added
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-white/95 text-charcoal-900 hover:bg-charcoal-900 hover:text-white'
            }`}
            title={added ? t('addedToCart') : t('addToCart')}
            aria-label="Add to cart"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-taupe-600 truncate max-w-[140px]">
              {displayBrand}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-amber-500 font-semibold text-[11px] shrink-0">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                {formatNumber(product.rating.toFixed(1))}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-medium text-charcoal-900 text-xs sm:text-sm line-clamp-2 hover:text-charcoal-600 transition-colors leading-snug">
              {displayName}
            </h3>
          </Link>
        </div>

        {/* Pricing & Stock status */}
        <div className="mt-3 pt-2.5 border-t border-taupe-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm sm:text-base font-mono text-charcoal-950">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] sm:text-xs text-charcoal-400 line-through font-mono">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] font-medium tracking-tight text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {t('inStock')}
          </span>
        </div>
      </div>
    </div>
  );
}
