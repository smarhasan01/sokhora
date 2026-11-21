'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CountdownBanner() {
  const { isBn } = useLanguage();

  // Live countdown timer matching Reference screenshot
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Featured Best Deal Banner with Live Countdown Timer (Reference screenshot layout) */}
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

          {/* Countdown timer boxes matching Reference layout */}
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
    </section>
  );
}
