'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

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
    <section className="bg-[#191C1F] text-white py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {isBn ? 'নতুন আপডেট ও অফার পেতে সাবস্ক্রাইব করুন' : 'Subscribe to get our updates'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          {isBn
            ? 'নতুন কালেকশন রিলিজ, সিক্রেট প্রোমো কোড ও বিশেষ ক্যাম্পেইনের তথ্য সরাসরি আপনার ইমেইলে পান।'
            : 'Get the latest lifestyle arrivals, private seasonal discounts, and curated stories in your inbox.'}
        </p>

        <div className="pt-2 max-w-md mx-auto">
          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-3 px-6 rounded-xl bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।' : 'Thank you! You are now subscribed.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder={isBn ? 'আপনার ইমেইল অ্যাড্রেস লিখুন...' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 text-xs outline-none placeholder:text-gray-400 font-sans"
              />
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-[#FF5B37] hover:bg-[#FA4A23] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                {isBn ? 'সাবস্ক্রাইব' : 'Subscribe'}
              </button>
            </form>
          )}

          <p className="text-[11px] text-gray-500 mt-2 font-mono">
            {isBn ? '*আপনার তথ্যের গোপনীয়তা সর্বদা সংরক্ষিত।' : '*We respect your privacy. Unsubscribe anytime.'}
          </p>
        </div>
      </div>
    </section>
  );
}
