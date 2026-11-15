'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { ArrowRight, Star, Heart, ShoppingBag, Eye } from 'lucide-react';

export default function TrendingSection() {
  const { isBn, formatPrice, formatNumber } = useLanguage();
  const { addItem, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const allProducts = getProducts().filter((p) => p.isPublished);
  const trending = allProducts.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: "Special Limited Edition" Card as in Reference */}
        <div className="lg:col-span-4 rounded-3xl bg-[#F6F7F9] border border-gray-200/90 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#FF5B37] bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-sm">
              {isBn ? 'স্পেশাল লিমিটেড এডিশন' : 'Special Limited Edition'}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {isBn ? 'আমাদের সেরা অফার ও সীমিত সংগ্রহ' : 'Get The Best Price in Our Curated Collection'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isBn
                ? 'হস্তশিল্প ও সিল্কের সীমিত ব্যাচ কালেকশন। স্টক শেষ হওয়ার আগেই অর্ডার করুন।'
                : 'Handpicked artisan pieces crafted in limited batches. Secure yours today.'}
            </p>
          </div>

          <div className="pt-6 z-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF5B37] text-white hover:bg-[#FA4A23] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>{isBn ? 'শপ নাও' : 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Background subtle image */}
          <div className="absolute right-0 bottom-0 w-44 h-44 opacity-20 pointer-events-none">
            <Image
              src="/images/categories/jewellery.jpg"
              alt="Artisan"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: "Trending Items" as in Reference with 01, 02 ranking badge */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {isBn ? 'ট্রেন্ডিং আইটেম' : 'Trending Items'}
            </h2>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#FF5B37] hover:underline flex items-center gap-1"
            >
              <span>{isBn ? 'সবগুলো দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {trending.map((product, idx) => {
              const rank = String(idx + 1).padStart(2, '0');
              const inWishlist = isInWishlist(product.id);
              const price = product.discountPrice ?? product.regularPrice;
              const displayName = isBn && product.nameBn ? product.nameBn : product.name;

              return (
                <div
                  key={product.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#FFF0ED] text-[#FF5B37] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {rank}
                    </div>

                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <Image
                        src={product.images[0] || '/images/Logo-01.png'}
                        alt={displayName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-mono text-gray-400 font-bold">
                        {product.category.replace(/-/g, ' ')}
                      </p>
                      <Link href={`/product/${product.slug}`} className="block hover:text-[#FF5B37]">
                        <h4 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">
                          {displayName}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-1 text-[10px] text-amber-500 mt-0.5">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-gray-400 font-mono">({formatNumber(product.reviewCount || 98)})</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <span className="font-mono font-bold text-sm sm:text-base text-[#FF5B37]">
                      {formatPrice(price)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2 rounded-lg border transition-all ${
                          inWishlist
                            ? 'bg-[#FFF0ED] text-[#FF5B37] border-[#FFD7CC]'
                            : 'border-gray-200 text-gray-500 hover:border-[#FF5B37] hover:text-[#FF5B37]'
                        }`}
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#FF5B37]' : ''}`} />
                      </button>

                      <button
                        onClick={() => {
                          addItem(product, 1);
                          setIsCartOpen(true);
                        }}
                        className="p-2 rounded-lg bg-[#FF5B37] text-white hover:bg-[#FA4A23] shadow-sm transition-all"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
