'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Fast Nationwide Delivery',
    titleBn: 'দ্রুত হোম ডেলিভারি',
    desc: 'Inside Dhaka 24-48h, Outside Dhaka 2-4 days',
    descBn: 'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টা, বাইরে ২-৪ দিন',
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine Quality',
    titleBn: '১০০% খাঁটি পণ্যের নিশ্চয়তা',
    desc: 'Direct artisan & curated lifestyle sourcing',
    descBn: 'আসল কোয়ালিটি ও মানসম্মত প্রডাক্ট',
  },
  {
    icon: RefreshCw,
    title: '7-Day Easy Exchange',
    titleBn: '৭ দিনের সহজ এক্সচেঞ্জ',
    desc: 'Hassle-free replacement for defects',
    descBn: 'ত্রুটিমুক্ত পণ্য পাওয়ার সহজ নিশ্চয়তা',
  },
  {
    icon: Headphones,
    title: 'Dedicated Customer Support',
    titleBn: 'সার্বক্ষণিক কাস্টমার কেয়ার',
    desc: 'Hotline & WhatsApp: 01568923850',
    descBn: 'হটলাইন ও হোয়াটসঅ্যাপ: 01568923850',
  },
];

export default function ServiceBenefits() {
  const { isBn } = useLanguage();

  return (
    <section className="border-t border-b border-[#E2E5E8] bg-[#F7F8FA] py-6 sm:py-8 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white border border-[#E2E5E8] shadow-xs hover:border-[#C78703]/60 card-lift transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#012D51] text-[#C78703] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#202833] group-hover:text-[#012D51] transition-colors truncate whitespace-nowrap overflow-hidden text-ellipsis block">
                    {isBn ? b.titleBn : b.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 truncate whitespace-nowrap overflow-hidden text-ellipsis block mt-0.5">
                    {isBn ? b.descBn : b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
