'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Headphones, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export default function ServiceBenefits() {
  const { isBn } = useLanguage();

  const benefits = [
    {
      icon: Headphones,
      title: isBn ? '২৪/৭ গ্রাহক সেবা' : 'Responsive Support',
      desc: isBn ? 'হটলাইন: ০১৫৬৮৯২৩৮৫০' : 'Customer service available 24/7',
    },
    {
      icon: ShieldCheck,
      title: isBn ? 'নিরাপদ শপিং নিশ্চয়তা' : 'Secure Marketplace',
      desc: isBn ? '১০০% খাঁটি কোয়ালিটি ও নিরাপদ পেমেন্ট' : '100% authentic quality guaranteed',
    },
    {
      icon: Truck,
      title: isBn ? 'সারাদেশে দ্রুত ডেলিভারি' : 'Reliable Shipping',
      desc: isBn ? '৬৪টি জেলায় ক্যাশ অন ডেলিভারি' : 'Fast doorstep delivery nationwide',
    },
    {
      icon: RefreshCcw,
      title: isBn ? '৭ দিনের সহজ এক্সচেঞ্জ' : 'Transparent Returns',
      desc: isBn ? 'ঝামেলাহীন পরিবর্তনের সুবিধা' : '7-day hassle-free exchange policy',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#EADFCF]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FAF5EE] text-[#477765] flex items-center justify-center shrink-0 border border-[#EADFCF]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#10252B] leading-snug">
                  {b.title}
                </h4>
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
