'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export default function CustomerBenefits() {
  const { isBn, t } = useLanguage();

  const benefits = [
    {
      icon: Truck,
      num: '01',
      title: isBn ? 'সারাদেশে ক্যাশ অন ডেলিভারি' : 'Nationwide COD',
      desc: isBn
        ? 'ঢাকা ও ঢাকার বাইরে ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি এবং দ্রুততম হোম ডেলিভারি সুবিধা।'
        : 'Reliable doorstep cash-on-delivery across all 64 districts in Bangladesh.',
    },
    {
      icon: ShieldCheck,
      num: '02',
      title: isBn ? '১০০% আসল ও প্রিমিয়াম মান' : 'Guaranteed Authenticity',
      desc: isBn
        ? 'খাঁটি মালবেরি সিল্ক, হ্যান্ডমেড জুয়েলারি ও নিরাপদ কসমেটিক্স — প্রতিটি পণ্যের গুণগত মান নিশ্চিত।'
        : 'Pure mulberry silk, natural artisanal metals, and strictly tested skin-friendly formulations.',
    },
    {
      icon: RefreshCw,
      num: '03',
      title: isBn ? '৭ দিনের সহজ এক্সচেঞ্জ' : '7-Day Easy Exchange',
      desc: isBn
        ? 'পছন্দমতো সাইজ বা কালার পরিবর্তন করতে চাইলে দরজায় সহজ ও ঝামেলাহীন এক্সচেঞ্জ পলিসি।'
        : 'Hassle-free doorstep size and color exchange with zero complicated procedures.',
    },
    {
      icon: Headphones,
      num: '04',
      title: isBn ? 'ব্যক্তিগত কাস্টমার কেয়ার' : 'Concierge Care',
      desc: isBn
        ? 'যেকোনো পরামর্শ বা সহায়তায় আমাদের টিম সবসময় আপনার পাশে — কল করুন ০১৫৬৮৯২৩৮৫০।'
        : 'Dedicated personal care & WhatsApp support directly from Dhaka: 01568923850.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold">
            {isBn ? 'শখোরা অঙ্গীকার' : 'The SHOKHORA Standard'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
            {isBn ? 'কেন শখোরা থেকে কেনাকাটা করবেন?' : 'Thoughtful Living, Guaranteed.'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            {isBn
              ? 'আমরা বিশ্বাস করি খাঁটি মানে এবং প্রতিটি অর্ডারে গ্রাহকের মুখে হাসি ফোটানোই আমাদের প্রধান লক্ষ্য।'
              : 'Our core philosophy rests on uncompromised material integrity and genuine personal care.'}
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[#FAF7F2] border border-stone-200/80 hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#191817] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-400">
                      {b.num}
                    </span>
                  </div>

                  <h3 className="font-serif font-medium text-lg text-stone-900 mb-2 leading-snug">
                    {b.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-mono text-stone-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{isBn ? 'অফিসিয়াল পলিসি' : 'Official Policy'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
