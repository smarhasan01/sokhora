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
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
          <Link href="/" className="hover:text-[#012D51]">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-medium">{t('contactUsTitle')}</span>
        </nav>

        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C78703] block font-mono">
            {isBn ? 'গ্রাহক সেবা ও যোগাযোগ' : 'Customer Support & Hotline'}
          </span>
          <h1 className="text-3xl font-extrabold text-[#012D51] tracking-tight">
            {t('contactUsTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            {isBn
              ? 'অর্ডার সংক্রান্ত তথ্য, সাইজ বা বাল্ক গিফট সংক্রান্ত যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।'
              : 'Have questions regarding an order, product sizing, or gift hampers? Reach out to our customer care team.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-[#F6F7F8] rounded-3xl p-8 border border-[#EAECEF] shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-[#012D51]">
              {isBn ? 'যোগাযোগের ঠিকানা' : 'Get in Touch'}
            </h2>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C78703] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#012D51]">{isBn ? 'শোরুম ও অফিস' : 'Showroom & Studio'}</p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    Level 3, Police Plaza Concord, Gulshan 1, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C78703] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#012D51]">{isBn ? 'হটলাইন ও হোয়াটসঅ্যাপ' : 'Phone & WhatsApp'}</p>
                  <a href="tel:01568923850" className="font-mono text-[#012D51] font-bold hover:underline block mt-0.5">
                    01568923850
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C78703] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#012D51]">{isBn ? 'অফিসিয়াল ইমেইল' : 'Email Address'}</p>
                  <a href="mailto:info.shokhora@gmail.com" className="text-[#012D51] font-medium hover:underline block mt-0.5">
                    info.shokhora@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="w-4 h-4 text-[#C78703] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#012D51]">{isBn ? 'ফেসবুক পেজ' : 'Facebook'}</p>
                  <a href="https://facebook.com/Shokhora" target="_blank" rel="noreferrer" className="text-[#012D51] font-medium hover:underline block mt-0.5">
                    facebook.com/Shokhora
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C78703] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#012D51]">{isBn ? 'গ্রাহক সেবা সময়সূচি' : 'Operating Hours'}</p>
                  <p className="text-stone-600 mt-0.5 font-mono">{isBn ? 'শনিবার - বৃহস্পতিবার: সকাল ৯টা – রাত ১০টা' : 'Saturday - Thursday: 9:00 AM – 10:00 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-[#EAECEF] shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#F6F7F8] rounded-2xl border border-[#EAECEF] animate-scale-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#012D51]">
                  {isBn ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  {isBn
                    ? 'আমাদের কাস্টমার কেয়ার টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
                    : 'Our customer support team has received your query and will respond promptly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#012D51] text-white text-xs font-bold hover:bg-[#C78703] transition-colors btn-press"
                >
                  {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-[#012D51] mb-2">
                  {isBn ? 'সরাসরি বার্তা পাঠান' : 'Send Us a Direct Message'}
                </h2>

                <div>
                  <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afsana Mim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAECEF] bg-[#F6F7F8] text-xs focus:border-[#012D51] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAECEF] bg-[#F6F7F8] text-xs font-mono focus:border-[#012D51] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                    {isBn ? 'আপনার বার্তা বা জিজ্ঞাসা' : 'Your Query / Message'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isBn ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your question or order inquiry here...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EAECEF] bg-[#F6F7F8] text-xs focus:border-[#012D51] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 btn-press"
                >
                  <span>{isBn ? 'বার্তা পাঠান' : 'Submit Message'}</span>
                  <Send className="w-3.5 h-3.5" />
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
