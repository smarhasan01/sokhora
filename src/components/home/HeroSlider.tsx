'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface Slide {
  id: string;
  tagline: string;
  taglineBn: string;
  headline: string;
  headlineBn: string;
  subtitle: string;
  subtitleBn: string;
  discountBadge: string;
  discountBadgeBn: string;
  ctaText: string;
  ctaTextBn: string;
  ctaLink: string;
  image: string;
  accentColor: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    tagline: 'Best Deal Online on Hair Accessories',
    taglineBn: 'হেয়ার এক্সেসরিজে সেরা অনলাইন অফার',
    headline: 'PURE MULBERRY SILK.',
    headlineBn: 'পিওর মালবেরি সিল্ক।',
    subtitle: 'Handcrafted 100% genuine silk scrunchies that protect hair from breakage and frizz.',
    subtitleBn: 'চুল ভাঙা রোধে ১০০% খাঁটি মালবেরি সিল্কে হাতে তৈরি প্রিমিয়াম স্ক্রাঞ্চি কালেকশন।',
    discountBadge: 'UP TO 50% OFF',
    discountBadgeBn: '৫০% পর্যন্ত ছাড়',
    ctaText: 'Shop Now',
    ctaTextBn: 'এখনই কিনুন',
    ctaLink: '/category/scrunchies-hair-accessories',
    image: '/images/products/prod-001.jpg',
    accentColor: '#C78703',
  },
  {
    id: 'slide-2',
    tagline: 'Premium Bangladeshi Heritage Fashion',
    taglineBn: 'ঐতিহ্যবাহী বাংলাদেশি ফ্যাশন কালেকশন',
    headline: 'ELEGANT KHADI & JAMDANI.',
    headlineBn: 'আভিজাত্যের খাদি ও জামদানি।',
    subtitle: 'Breathable handspun linen kurtis and authentic Narayanganj Jamdani silk stoles.',
    subtitleBn: 'খাঁটি খাদি সুতি লিনেন কুর্তি ও ঐতিহ্যবাহী জামদানি মোটিফের এক্সক্লুসিভ স্টোল।',
    discountBadge: 'UP TO 40% OFF',
    discountBadgeBn: '৪০% পর্যন্ত ছাড়',
    ctaText: 'Explore Fashion',
    ctaTextBn: 'পোশাক দেখুন',
    ctaLink: '/category/fashion-clothing',
    image: '/images/products/prod-009.jpg',
    accentColor: '#C78703',
  },
  {
    id: 'slide-3',
    tagline: 'Gentle & Safe Kids Accessories',
    taglineBn: 'শিশুদের জন্য নিরাপদ ও কোমল সামগ্রী',
    headline: 'SWEET BLOSSOM CLIPS.',
    headlineBn: 'সুইট ব্লসম কিডস ক্লিপস।',
    subtitle: 'Ultra-gentle fabric-wrapped baby floral hair pins and pinch-free velvet headbands.',
    subtitleBn: 'শিশুদের কোমল ত্বকের কথা মাথায় রেখে কাপড়ে মোড়ানো মিষ্টি ফ্লোরাল ক্লিপ ও ব্যান্ড।',
    discountBadge: 'STARTING AT ৳290',
    discountBadgeBn: 'শুরু মাত্র ২৯০৳ থেকে',
    ctaText: 'Shop Kids',
    ctaTextBn: 'কিডস কালেকশন',
    ctaLink: '/category/kids-hairbands-clips',
    image: '/images/products/prod-003.jpg',
    accentColor: '#C78703',
  },
  {
    id: 'slide-4',
    tagline: 'Clean Organic Skincare & Radiance',
    taglineBn: 'বিশুদ্ধ প্রাকৃতিক রূপচর্চা সামগ্রী',
    headline: 'NATURAL GLOW ESSENTIALS.',
    headlineBn: 'ন্যাচারাল গ্লো স্কিনকেয়ার।',
    subtitle: 'Cold-pressed beetroot lip balms and wild rose radiance facial serums.',
    subtitleBn: 'আমন্ড অয়েল ও বিটরুটের প্রাকৃতিক লিপ বাম এবং ওয়াইল্ড রোজ ফেসিয়াল সিরাম।',
    discountBadge: 'UP TO 35% OFF',
    discountBadgeBn: '৩৫% পর্যন্ত ছাড়',
    ctaText: 'Shop Beauty',
    ctaTextBn: 'সৌন্দর্য পণ্য',
    ctaLink: '/category/cosmetics-beauty',
    image: '/images/products/prod-007.jpg',
    accentColor: '#C78703',
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
      }, 5000);
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Promotional Hero Slider"
    >
      {/* MegaMart-Style Rounded Dark Navy Banner Card */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-radial from-[#023E6E] via-[#012D51] to-[#011C33] text-white overflow-hidden shadow-lg border border-[#012D51]/50 min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center">
        {/* Subtle Decorative Background Circles */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#C78703]/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Slide Content Grid */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          {/* Left Text Column (7 cols) */}
          <div className="md:col-span-7 space-y-4 animate-fade-in" key={`text-${slide.id}`}>
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
              <span className="text-xs font-semibold tracking-wide text-white/90">
                {isBn ? slide.taglineBn : slide.tagline}
              </span>
            </div>

            {/* Giant Bold Headline (MegaMart Style) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isBn ? slide.headlineBn : slide.headline}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
              {isBn ? slide.subtitleBn : slide.subtitle}
            </p>

            {/* Discount Callout */}
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F6DDAB] tracking-wider">
              {isBn ? slide.discountBadgeBn : slide.discountBadge}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-[#C78703] hover:bg-[#B07502] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group"
              >
                <span>{isBn ? slide.ctaTextBn : slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Showcase Product Image (5 cols) */}
          <div className="md:col-span-5 flex justify-center items-center relative animate-fade-in" key={`img-${slide.id}`}>
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-white/10 p-3 backdrop-blur-xs border border-white/20 shadow-2xl">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority
                sizes="(max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* MegaMart Left & Right Circular Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30 transition-all z-20 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-xs border border-white/30 transition-all z-20 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* MegaMart Bottom-Left Slide Indicator Dots */}
        <div className="absolute left-6 sm:left-12 bottom-4 sm:bottom-6 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all rounded-full ${
                currentSlide === idx ? 'w-8 bg-[#C78703]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
