'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Instagram, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { isBn } = useLanguage();

  return (
    <footer className="bg-[#10252B] text-[#F8EEE2]/80 pt-16 pb-10 border-t border-[#C99A45]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#C99A45]/20">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block p-1 rounded-xl bg-[#09171B] border border-[#C99A45]/40 shadow-xs">
              <div className="relative w-40 h-11">
                <Image
                  src="/images/shokhora-brand-logo.jpg"
                  alt="SHOKHORA শখোরা"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-[#F8EEE2]/80 leading-relaxed max-w-sm">
              {isBn
                ? 'শখোরা (SHOKHORA) — আপনার পছন্দ, আমাদের ভালোবাসা। বাংলাদেশের সর্বত্র প্রিমিয়াম ফ্যাশন, প্রাকৃতিক স্কিনকেয়ার, খাঁটি সিল্ক স্ক্রাঞ্চি, ঐতিহ্যবাহী জুয়েলারি ও অভিজাত লাইফস্টাইল পণ্য ডেলিভারি।'
                : 'SHOKHORA — Your Choice, Our Passion. A premier Bangladeshi multi-category lifestyle brand dedicated to curated beauty, authentic quality, and everyday refinement.'}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com/Shokhora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#18363F] flex items-center justify-center text-[#F8EEE2] hover:text-[#10252B] hover:bg-[#C99A45] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="tel:01568923850"
                className="px-3 py-1 rounded-full bg-[#18363F] text-[#F8EEE2] hover:text-[#10252B] hover:bg-[#C99A45] text-xs font-mono transition-all flex items-center gap-1.5 border border-[#C99A45]/30"
              >
                <Phone className="w-3.5 h-3.5 text-[#C99A45]" />
                <span>01568923850</span>
              </a>
            </div>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C99A45] font-mono">
              {isBn ? 'ক্যাটাগরি' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F8EEE2]/75">
              <li>
                <Link href="/category/fashion-clothing" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'পোশাক ও ফ্যাশন' : 'Fashion & Clothing'}
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics-beauty" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'কসমেটিক্স ও বিউটি' : 'Cosmetics & Beauty'}
                </Link>
              </li>
              <li>
                <Link href="/category/kids-hairbands-clips" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'কিডস হেয়ার ক্লিপ' : 'Kids Hair Clips'}
                </Link>
              </li>
              <li>
                <Link href="/category/scrunchies-hair-accessories" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'সিল্ক স্ক্রাঞ্চি' : 'Silk Scrunchies'}
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery-fashion-accessories" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'হস্তশিল্প জুয়েলারি' : 'Jewellery & Brass'}
                </Link>
              </li>
              <li>
                <Link href="/category/gifts-lifestyle" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'গিফট ও লাইফস্টাইল' : 'Gifts & Lifestyle'}
                </Link>
              </li>
              <li>
                <Link href="/category/other-everyday" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'নিত্যদিনের পণ্য' : 'Everyday Products'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C99A45] font-mono">
              {isBn ? 'সহায়তা ও পলিসি' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F8EEE2]/75">
              <li>
                <Link href="/track-order" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Order Status'}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'শিপিং ও ডেলিভারি পলিসি' : 'Shipping & Delivery'}
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'রিটার্ন ও এক্সচেঞ্জ পলিসি' : '7-Day Return Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'শর্তাবলী ও নিয়ম' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C99A45] transition-colors">
                  {isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C99A45] font-mono">
              {isBn ? 'শোরুম ও যোগাযোগ' : 'Showroom & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#F8EEE2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C99A45] shrink-0 mt-0.5" />
                <span>Level 3, Police Plaza Concord, Gulshan 1, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C99A45] shrink-0" />
                <a href="tel:01568923850" className="hover:text-white font-mono">
                  +880 1568-923850
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C99A45] shrink-0" />
                <a href="mailto:info.shokhora@gmail.com" className="hover:text-white">
                  info.shokhora@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#C99A45] block mb-1">
                {isBn ? 'নিরাপদ পেমেন্ট:' : 'Secure Payment Methods:'}
              </span>
              <div className="flex items-center gap-1.5 text-[#F8EEE2] font-mono text-[10px]">
                <span className="px-2 py-1 bg-[#18363F] rounded border border-[#C99A45]/30">bKash</span>
                <span className="px-2 py-1 bg-[#18363F] rounded border border-[#C99A45]/30">Nagad</span>
                <span className="px-2 py-1 bg-[#18363F] rounded border border-[#C99A45]/30">COD</span>
                <span className="px-2 py-1 bg-[#18363F] rounded border border-[#C99A45]/30">Cards</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8EEE2]/60 font-mono">
          <p>© {new Date().getFullYear()} SHOKHORA (শখোরা). All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Bangladesh</span>
            <span>&bull;</span>
            <span className="text-[#C99A45] font-serif italic">Your Choice, Our Passion.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
