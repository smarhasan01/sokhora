'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    tag: 'NEW FESTIVE SEASON',
    tagBn: 'নতুন উৎসবের আয়োজন',
    title: 'Elevate Your Everyday Lifestyle & Style',
    titleBn: 'প্রতিদিনের স্নিগ্ধ নান্দনিকতার ছোঁয়া',
    subtitle: 'Shop the finest handcrafted mulberry silk scrunchies, delicate brass jewellery, and botanical essentials.',
    subtitleBn: 'খাঁটি মালবেরি সিল্কের স্ক্রাঞ্চি, ঐতিহ্যবাহী ব্রাস গহনা এবং অর্গানিক লাইফস্টাইল পণ্য।',
    ctaText: 'Shop Now',
    ctaTextBn: 'কেনাকাটা করুন',
    link: '/shop',
    image: '/images/categories/scrunchies.jpg',
    badge: '100% Pure Mulberry Silk',
    badgeBn: '১০০% খাঁটি মালবেরি সিল্ক',
  },
  {
    tag: 'ARTISAN CRAFTED',
    tagBn: 'হাতে তৈরি ঐতিহ্য',
    title: 'Handmade Brass & Minimalist Pearls',
    titleBn: 'দেশীয় কারুশিল্পে তৈরি ব্রাস ও মুক্তা',
    subtitle: 'Timeless filigree chokers, elegant pendant earrings, and statement bangles for every special occasion.',
    subtitleBn: 'চমৎকার কারুকাজে তৈরি ব্রাস চোকার, কানের দুল ও মার্জিত গহনার সমাহার।',
    ctaText: 'Explore Jewellery',
    ctaTextBn: 'জুয়েলারি দেখুন',
    link: '/category/jewellery-fashion-accessories',
    image: '/images/categories/jewellery.jpg',
    badge: 'Heritage Collection',
    badgeBn: 'হেরিটেজ কালেকশন',
  },
  {
    tag: 'KIDS & ACCESSORIES',
    tagBn: 'বাচ্চাদের হেয়ার এক্সেসরিজ',
    title: 'Sweet Floral Hair Clips & Bows',
    titleBn: 'বাচ্চাদের মিষ্টি ফ্লোরাল হেয়ার ক্লিপ',
    subtitle: 'Gentle on fine hair, durable pastel tones, and skin-friendly headbands handcrafted with love.',
    subtitleBn: 'শিশুদের চুলের সুরক্ষায় নরম ও টেকসই ফ্লোরাল ক্লিপ ও হেডব্যান্ড।',
    ctaText: 'Shop Kids Hair',
    ctaTextBn: 'কিডস ক্লিপ দেখুন',
    link: '/category/kids-hairbands-clips',
    image: '/images/categories/kids-hair.jpg',
    badge: 'Gentle & Soft',
    badgeBn: 'কোমল ও আরামদায়ক',
  },
];

export default function HeroSlider() {
  const { isBn } = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="relative rounded-3xl bg-[#F4F5F7] overflow-hidden border border-gray-200/90 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 lg:p-16 min-h-[380px] sm:min-h-[460px]">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#FF5B37] text-[11px] font-bold tracking-wider uppercase shadow-sm border border-gray-200/60 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? slide.tagBn : slide.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {isBn ? slide.titleBn : slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {isBn ? slide.subtitleBn : slide.subtitle}
            </p>

            <div className="pt-2">
              <Link
                href={slide.link}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF5B37] text-white hover:bg-[#FA4A23] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-98"
              >
                <span>{isBn ? slide.ctaTextBn : slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Product Cutout Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-xl bg-white border-4 border-white">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 text-center shadow">
                <span className="text-xs font-bold text-gray-900 font-mono">
                  {isBn ? slide.badgeBn : slide.badge}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                current === idx ? 'w-6 bg-[#FF5B37]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
