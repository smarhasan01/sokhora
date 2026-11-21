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
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [wishlistAnimate, setWishlistAnimate] = useState(false);

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
    setWishlistAnimate(true);
    toggleWishlist(product);
    setTimeout(() => setWishlistAnimate(false), 300);
  };

  const displayName = isBn && product.nameBn ? product.nameBn : product.name;
  const reviewCountValue = product.reviewCount || 120;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EAECEF] p-3 sm:p-4 card-lift flex flex-col justify-between">
      {/* Top badges & Quick actions */}
      <div>
        <div className="flex items-center justify-between z-10 mb-2">
          {hasDiscount ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight bg-[#C78703] text-white shadow-xs">
              -{formatNumber(discountPercent)}%
            </span>
          ) : product.isNewArrival ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-[#012D51] text-white">
              {isBn ? 'নতুন' : 'NEW'}
            </span>
          ) : (
            <span className="w-1" />
          )}

          {/* Quick action icons: Wishlist & Quick View */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWishlistToggle}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all btn-press ${
                wishlistAnimate ? 'scale-125' : ''
              } ${
                inWishlist
                  ? 'bg-[#FDF8ED] text-[#C78703] shadow-xs'
                  : 'bg-white text-stone-400 hover:text-[#C78703] hover:bg-[#F6F7F8] border border-stone-200/60'
              }`}
              title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  inWishlist ? 'fill-[#C78703] text-[#C78703]' : ''
                }`}
              />
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-7 h-7 rounded-full bg-white text-stone-400 hover:text-[#012D51] hover:bg-[#F6F7F8] border border-stone-200/60 flex items-center justify-center transition-all btn-press"
              title={isBn ? 'বিস্তারিত দেখুন' : 'Quick View'}
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Image Container */}
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square w-full rounded-xl overflow-hidden bg-[#F6F7F8] mb-3"
        >
          <Image
            src={product.images[0] || '/images/shokhora-official-logo.png'}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-contain p-2.5 group-hover:scale-106 transition-transform duration-500 ease-out"
          />

          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-[#012D51]/75 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-2.5 py-1 rounded-md bg-[#C78703] text-white text-[10px] font-bold uppercase tracking-wider">
                {isBn ? 'স্টক শেষ' : 'Sold Out'}
              </span>
            </div>
          )}
        </Link>

        {/* Product Information */}
        <div>
          {/* Category */}
          {showCategory && (
            <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-mono truncate mb-1">
              {product.category.replace(/-/g, ' ')}
            </p>
          )}

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-semibold text-xs sm:text-sm text-[#252525] leading-snug line-clamp-2 group-hover:text-[#012D51] transition-colors">
              {displayName}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
            <div className="flex items-center text-[#C78703]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C78703] text-[#C78703]" />
              ))}
            </div>
            <span className="text-[10px] text-stone-400 font-mono">
              ({formatNumber(reviewCountValue)})
            </span>
          </div>

          {/* Stock hint if low */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-[10px] text-[#C78703] font-medium mt-1">
              {isBn ? `মাত্র ${formatNumber(product.stock)}টি বাকি!` : `Only ${product.stock} left in stock!`}
            </p>
          )}
        </div>
      </div>

      {/* Price & Reference Circular Add-to-Cart Action */}
      <div className="mt-3 pt-2.5 border-t border-[#EAECEF] flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-bold font-mono text-[#012D51]">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] font-mono text-stone-400 line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        {/* Reference-style Circular Add to Cart Button */}
        <button
          onClick={handleQuickAdd}
          disabled={product.stock <= 0 || added}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm btn-press ${
            product.stock <= 0
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : added
              ? 'bg-emerald-600 text-white scale-105'
              : 'bg-[#012D51] text-white hover:bg-[#C78703] active:scale-90'
          }`}
          title={added ? (isBn ? 'যোগ হয়েছে' : 'Added') : (isBn ? 'ব্যাগে যোগ করুন' : 'Add to Cart')}
          aria-label="Add to Cart"
        >
          {added ? (
            <Check className="w-4 h-4" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
