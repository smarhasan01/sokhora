'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestsellers'>('featured');
  const allProducts = getProducts().filter((p) => p.isPublished);

  const featured = allProducts.filter((p) => p.isFeatured);
  const newArrivals = allProducts.filter((p) => p.isNewArrival);
  const bestSellers = allProducts.filter((p) => p.isBestSeller);

  const getActiveList = () => {
    switch (activeTab) {
      case 'new':
        return newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 8);
      case 'bestsellers':
        return bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 8);
      default:
        return featured.length > 0 ? featured : allProducts.slice(0, 8);
    }
  };

  const currentProducts = getActiveList().slice(0, 8);

  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-taupe-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Selections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              Featured Products
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-taupe-100/70 p-1 rounded-full text-xs font-medium border border-taupe-200">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'featured'
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'new'
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === 'bestsellers'
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Special Offer Promotional Spotlight Banner */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-charcoal-900 text-white p-8 md:p-12 relative shadow-xl border border-charcoal-800">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
              <Tag className="w-3.5 h-3.5 text-sage-400" /> Special Offer
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Get 10% Off On Your Entire First Order
            </h3>

            <p className="text-xs sm:text-sm text-taupe-300 leading-relaxed">
              Use voucher coupon code <span className="text-white font-mono font-bold bg-white/20 px-2 py-0.5 rounded">SHOKHORA10</span> at checkout. Valid on silk scrunchies, kurti, jewellery and lifestyle gifts.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-charcoal-950 hover:bg-taupe-100 text-xs font-semibold transition-all shadow-md"
              >
                Claim Voucher & Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 bottom-0 top-0 w-80">
            <div className="relative w-full h-full opacity-90">
              <Image
                src="/images/Shokhora Little Things, Big Love.png"
                alt="SHOKHORA Little Things, Big Love"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
