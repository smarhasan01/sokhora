'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Truck, Tag, Percent } from 'lucide-react';

export default function PromoBannerGrid() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Large Feature Banner on Left (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#F6F7F9] border border-gray-200/90 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
          <div className="max-w-xs z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-700 font-mono text-[11px] font-bold border border-gray-200 shadow-sm">
              <Truck className="w-3.5 h-3.5" />
              {isBn ? 'সারাদেশে ফ্রি শিপিং' : 'Free Shipping'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {isBn ? '৳১,৫০০+ অর্ডারে সারাদেশে ফ্রি ডেলিভারি' : 'Free Delivery on Orders Over ৳1,500'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {isBn
                ? 'ঢাকা ও ঢাকার বাইরে ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি এবং দ্রুততম হোম ডেলিভারি সুবিধা।'
                : 'Available throughout Bangladesh with reliable doorstep Cash on Delivery.'}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>{isBn ? 'অর্ডার করুন' : 'Shop Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="absolute -right-4 -bottom-4 w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden opacity-90 sm:opacity-100">
            <Image
              src="/images/categories/gifts.jpg"
              alt="Free Shipping Gifts"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Stacked Banners on Right (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Top Right Card */}
          <div className="flex-1 rounded-3xl bg-[#F6F7F9] border border-gray-200/90 p-6 sm:p-7 flex items-center justify-between relative overflow-hidden min-h-[150px]">
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#012D51]">
                {isBn ? 'সিজনাল ছাড়' : 'Festive Clearance'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {isBn ? 'নির্বাচিত পণ্যে ৩০% পর্যন্ত ছাড়' : 'Up to 30% Off Accessories'}
              </h4>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-md bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold transition-all shadow-sm"
              >
                <span>{isBn ? 'শপ নাও' : 'Shop Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-200 bg-white">
              <Image
                src="/images/categories/scrunchies.jpg"
                alt="Clearance"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="flex-1 rounded-3xl bg-[#F6F7F9] border border-gray-200/90 p-6 sm:p-7 flex items-center justify-between relative overflow-hidden min-h-[150px]">
            <div className="space-y-1.5 z-10 max-w-[60%]">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-700">
                {isBn ? 'প্রথম অর্ডারে অফার' : 'First Purchase'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {isBn ? '১০% ডিসকাউন্ট কোড: SHOKHORA10' : '10% Off Code: SHOKHORA10'}
              </h4>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-md bg-[#012D51] text-white hover:bg-[#C78703] text-xs font-bold transition-all shadow-sm"
              >
                <span>{isBn ? 'শপ নাও' : 'Shop Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-200 bg-white">
              <Image
                src="/images/categories/beauty.jpg"
                alt="First Purchase"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
