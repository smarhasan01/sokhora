'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

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

export default function SpecialOffersSection() {
  const { isBn } = useLanguage();

  // Live countdown timer matching Reference 1
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 19,
    seconds: 46,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 0, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Featured Best Deal Banner with Live Countdown Timer (Reference 1) */}
      <div className="relative rounded-3xl bg-[#F6F7F8] border border-[#EAECEF] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-xs">
        <div className="space-y-3 max-w-lg text-center md:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#012D51] font-mono text-[11px] font-bold border border-[#EAECEF]">
            <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
            <span>{isBn ? 'দিনের সেরা ডিল' : 'Best Deal'}</span>
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
            {isBn ? 'শখোরা ফেস্টিভ সিল্ক ও ব্রাস লাক্সারি সেট' : 'SHOKHORA FESTIVE SILK & JEWELLERY SET'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {isBn
              ? 'সীমিত সময়ের স্পেশাল অফার। থাকছে খাঁটি সিল্কের স্ক্রাঞ্চি এবং ঐতিহ্যবাহী গহনার কম্বো।'
              : 'Special limited edition bundle featuring pure mulberry silk and handcrafted filigree.'}
          </p>

          {/* Countdown timer pills matching Reference 1 */}
          <div className="flex items-center justify-center md:justify-start gap-2 pt-1 font-mono">
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#EAECEF] text-[#012D51] shadow-xs">
              <span className="text-sm font-bold">{formatDigit(timeLeft.days)}</span>
              <span className="text-[9px] text-stone-400 uppercase">{isBn ? 'দিন' : 'Days'}</span>
            </div>
            <span className="text-stone-400 font-bold">:</span>
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#EAECEF] text-[#012D51] shadow-xs">
              <span className="text-sm font-bold">{formatDigit(timeLeft.hours)}</span>
              <span className="text-[9px] text-stone-400 uppercase">{isBn ? 'ঘণ্টা' : 'Hours'}</span>
            </div>
            <span className="text-stone-400 font-bold">:</span>
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#EAECEF] text-[#012D51] shadow-xs">
              <span className="text-sm font-bold">{formatDigit(timeLeft.minutes)}</span>
              <span className="text-[9px] text-stone-400 uppercase">{isBn ? 'মিনিট' : 'Mins'}</span>
            </div>
            <span className="text-stone-400 font-bold">:</span>
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#EAECEF] text-[#C78703] shadow-xs">
              <span className="text-sm font-bold">{formatDigit(timeLeft.seconds)}</span>
              <span className="text-[9px] text-stone-400 uppercase">{isBn ? 'সেকেন্ড' : 'Secs'}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs btn-press group"
            >
              <span>{isBn ? 'শপ নাও' : 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Deal Image */}
        <div className="relative w-64 h-56 sm:w-80 sm:h-64 rounded-2xl overflow-hidden shadow-sm bg-white border-4 border-white shrink-0 group">
          <Image
            src="/images/categories/jewellery.jpg"
            alt="Best Deal"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {/* 2. Deals Of The Day (3 Cards matching Reference 1 layout) */}
      <div>
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
      </div>
    </section>
  );
}
