'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    tag: '— Today Best Deal',
    tagBn: '— আজকের সেরা অফার',
    title: 'NEW ARRIVALS / FESTIVE LIFESTYLE',
    titleBn: 'নতুন আগমন / ফেস্টিভ লাইফস্টাইল',
    subtitle: 'Handcrafted mulberry silk scrunchies, traditional brass jewellery, and pure botanicals for your daily elegance.',
    subtitleBn: 'খাঁটি মালবেরি সিল্কের স্ক্রাঞ্চি, ঐতিহ্যবাহী ব্রাস গহনা এবং ত্বকের যত্নে ১০০% নির্ভেজাল প্রসাধনী।',
    ctaText: 'Shop Now',
    ctaTextBn: 'অর্ডার করুন',
    link: '/shop',
    image: '/images/categories/scrunchies.jpg',
    badge: '100% Pure Mulberry Silk',
    badgeBn: '১০০% খাঁটি মালবেরি সিল্ক',
  },
  {
    tag: '— Artisan Heritage',
    tagBn: '— দেশীয় ঐতিহ্যবাহী শিল্প',
    title: 'HANDCRAFTED BRASS & PEARL JEWELLERY',
    titleBn: 'হাতে তৈরি ব্রাস ও মুক্তার গহনা',
    subtitle: 'Exquisite filigree necklaces, timeless gold-tone earrings, and hand-chiseled bangles for every special festive occasion.',
    subtitleBn: 'নিখুঁত কারুকাজের ব্রাস নেকলেস, স্টেটমেন্ট কানের দুল এবং উৎসবের মানানসই অভিজাত গহনা।',
    ctaText: 'Explore Collection',
    ctaTextBn: 'কালেকশন দেখুন',
    link: '/category/jewellery-fashion-accessories',
    image: '/images/categories/jewellery.jpg',
    badge: 'Heritage Brass Collection',
    badgeBn: 'ঐতিহ্যবাহী ব্রাস কালেকশন',
  },
  {
    tag: '— For The Little Ones',
    tagBn: '— শিশুদের জন্য ভালোবাসা',
    title: 'SWEET FLORAL HAIR CLIPS & SOFT BANDS',
    titleBn: 'শিশুদের ফ্লোরাল হেয়ার ক্লিপ ও ব্যান্ড',
    subtitle: 'Ultra-gentle on fine hair, durable pastel tones, and skin-friendly headbands handcrafted with tenderness.',
    subtitleBn: 'শিশুদের চুলের সুরক্ষায় আরামদায়ক, নরম ও রঙিন ফ্লোরাল হেয়ার ক্লিপ ও বো ব্যান্ড।',
    ctaText: 'Shop Kids Hair',
    ctaTextBn: 'কিডস ক্লিপ দেখুন',
    link: '/category/kids-hairbands-clips',
    image: '/images/categories/kids-hair.jpg',
    badge: 'Gentle & Skin-Safe',
    badgeBn: 'কোমল ও নিরাপদ',
  },
];

export default function HeroSlider() {
  const { isBn } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = SLIDES[current];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-3xl bg-gradient-to-r from-[#F6F7F8] via-[#FAF9F5] to-[#F1F4F7] overflow-hidden border border-[#EAECEF] shadow-xs"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 lg:p-16 min-h-[400px] sm:min-h-[460px]">
          
          {/* Left Text with smooth fade-in and slide-up */}
          <div key={`text-${current}`} className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-[#C78703] text-xs font-bold tracking-widest uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
              <span>{isBn ? slide.tagBn : slide.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#012D51] tracking-tight leading-tight">
              {isBn ? slide.titleBn : slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#252525]/80 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              {isBn ? slide.subtitleBn : slide.subtitle}
            </p>

            <div className="pt-2 animate-slide-up">
              <Link
                href={slide.link}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg btn-press group"
              >
                <span>{isBn ? slide.ctaTextBn : slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Product Cutout Showcase with smooth entrance animation */}
          <div key={`img-${current}`} className="lg:col-span-5 flex items-center justify-center relative animate-scale-in">
            {/* Soft decorative background circles */}
            <div className="absolute w-72 h-72 rounded-full bg-[#C78703]/10 blur-2xl pointer-events-none" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-lg bg-white border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl border border-[#EAECEF] text-center shadow-xs">
                <span className="text-xs font-bold text-[#012D51] font-mono">
                  {isBn ? slide.badgeBn : slide.badge}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#012D51] flex items-center justify-center shadow-md border border-[#EAECEF] transition-all duration-200 hover:scale-105 btn-press"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#012D51] flex items-center justify-center shadow-md border border-[#EAECEF] transition-all duration-200 hover:scale-105 btn-press"
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
              className={`h-2 rounded-full transition-all duration-300 ${
                current === idx ? 'w-6 bg-[#012D51]' : 'w-2 bg-[#012D51]/25 hover:bg-[#012D51]/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
