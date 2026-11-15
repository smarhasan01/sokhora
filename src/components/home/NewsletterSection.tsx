'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { CheckCircle2, Send } from 'lucide-react';

export default function NewsletterSection() {
  const { isBn } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-[#10252B] text-white py-14 sm:py-16 border-t border-[#C99A45]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8EEE2]">
          {isBn ? 'নতুন আপডেট ও অফার পেতে সাবস্ক্রাইব করুন' : 'Subscribe to get our updates'}
        </h2>
        <p className="text-xs sm:text-sm text-[#F8EEE2]/75 max-w-md mx-auto leading-relaxed">
          {isBn
            ? 'নতুন কালেকশন রিলিজ, সিক্রেট প্রোমো কোড ও বিশেষ ক্যাম্পেইনের তথ্য সরাসরি আপনার ইনবক্সে পান।'
            : 'Get the latest lifestyle arrivals, seasonal discounts, and curated stories directly in your inbox.'}
        </p>

        <div className="pt-2 max-w-md mx-auto">
          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-3 px-6 rounded-full bg-[#18363F] text-[#C99A45] text-xs font-semibold border border-[#C99A45]/40">
              <CheckCircle2 className="w-4 h-4 text-[#C99A45]" />
              <span>{isBn ? 'ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।' : 'Thank you! You are now subscribed.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder={isBn ? 'আপনার ইমেইল ঠিকানা লিখুন...' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full bg-white text-[#252525] text-xs outline-none placeholder:text-stone-400 font-sans border border-[#EADFCF]"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#477765] hover:bg-[#3B6555] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'সাবস্ক্রাইব' : 'Subscribe'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-[#F8EEE2]/60 mt-2.5 font-mono">
            {isBn ? '*আপনার তথ্যের গোপনীয়তা সর্বদা সংরক্ষিত।' : '*We respect your privacy. No spam, ever.'}
          </p>
        </div>
      </div>
    </section>
  );
}
