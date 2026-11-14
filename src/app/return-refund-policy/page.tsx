import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RefreshCcw, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Customer Protection & Satisfaction
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Return & Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Hassle-free 7-day exchange guarantee on all eligible products.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-sage-600" />
              1. 7-Day Exchange Window
            </h2>
            <p>
              We want you to adore your purchase. If you need to exchange an item for a different size,
              color, or in the rare event of transit damage, you may request an exchange within <strong>7 days</strong> of delivery.
            </p>
          </section>

          <section className="space-y-3 border-t border-taupe-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sage-600" />
              2. Eligibility Criteria
            </h2>
            <ul className="list-disc list-inside space-y-1 text-charcoal-600">
              <li>Product must be unworn, unwashed, and in its original pristine packaging with tags intact.</li>
              <li>You must present your official SHOKHORA money receipt or Order ID.</li>
              <li>Cosmetics and personal care items can only be returned if sealed and unopened due to hygiene standards.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-taupe-100 pt-6">
            <h2 className="text-base sm:text-lg font-bold text-charcoal-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-sage-600" />
              3. Refund Processing
            </h2>
            <p>
              In cases where an exchange item is out of stock, full refunds will be issued through bKash,
              Nagad, or bank transfer within 3 to 5 business days following receipt and inspection of the returned parcel.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
