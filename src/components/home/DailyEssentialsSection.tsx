'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

interface EssentialCard {
  id: string;
  name: string;
  nameBn: string;
  discount: string;
  discountBn: string;
  image: string;
  link: string;
}

const DAILY_ESSENTIALS: EssentialCard[] = [
  {
    id: 'ess-1',
    name: 'Canvas Tote Bags',
    nameBn: 'ক্যানভাস শপার টোট',
    discount: 'UP TO 30% OFF',
    discountBn: '৩০% পর্যন্ত ছাড়',
    image: '/images/products/prod-013.jpg',
    link: '/product/heavy-canvas-shopper-tote-bag',
  },
  {
    id: 'ess-2',
    name: 'Vanity Pocket Mirrors',
    nameBn: 'ভ্যানিটি পকেট আয়না',
    discount: 'UP TO 20% OFF',
    discountBn: '২০% পর্যন্ত ছাড়',
    image: '/images/products/prod-014.jpg',
    link: '/product/antique-brass-pocket-vanity-mirror',
  },
  {
    id: 'ess-3',
    name: 'Soy Scented Candles',
    nameBn: 'সয়া সুগন্ধি মোমবাতি',
    discount: 'UP TO 25% OFF',
    discountBn: '২৫% পর্যন্ত ছাড়',
    image: '/images/products/prod-011.jpg',
    link: '/product/artisan-soy-scented-candle-dhaka-monsoon',
  },
  {
    id: 'ess-4',
    name: 'Everyday Organizers',
    nameBn: 'ডেইলি অর্গানাইজার',
    discount: 'UP TO 20% OFF',
    discountBn: '২০% পর্যন্ত ছাড়',
    image: '/images/products/prod-012.jpg',
    link: '/product/shokhora-luxe-everyday-organizer-hamper',
  },
  {
    id: 'ess-5',
    name: 'Silk Hair Bands',
    nameBn: 'সিল্ক হেয়ারব্যান্ড',
    discount: 'UP TO 35% OFF',
    discountBn: '৩৫% পর্যন্ত ছাড়',
    image: '/images/products/prod-001.jpg',
    link: '/category/scrunchies-hair-accessories',
  },
];

export default function DailyEssentialsSection() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* MegaMart Header with Underline & View All */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E5E8]">
        <h2 className="text-base sm:text-xl font-bold text-[#202833]">
          {isBn ? 'দৈনন্দিন ' : 'Daily '}
          <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
            {isBn ? 'নিত্যপ্রয়োজনীয় পণ্য' : 'Essentials'}
          </span>
        </h2>

        <Link
          href="/category/everyday-products"
          className="text-xs sm:text-sm font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center gap-1 group"
        >
          <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* MegaMart Rounded Rectangular Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {DAILY_ESSENTIALS.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group bg-[#F7F8FA] hover:bg-white rounded-2xl p-4 text-center border border-[#E2E5E8] hover:border-[#C78703]/50 card-lift transition-all duration-300 shadow-xs flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white p-2 mb-3 shadow-xs">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 rounded-lg"
              />
            </div>

            {/* Title & Discount Badge */}
            <div className="min-w-0">
              <h3
                className="text-xs sm:text-sm font-bold text-[#202833] group-hover:text-[#012D51] transition-colors truncate whitespace-nowrap overflow-hidden text-ellipsis block"
                title={isBn ? item.nameBn : item.name}
              >
                {isBn ? item.nameBn : item.name}
              </h3>
              <p className="mt-1 text-[11px] font-extrabold text-[#C78703] tracking-wide">
                {isBn ? item.discountBn : item.discount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
