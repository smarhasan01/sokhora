'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const { isBn, t } = useLanguage();

  const testimonials = [
    {
      name: 'Nusrat Anjum',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      comment:
        'The Mulberry Silk Scrunchie set is truly premium quality! It does not pull or crease my hair at all. The packaging felt like opening a luxury gift.',
      commentBn:
        'মালবেরি সিল্কের স্ক্রাঞ্চি সেটটির কোয়ালিটি সত্যি দারুণ! চুল টানা পড়ে না কিংবা দাগ বসে না। প্যাকেজিংটাও উপহার দেওয়ার মতো প্রিমিয়াম।',
      product: 'Pure Mulberry Silk Cloud Scrunchie',
    },
    {
      name: 'Sadia Tabassum',
      location: 'Nasirabad, Chattogram',
      rating: 5,
      comment:
        'Ordered kids hair clips for my 4-year-old daughter. The floral details are so neat and the fabric doesn’t pinch her fine hair. Delivery was super fast!',
      commentBn:
        'আমার ৪ বছরের মেয়ের জন্য কিডস ক্লিপ অর্ডার করেছিলাম। ফুলের ডিজাইনগুলো খুবই নিখুঁত এবং বাচ্চার চুলেও কোনো টান লাগে না।',
      product: 'Kids Sweet Blossom Clips Set',
    },
    {
      name: 'Sabrina Hossain',
      location: 'Sylhet Sadar',
      rating: 5,
      comment:
        'The Dhaka Monsoon scented candle smells nostalgic and calming, exactly like wet rain on flowers. Also loved their transparent money receipt and COD option.',
      commentBn:
        'ঢাকা মনসুন ক্যান্ডেলের ঘ্রাণটি চমৎকার, একদম বর্ষার ভেজা মাটির মতো শান্তিদায়ক। ক্যাশ অন ডেলিভারি সার্ভিসও খুব দ্রুত পেয়েছি।',
      product: 'Artisan Soy Candle "Dhaka Monsoon"',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold">
            {isBn ? 'গ্রাহকদের রিভিউ' : 'Voices of Trust'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
            {isBn ? 'গ্রাহকদের আন্তরিক অভিজ্ঞতা' : 'Stories from Our Community'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            {isBn
              ? 'শখোরা পরিবারের সন্তুষ্ট গ্রাহকদের কিছু বাস্তব মতামত।'
              : 'Reflecting our passion for enduring craftsmanship and customer delight.'}
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                  &ldquo;{isBn ? item.commentBn : item.comment}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-stone-400 font-mono">
                    {item.location}
                  </p>
                </div>
                
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 bg-stone-50 px-2 py-1 rounded-md">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
