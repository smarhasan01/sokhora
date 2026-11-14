'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const price = product.discountPrice ?? product.regularPrice;
  const hasDiscount = product.discountPrice && product.discountPrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100)
    : 0;

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
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-taupe-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-taupe-100">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/Logo-01.png'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-terracotta-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sage-600 text-white shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && !hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-charcoal-900 text-white shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Stock Status Indicator */}
        {product.stock <= 0 ? (
          <div className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-charcoal-900 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-amber-500/90 text-white text-[10px] font-medium backdrop-blur-sm">
            Only {product.stock} left
          </span>
        ) : null}

        {/* Quick Add Button */}
        {product.stock > 0 && (
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-2.5 right-2.5 p-2.5 rounded-full shadow-md transition-all duration-200 ${
              added
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-white/95 text-charcoal-900 hover:bg-charcoal-900 hover:text-white'
            }`}
            title="Quick Add to Bag"
            aria-label="Add to cart"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Info Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[10px] text-taupe-600">
              {product.category.replace(/-/g, ' ')}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-charcoal-900 text-xs sm:text-sm line-clamp-2 hover:text-charcoal-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & SKU */}
        <div className="mt-3 pt-2 border-t border-taupe-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm sm:text-base font-mono text-charcoal-950">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-charcoal-400 line-through font-mono">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-charcoal-400 font-mono hidden sm:inline">
            {product.sku}
          </span>
        </div>
      </div>
    </div>
  );
}
