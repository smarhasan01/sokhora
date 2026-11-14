'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  ShieldCheck,
  RefreshCcw,
  Truck,
  CreditCard,
  ArrowUpRight,
} from 'lucide-react';

export default function Footer() {
  const { isBn, t } = useLanguage();

  return (
    <footer className="bg-[#141312] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-stone-800/80">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block p-3 rounded-2xl bg-white/95 shadow-sm">
              <div className="relative w-40 h-11">
                <Image
                  src="/images/Logo-01.png"
                  alt="SHOKHORA"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {isBn
                ? 'শখোরা — আপনার পছন্দ, আমাদের ভালোবাসা। বাংলাদেশের প্রতিটি কোণে খাঁটি মালবেরি সিল্ক, হস্তশিল্প ও লাইফস্টাইল পণ্য পৌঁছে দেওয়াই আমাদের অঙ্গীকার।'
                : 'SHOKHORA — Your Choice, Our Passion. Mindfully curated multi-category lifestyle and fashion essentials celebrating heritage craftsmanship.'}
            </p>

            {/* Social & Contact Pills */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com/Shokhora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="tel:01568923850"
                className="px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors text-xs font-mono flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>01568923850</span>
              </a>
            </div>
          </div>

          {/* Quick Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold">
              {isBn ? 'কালেকশন সমূহ' : 'Collections'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
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
                <Link href="/category/scrunchies-hair-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'সিল্ক স্ক্রাঞ্চি' : 'Silk Scrunchies'}
                </Link>
              </li>
              <li>
                <Link href="/category/kids-hairbands-clips" className="hover:text-white transition-colors">
                  {isBn ? 'কিডস হেয়ার ক্লিপ' : 'Kids Hair Clips'}
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery-fashion-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'হস্তনির্মিত জুয়েলারি' : 'Jewellery & Brass'}
                </Link>
              </li>
              <li>
                <Link href="/category/gifts-lifestyle" className="hover:text-white transition-colors">
                  {isBn ? 'গিফট ও লাইফস্টাইল' : 'Gifts & Lifestyle'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold">
              {isBn ? 'কাস্টমার কেয়ার ও পলিসি' : 'Customer Care'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  {isBn ? 'অর্ডার ট্র্যাক করুন' : 'Track Your Order'}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  {isBn ? 'ডেলিভারি ও শিপিং পলিসি' : 'Delivery & Shipping Policy'}
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="hover:text-white transition-colors">
                  {isBn ? 'রিটার্ন ও এক্সচেঞ্জ পলিসি' : 'Return & Exchange Policy'}
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
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {isBn ? 'যোগাযোগ করুন' : 'Contact Support'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-stone-400 font-semibold">
              {isBn ? 'শোরুম ও অফিস' : 'Showroom & Studio'}
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Road 4/A, Dhanmondi, Dhaka - 1209, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01568923850" className="hover:text-white font-mono">
                  +880 1568-923850
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info.shokhora@gmail.com" className="hover:text-white">
                  info.shokhora@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block mb-1.5">
                {isBn ? 'পেমেন্ট মাধ্যম সমূহ:' : 'Accepted Payments:'}
              </span>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px]">bKash</span>
                <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px]">Nagad</span>
                <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px]">COD</span>
                <span className="px-2 py-1 rounded bg-stone-900 border border-stone-800 text-[10px]">Visa / MC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-mono">
          <p>© {new Date().getFullYear()} SHOKHORA (শখোরা). All rights reserved.</p>
          <p className="flex items-center gap-2 text-[11px]">
            <span>Dhaka, Bangladesh</span>
            <span>&bull;</span>
            <span className="text-emerald-400">Authentic Lifestyle</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
