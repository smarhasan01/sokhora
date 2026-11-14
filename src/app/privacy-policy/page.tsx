import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            How we protect and handle your personal data at SHOKHORA.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-bold text-charcoal-950 text-base">1. Information We Collect</h2>
            <p>
              We collect your name, mobile number, delivery address, and email solely for the purpose
              of order fulfillment, courier delivery, and issuing official money receipts. We never
              share or sell customer data to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2 border-t border-taupe-100 pt-6">
            <h2 className="font-bold text-charcoal-950 text-base">2. Payment Security</h2>
            <p>
              We do not store complete debit/credit card credentials on our servers. All online
              transactions are processed through PCI-DSS compliant Bangladeshi payment gateways
              (e.g., SSLCOMMERZ).
            </p>
          </section>

          <section className="space-y-2 border-t border-taupe-100 pt-6">
            <h2 className="font-bold text-charcoal-950 text-base">3. Customer Rights & Access</h2>
            <p>
              You have the right to request access to or deletion of your stored customer account details at any time by emailing us at contact@shokhora.com.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
