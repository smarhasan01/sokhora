'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSlide {
  id: string;
  badge: string;
  badgeBn: string;
  headline: string;
  headlineBn: string;
  priceTag: string;
  priceTagBn: string;
  description: string;
  descriptionBn: string;
  image: string;
  primaryCtaText: string;
  primaryCtaTextBn: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaTextBn: string;
  secondaryCtaLink: string;
  featurePill: string;
  featurePillBn: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-scrunchies',
    badge: 'Signature Hair Accessories',
    badgeBn: 'সিগনেচার হেয়ার এক্সেসরিজ',
    headline: 'PURE MULBERRY SILK',
    headlineBn: 'পিওর মালবেরি সিল্ক',
    priceTag: 'UP TO 40% OFF',
    priceTagBn: '৪০% পর্যন্ত ছাড়',
    description:
      'Handcrafted 100% genuine 19-momme mulberry silk cloud scrunchies. Protects hair from breakage, frizz, and ponytail dents with premium natural sheen.',
    descriptionBn:
      'চুল ভাঙা ও রুক্ষ হওয়া রোধে ১০০% খাঁটি ১৯-মমি মালবেরি সিল্কে তৈরি আরামদায়ক ক্লাউড স্ক্রাঞ্চি। সব ধরনের চুলের জন্য মানসম্মত।',
    image: '/images/products/prod-001.jpg',
    primaryCtaText: 'Shop Scrunchies',
    primaryCtaTextBn: 'স্ক্রাঞ্চি কিনুন',
    primaryCtaLink: '/category/scrunchies-hair-accessories',
    secondaryCtaText: 'View All Deals',
    secondaryCtaTextBn: 'সব অফার দেখুন',
    secondaryCtaLink: '/shop?filter=sale',
    featurePill: '100% Authentic Mulberry Silk',
    featurePillBn: '১০০% খাঁটি মালবেরি সিল্ক',
  },
  {
    id: 'slide-fashion',
    badge: 'Bangladeshi Heritage Fashion',
    badgeBn: 'ঐতিহ্যবাহী দেশীয় পোশাক',
    headline: 'KHADI LINEN & JAMDANI',
    headlineBn: 'খাদি লিনেন ও জামদানি',
    priceTag: 'NEW SEASON ARRIVALS',
    priceTagBn: 'নতুন মৌসুমের কালেকশন',
    description:
      'Breathable handspun khadi cotton-linen everyday kurtis and authentic Narayanganj Jamdani silk stoles crafted for comfort and festive elegance.',
    descriptionBn:
      'খাঁটি খাদি সুতি ও লিনেন মিশ্রণে তৈরি আরামদায়ক ক্যাজুয়াল কুর্তি ও ঐতিহ্যবাহী জামদানি মোটিফের এক্সক্লুসিভ সিল্ক ওড়না।',
    image: '/images/products/prod-009.jpg',
    primaryCtaText: 'Explore Fashion',
    primaryCtaTextBn: 'পোশাক দেখুন',
    primaryCtaLink: '/category/fashion-clothing',
    secondaryCtaText: 'See Catalog',
    secondaryCtaTextBn: 'ক্যাটালগ দেখুন',
    secondaryCtaLink: '/shop?category=fashion-clothing',
    featurePill: 'Breathable Handcrafted Weave',
    featurePillBn: 'হাতে বোনা আরামদায়ক ফেব্রিক',
  },
  {
    id: 'slide-kids',
    badge: 'Safe & Gentle for Kids',
    badgeBn: 'শিশুদের জন্য নিরাপদ ও আরামদায়ক',
    headline: 'SWEET BLOSSOM CLIPS',
    headlineBn: 'সুইট ব্লসম কিডস ক্লিপস',
    priceTag: 'STARTING AT ৳290',
    priceTagBn: 'শুরু মাত্র ২৯০৳ থেকে',
    description:
      'Ultra-gentle fabric-wrapped baby floral hair pins and pinch-free plush velvet headbands designed safely for delicate hair and toddler scalp.',
    descriptionBn:
      'শিশুদের কোমল মাথার ত্বকের কথা মাথায় রেখে কাপড়ে মোড়ানো মিষ্টি ফ্লোরাল ক্লিপ ও ভেলভেট বো ফ্লেক্সিবল হেয়ারব্যান্ড।',
    image: '/images/products/prod-003.jpg',
    primaryCtaText: 'Shop Kids Collection',
    primaryCtaTextBn: 'কিডস কালেকশন কিনুন',
    primaryCtaLink: '/category/kids-hairbands-clips',
    secondaryCtaText: 'Gift Ideas',
    secondaryCtaTextBn: 'উপহার কালেকশন',
    secondaryCtaLink: '/shop?category=kids-hairbands-clips',
    featurePill: 'Pinch-Free Scalp Safe Design',
    featurePillBn: 'ব্যথাহীন ও নিরাপদ ডিজাইন',
  },
  {
    id: 'slide-cosmetics',
    badge: 'Clean Organic Skincare',
    badgeBn: 'বিশুদ্ধ প্রাকৃতিক রূপচর্চা',
    headline: 'NATURAL GLOW BALM & SERUM',
    headlineBn: 'ন্যাচারাল গ্লো স্কিনকেয়ার',
    priceTag: 'UP TO 35% OFF',
    priceTagBn: '৩৫% পর্যন্ত ছাড়',
    description:
      'Organic beetroot lip & cheek balms infused with sweet almond oil and wild rose radiance facial serums for nourished, healthy skin.',
    descriptionBn:
      'আমন্ড অয়েল ও বিটরুটের প্রাকৃতিক লিপ বাম এবং খাঁটি গোলাপের নির্যাস সমৃদ্ধ ওয়াইল্ড রোজ ফেসিয়াল সিরাম।',
    image: '/images/products/prod-007.jpg',
    primaryCtaText: 'Shop Beauty Care',
    primaryCtaTextBn: 'বিউটি কেয়ার দেখুন',
    primaryCtaLink: '/category/cosmetics-beauty',
    secondaryCtaText: 'Skincare Offers',
    secondaryCtaTextBn: 'স্কিনকেয়ার অফার',
    secondaryCtaLink: '/shop?category=cosmetics-beauty',
    featurePill: 'Chemical-Free Natural Glow',
    featurePillBn: 'কেমিক্যাল-মুক্ত ন্যাচারাল উপাদান',
  },
  {
    id: 'slide-everyday',
    badge: 'Daily Lifestyle Utilities',
    badgeBn: 'দৈনন্দিন লাইফস্টাইল পণ্য',
    headline: 'CANVAS TOTE & BRASS MIRROR',
    headlineBn: 'ক্যানভাস টোট ও ব্রাস আয়না',
    priceTag: 'SPECIAL BUNDLE DEALS',
    priceTagBn: 'স্পেশাল বান্ডেল অফার',
    description:
      'Durable 14oz organic cotton canvas shopper tote bags and dual-magnification antique brass pocket compact mirrors for daily convenience.',
    descriptionBn:
      '১৪ আউন্স খাঁটি অর্গানিক কটন ক্যানভাস শপার টোট ব্যাগ ও অ্যান্টিক ব্রাস ফিনিশের ডাবল ম্যাগনিফিকেশন পকেট আয়না।',
    image: '/images/products/prod-013.jpg',
    primaryCtaText: 'Shop Everyday Goods',
    primaryCtaTextBn: 'নিত্যপণ্য কিনুন',
    primaryCtaLink: '/category/everyday-products',
    secondaryCtaText: 'All Collections',
    secondaryCtaTextBn: 'সকল কালেকশন',
    secondaryCtaLink: '/shop',
    featurePill: 'Durable Everyday Utility',
    featurePillBn: 'দৈনন্দিন ব্যবহারে দীর্ঘস্থায়ী',
  },
];

export default function HeroSlider() {
  const { isBn } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Promotional Hero Slider"
    >
      {/* MegaMart-Inspired Balanced Promotional Banner Card */}
      <div className="relative rounded-2xl lg:rounded-3xl bg-[#012D51] text-white overflow-hidden shadow-xl border border-[#012D51] min-h-[360px] sm:min-h-[400px] lg:min-h-[430px] flex items-center">
        {/* Subtle Brand Background Accents (No heavy gradient or blinding glows) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#023E6E]/60 to-transparent pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-[#C78703]/10 blur-3xl pointer-events-none" />

        {/* Slide Content Grid: Balanced 50/50 Desktop Two-Column Layout */}
        <div className="relative w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center z-10">
          {/* Left Column: Typography & CTAs (6 to 7 cols) */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4 animate-slide-up" key={`content-${slide.id}`}>
            {/* Small Promotional Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#C78703] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs animate-pulse-subtle">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{isBn ? slide.badgeBn : slide.badge}</span>
            </div>

            {/* Large Bold Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isBn ? slide.headlineBn : slide.headline}
            </h1>

            {/* Clear Promotional Price Tag / Discount Callout */}
            <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#F6DDAB] tracking-wide font-mono">
              {isBn ? slide.priceTagBn : slide.priceTag}
            </div>

            {/* Short Supporting Description */}
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
              {isBn ? slide.descriptionBn : slide.description}
            </p>

            {/* Two Action Buttons: Primary Shop Now + Secondary Explore */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center gap-2 bg-[#C78703] hover:bg-[#B07502] text-white px-6 sm:px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <span>{isBn ? slide.primaryCtaTextBn : slide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                href={slide.secondaryCtaLink}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95"
              >
                <span>{isBn ? slide.secondaryCtaTextBn : slide.secondaryCtaText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Large, High-Quality Product Showcase (5 cols) */}
          <div className="md:col-span-5 flex justify-center items-center relative animate-scale-in" key={`image-${slide.id}`}>
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] aspect-square rounded-2xl overflow-hidden bg-white/10 p-2.5 backdrop-blur-xs border border-white/20 shadow-2xl group">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
                className="object-cover rounded-xl group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Floating Feature Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#012D51]/95 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 flex items-center gap-2 text-white shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C78703] shrink-0 animate-pulse-subtle" />
                <span className="text-[11px] font-bold truncate">
                  {isBn ? slide.featurePillBn : slide.featurePill}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Previous & Next Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-[#C78703] text-white flex items-center justify-center backdrop-blur-xs border border-white/30 transition-all duration-200 hover:scale-110 active:scale-90 z-20 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-[#C78703] text-white flex items-center justify-center backdrop-blur-xs border border-white/30 transition-all duration-200 hover:scale-110 active:scale-90 z-20 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicator Dots (Bottom-Left) */}
        <div className="absolute left-6 sm:left-14 bottom-3 sm:bottom-4 flex items-center gap-1.5 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === idx ? 'w-8 bg-[#C78703] shadow-xs' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
