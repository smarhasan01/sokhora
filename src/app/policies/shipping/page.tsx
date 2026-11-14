'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Truck, Clock, ShieldCheck, ChevronRight, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  const { isBn, t, formatPrice } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('shippingPolicyTitle')}</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block mb-1">
              {isBn ? 'ডেলিভারি নির্দেশিকা' : 'Official Guidelines'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              {t('shippingPolicyTitle')}
            </h1>
            <p className="text-xs text-taupe-500 mt-1">
              {isBn ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৬ • বাংলাদেশ' : 'Last Updated: January 2026 • Bangladesh'}
            </p>
          </div>

          {/* Quick Rates Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-taupe-50/70 border border-taupe-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-900 text-sm">
                  {isBn ? 'ঢাকার ভেতরে (Inside Dhaka)' : 'Inside Dhaka City'}
                </span>
                <span className="font-mono font-bold text-sm text-charcoal-950">
                  {formatPrice(70)}
                </span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {isBn
                  ? 'অর্ডার কনফার্মেশনের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
                  : 'Delivered within 24 to 48 hours via specialized city courier network.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-taupe-50/70 border border-taupe-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-900 text-sm">
                  {isBn ? 'সারাদেশে (Outside Dhaka - 64 Districts)' : 'Outside Dhaka (All 64 Districts)'}
                </span>
                <span className="font-mono font-bold text-sm text-charcoal-950">
                  {formatPrice(130)}
                </span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {isBn
                  ? '৪৮ থেকে ৭২ ঘণ্টার মধ্যে জেলা ও থানা পর্যায়ে হোম ডেলিভারি।'
                  : 'Delivered within 48 to 72 hours via verified courier services (Steadfast / RedX).'}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-charcoal-800 leading-relaxed border-t border-taupe-100 pt-6">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '১. ফ্রি ডেলিভারি অফার' : '1. Complimentary Free Delivery'}
              </h2>
              <p>
                {isBn
                  ? '৳১,৫০০ বা তার বেশি মূল্যের যেকোনো অর্ডারে সারা বাংলাদেশে বিনামূল্যে হোম ডেলিভারি সুবিধা প্রযোজ্য।'
                  : 'All orders with a subtotal exceeding ৳1,500 qualify for complimentary free home delivery across Bangladesh.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '২. ক্যাশ অন ডেলিভারি ও পার্সেল হ্যান্ডলিং' : '2. Cash on Delivery (COD)'}
              </h2>
              <p>
                {isBn
                  ? 'আমরা সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি। রাইডার পার্সেল পৌঁছে দেওয়ার পর নগদ অর্থ প্রদান করে পার্সেল গ্রহণ করতে পারবেন।'
                  : 'Cash on delivery is available throughout Bangladesh. Customers can pay in cash directly to the delivery rider upon receiving their package.'}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-base text-charcoal-950">
                {isBn ? '৩. অর্ডার ট্র্যাকিং' : '3. Live Order Tracking'}
              </h2>
              <p>
                {isBn
                  ? 'অর্ডার সম্পন্ন হওয়ার পর আপনি একটি অনন্য অর্ডার আইডি (যেমন: SHK-XXXXXX) পাবেন যা ব্যবহার করে আমাদের ওয়েবসাইটে ট্র্যাক করতে পারবেন।'
                  : 'Upon placing an order, a unique tracking code (e.g. SHK-XXXXXX) is generated for monitoring your package status in real-time.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
