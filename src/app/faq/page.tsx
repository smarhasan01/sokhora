import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How long does delivery take across Bangladesh?',
      a: 'Inside Dhaka orders are typically delivered within 24 to 48 hours. Orders for outside Dhaka (all 64 districts) are delivered within 48 to 72 hours via our partner couriers (Steadfast / RedX).',
    },
    {
      q: 'What are the delivery charges?',
      a: 'Inside Dhaka delivery fee is ৳70. Outside Dhaka delivery fee is ৳130. However, if your cart subtotal is ৳2,000 or more, delivery is 100% FREE nationwide!',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes! We offer Cash on Delivery throughout Bangladesh. You can inspect the package upon arrival and pay cash directly to the delivery rider.',
    },
    {
      q: 'How does manual bKash or Nagad payment work?',
      a: 'During checkout, select bKash or Nagad. Send the total amount to our verified merchant number displayed on the screen. Then enter your sender mobile number and the Transaction ID (TrxID). Our team will verify it against our payment portal and mark your invoice as PAID.',
    },
    {
      q: 'What is your exchange and return policy?',
      a: 'We offer an easy 7-day exchange policy. If you receive a damaged product or want to change colors/sizes, contact our hotline with your order ID or invoice number within 7 days of receiving the parcel.',
    },
    {
      q: 'Are your silk scrunchies made from pure mulberry silk?',
      a: 'Yes, our cloud scrunchies are handcrafted with genuine 19-momme high-grade mulberry silk, designed to reduce hair friction, creasing, and breakage.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
            Everything you need to know about shopping with SHOKHORA Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-taupe-200 shadow-sm divide-y divide-taupe-100">
          {faqs.map((f, i) => (
            <div key={i} className="py-6 first:pt-0 last:pb-0 space-y-2">
              <h3 className="font-bold text-charcoal-950 text-sm sm:text-base flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-sage-600 flex-shrink-0 mt-1" />
                <span>{f.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pl-6.5">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
