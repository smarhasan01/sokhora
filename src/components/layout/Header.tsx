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
  ArrowRight,
  Flame,
} from 'lucide-react';

const APPROVED_CATEGORIES = [
  {
    name: 'Fashion & Clothing',
    nameBn: 'পোশাক ও ফ্যাশন',
    slug: 'fashion-clothing',
    subItems: ['Kurtis & Tunics', 'Jamdani Dupattas', 'Silk Stoles', 'Linen Wear'],
    subItemsBn: ['কুর্তি ও টিউনিং', 'জামদানি ওড়না', 'সিল্ক স্টোল', 'লিনেন পোশাক'],
  },
  {
    name: 'Cosmetics & Beauty',
    nameBn: 'কসমেটিক্স ও বিউটি',
    slug: 'cosmetics-beauty',
    subItems: ['Beetroot Lip Tint', 'Glow Serums', 'Almond Oils', 'Natural Skincare'],
    subItemsBn: ['বিটরুট লিপ টিন্ট', 'গ্লো সিরাম', 'আমন্ড অয়েল', 'ন্যাচারাল স্কিনকেয়ার'],
  },
  {
    name: 'Kids Hair Clips & Accessories',
    nameBn: 'কিডস হেয়ার ক্লিপ ও এক্সেসরিজ',
    slug: 'kids-hairbands-clips',
    subItems: ['Blossom Floral Clips', 'Velvet Bow Headbands', 'Pinch-Free Pins', 'Baby Headwear'],
    subItemsBn: ['ফ্লোরাল ক্লিপ', 'ভেলভেট বো ব্যান্ড', 'সেফটি হেয়ারপিন', 'বেবি হেডওয়্যার'],
  },
  {
    name: 'Scrunchies & Hair Accessories',
    nameBn: 'স্ক্রাঞ্চি ও হেয়ার এক্সেসরিজ',
    slug: 'scrunchies-hair-accessories',
    subItems: ['100% Mulberry Silk', 'Satin Cloud Ties', 'French Claw Clips', 'Hair Barrettes'],
    subItemsBn: ['মালবেরি সিল্ক স্ক্রাঞ্চি', 'সাটিন হেয়ার টাই', 'ফ্রেঞ্চ ক্ল ক্লিপ', 'হেয়ার ব্যারেটস'],
  },
  {
    name: 'Everyday Products',
    nameBn: 'দৈনন্দিন পণ্য',
    slug: 'everyday-products',
    subItems: ['Canvas Tote Bags', 'Brass Pocket Mirrors', 'Soy Wax Candles', 'Daily Utilities'],
    subItemsBn: ['ক্যানভাস টোট ব্যাগ', 'ব্রাস পকেট আয়না', 'সয়া ওয়াক্স ক্যান্ডেল', 'নিত্যপ্রয়োজনীয় পণ্য'],
  },
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
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);
  const [cartBump, setCartBump] = useState(false);
  const [wishlistBump, setWishlistBump] = useState(false);
  const prevItemCountRef = useRef(itemCount);
  const prevWishlistCountRef = useRef(wishlistCount);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllProducts(getProducts());
  }, []);

  useEffect(() => {
    if (itemCount > 0 && itemCount !== prevItemCountRef.current) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 500);
      prevItemCountRef.current = itemCount;
      return () => clearTimeout(timer);
    }
    prevItemCountRef.current = itemCount;
  }, [itemCount]);

  useEffect(() => {
    if (wishlistCount > 0 && wishlistCount !== prevWishlistCountRef.current) {
      setWishlistBump(true);
      const timer = setTimeout(() => setWishlistBump(false), 500);
      prevWishlistCountRef.current = wishlistCount;
      return () => clearTimeout(timer);
    }
    prevWishlistCountRef.current = wishlistCount;
  }, [wishlistCount]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const matches = allProducts
        .filter((p) => {
          const matchCat =
            selectedCategory === 'all' ||
            p.category === selectedCategory ||
            (selectedCategory === 'everyday-products' && p.category === 'other-everyday');
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
    if (!searchQuery.trim()) return;
    const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
    setShowSuggestions(false);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    if (searchQuery.trim()) {
      const catParam = slug !== 'all' ? `&category=${slug}` : '';
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${catParam}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E5E8] shadow-xs">
      {/* Main Header Row — Starts Directly at the Top (Top bar completely removed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#012D51] hover:bg-[#F7F8FA] transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/"
              className="flex items-center shrink-0 py-0.5 group focus:outline-none transition-transform"
              aria-label="SHOKHORA Home"
            >
              <Image
                src="/images/shokhora-official-logo.png"
                alt="SHOKHORA"
                width={280}
                height={90}
                className="h-11 sm:h-13 md:h-15 lg:h-16 xl:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Wide Search Bar */}
          <div ref={searchContainerRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#F7F8FA] border border-[#E2E5E8] rounded-xl focus-within:border-[#012D51] focus-within:ring-4 focus-within:ring-[#012D51]/10 focus-within:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Category Quick Selector Dropdown */}
              <div className="relative border-r border-[#E2E5E8]">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  className="bg-transparent pl-3 pr-7 py-2.5 text-xs font-semibold text-[#012D51] cursor-pointer focus:outline-none appearance-none hover:text-[#C78703] transition-colors"
                >
                  <option value="all">{isBn ? 'সব ক্যাটাগরি' : 'All Categories'}</option>
                  {APPROVED_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {isBn ? cat.nameBn : cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#012D51] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Icon & Input */}
              <div className="flex-1 flex items-center px-3 gap-2">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isBn
                      ? 'পোশাক, কসমেটিক্স, হেয়ার ক্লিপস খুঁজুন...'
                      : 'Search fashion, cosmetics, hair accessories...'
                  }
                  className="w-full bg-transparent text-sm text-[#202833] placeholder-gray-400 focus:outline-none py-2"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-[#012D51] hover:bg-[#023E6E] text-white px-5 py-2.5 text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>{isBn ? 'খুঁজুন' : 'Search'}</span>
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-[#E2E5E8] overflow-hidden z-50 animate-scale-in">
                <div className="p-2 border-b border-[#F7F8FA] bg-[#F7F8FA] flex items-center justify-between text-xs font-semibold text-[#012D51]">
                  <span>{isBn ? 'পণ্য সাজেশন' : 'Product Suggestions'}</span>
                  <span className="text-gray-500 font-normal">
                    {suggestions.length} {isBn ? 'টি পাওয়া গেছে' : 'found'}
                  </span>
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 p-3 hover:bg-[#F7F8FA] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 shrink-0 overflow-hidden relative">
                        <Image
                          src={p.images[0] || '/images/categories/scrunchies.jpg'}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#202833] truncate whitespace-nowrap overflow-hidden text-ellipsis block">
                          {isBn && p.nameBn ? p.nameBn : p.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{p.category.replace(/-/g, ' ')}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-[#012D51]">
                          {formatPrice(p.discountPrice || p.regularPrice)}
                        </span>
                        {p.discountPrice && (
                          <p className="text-[11px] text-gray-400 line-through">
                            {formatPrice(p.regularPrice)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 bg-[#F7F8FA] text-center border-t border-gray-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#012D51] hover:text-[#C78703] transition-colors flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>{isBn ? 'সকল ফলাফল দেখুন' : 'See all matching results'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account, Wishlist, Language Switcher & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Language Switcher Pill (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center bg-[#F7F8FA] border border-[#E2E5E8] rounded-xl p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-[#012D51] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#012D51]'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'bn'
                    ? 'bg-[#012D51] text-white shadow-xs'
                    : 'text-gray-600 hover:text-[#012D51]'
                }`}
                aria-label="বাংলা ভাষায় দেখুন"
              >
                বাং
              </button>
            </div>

            {/* Customer Account / Sign In */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-2 text-[#012D51] hover:text-[#C78703] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-[#F7F8FA] group-hover:bg-[#EBF3F9] flex items-center justify-center border border-[#E2E5E8] transition-colors">
                <User className="w-4 h-4 text-[#012D51] group-hover:text-[#C78703] transition-colors" />
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {user ? (isBn ? 'আমার অ্যাকাউন্ট' : 'Account') : isBn ? 'স্বাগতম' : 'Welcome'}
                </p>
                <p className="text-xs font-bold text-[#012D51] group-hover:text-[#C78703] truncate max-w-[100px]">
                  {user ? user.displayName || user.email?.split('@')[0] : isBn ? 'লগইন / সাইনআপ' : 'Sign In'}
                </p>
              </div>
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative flex items-center text-[#012D51] hover:text-[#C78703] transition-colors group"
              aria-label="Wishlist"
            >
              <div className="w-9 h-9 rounded-full bg-[#F7F8FA] group-hover:bg-[#EBF3F9] flex items-center justify-center border border-[#E2E5E8] transition-all group-hover:scale-105">
                <Heart className="w-4 h-4 text-[#012D51] group-hover:text-[#C78703] transition-colors" />
              </div>
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-[#C78703] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs transition-transform ${
                  wishlistBump ? 'animate-heart-beat scale-125' : ''
                }`}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Pill */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#012D51] hover:bg-[#023E6E] text-white px-3 sm:px-3.5 py-2 rounded-xl transition-all shadow-xs group btn-press"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F6DDAB] group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-[#C78703] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs transition-transform ${
                    cartBump ? 'animate-cart-bump scale-125' : ''
                  }`}>
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="block text-[10px] text-white/70 font-semibold uppercase leading-tight">
                  {isBn ? 'কার্ট' : 'Cart'}
                </span>
                <span className="font-bold text-[#F6DDAB] leading-tight">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-[#F7F8FA] border border-[#E2E5E8] rounded-xl px-3 py-2 gap-2"
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'পণ্য খুঁজুন...' : 'Search fashion, cosmetics, hair...'}
              className="w-full bg-transparent text-xs text-[#202833] placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#012D51] text-white px-3 py-1 rounded-lg text-xs font-bold"
            >
              {isBn ? 'সার্চ' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Category Navigation Sub-Bar */}
      <nav className="border-t border-[#E2E5E8] bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 py-1.5">
              {/* All Categories Dropdown Button */}
              <div ref={categoryMenuRef} className="relative">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="flex items-center gap-2 bg-[#012D51] hover:bg-[#023E6E] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Menu className="w-4 h-4" />
                  <span>{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      categoryDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {categoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E2E5E8] py-2 z-50 animate-scale-in">
                    {APPROVED_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-[#202833] hover:bg-[#F7F8FA] hover:text-[#012D51] transition-colors"
                      >
                        <span>{isBn ? cat.nameBn : cat.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-gray-400" />
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                      <Link
                        href="/shop"
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="text-xs font-bold text-[#C78703] hover:underline flex items-center justify-between"
                      >
                        <span>{isBn ? 'সকল পণ্য দেখুন' : 'View All Products'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Horizontal Pill Category Links */}
              {APPROVED_CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  className="relative group"
                  onMouseEnter={() => setActiveHoverCategory(cat.slug)}
                  onMouseLeave={() => setActiveHoverCategory(null)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all group/item ${
                      pathname === `/category/${cat.slug}`
                        ? 'bg-[#EBF3F9] text-[#012D51] font-bold'
                        : 'text-[#202833] hover:text-[#012D51] hover:bg-[#F7F8FA]'
                    }`}
                  >
                    <span>{isBn ? cat.nameBn : cat.name}</span>
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#012D51] transition-transform duration-300 group-hover:rotate-180" />
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#C78703] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
                  </Link>

                  {/* Mega Dropdown preview on hover */}
                  {activeHoverCategory === cat.slug && (
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-[#E2E5E8] p-2 z-50 animate-scale-in">
                      <div className="p-2 border-b border-[#F7F8FA]">
                        <p className="text-[11px] font-bold text-[#012D51] uppercase tracking-wider">
                          {isBn ? cat.nameBn : cat.name}
                        </p>
                      </div>
                      <div className="py-1">
                        {(isBn ? cat.subItemsBn : cat.subItems).map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={`/category/${cat.slug}`}
                            className="block px-3 py-1.5 text-xs text-gray-600 hover:text-[#012D51] hover:bg-[#F7F8FA] rounded-lg transition-colors"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-1.5 border-t border-gray-100">
                        <Link
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-[#C78703] hover:underline"
                        >
                          <span>{isBn ? 'ক্যাটাগরি দেখুন' : 'Explore Category'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Promo Link */}
            <div className="flex items-center gap-3">
              <Link
                href="/shop?filter=sale"
                className="flex items-center gap-1 text-xs font-bold text-[#C78703] hover:text-[#B07502] transition-colors py-1.5 px-3 rounded-lg hover:bg-[#FDF8ED]"
              >
                <Flame className="w-3.5 h-3.5 text-[#C78703]" />
                <span>{isBn ? 'স্পেশাল ছাড় ৫০%' : 'LIMITED SALE'}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 animate-slide-up">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#F7F8FA]">
              <Image
                src="/images/shokhora-official-logo.png"
                alt="SHOKHORA"
                width={200}
                height={70}
                className="h-11 sm:h-12 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-xl border border-[#E2E5E8]">
                <span className="text-xs font-bold text-[#012D51] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C78703]" />
                  <span>{isBn ? 'ভাষা নির্বাচন' : 'Language'}</span>
                </span>
                <div className="flex items-center gap-1 bg-white border border-[#E2E5E8] rounded-lg p-0.5">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      language === 'en'
                        ? 'bg-[#012D51] text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      language === 'bn'
                        ? 'bg-[#012D51] text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {isBn ? 'ক্যাটাগরি সমূহ' : 'Approved Categories'}
                </p>
                <div className="space-y-1">
                  {APPROVED_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#202833] hover:bg-[#F7F8FA] hover:text-[#012D51] transition-colors"
                    >
                      <span>{isBn ? cat.nameBn : cat.name}</span>
                      <ChevronDown className="w-4 h-4 -rotate-90 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {isBn ? 'অন্যান্য লিংক' : 'Quick Navigation'}
                </p>
                <div className="space-y-1">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#F7F8FA]"
                  >
                    {isBn ? 'সকল পণ্য' : 'All Products'}
                  </Link>
                  <Link
                    href="/shop?filter=sale"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-[#C78703] hover:bg-[#FDF8ED]"
                  >
                    {isBn ? 'স্পেশাল ছাড়' : 'Limited Sale'}
                  </Link>
                  <Link
                    href="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#F7F8FA]"
                  >
                    {isBn ? 'অর্ডার ট্র্যাক' : 'Track Order'}
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#F7F8FA]"
                  >
                    {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#F7F8FA]"
                  >
                    {isBn ? 'যোগাযোগ' : 'Contact Us'}
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-[#F7F8FA]">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <Phone className="w-3.5 h-3.5 text-[#C78703]" />
                <span className="font-bold">01568923850</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Road 4/A, Dhanmondi, Dhaka - 1209
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
