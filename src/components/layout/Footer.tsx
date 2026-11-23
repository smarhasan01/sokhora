'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, ShieldCheck, Check, Send } from 'lucide-react';

const APPROVED_FOOTER_CATEGORIES = [
  { name: 'Fashion & Clothing', nameBn: 'পোশাক ও ফ্যাশন', slug: 'fashion-clothing' },
  { name: 'Cosmetics & Beauty', nameBn: 'কসমেটিক্স ও বিউটি', slug: 'cosmetics-beauty' },
  { name: 'Kids Hair Clips & Accessories', nameBn: 'কিডস হেয়ার ক্লিপ ও এক্সেসরিজ', slug: 'kids-hairbands-clips' },
  { name: 'Scrunchies & Hair Accessories', nameBn: 'স্ক্রাঞ্চি ও হেয়ার এক্সেসরিজ', slug: 'scrunchies-hair-accessories' },
  { name: 'Everyday Products', nameBn: 'দৈনন্দিন পণ্য', slug: 'everyday-products' },
];

export default function Footer() {
  const { isBn } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#012D51] text-white pt-14 pb-8 border-t border-[#01223D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Columns (MegaMart Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block bg-white px-3 py-1.5 rounded-xl shadow-xs">
              <div className="relative w-36 h-9">
                <Image
                  src="/images/shokhora-official-logo.png"
                  alt="SHOKHORA"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              {isBn
                ? 'শখোরা (SHOKHORA) — আপনার পছন্দ, আমাদের ভালোবাসা। বাংলাদেশের সর্বত্র খাঁটি মালবেরি সিল্ক স্ক্রাঞ্চি, কোমল কিডস হেয়ার ক্লিপস, ফ্যাশন কুর্তি ও নিত্যপ্রয়োজনীয় পণ্য দ্রুততম ডেলিভারি।'
                : 'SHOKHORA — Your Choice, Our Passion. A premier multi-category lifestyle brand bringing handcrafted silk scrunchies, gentle kids hair clips, elegant fashion, and everyday essentials across Bangladesh.'}
            </p>

            <div className="space-y-2 text-xs text-white/80 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C78703]" />
                <span>হটলাইন: <strong className="text-white">01568923850</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C78703]" />
                <span>ইমেইল: <strong className="text-white">info.shokhora@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C78703]" />
                <span>রোড ৪/এ, ধানমন্ডি, ঢাকা - ১২০৯</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/Shokhora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-[#012D51] hover:bg-[#C78703] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-[#012D51] hover:bg-[#C78703] transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Approved Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C78703]">
              {isBn ? 'ক্যাটাগরি সমূহ' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              {APPROVED_FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#C78703] transition-colors flex items-center gap-1.5"
                  >
                    <span>•</span>
                    <span>{isBn ? cat.nameBn : cat.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/shop?filter=sale"
                  className="text-[#F6DDAB] hover:text-[#C78703] font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>★</span>
                  <span>{isBn ? 'স্পেশাল ছাড়' : 'Limited Sale Offers'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C78703]">
              {isBn ? 'কাস্টমার সার্ভিস' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/about" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'যোগাযোগ' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'অর্ডার ট্র্যাকিং' : 'Track Your Order'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'সাধারণ প্রশ্নাবলী' : 'FAQs'}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'ডেলিভারি পলিসি' : 'Delivery Policy'}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'রিটার্ন ও রিফান্ড' : 'Return & Refund'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C78703] transition-colors">
                  {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Guarantee (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C78703]">
              {isBn ? 'নিউজলেটার' : 'Newsletter'}
            </h4>
            <p className="text-xs text-white/75 leading-relaxed">
              {isBn
                ? 'নতুন অফার ও বিশেষ ডিসকাউন্টের আপডেট সবার আগে পেতে সাবস্ক্রাইব করুন।'
                : 'Subscribe to receive exclusive deals, new arrivals, and special discounts.'}
            </p>

            {subscribed ? (
              <div className="bg-[#023E6E] text-white text-xs p-3 rounded-xl flex items-center gap-2 border border-[#C78703]/40">
                <Check className="w-4 h-4 text-[#C78703] shrink-0" />
                <span>{isBn ? 'ধন্যবাদ! সাবস্ক্রিপশন সম্পন্ন হয়েছে।' : 'Subscribed successfully! Thank you.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center bg-white/10 rounded-xl overflow-hidden border border-white/20 focus-within:border-[#C78703] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isBn ? 'আপনার ইমেইল দিন...' : 'Enter your email...'}
                    required
                    className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#C78703] hover:bg-[#B07502] text-[#012D51] px-3.5 py-2 text-xs font-bold transition-colors flex items-center justify-center shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 flex items-center gap-2 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-[#C78703]" />
              <span>{isBn ? '১০০% খাঁটি পণ্য ও নিরাপদ শপিং' : '100% Authentic Quality Guaranteed'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
          <p>© 2026 SHOKHORA (শখোরা). All rights reserved.</p>
          <p className="text-white/50">Your Choice, Our Passion. • আপনার পছন্দ, আমাদের ভালোবাসা।</p>
        </div>
      </div>
    </footer>
  );
}
