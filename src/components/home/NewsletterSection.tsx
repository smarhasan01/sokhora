'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
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
    <section className="py-16 bg-taupe-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-white text-charcoal-900 shadow-sm">
          <Mail className="w-6 h-6 text-sage-600" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
          Join the SHOKHORA Circle
        </h2>

        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
          Subscribe to receive private preview access to our seasonal hair accessory drops,
          secret promo codes, and lifestyle stories.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 p-3 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing! Check your inbox for your 10% voucher.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-white border border-taupe-300 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-charcoal-800"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
