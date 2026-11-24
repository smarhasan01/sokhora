'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface BrandCard {
  id: string;
  brandName: string;
  brandNameBn: string;
  collection: string;
  collectionBn: string;
  discount: string;
  discountBn: string;
  link: string;
  image: string;
  bgGradient: string;
  textColor: string;
}

const FEATURED_BRANDS: BrandCard[] = [
  {
    id: 'brand-1',
    brandName: 'SHOKHORA Originals',
    brandNameBn: 'শখোরা অরিজিনালস',
    collection: '100% Mulberry Silk',
    collectionBn: '১০০% মালবেরি সিল্ক',
    discount: 'UP TO 40% OFF',
    discountBn: '৪০% পর্যন্ত ছাড়',
    link: '/category/scrunchies-hair-accessories',
    image: '/images/products/prod-001.jpg',
    bgGradient: 'bg-gradient-to-r from-[#012D51] to-[#023E6E]',
    textColor: 'text-white',
  },
  {
    id: 'brand-2',
    brandName: 'Aura Beauty BD',
    brandNameBn: 'অরা বিউটি বিডি',
    collection: 'Natural Glow Skincare',
    collectionBn: 'ন্যাচারাল গ্লো স্কিনকেয়ার',
    discount: 'UP TO 35% OFF',
    discountBn: '৩৫% পর্যন্ত ছাড়',
    link: '/category/cosmetics-beauty',
    image: '/images/products/prod-007.jpg',
    bgGradient: 'bg-gradient-to-r from-[#C78703] to-[#E2AA36]',
    textColor: 'text-white',
  },
  {
    id: 'brand-3',
    brandName: 'Little Bloom',
    brandNameBn: 'লিটল ব্লুম',
    collection: 'Kids Safe Hair Pins',
    collectionBn: 'কিডস সেফটি হেয়ারপিন',
    discount: 'UP TO 50% OFF',
    discountBn: '৫০% পর্যন্ত ছাড়',
    link: '/category/kids-hairbands-clips',
    image: '/images/products/prod-003.jpg',
    bgGradient: 'bg-gradient-to-r from-[#202833] to-[#364354]',
    textColor: 'text-white',
  },
];

export default function FeaturedBrands() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* MegaMart Header with Underline & View All */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E5E8]">
        <h2 className="text-base sm:text-xl font-bold text-[#202833]">
          {isBn ? 'জনপ্রিয় ' : 'Top '}
          <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
            {isBn ? 'কালেকশন ব্র্যান্ড সমূহ' : 'Featured Collections'}
          </span>
        </h2>

        <Link
          href="/shop"
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group"
        >
          <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3 Wide MegaMart Brand Promo Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {FEATURED_BRANDS.map((card) => (
          <Link
            key={card.id}
            href={card.link}
            className={`group relative rounded-2xl ${card.bgGradient} p-5 sm:p-6 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 card-lift flex items-center justify-between min-h-[160px]`}
          >
            {/* Left Content */}
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                {isBn ? card.brandNameBn : card.brandName}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                {isBn ? card.collectionBn : card.collection}
              </h3>
              <p className="text-base sm:text-lg font-black text-[#F6DDAB] tracking-wide pt-1">
                {isBn ? card.discountBn : card.discount}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#F6DDAB] transition-colors">
                <span>{isBn ? 'কালেকশন দেখুন' : 'Shop Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Right Product Mockup */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-white/20 p-2 backdrop-blur-xs border border-white/20 shrink-0 group-hover:scale-110 transition-transform duration-500 ease-out shadow-lg">
              <Image
                src={card.image}
                alt={card.brandName}
                fill
                sizes="128px"
                className="object-cover rounded-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
