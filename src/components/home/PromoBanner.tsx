'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('SHOKHORA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10 bg-ivory-100 border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-taupe-900 text-white p-8 sm:p-12 shadow-lg border border-charcoal-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sage-300 text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" /> Seasonal Special Offer
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-white leading-tight">
                Enjoy 10% Off Your Next Order Across Bangladesh
              </h3>

              <p className="text-xs sm:text-sm text-taupe-300 max-w-xl leading-relaxed">
                Elevate your style with pure mulberry silk scrunchies, traditional artisan jewellery, and natural skincare essentials. Free home delivery on orders over ৳2,000.
              </p>
            </div>

            {/* Right Action & Coupon Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full text-center sm:text-left lg:text-right">
                <span className="text-[10px] uppercase font-semibold text-taupe-300 tracking-wider block mb-1">
                  Use Coupon Code at Checkout
                </span>
                <div className="flex items-center justify-between gap-2 bg-charcoal-950/80 px-3 py-2 rounded-xl border border-white/10">
                  <span className="font-mono font-bold tracking-widest text-amber-300 text-sm sm:text-base">
                    SHOKHORA10
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-charcoal-950 hover:bg-ivory-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                <span>Shop With Discount</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
