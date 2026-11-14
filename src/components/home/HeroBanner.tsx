import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-100 via-taupe-100/40 to-ivory-100 py-12 lg:py-20 border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 border border-sage-200 text-sage-700 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sage-600" />
              <span>Modern Lifestyle & Accessories • Bangladesh</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-charcoal-950 tracking-tight leading-tight">
                Your Choice, <br className="hidden sm:inline" />
                <span className="italic font-normal text-taupe-700">Our Passion.</span>
              </h1>
              <p className="text-sm font-bengali text-taupe-600 pt-1">
                আপনার পছন্দ, আমাদের ভালোবাসা — নান্দনিক লাইফস্টাইল পণ্য।
              </p>
            </div>

            <p className="text-sm sm:text-base text-charcoal-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore handcrafted mulberry silk scrunchies, delicate hair clips for children,
              artisanal brass jewellery, organic tinted lip balms, and thoughtful curated gift sets.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-charcoal-800 text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Shop All Collections <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/category/scrunchies-hair-accessories"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-taupe-300 text-charcoal-800 hover:bg-taupe-50 text-sm font-medium transition-all shadow-sm"
              >
                Silk Scrunchies
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-taupe-200/80 text-xs text-charcoal-600">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Truck className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>64 Districts COD</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <RefreshCw className="w-4 h-4 text-sage-600 flex-shrink-0" />
                <span>7 Days Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Preserving original branding) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <Image
                src="/images/Cover Photo.jpg"
                alt="SHOKHORA Bangladesh"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />

              {/* Floating Brand Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-taupe-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-sage-700">
                    Featured Collection
                  </p>
                  <p className="font-semibold text-charcoal-900 text-sm">Pure Silk & Hair Luxury</p>
                  <p className="text-xs text-charcoal-500 font-mono">From ৳260</p>
                </div>
                <Link
                  href="/shop"
                  className="p-2.5 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
