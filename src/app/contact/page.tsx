'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight, Facebook } from 'lucide-react';

export default function ContactPage() {
  const { isBn, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('contactUsTitle')}</span>
        </nav>

        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            {isBn ? 'গ্রাহক সেবা ও যোগাযোগ' : 'Customer Support & Hotline'}
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            {t('contactUsTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
            {isBn
              ? 'অর্ডার সংক্রান্ত তথ্য, সাইজ বা বাল্ক গিফট সংক্রান্ত যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।'
              : 'Have questions regarding an order, product sizing, or gift hampers? Reach out to our customer care team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-taupe-200 shadow-sm space-y-6">
            <h2 className="text-lg font-serif font-bold text-charcoal-950">
              {isBn ? 'যোগাযোগের ঠিকানা' : 'Get in Touch'}
            </h2>

            <div className="space-y-4 text-xs text-charcoal-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">{isBn ? 'শোরুম ও অফিস' : 'Showroom & Studio'}</p>
                  <p className="text-charcoal-600 mt-0.5 leading-relaxed">
                    Road 4/A, Dhanmondi, Dhaka - 1209, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">{isBn ? 'হটলাইন ও হোয়াটসঅ্যাপ' : 'Phone & WhatsApp'}</p>
                  <a href="tel:01568923850" className="font-mono text-charcoal-900 font-bold hover:underline block mt-0.5">
                    01568923850
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">{isBn ? 'অফিসিয়াল ইমেইল' : 'Email Address'}</p>
                  <a href="mailto:info.shokhora@gmail.com" className="text-charcoal-900 font-medium hover:underline block mt-0.5">
                    info.shokhora@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">{isBn ? 'ফেসবুক পেজ' : 'Facebook'}</p>
                  <a href="https://facebook.com/Shokhora" target="_blank" rel="noreferrer" className="text-charcoal-900 font-medium hover:underline block mt-0.5">
                    facebook.com/Shokhora
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">{isBn ? 'গ্রাহক সেবা সময়সূচি' : 'Operating Hours'}</p>
                  <p className="text-charcoal-600 mt-0.5">{isBn ? 'শনিবার - বৃহস্পতিবার: সকাল ১০টা – রাত ৯টা' : 'Saturday - Thursday: 10:00 AM – 9:00 PM'}</p>
                  <p className="text-charcoal-500 text-[11px]">{isBn ? 'শুক্রবার: দুপুর ৩টা – রাত ৯টা' : 'Friday: 3:00 PM – 9:00 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-taupe-200 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-charcoal-950 text-base">
                  {t('messageSuccess')}
                </h3>
                <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
                  {isBn
                    ? `ধন্যবাদ, ${name}। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`
                    : `Thank you, ${name}. Our representative will contact you promptly.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-serif font-bold text-charcoal-950 mb-2">
                  {t('sendMessage')}
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {isBn ? 'আপনার বার্তা / জিজ্ঞাসা *' : 'Your Message / Inquiry *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isBn ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your message here...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('submit')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
