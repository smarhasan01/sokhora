'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';

export default function DealsOfTheDay() {
  const { isBn, formatPrice, formatNumber } = useLanguage();
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Get real discounted products from database
  const allProducts = getProducts().filter((p) => p.isPublished);
  const discountedProducts = allProducts.filter(
    (p) => p.discountPrice && p.discountPrice < p.regularPrice
  );
  // Pick top 3 real discounted products
  const deals = discountedProducts.slice(0, 3);

  const handleQuickAdd = (e: React.MouseEvent, product: (typeof deals)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;

    addItem(product, 1, product.variations?.colors?.[0]?.name, product.variations?.sizes?.[0]);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  if (deals.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header matching Reference screenshot */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EAECEF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
            {isBn ? 'দিনের বিশেষ অফার' : 'Deals Of The Day'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'সরাসরি ডিসকাউন্ট সহ বিশেষ লাইফস্টাইল পণ্য' : 'Special genuine discounts on handpicked essentials'}
          </p>
        </div>

        <Link
          href="/shop?filter=sale"
          className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-1 transition-colors"
        >
          <span>{isBn ? 'সবগুলো ডিল' : 'See All Deals'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Deal Cards matching Reference screenshot layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {deals.map((product) => {
          const discountPercent = Math.round(
            ((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100
          );
          const displayName = isBn && product.nameBn ? product.nameBn : product.name;
          const displayDesc = isBn && product.descriptionBn ? product.descriptionBn : product.description;
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-[#EAECEF] p-5 flex flex-col justify-between card-lift relative"
            >
              {/* Circular Discount Badge (Golden Accent #C78703) */}
              <div className="flex justify-end mb-2">
                <span className="w-12 h-12 rounded-full bg-[#C78703] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  -{formatNumber(discountPercent)}%
                </span>
              </div>

              {/* Product preview with subtle hover zoom */}
              <Link
                href={`/product/${product.slug}`}
                className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F6F7F8] mb-4 block"
              >
                <Image
                  src={product.images[0] || '/images/shokhora-official-logo.png'}
                  alt={displayName}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Info */}
              <div className="space-y-2">
                <Link href={`/product/${product.slug}`} className="block">
                  <h3 className="font-bold text-sm sm:text-base text-[#012D51] group-hover:text-[#C78703] transition-colors leading-snug line-clamp-1">
                    {displayName}
                  </h3>
                </Link>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {displayDesc}
                </p>

                {/* Real Price Display */}
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <span className="text-base font-bold text-[#012D51]">
                    {formatPrice(product.discountPrice!)}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                </div>
              </div>

              {/* CTA button with Quick Add or View */}
              <div className="mt-4 pt-3 border-t border-[#EAECEF] flex items-center justify-between gap-2">
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold transition-all duration-200 shadow-xs btn-press"
                >
                  <span>{isBn ? 'বিস্তারিত দেখুন' : 'Shop Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  disabled={product.stock <= 0}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs btn-press ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#F6F7F8] hover:bg-[#012D51] text-[#012D51] hover:text-white border border-[#EAECEF]'
                  }`}
                  title={isBn ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                  aria-label="Add to Cart"
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
