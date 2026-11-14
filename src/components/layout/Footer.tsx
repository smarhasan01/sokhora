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
} from 'lucide-react';

export default function Footer() {
  const { isBn, t } = useLanguage();

  return (
    <footer className="bg-charcoal-950 text-taupe-300 pt-16 pb-8 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-charcoal-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                {isBn ? 'সারা বাংলাদেশে ডেলিভারি' : '64 Districts Delivery'}
              </p>
              <p className="text-taupe-400">
                {isBn ? '৪৮-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি' : 'Fast nationwide courier service'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                {isBn ? '১০০% খাঁটি পণ্য' : '100% Authentic Quality'}
              </p>
              <p className="text-taupe-400">
                {isBn ? 'প্রাকৃতিক ও প্রিমিয়াম উপকরণ' : 'Handcrafted & curated quality'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                {isBn ? 'সহজ ৭ দিনের এক্সচেঞ্জ' : 'Easy 7-Day Exchange'}
              </p>
              <p className="text-taupe-400">
                {isBn ? 'ঝামেলাহীন রিটার্ন ও পলিসি' : 'Hassle-free return policy'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                {isBn ? 'সহজ ও নিরাপদ পেমেন্ট' : 'Flexible Payment'}
              </p>
              <p className="text-taupe-400">
                {isBn ? 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ' : 'Cash on Delivery, bKash, Nagad'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-charcoal-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative w-44 h-14 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                className="object-contain object-left px-2"
              />
            </div>
            <p className="text-white font-medium text-sm">
              {t('brandTagline')}
            </p>
            <p className="text-xs text-taupe-400 leading-relaxed max-w-sm">
              {t('footerAbout')}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <span>{t('footerShowroom')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <a href="tel:01568923850" className="hover:text-white transition-colors">
                  01568923850
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <a href="mailto:info.shokhora@gmail.com" className="hover:text-white transition-colors">
                  info.shokhora@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {t('footerCategories')}
            </h4>
            <ul className="space-y-2.5 text-xs">
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
                  {isBn ? 'কিডস হেয়ার ক্লিপ' : 'Kids Hair Accessories'}
                </Link>
              </li>
              <li>
                <Link href="/category/scrunchies-hair-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'স্ক্রাঞ্চি ও হেয়ার' : 'Silk Scrunchies & Ties'}
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery-fashion-accessories" className="hover:text-white transition-colors">
                  {isBn ? 'জুয়েলারি ও গহনা' : 'Artisan Jewellery'}
                </Link>
              </li>
              <li>
                <Link href="/category/gifts-lifestyle" className="hover:text-white transition-colors">
                  {isBn ? 'গিফট ও লাইফস্টাইল' : 'Gifts & Scented Candles'}
                </Link>
              </li>
              <li>
                <Link href="/category/other-everyday" className="hover:text-white transition-colors">
                  {isBn ? 'দৈনন্দিন পণ্য' : 'Everyday Products'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {t('footerCustomerCare')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  {t('footerTrackOrder')}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  {t('footerShippingPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="hover:text-white transition-colors">
                  {t('footerReturnPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {isBn ? 'সাধারণ প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('footerContactUs')}
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  {t('myAccount')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {t('footerPolicies')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('footerAboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  {t('footerPrivacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  {t('footerTermsConditions')}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  {t('wishlist')}
                </Link>
              </li>
            </ul>

            <div className="pt-6">
              <p className="text-xs text-white font-medium mb-2">
                {isBn ? 'সোশ্যাল মিডিয়ায় যুক্ত থাকুন' : 'Connect With Us'}
              </p>
              <div className="flex items-center gap-3 text-taupe-400">
                <a
                  href="https://facebook.com/Shokhora"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-900 hover:text-white hover:bg-charcoal-800 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe-500">
          <p>{t('footerCopyright')}</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-taupe-400 mr-1">{t('footerPaymentPartners')}:</span>
            <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-800 text-[11px] text-white font-semibold">
              Cash on Delivery
            </span>
            <span className="px-2 py-0.5 rounded bg-pink-900/60 border border-pink-700/60 text-[11px] text-pink-200 font-bold">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-900/60 border border-orange-700/60 text-[11px] text-orange-200 font-bold">
              Nagad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
