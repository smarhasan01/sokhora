import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Heart, Award } from 'lucide-react';

export default function CustomerBenefits() {
  const benefits = [
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      desc: 'Prompt courier delivery to all 64 districts in Bangladesh within 24-72 hours.',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Quality',
      desc: 'Hand-inspected mulberry silk, authentic Khadi linen, and skin-safe cosmetics.',
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free 7 Days Exchange',
      desc: 'Simple exchange process if you wish to adjust size or color.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Local Support',
      desc: 'Direct phone & WhatsApp customer assistance from 9 AM to 10 PM daily.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
            Why Choose Shokhora
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            Crafted with Care & Passion
          </h2>
          <p className="text-xs text-taupe-600 font-bengali mt-1">
            বিশ্বাস ও ভালোবাসার মেলবন্ধন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-taupe-50/60 border border-taupe-200 hover:border-taupe-300 transition-all text-center sm:text-left flex flex-col items-center sm:items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6 text-sage-300" />
                </div>
                <h3 className="font-semibold text-charcoal-900 text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
