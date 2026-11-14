import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ShieldCheck,
  RefreshCcw,
  Truck,
  CreditCard,
} from 'lucide-react';

export default function Footer() {
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
              <p className="font-semibold text-white text-sm">64 Districts Delivery</p>
              <p className="text-taupe-400">Fast nationwide courier service</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">100% Authentic</p>
              <p className="text-taupe-400">Handcrafted & curated quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <RefreshCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Easy 7-Day Exchange</p>
              <p className="text-taupe-400">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-charcoal-900 border border-charcoal-700 text-sage-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Flexible Payment</p>
              <p className="text-taupe-400">Cash on Delivery, bKash, Nagad</p>
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
            <p className="text-white font-medium text-sm">Your Choice, Our Passion.</p>
            <p className="text-xs text-taupe-400 font-bengali">আপনার পছন্দ, আমাদের ভালোবাসা।</p>
            <p className="text-xs text-taupe-400 leading-relaxed max-w-sm">
              SHOKHORA is a modern Bangladeshi lifestyle brand dedicated to providing thoughtfully
              curated everyday essentials, hair accessories, artisanal jewellery, and gentle skincare.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <span>House 14, Road 7, Dhanmondi, Dhaka 1205</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <a href="tel:+8801712345678" className="hover:text-white transition-colors">
                  +880 1712-345678
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-400 flex-shrink-0" />
                <a href="mailto:contact@shokhora.com" className="hover:text-white transition-colors">
                  contact@shokhora.com
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/fashion-clothing" className="hover:text-white transition-colors">
                  Fashion & Clothing
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics-beauty" className="hover:text-white transition-colors">
                  Cosmetics & Beauty
                </Link>
              </li>
              <li>
                <Link href="/category/kids-hairbands-clips" className="hover:text-white transition-colors">
                  Kids Hair Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/scrunchies-hair-accessories" className="hover:text-white transition-colors">
                  Silk Scrunchies
                </Link>
              </li>
              <li>
                <Link href="/category/jewellery-fashion-accessories" className="hover:text-white transition-colors">
                  Jewellery & Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/gifts-lifestyle" className="hover:text-white transition-colors">
                  Gifts & Candles
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="hover:text-white transition-colors">
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/return-refund-policy" className="hover:text-white transition-colors">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              About & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SHOKHORA
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="pt-6">
              <p className="text-xs text-white font-medium mb-2">Connect With Us</p>
              <div className="flex items-center gap-3 text-taupe-400">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-900 hover:text-white hover:bg-charcoal-800 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-charcoal-900 hover:text-white hover:bg-charcoal-800 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe-500">
          <p>© {new Date().getFullYear()} SHOKHORA (শখোরা). All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-taupe-400 mr-1">Accepted Payments:</span>
            <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-800 text-[11px] text-white font-semibold">
              Cash on Delivery
            </span>
            <span className="px-2 py-0.5 rounded bg-pink-900/60 border border-pink-700/60 text-[11px] text-pink-200 font-bold">
              bKash
            </span>
            <span className="px-2 py-0.5 rounded bg-orange-900/60 border border-orange-700/60 text-[11px] text-orange-200 font-bold">
              Nagad
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-900/50 border border-blue-700/50 text-[11px] text-blue-200 font-semibold">
              Visa / Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
