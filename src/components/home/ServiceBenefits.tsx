'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Headphones, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export default function ServiceBenefits() {
  const { isBn } = useLanguage();

  const benefits = [
    {
      icon: Headphones,
      title: isBn ? '২৪/৭ গ্রাহক সেবা' : '24/7 Customer Care',
      desc: isBn ? 'হটলাইন: ০১৫৬৮৯২৩৮৫০' : 'Call or WhatsApp: 01568923850',
    },
    {
      icon: ShieldCheck,
      title: isBn ? '১০০% খাঁটি পণ্যের নিশ্চয়তা' : 'Guaranteed Authentic',
      desc: isBn ? 'যাচাইকৃত প্রিমিয়াম কোয়ালিটি' : 'Handpicked lifestyle quality',
    },
    {
      icon: Truck,
      title: isBn ? 'সারাদেশে দ্রুত ডেলিভারি' : 'Nationwide 64 Districts',
      desc: isBn ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Fast and reliable doorstep courier',
    },
    {
      icon: RefreshCcw,
      title: isBn ? '৭ দিনের সহজ এক্সচেঞ্জ' : '7-Day Easy Exchange',
      desc: isBn ? 'ঝামেলাহীন পরিবর্তনের সুযোগ' : 'Doorstep size and color replacement',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#FFF0ED] text-[#FF5B37] flex items-center justify-center shrink-0 border border-[#FFD7CC]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                  {b.title}
                </h4>
                <p className="text-[11px] text-gray-500 font-mono mt-0.5">
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
