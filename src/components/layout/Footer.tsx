'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MapPin, Phone, Mail, Facebook } from 'lucide-react';

export default function Footer() {
  const { isBn, t } = useLanguage();

  return (
    <footer className="bg-[#141619] text-gray-400 pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block bg-white p-2 rounded-xl shadow-sm">
              <div className="relative w-36 h-10">
                <Image
                  src="/images/Logo-01.png"
                  alt="SHOKHORA"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {isBn
                ? 'শখোরা (SHOKHORA) — আপনার পছন্দ, আমাদের ভালোবাসা। বাংলাদেশের সর্বত্র খাঁটি মালবেরি সিল্ক, হস্তনির্মিত জুয়েলারি ও নিত্যদিনের লাইফস্টাইল পণ্য সরবরাহে আমরা নিবেদিত।'
                : 'SHOKHORA — Your Choice, Our Passion. A premier multi-category lifestyle brand curated for authentic quality, conscious design, and everyday elegance in Bangladesh.'}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com/Shokhora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#FF5B37] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="tel:01568923850"
                className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-[#FF5B37] text-xs font-mono transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF5B37]" />
                <span>01568923850</span>
              </a>
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {isBn ? 'ক্যাটাগরি' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/category/fashion-clothing" className="hover:text-white transition-colors">
                  {isBn ? 'পোশাক ও ফ্যাশন' : 'Fashion & Clothing'}
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics-beauty" className="hover:text-white transition-colors">
                  {isBn ? 'কসমেটিক্স ও বিউটি' : 'Cosmetics & Beauty'}
                </Link>
              </li>
              <li>
                <Link href="/category/kids-hairbands-clips" className="hover:text-white transition-colors">
                  {isBn ? 'কিডস হেয়ার ক্লিপ' : 'Kids Hair Clips'}
                </Link>
              </li>
              <li>
                <Link href="/category/scrunchies-hair-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'সিল্ক স্ক্রাঞ্চি' : 'Silk Scrunchies'}
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery-fashion-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'হস্তশিল্প জুয়েলারি' : 'Jewellery & Brass'}
                </Link>
              </li>
              <li>
                <Link href="/category/gifts-lifestyle" className="hover:text-white transition-colors">
                  {isBn ? 'গিফট ও লাইফস্টাইল' : 'Gifts & Lifestyle'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {isBn ? 'সহায়তা ও পলিসি' : 'Customer Service'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  {isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Order Status'}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  {isBn ? 'শিপিং ও ডেলিভারি পলিসি' : 'Shipping & Delivery'}
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="hover:text-white transition-colors">
                  {isBn ? 'রিটার্ন ও এক্সচেঞ্জ পলিসি' : '7-Day Return Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  {isBn ? 'শর্তাবলী ও নিয়ম' : 'Terms & Conditions'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              {isBn ? 'শোরুম ও যোগাযোগ' : 'Showroom & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF5B37] shrink-0 mt-0.5" />
                <span>Road 4/A, Dhanmondi, Dhaka - 1209, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF5B37] shrink-0" />
                <a href="tel:01568923850" className="hover:text-white font-mono">
                  +880 1568-923850
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF5B37] shrink-0" />
                <a href="mailto:info.shokhora@gmail.com" className="hover:text-white">
                  info.shokhora@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-1">
                {isBn ? 'পেমেন্ট মেথড:' : 'Payment Methods:'}
              </span>
              <div className="flex items-center gap-1.5 text-gray-300 font-mono text-[10px]">
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">bKash</span>
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Nagad</span>
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">COD</span>
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Visa</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} SHOKHORA (শখোরা). All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Bangladesh</span>
            <span>&bull;</span>
            <span className="text-[#FF5B37]">Your Choice, Our Passion.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
