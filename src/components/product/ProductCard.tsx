'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Heart, Star, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export default function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const { addItem, setIsCartOpen } = useCart();
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
  const ratingValue = product.rating || 5.0;
  const reviewCountValue = product.reviewCount || 120;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/90 p-4 hover:border-[#FF5B37]/40 hover:shadow-[0_8px_24px_rgba(255,91,55,0.12)] transition-all duration-300 flex flex-col justify-between">
      {/* Top badges & Wishlist */}
      <div className="relative">
        <div className="flex items-center justify-between z-10 mb-2">
          {hasDiscount ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight bg-[#FFF0ED] text-[#FF5B37] border border-[#FFD7CC]">
              -{formatNumber(discountPercent)}%
            </span>
          ) : product.isNewArrival ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gray-100 text-gray-700">
              {isBn ? 'নতুন' : 'NEW'}
            </span>
          ) : (
            <span className="w-1" />
          )}

          <button
            onClick={handleWishlistToggle}
            className={`p-1.5 rounded-full transition-all ${
              inWishlist
                ? 'bg-[#FFF0ED] text-[#FF5B37] scale-105'
                : 'text-gray-400 hover:text-[#FF5B37] hover:bg-gray-100'
            }`}
            title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist ? 'fill-[#FF5B37] text-[#FF5B37]' : ''
              }`}
            />
          </button>
        </div>

        {/* Product Image Container */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square w-full rounded-xl overflow-hidden bg-[#F8F9FA] mb-3"
        >
          <Image
            src={product.images[0] || '/images/Logo-01.png'}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
          />

          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
              <span className="px-2.5 py-1 rounded-md bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider">
                {isBn ? 'স্টক শেষ' : 'Sold Out'}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Category / Brand */}
          {showCategory && (
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono truncate mb-1">
              {product.category.replace(/-/g, ' ')}
            </p>
          )}

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-semibold text-xs sm:text-sm text-gray-900 leading-snug line-clamp-1 group-hover:text-[#FF5B37] transition-colors">
              {displayName}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5 text-[11px]">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">
              ({formatNumber(reviewCountValue)})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold font-mono text-[#FF5B37]">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs font-mono text-gray-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          {/* Coral Add to Cart Button inspired by reference */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0 || added}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              product.stock <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FF5B37] text-white hover:bg-[#FA4A23] active:scale-98'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'যোগ হয়েছে' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider text-[11px]">
                  {isBn ? 'ব্যাগে যোগ' : 'Add To Cart'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
