'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ShoppingBag, Heart, Check, Star } from 'lucide-react';

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
  const savingsAmount = hasDiscount ? product.regularPrice - product.discountPrice! : 0;

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

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E2E5E8] hover:border-[#C78703]/50 p-3 sm:p-4 card-lift flex flex-col justify-between transition-all overflow-hidden shadow-xs">
      {/* MegaMart Corner Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-0 right-0 bg-[#012D51] text-[#F6DDAB] px-2.5 py-1 rounded-bl-xl text-[10px] sm:text-[11px] font-bold z-10 font-mono tracking-tight shadow-xs">
          {formatNumber(discountPercent)}% {isBn ? 'ছাড়' : 'OFF'}
        </span>
      )}

      {/* Wishlist Button (Top-Left) */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2.5 left-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-xs border border-gray-200/80 shadow-xs ${
          wishlistAnimate ? 'scale-125' : ''
        } ${inWishlist ? 'text-[#C78703] bg-[#FDF8ED]' : 'text-gray-400 hover:text-[#C78703]'}`}
        title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
        aria-label="Wishlist"
      >
        <Heart
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
            inWishlist ? 'fill-[#C78703] text-[#C78703]' : ''
          }`}
        />
      </button>

      {/* Product Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F8FA] flex items-center justify-center p-2 mb-3">
          <Image
            src={product.images[0] || '/images/categories/scrunchies.jpg'}
            alt={displayName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {showCategory && (
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 truncate">
              {product.category.replace(/-/g, ' ')}
            </p>
          )}

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-semibold text-[#202833] group-hover:text-[#012D51] line-clamp-2 leading-snug mb-1.5 transition-colors">
              {displayName}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-[#C78703]">
              <Star className="w-3 h-3 fill-[#C78703]" />
            </div>
            <span className="text-[11px] font-bold text-[#202833]">
              {product.rating || 4.8}
            </span>
            <span className="text-[10px] text-gray-400">
              ({product.reviewCount || 24})
            </span>
          </div>
        </div>

        {/* MegaMart Price & Savings Line */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-[#012D51]">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          {/* Savings Highlight */}
          {hasDiscount && (
            <div className="mt-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#C78703] bg-[#FDF8ED] px-2 py-0.5 rounded-md inline-block">
                {isBn ? `সাশ্রয়: ${formatPrice(savingsAmount)}` : `Save - ${formatPrice(savingsAmount)}`}
              </span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`w-full mt-2.5 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
              added
                ? 'bg-[#C78703] text-white'
                : product.stock <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#012D51] hover:bg-[#023E6E] text-white active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{isBn ? 'যুক্ত হয়েছে' : 'Added!'}</span>
              </>
            ) : product.stock <= 0 ? (
              <span>{isBn ? 'স্টক শেষ' : 'Out of Stock'}</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#F6DDAB]" />
                <span>{isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
