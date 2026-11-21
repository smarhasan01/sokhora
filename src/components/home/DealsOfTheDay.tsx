'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const DEALS = [
  {
    id: 'deal-1',
    title: 'Pure Mulberry Silk Scrunchie Set',
    titleBn: 'খাঁটি মালবেরি সিল্ক স্ক্রাঞ্চি সেট',
    desc: 'Grade 6A raw mulberry silk. Zero hair breakage, smooth slip and natural lustrous sheen.',
    descBn: 'গ্রেড ৬এ মালবেরি সিল্ক। চুলের সুরক্ষায় অতুলনীয় ও মার্জিত উজ্জ্বলতা।',
    image: '/images/categories/scrunchies.jpg',
    discount: '25% OFF',
    discountBn: '২৫% ছাড়',
    link: '/category/scrunchies-hair-accessories',
  },
  {
    id: 'deal-2',
    title: 'Handcrafted Antique Brass Choker',
    titleBn: 'হস্তনির্মিত এন্টিক ব্রাস চোকার',
    desc: 'Traditional artisan motifs with genuine freshwater pearl droplets and adjustable thread.',
    descBn: 'ঐতিহ্যবাহী নিখুঁত নকশা ও খাঁটি মুক্তার লকেট সহ প্রিমিয়াম ব্রাস গহনা।',
    image: '/images/categories/jewellery.jpg',
    discount: '30% OFF',
    discountBn: '৩০% ছাড়',
    link: '/category/jewellery-fashion-accessories',
  },
  {
    id: 'deal-3',
    title: 'Botanical Glow Care Essentials',
    titleBn: 'বোটানিক্যাল গ্লো স্কিনকেয়ার সেট',
    desc: 'Pure rosewater, organic cold-pressed oils, and soothing herbal blends for glowing skin.',
    descBn: 'গোলাপজল ও কোল্ড-প্রেসড অর্গানিক তেলের পুষ্টিতে উজ্জ্বল ও কোমল ত্বক।',
    image: '/images/categories/beauty.jpg',
    discount: '20% OFF',
    discountBn: '২০% ছাড়',
    link: '/category/cosmetics-beauty',
  },
];

export default function DealsOfTheDay() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header matching Reference screenshot */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EAECEF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#012D51] tracking-tight">
            {isBn ? 'দিনের বিশেষ অফার' : 'Deals Of The Day'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'আজকের জন্য বিশেষ ছাড়ের স্পেশাল ডিলসমূহ' : 'Special handpicked deals available only for today'}
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-[#012D51] hover:text-[#C78703] flex items-center gap-1 transition-colors"
        >
          <span>{isBn ? 'সবগুলো ডিল' : 'See All Deals'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Deal Cards matching Reference screenshot layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DEALS.map((deal) => (
          <div
            key={deal.id}
            className="group bg-white rounded-2xl border border-[#EAECEF] p-5 flex flex-col justify-between card-lift relative"
          >
            {/* Circular Discount Badge (Golden Accent #C78703) */}
            <div className="flex justify-end mb-2">
              <span className="w-12 h-12 rounded-full bg-[#C78703] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {isBn ? deal.discountBn : deal.discount}
              </span>
            </div>

            {/* Product preview with subtle hover zoom */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F6F7F8] mb-4">
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#012D51] group-hover:text-[#C78703] transition-colors leading-snug">
                {isBn ? deal.titleBn : deal.title}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {isBn ? deal.descBn : deal.desc}
              </p>
            </div>

            {/* CTA button */}
            <div className="mt-4 pt-3 border-t border-[#EAECEF]">
              <Link
                href={deal.link}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold transition-all duration-200 shadow-xs btn-press"
              >
                <span>{isBn ? 'শপ নাও' : 'Shop Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
