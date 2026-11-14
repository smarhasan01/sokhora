'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Star, Quote } from 'lucide-react';

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
      product: 'Mulberry Silk Cloud Scrunchie',
    },
    {
      name: 'Sadia Tabassum',
      location: 'Nasirabad, Chattogram',
      rating: 5,
      comment:
        'Ordered kids hair clips for my 4-year-old daughter. The floral details are so neat and the fabric doesn’t pinch her fine hair. Delivery was super fast!',
      commentBn:
        'আমার ৪ বছরের মেয়ের জন্য কিডস ক্লিপ অর্ডার করেছিলাম। ফুলের ডিজাইনগুলো খুবই নিখুঁত এবং বাচ্চার চুলেও কোনো টান লাগে না।',
      product: 'Kids Sweet Blossom Clips',
    },
    {
      name: 'Sabrina Hossain',
      location: 'Sylhet Sadar',
      rating: 5,
      comment:
        'The Dhaka Monsoon scented candle smells nostalgic and calming, exactly like wet rain on flowers. Also loved their transparent money receipt and COD option.',
      commentBn:
        'ঢাকা মনসুন ক্যান্ডেলের ঘ্রাণটি চমৎকার, একদম বর্ষার ভেজা মাটির মতো শান্তিদায়ক। ক্যাশ অন ডেলিভারি সার্ভিসও খুব ভালো ছিল।',
      product: 'Artisan Soy Candle "Dhaka Monsoon"',
    },
  ];

  return (
    <section className="py-16 bg-ivory-100 border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
            {isBn ? 'গ্রাহকদের বাস্তব অভিজ্ঞতা' : 'Customer Stories'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xs text-taupe-600 mt-1 max-w-md mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-taupe-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-taupe-300 mb-2" />
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                  &ldquo;{isBn ? item.commentBn : item.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-taupe-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-charcoal-900">{item.name}</p>
                  <p className="text-[11px] text-taupe-500">{item.location}</p>
                </div>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {t('verifiedBuyer')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
