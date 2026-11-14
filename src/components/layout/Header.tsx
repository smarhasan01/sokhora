'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getProducts } from '@/lib/db/store';
import { Product } from '@/types';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Truck,
  Phone,
  Globe,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Fashion & Clothing', nameBn: 'পোশাক ও ফ্যাশন', slug: 'fashion-clothing' },
  { name: 'Cosmetics & Beauty', nameBn: 'কসমেটিক্স ও বিউটি', slug: 'cosmetics-beauty' },
  { name: 'Kids Hair Accessories', nameBn: 'কিডস হেয়ার এক্সেসরিজ', slug: 'kids-hairbands-clips' },
  { name: 'Scrunchies & Hair Ties', nameBn: 'স্ক্রাঞ্চি ও হেয়ার ব্যান্ড', slug: 'scrunchies-hair-accessories' },
  { name: 'Jewellery & Brass', nameBn: 'জুয়েলারি ও গহনা', slug: 'jewellery-fashion-accessories' },
  { name: 'Gifts & Lifestyle', nameBn: 'গিফট ও লাইফস্টাইল', slug: 'gifts-lifestyle' },
  { name: 'Everyday Essentials', nameBn: 'দৈনন্দিন নিত্যপণ্য', slug: 'other-everyday' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, setIsCartOpen, subtotal } = useCart();
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();
  const { language, setLanguage, isBn, t, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllProducts(getProducts());
  }, []);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const matches = allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.nameBn && p.nameBn.includes(q)) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q)
        )
        .slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setSearchOpenMobile(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-taupe-200 transition-all">
      {/* 1. Slim Luxury Announcement Bar */}
      <div className="bg-[#1C1917] text-ivory-100 text-[11px] py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 tracking-wide font-normal truncate">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sage-900/60 text-sage-300 border border-sage-700/50 text-[10px] font-semibold uppercase">
              <Sparkles className="w-2.5 h-2.5 text-sage-400" />
              {isBn ? 'উৎসবের অফার' : 'Festive Season'}
            </span>
            <span className="hidden sm:inline text-stone-300">
              {t('freeShippingBar')} &bull;{' '}
              {isBn ? '১০% বিশেষ ছাড়ে কোড:' : 'Use code:'}{' '}
              <strong className="text-amber-300 tracking-wider">SHOKHORA10</strong>
            </span>
            <span className="sm:hidden font-medium text-[11px] truncate text-stone-300">
              {isBn ? '৳১,৫০০+ অর্ডারে ফ্রি ডেলিভারি' : 'Free delivery over ৳1,500'} |{' '}
              <strong className="text-amber-300">SHOKHORA10</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-stone-300 text-[11px] font-medium shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-full px-2 py-0.5">
              <Globe className="w-3 h-3 text-stone-400" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bengali font-semibold transition-all ${
                  language === 'bn'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                বাং
              </button>
            </div>

            <Link
              href="/track-order"
              className="hidden md:flex hover:text-white transition-colors items-center gap-1 text-[11px]"
            >
              {t('footerTrackOrder')}
            </Link>

            <a
              href="tel:01568923850"
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors text-[11px]"
            >
              <Phone className="w-3 h-3 text-sage-400" />
              <span>01568923850</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Storefront Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-charcoal-800 hover:bg-taupe-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Left: Refined Category Quick Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/shop"
              className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 relative ${
                pathname === '/shop' ? 'text-charcoal-950 font-bold' : 'text-charcoal-600 hover:text-charcoal-950'
              }`}
            >
              {t('allProducts')}
            </Link>
            <Link
              href="/category/fashion-clothing"
              className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-charcoal-950 transition-colors py-1"
            >
              {isBn ? 'পোশাক' : 'Fashion'}
            </Link>
            <Link
              href="/category/cosmetics-beauty"
              className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-charcoal-950 transition-colors py-1"
            >
              {isBn ? 'বিউটি' : 'Beauty'}
            </Link>
            <Link
              href="/category/scrunchies-hair-accessories"
              className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-charcoal-950 transition-colors py-1"
            >
              {isBn ? 'স্ক্রাঞ্চি' : 'Scrunchies'}
            </Link>
            <Link
              href="/category/jewellery-fashion-accessories"
              className="text-xs uppercase tracking-widest font-medium text-charcoal-600 hover:text-charcoal-950 transition-colors py-1"
            >
              {isBn ? 'জুয়েলারি' : 'Jewellery'}
            </Link>
          </nav>

          {/* Center: Original SHOKHORA Logo */}
          <Link href="/" className="shrink-0 flex items-center justify-center py-2">
            <div className="relative w-40 sm:w-48 h-12 sm:h-14">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA (শখোরা)"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </Link>

          {/* Right: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live Search Input (Desktop) */}
            <div ref={searchContainerRef} className="hidden md:block relative w-48 lg:w-64">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder={isBn ? 'পণ্য বা ব্র্যান্ড খুঁজুন...' : 'Search products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                  className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-taupe-100/70 border border-taupe-300 text-charcoal-900 placeholder:text-charcoal-400 focus:bg-white focus:outline-none focus:border-charcoal-800 transition-all"
                />
                <Search className="w-4 h-4 text-charcoal-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-taupe-200 overflow-hidden z-50 p-2 space-y-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-taupe-500 tracking-wider">
                    {isBn ? 'ম্যাচিং প্রোডাক্টস' : 'Suggested Products'}
                  </div>
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-taupe-100 transition-colors"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-ivory-200 shrink-0">
                        <Image
                          src={item.images[0] || '/images/Logo-01.png'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-charcoal-900 truncate">
                          {isBn && item.nameBn ? item.nameBn : item.name}
                        </p>
                        <p className="text-[11px] text-sage-700 font-mono">
                          {formatPrice(item.discountPrice ?? item.regularPrice)}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowSuggestions(false)}
                    className="block text-center py-2 text-xs font-semibold text-charcoal-900 hover:bg-taupe-100 rounded-lg transition-colors border-t border-taupe-100 mt-1"
                  >
                    {isBn ? 'সকল ফলাফল দেখুন' : 'View all results'} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setSearchOpenMobile(!searchOpenMobile)}
              className="md:hidden p-2 rounded-xl text-charcoal-700 hover:bg-taupe-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-charcoal-700 hover:bg-taupe-100 transition-colors"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Customer Account */}
            <Link
              href={user ? '/account' : '/login'}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-taupe-100 transition-colors flex items-center gap-1.5"
              title={user ? t('myAccount') : t('login')}
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="hidden xl:inline text-xs font-semibold text-charcoal-800 max-w-[100px] truncate">
                  {(user.displayName || 'Account').split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-charcoal-950 text-white hover:bg-charcoal-800 transition-all shadow-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-sage-300" />
              <span className="text-xs font-bold font-mono">{itemCount}</span>
              {subtotal > 0 && (
                <span className="hidden sm:inline border-l border-charcoal-700 pl-2 text-xs font-medium text-stone-200">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {searchOpenMobile && (
          <div className="md:hidden pb-3 pt-1 border-t border-taupe-200 animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={isBn ? 'পণ্য বা ব্র্যান্ড খুঁজুন...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-taupe-100 border border-taupe-300 text-charcoal-900 focus:bg-white focus:outline-none focus:border-charcoal-800"
              />
              <Search className="w-4 h-4 text-charcoal-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>
        )}
      </div>

      {/* 3. Sub-Category Navigation Bar (Desktop) */}
      <div className="hidden lg:block bg-ivory-100/70 border-t border-taupe-200/60 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-xs font-medium text-charcoal-700">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-charcoal-950 transition-colors py-1 relative group inline-block"
                >
                  <span>{isBn ? cat.nameBn : cat.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-charcoal-900 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-taupe-200 flex items-center justify-between bg-ivory-100">
                <div className="relative w-32 h-10">
                  <Image
                    src="/images/Logo-01.png"
                    alt="SHOKHORA"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-charcoal-600 hover:bg-taupe-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Switcher in Drawer */}
              <div className="p-4 bg-taupe-100/50 border-b border-taupe-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal-700">
                  {isBn ? 'ভাষা নির্বাচন করুন:' : 'Select Language:'}
                </span>
                <div className="flex rounded-lg border border-taupe-300 p-0.5 bg-white text-xs">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded font-semibold transition-all ${
                      language === 'en'
                        ? 'bg-charcoal-900 text-white shadow-sm'
                        : 'text-charcoal-600'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`px-3 py-1 rounded font-bengali font-semibold transition-all ${
                      language === 'bn'
                        ? 'bg-charcoal-900 text-white shadow-sm'
                        : 'text-charcoal-600'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                <p className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-taupe-500">
                  {isBn ? 'প্রধান ক্যাটাগরি' : 'Main Categories'}
                </p>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl font-semibold text-sm text-charcoal-900 hover:bg-ivory-100 transition-colors"
                >
                  <span>{t('allProducts')}</span>
                  <ArrowRight className="w-4 h-4 text-taupe-400" />
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm text-charcoal-700 hover:bg-ivory-100 transition-colors"
                  >
                    <span>{isBn ? cat.nameBn : cat.name}</span>
                    <ArrowRight className="w-4 h-4 text-taupe-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-taupe-200 bg-ivory-100 space-y-3">
              <Link
                href={user ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-charcoal-900 text-white text-xs font-semibold shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>{user ? t('myAccount') : t('login')}</span>
              </Link>
              <div className="text-center">
                <a
                  href="tel:01568923850"
                  className="text-xs font-mono text-charcoal-600 hover:text-charcoal-950"
                >
                  Hotline: 01568923850
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
