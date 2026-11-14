'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Truck, ShieldCheck, RefreshCw, Headphones, Heart, Sparkles } from 'lucide-react';

export default function CustomerBenefits() {
  const { isBn, t } = useLanguage();

  const benefits = [
    {
      icon: Truck,
      title: t('whyDeliveryTitle'),
      desc: t('whyDeliveryDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('whyQualityTitle'),
      desc: t('whyQualityDesc'),
    },
    {
      icon: RefreshCw,
      title: t('whyExchangeTitle'),
      desc: t('whyExchangeDesc'),
    },
    {
      icon: Headphones,
      title: t('whyPaymentTitle'),
      desc: t('whyPaymentDesc'),
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
            {isBn ? 'শখোরা ব্র্যান্ড ভ্যালু' : 'Brand Story & Values'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            {t('whyTitle')}
          </h2>
          <p className="text-xs text-taupe-600 mt-1 max-w-md mx-auto">
            {t('whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-taupe-50/60 border border-taupe-200 hover:border-taupe-300 transition-all text-center sm:text-left flex flex-col items-center sm:items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-charcoal-900 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6 text-sage-300" />
                </div>
                <h3 className="font-semibold text-charcoal-900 text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
