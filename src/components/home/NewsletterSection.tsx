'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const { isBn, t } = useLanguage();
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
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold">
          {isBn ? 'ভিআইপি মেম্বারশিপ' : 'Join The Circle'}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
          {isBn ? 'শখোরা এক্সক্লুসিভ সার্কেল' : 'Subscribe to Thoughtful Updates'}
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-3 leading-relaxed">
          {isBn
            ? 'নতুন কালেকশন রিলিজ, সিক্রেট ডিসকাউন্ট ও উৎসবের বিশেষ অফার পেতে আমাদের নিউজলেটারে যুক্ত থাকুন।'
            : 'Be the first to explore limited batch releases, private seasonal invitations, and design stories.'}
        </p>

        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="inline-flex items-center gap-2 p-4 px-6 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{isBn ? 'ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।' : 'Welcome to the circle. Check your inbox soon.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder={isBn ? 'আপনার ইমেইল অ্যাড্রেস লিখুন...' : 'Enter your email address...'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-[#FAF7F2] border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-[#191817] transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#191817] text-white hover:bg-stone-800 text-xs uppercase tracking-widest font-semibold transition-all shadow-sm shrink-0 flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'যুক্ত হোন' : 'Join'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-400 mt-3 font-mono">
            {isBn ? '*আমরা আপনার তথ্যের গোপনীয়তা রক্ষা করি।' : '*We respect your privacy. Unsubscribe anytime.'}
          </p>
        </div>

      </div>
    </section>
  );
}
