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
  Phone,
  Globe,
  ChevronDown,
  Sparkles,
  MapPin,
  Clock,
  Flame,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Fashion & Clothing', nameBn: 'পোশাক ও ফ্যাশন', slug: 'fashion-clothing' },
  { name: 'Cosmetics & Beauty', nameBn: 'কসমেটিক্স ও বিউটি', slug: 'cosmetics-beauty' },
  { name: 'Kids Hair Clips', nameBn: 'কিডস হেয়ার ক্লিপ', slug: 'kids-hairbands-clips' },
  { name: 'Scrunchies & Hair', nameBn: 'স্ক্রাঞ্চি ও হেয়ার ব্যান্ড', slug: 'scrunchies-hair-accessories' },
  { name: 'Jewellery & Brass', nameBn: 'জুয়েলারি ও গহনা', slug: 'jewellery-fashion-accessories' },
  { name: 'Gifts & Lifestyle', nameBn: 'গিফট ও লাইফস্টাইল', slug: 'gifts-lifestyle' },
  { name: 'Everyday Products', nameBn: 'দৈনন্দিন নিত্যপণ্য', slug: 'other-everyday' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount, setIsCartOpen, subtotal } = useCart();
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();
  const { language, setLanguage, isBn, t, formatPrice } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllProducts(getProducts());
  }, []);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const matches = allProducts
        .filter((p) => {
          const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
          const matchText =
            p.name.toLowerCase().includes(q) ||
            (p.nameBn && p.nameBn.includes(q)) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q);
          return matchCat && matchText;
        })
        .slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedCategory, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(e.target as Node)
      ) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#E94B27] text-white text-[11px] py-1.5 px-4 border-b border-[#D83B19]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-white/80 shrink-0" />
              <span className="hidden sm:inline">Dhanmondi, Dhaka - 1209, Bangladesh</span>
              <span className="sm:hidden">Dhaka, Bangladesh</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{isBn ? 'সকাল ৯টা - রাত ১০টা' : 'Sat - Thu: 9:00 AM - 10:00 PM'}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <a
              href="tel:01568923850"
              className="hidden sm:flex items-center gap-1 text-white hover:text-white/80 transition-colors"
            >
              <Phone className="w-3 h-3 text-white/90" />
              <span className="font-mono">01568923850</span>
            </a>

            <Link
              href="/track-order"
              className="hover:underline transition-all text-white/95"
            >
              {t('footerTrackOrder')}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-0.5">
              <Globe className="w-3 h-3 text-white/90" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.2 rounded font-bold transition-all ${
                  language === 'en' ? 'bg-white text-[#FF5B37]' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.2 rounded font-bengali font-bold transition-all ${
                  language === 'bn' ? 'bg-white text-[#FF5B37]' : 'text-white/80 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation & Search Header (Coral Reference Color #FF5B37) */}
      <div className="bg-[#FF5B37] text-white py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-white hover:bg-black/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Original SHOKHORA Logo */}
          <Link href="/" className="shrink-0 flex items-center bg-white py-1 px-3 rounded-xl shadow-sm">
            <div className="relative w-36 sm:w-44 h-9 sm:h-11">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Search Bar with integrated Category dropdown (Inspired by Reference) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-white rounded-xl overflow-hidden shadow-sm border border-transparent focus-within:border-black/20">
              
              {/* Category Dropdown inside search */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-2.5 border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-200 transition-colors shrink-0 max-w-[150px]"
              >
                <option value="all">{isBn ? 'সকল ক্যাটাগরি' : 'All Category'}</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {isBn ? c.nameBn : c.name}
                  </option>
                ))}
              </select>

              {/* Input */}
              <input
                type="text"
                placeholder={isBn ? 'আপনার পছন্দের পণ্য বা ব্র্যান্ড সার্চ করুন...' : 'Search for products, brands, lifestyle...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                className="flex-1 px-4 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 outline-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#191C1F] hover:bg-black text-white px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline">{isBn ? 'সার্চ' : 'Search'}</span>
              </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 p-2 text-gray-900 space-y-1">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={item.images[0] || '/images/Logo-01.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate text-gray-900">
                        {isBn && item.nameBn ? item.nameBn : item.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#FF5B37] font-bold">
                        {formatPrice(item.discountPrice ?? item.regularPrice)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Cart Pill, Account */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-white hover:bg-black/10 transition-colors flex items-center justify-center"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-[#FF5B37] text-[10px] font-bold flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Pill inspired by reference */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-white text-gray-900 px-3.5 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all font-mono"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#FF5B37]" />
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#191C1F] text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-sans font-bold">
                  {isBn ? 'কার্ট' : 'Cart'}
                </span>
                <span className="text-xs font-bold text-gray-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </button>

            {/* User Account */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-2 p-2 rounded-xl text-white hover:bg-black/10 transition-colors"
              title={user ? t('myAccount') : t('signIn')}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden xl:flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-white/80 font-sans">
                  {user ? (isBn ? 'হ্যালো' : 'Hello') : (isBn ? 'লগইন' : 'Sign In')}
                </span>
                <span className="text-xs font-bold text-white max-w-[90px] truncate">
                  {user ? (user.displayName || 'Account').split(' ')[0] : (isBn ? 'অ্যাকাউন্ট' : 'Account')}
                </span>
              </div>
            </Link>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={isBn ? 'পণ্য বা ব্র্যান্ড খুঁজুন...' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none placeholder:text-gray-400 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* 3. Sub-Navigation Bar (White with "All Categories ▾" button & links) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-12">
          
          {/* Left: "All Categories ▾" Button */}
          <div ref={categoryMenuRef} className="relative shrink-0">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FA4A23] hover:bg-[#E03612] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Menu className="w-4 h-4" />
              <span>{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Floating Category Menu */}
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FFF0ED] hover:text-[#FF5B37] transition-colors"
                  >
                    {isBn ? cat.nameBn : cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-700">
            <Link
              href="/shop"
              className={`hover:text-[#FF5B37] transition-colors py-1 ${
                pathname === '/shop' ? 'text-[#FF5B37] font-bold' : ''
              }`}
            >
              {isBn ? 'সকল পণ্য' : 'Products'}
            </Link>
            <Link
              href="/category/fashion-clothing"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'পোশাক' : 'Fashion'}
            </Link>
            <Link
              href="/category/cosmetics-beauty"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'বিউটি' : 'Beauty'}
            </Link>
            <Link
              href="/category/scrunchies-hair-accessories"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'স্ক্রাঞ্চি' : 'Scrunchies'}
            </Link>
            <Link
              href="/category/jewellery-fashion-accessories"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'জুয়েলারি' : 'Jewellery'}
            </Link>
            <Link
              href="/about"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'আমাদের কথা' : 'About'}
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#FF5B37] transition-colors py-1"
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </Link>
          </nav>

          {/* Right Highlights: LIMITED SALE, Best Seller, New Arrival */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-[#FF5B37] hover:underline"
            >
              <Flame className="w-3.5 h-3.5 fill-[#FF5B37]" />
              <span className="uppercase tracking-wider font-bold">
                {isBn ? 'সীমিত অফার' : 'LIMITED SALE'}
              </span>
            </Link>
            <Link
              href="/shop?sort=popularity"
              className="text-gray-600 hover:text-[#FF5B37] transition-colors"
            >
              {isBn ? 'বেস্ট সেলার' : 'Best Seller'}
            </Link>
            <Link
              href="/shop?sort=newest"
              className="text-gray-600 hover:text-[#FF5B37] transition-colors"
            >
              {isBn ? 'নিউ অ্যারাইভাল' : 'New Arrival'}
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-4 bg-[#FF5B37] text-white flex items-center justify-between">
                <span className="font-bold text-sm">
                  {isBn ? 'মেন্যু ও ক্যাটাগরি' : 'Menu & Categories'}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-black/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded-lg font-bold text-xs text-gray-900 hover:bg-gray-100"
                >
                  {isBn ? 'সকল পণ্য' : 'All Products'}
                </Link>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    {isBn ? c.nameBn : c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
              <Link
                href={user ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[#FF5B37] text-white text-xs font-bold text-center block"
              >
                {user ? t('myAccount') : t('signIn')}
              </Link>
              <p className="text-[11px] text-center text-gray-500 font-mono">
                Hotline: 01568923850
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
