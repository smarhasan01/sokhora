import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Applicable to all orders and services provided by SHOKHORA Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-bold text-charcoal-950 text-base">1. Brand Identity & Ownership</h2>
            <p>
              The trademark "SHOKHORA" (শখোরা), the original brand logo, designs, imagery, and catalog contents are the exclusive property of SHOKHORA Bangladesh. Unauthorized reproduction or use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2 border-t border-taupe-100 pt-6">
            <h2 className="font-bold text-charcoal-950 text-base">2. Order Acceptance & Pricing</h2>
            <p>
              All prices are listed in Bangladeshi Taka (BDT ৳). We reserve the right to cancel or adjust orders in the rare event of typographical pricing errors or unexpected inventory depletion.
            </p>
          </section>

          <section className="space-y-2 border-t border-taupe-100 pt-6">
            <h2 className="font-bold text-charcoal-950 text-base">3. Verification of Manual Payments</h2>
            <p>
              For payments made via manual bKash or Nagad transfer, orders remain provisional until our financial officers confirm receipt of funds corresponding to the customer-submitted Transaction ID.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
