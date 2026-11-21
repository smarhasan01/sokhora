'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const FEATURED = [
  {
    title: 'Mulberry Silk Scrunchies',
    titleBn: 'খাঁটি মালবেরি সিল্ক স্ক্রাঞ্চি',
    subtitle: 'Zero frizz, reduces hair breakage & adds sheer elegance',
    subtitleBn: 'চুল পড়া রোধ করে ও দেয় নরম ও মসৃণ কোমল অনুভূতি',
    image: '/images/categories/scrunchies.jpg',
    link: '/category/scrunchies-hair-accessories',
    badge: 'Best Seller',
    badgeBn: 'বেস্ট সেলার',
    bg: 'bg-[#F6F5FA]',
    border: 'border-[#E4E0F0]',
  },
  {
    title: 'Heritage Brass Jewellery',
    titleBn: 'ঐতিহ্যবাহী ব্রাস ও মুক্তার গহনা',
    subtitle: 'Hand-chiseled motifs with antique gold finish',
    subtitleBn: 'নিখুঁত কারুকাজের হস্তশিল্প গহনা ও এন্টিক ফিনিশ',
    image: '/images/categories/jewellery.jpg',
    link: '/category/jewellery-fashion-accessories',
    badge: 'Artisan Crafted',
    badgeBn: 'কারুশিল্প',
    bg: 'bg-[#FBF8F0]',
    border: 'border-[#F2E7CA]',
  },
  {
    title: 'Gentle Kids Hair Accessories',
    titleBn: 'শিশুদের ফ্লোরাল হেয়ার এক্সেসরিজ',
    subtitle: 'Soft pastel clips, floral bows & skin-safe bands',
    subtitleBn: 'বাচ্চাদের চুলের সুরক্ষায় আরামদায়ক ও রঙিন ক্লিপ',
    image: '/images/categories/kids-hair.jpg',
    link: '/category/kids-hairbands-clips',
    badge: '100% Gentle',
    badgeBn: 'কোমল ও নিরাপদ',
    bg: 'bg-[#FDF9F0]',
    border: 'border-[#F8ECCB]',
  },
];

export default function FeaturedCategoriesSection() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURED.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`group rounded-2xl ${item.bg} border ${item.border} p-5 flex items-center justify-between gap-4 card-lift relative overflow-hidden`}
          >
            <div className="space-y-2 z-10 flex-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#012D51] text-[10px] font-bold font-mono tracking-wider uppercase border border-white shadow-xs">
                <Sparkles className="w-3 h-3 text-[#C78703]" />
                <span>{isBn ? item.badgeBn : item.badge}</span>
              </span>

              <h3 className="font-bold text-sm sm:text-base text-[#012D51] group-hover:text-[#C78703] transition-colors leading-snug">
                {isBn ? item.titleBn : item.title}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {isBn ? item.subtitleBn : item.subtitle}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#012D51] group-hover:text-[#C78703] transition-colors pt-1">
                <span>{isBn ? 'কালেকশন দেখুন' : 'Explore Now'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xs border-2 border-white shrink-0 group-hover:scale-105 transition-transform duration-500">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
