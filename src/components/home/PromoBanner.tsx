'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  const { isBn, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('SHOKHORA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FFFFFF] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white p-8 sm:p-14 shadow-2xl border border-stone-800">
          
          {/* Subtle golden ambient accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-mono uppercase tracking-widest backdrop-blur-md border border-white/10">
                <Sparkles className="w-3.5 h-3.5" /> {isBn ? 'সীমিত সময়ের অফার' : 'Exclusive Invitation'}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-white leading-tight">
                {isBn
                  ? 'আপনার প্রথম অর্ডারে উপভোগ করুন ১০% বিশেষ ছাড়'
                  : 'Enjoy 10% Off Your Curated Lifestyle Cart'}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                {isBn
                  ? 'খাঁটি সিল্ক স্ক্রাঞ্চি, বাচ্চাদের ক্লিপ, ঐতিহ্যবাহী জুয়েলারি ও বিউটি পণ্যে এই অফারটি প্রযোজ্য। চেকআউটে কোডটি ব্যবহার করুন।'
                  : 'Experience the tactile luxury of mulberry silk and artisan crafted accessories. Apply code at checkout.'}
              </p>
            </div>

            {/* Right Action & Coupon Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-center gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-4 w-full text-center sm:text-left lg:text-right">
                <span className="text-[10px] uppercase font-mono text-stone-400 tracking-widest block mb-1.5">
                  {isBn ? 'কুপন কোড' : 'Promo Code'}
                </span>
                
                <div className="flex items-center justify-between gap-3 bg-black/60 px-4 py-2.5 rounded-xl border border-white/10">
                  <span className="font-mono font-bold tracking-widest text-amber-300 text-sm sm:text-base">
                    SHOKHORA10
                  </span>
                  
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 flex items-center gap-1.5 text-xs"
                    title={copied ? t('copied') : t('copyCode')}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-mono">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono">{isBn ? 'কপি' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>{isBn ? 'শপিং শুরু করুন' : 'Shop The Edit'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
