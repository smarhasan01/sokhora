'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getCoupons } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CountdownBanner() {
  const { isBn, formatPrice } = useLanguage();

  // Find real active featured product with genuine discount
  const allProducts = getProducts().filter((p) => p.isPublished);
  const featuredDeal =
    allProducts.find((p) => p.isFeatured && p.discountPrice && p.discountPrice < p.regularPrice) ||
    allProducts.find((p) => p.discountPrice && p.discountPrice < p.regularPrice) ||
    allProducts[0];

  // Find real active campaign / coupon for end time
  const activeCoupon = getCoupons().find(
    (c) => c.isActive && new Date(c.expiryDate).getTime() > Date.now()
  );

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!activeCoupon?.expiryDate) return;

    const calculateTimeLeft = () => {
      const targetTime = new Date(`${activeCoupon.expiryDate}T23:59:59`).getTime();
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [activeCoupon?.expiryDate]);

  if (!featuredDeal) return null;

  const formatDigit = (num: number) => num.toString().padStart(2, '0');
  const displayName = isBn && featuredDeal.nameBn ? featuredDeal.nameBn : featuredDeal.name;
  const displayDesc = isBn && featuredDeal.descriptionBn ? featuredDeal.descriptionBn : featuredDeal.description;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative rounded-3xl bg-[#F6F7F8] border border-[#EAECEF] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-xs">
        <div className="space-y-3 max-w-lg text-center md:text-left z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#012D51] font-mono text-[11px] font-bold border border-[#EAECEF]">
            <Sparkles className="w-3.5 h-3.5 text-[#C78703]" />
            <span>{isBn ? 'দিনের সেরা ডিল' : 'Today Best Deal'}</span>
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
            {displayName}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
            {displayDesc}
          </p>

          {/* Genuine Real Price */}
          <div className="flex items-center justify-center md:justify-start gap-2.5 font-mono pt-0.5">
            <span className="text-xl font-extrabold text-[#012D51]">
              {formatPrice(featuredDeal.discountPrice ?? featuredDeal.regularPrice)}
            </span>
            {featuredDeal.discountPrice && featuredDeal.discountPrice < featuredDeal.regularPrice && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(featuredDeal.regularPrice)}
              </span>
            )}
            {activeCoupon && (
              <span className="text-[11px] font-bold text-[#C78703] bg-[#FDF8ED] px-2 py-0.5 rounded-md border border-[#F8ECCB]">
                {activeCoupon.code}: {activeCoupon.discountValue}% OFF
              </span>
            )}
          </div>

          {/* Real Countdown timer boxes ONLY when configured campaign end time exists */}
          {timeLeft && (
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
          )}

          <div className="pt-2">
            <Link
              href={`/product/${featuredDeal.slug}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs btn-press group"
            >
              <span>{isBn ? 'অর্ডার করুন' : 'Shop Now'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Deal Image */}
        <Link
          href={`/product/${featuredDeal.slug}`}
          className="relative w-64 h-56 sm:w-80 sm:h-64 rounded-2xl overflow-hidden shadow-sm bg-white border-4 border-white shrink-0 group block"
        >
          <Image
            src={featuredDeal.images[0] || '/images/shokhora-official-logo.png'}
            alt={displayName}
            fill
            className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
    </section>
  );
}
