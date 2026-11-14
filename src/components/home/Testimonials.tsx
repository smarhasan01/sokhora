import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Nusrat Anjum',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      comment:
        'The Mulberry Silk Scrunchie set is truly premium quality! It does not pull or crease my hair at all. The packaging felt like opening a luxury gift.',
      product: 'Mulberry Silk Cloud Scrunchie',
    },
    {
      name: 'Sadia Tabassum',
      location: 'Nasirabad, Chattogram',
      rating: 5,
      comment:
        'Ordered kids hair clips for my 4-year-old daughter. The floral details are so neat and the fabric doesn’t pinch her fine hair. Delivery was super fast via RedX!',
      product: 'Kids Sweet Blossom Clips',
    },
    {
      name: 'Sabrina Hossain',
      location: 'Sylhet Sadar',
      rating: 5,
      comment:
        'The Dhaka Monsoon scented candle smells nostalgic and calming, exactly like wet rain on flowers. Also loved their transparent money receipt and COD option.',
      product: 'Artisan Soy Candle "Dhaka Monsoon"',
    },
  ];

  return (
    <section className="py-16 bg-ivory-100 border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
            Customer Stories
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            Loved Across Bangladesh
          </h2>
          <p className="text-xs text-taupe-600 font-bengali mt-1">
            গ্রাহকদের সন্তুষ্টি ও ভালোবাসা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-taupe-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-taupe-300 mb-2" />
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-taupe-100">
                <p className="font-semibold text-xs text-charcoal-900">{t.name}</p>
                <p className="text-[11px] text-charcoal-500">{t.location}</p>
                <p className="text-[10px] text-sage-600 font-medium mt-1">
                  Verified Purchase: {t.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
