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
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white">
      {/* 1. Slim Announcement Bar (Deep Navy #012D51 with Gold #C78703 accents) */}
      <div className="bg-[#012D51] text-white text-[11px] py-1.5 px-4 border-b border-[#C78703]/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-3 h-3 text-[#C78703] shrink-0" />
              <span className="hidden sm:inline">Police Plaza Concord, Gulshan 1, Dhaka</span>
              <span className="sm:hidden">Dhaka, Bangladesh</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <Clock className="w-3 h-3 text-[#C78703] shrink-0" />
              <span>{isBn ? 'সকাল ৯টা - রাত ১০টা' : 'Sat - Thu: 9:00 AM - 10:00 PM'}</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[#C78703] font-medium text-[11px]">
            <Sparkles className="w-3 h-3" />
            <span>{isBn ? 'সারাদেশে ১,৫০০ টাকার অর্ডারে ফ্রি ডেলিভারি!' : 'Free Nationwide Delivery on orders over ৳1,500!'}</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <a
              href="tel:01568923850"
              className="hidden sm:flex items-center gap-1 text-white hover:text-[#C78703] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C78703]" />
              <span className="font-mono">01568923850</span>
            </a>

            <Link
              href="/track-order"
              className="hover:text-[#C78703] transition-colors text-white/90"
            >
              {t('footerTrackOrder')}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#01223D] rounded-full px-2 py-0.5 border border-[#C78703]/40">
              <Globe className="w-3 h-3 text-[#C78703]" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.2 rounded font-bold transition-all text-[10px] ${
                  language === 'en' ? 'bg-[#C78703] text-white shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.2 rounded font-bengali font-bold transition-all text-[10px] ${
                  language === 'bn' ? 'bg-[#C78703] text-white shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header (Clean White with Original Transparent Logo, Search, Actions) */}
      <div className="bg-white text-[#252525] py-3 px-4 sm:px-6 lg:px-8 border-b border-[#EAECEF]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl text-[#012D51] hover:bg-[#F6F7F8] transition-colors btn-press"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Original SHOKHORA Logo (Transparent, Exact Colors, No Black Box) */}
          <Link href="/" className="shrink-0 flex items-center group">
            <div className="relative w-36 sm:w-48 h-10 sm:h-12 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/shokhora-official-logo.png"
                alt="SHOKHORA শখোরা"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Search Bar with Category Dropdown (Reference 1 Layout) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-[#F6F7F8] rounded-full overflow-hidden border border-[#EAECEF] focus-within:border-[#012D51] focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(1,45,81,0.1)] transition-all">
              
              {/* Category Dropdown inside search */}
              <div className="relative shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-[#012D51] text-xs font-semibold pl-4 pr-7 py-2.5 outline-none cursor-pointer hover:text-[#C78703] transition-colors appearance-none"
                >
                  <option value="all">{isBn ? 'সকল ক্যাটাগরি' : 'All Category'}</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {isBn ? c.nameBn : c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Vertical divider */}
              <div className="w-[1px] h-5 bg-[#DDE0E3]" />

              {/* Input */}
              <input
                type="text"
                placeholder={isBn ? 'পণ্য বা ক্যাটাগরি অনুসন্ধান করুন...' : 'Search for products or category...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                className="flex-1 px-4 py-2.5 text-xs text-[#252525] bg-transparent placeholder:text-stone-400 outline-none"
              />

              {/* Reference Search Button (Deep Navy #012D51 circular button) */}
              <button
                type="submit"
                className="m-1 w-9 h-9 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white flex items-center justify-center transition-all shadow-xs shrink-0 btn-press"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#EAECEF] overflow-hidden z-50 p-2 text-[#252525] space-y-1 animate-scale-in">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F6F7F8] transition-colors"
                  >
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#F6F7F8] border border-[#EAECEF] shrink-0">
                      <Image
                        src={item.images[0] || '/images/shokhora-official-logo.png'}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate text-[#012D51]">
                        {isBn && item.nameBn ? item.nameBn : item.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#C78703] font-bold">
                        {formatPrice(item.discountPrice ?? item.regularPrice)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Cart, Sign in */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full text-[#012D51] hover:text-[#C78703] hover:bg-[#F6F7F8] transition-colors flex items-center justify-center btn-press"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0 right-0 w-4 h-4 rounded-full bg-[#C78703] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Pill */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-[#F6F7F8] text-[#012D51] px-3.5 py-2 rounded-full border border-[#EAECEF] hover:border-[#012D51] hover:bg-white transition-all font-mono btn-press shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#012D51]" />
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#012D51] text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-sans font-semibold">
                  {isBn ? 'কার্ট' : 'Cart'}
                </span>
                <span className="text-xs font-bold text-[#012D51]">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </button>

            {/* User Account / Sign In Pill (Reference 1 style) */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C78703] text-[#012D51] hover:bg-[#FDF8ED] transition-all text-xs font-semibold btn-press"
              title={user ? t('myAccount') : t('signIn')}
            >
              <User className="w-4 h-4 text-[#C78703]" />
              <span className="hidden sm:inline">
                {user ? (user.displayName || 'Account').split(' ')[0] : (isBn ? 'লগইন' : 'Sign in')}
              </span>
            </Link>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={isBn ? 'পণ্য বা ক্যাটাগরি অনুসন্ধান করুন...' : 'Search products or category...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F6F7F8] text-[#252525] pl-10 pr-4 py-2.5 rounded-full text-xs outline-none border border-[#EAECEF] placeholder:text-stone-400 focus:border-[#012D51] focus:bg-white"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      {/* 3. Main Category Navigation Bar */}
      <div className="bg-white border-b border-[#EAECEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-12">
          
          {/* Left: "All Category ▾" Button (Deep Navy #012D51) */}
          <div ref={categoryMenuRef} className="relative shrink-0">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#012D51] hover:bg-[#023E6E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs btn-press"
            >
              <Menu className="w-4 h-4 text-[#C78703]" />
              <span>{isBn ? 'সকল ক্যাটাগরি' : 'All Category'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/80" />
            </button>

            {/* Floating Category Menu */}
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EAECEF] py-2 z-50 animate-scale-in">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setCategoryDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-[#012D51] hover:bg-[#F6F7F8] hover:text-[#C78703] transition-colors"
                  >
                    {isBn ? cat.nameBn : cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-700">
            <Link
              href="/"
              className={`hover:text-[#012D51] transition-colors py-1 ${
                pathname === '/' ? 'text-[#012D51] font-bold border-b-2 border-[#012D51]' : ''
              }`}
            >
              {isBn ? 'হোম' : 'Home'}
            </Link>
            <Link
              href="/shop"
              className={`hover:text-[#012D51] transition-colors py-1 ${
                pathname === '/shop' ? 'text-[#012D51] font-bold border-b-2 border-[#012D51]' : ''
              }`}
            >
              {isBn ? 'সকল পণ্য' : 'Products'}
            </Link>
            <Link
              href="/category/fashion-clothing"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'পোশাক' : 'Fashion'}
            </Link>
            <Link
              href="/category/cosmetics-beauty"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'বিউটি' : 'Beauty'}
            </Link>
            <Link
              href="/category/kids-hairbands-clips"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'কিডস ক্লিপ' : 'Kids Clips'}
            </Link>
            <Link
              href="/category/scrunchies-hair-accessories"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'স্ক্রাঞ্চি' : 'Scrunchies'}
            </Link>
            <Link
              href="/category/jewellery-fashion-accessories"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'জুয়েলারি' : 'Jewellery'}
            </Link>
            <Link
              href="/about"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'আমাদের কথা' : 'About'}
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#012D51] transition-colors py-1"
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </Link>
          </nav>

          {/* Right Highlights: LIMITED SALE with Gold Accent */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold shrink-0">
            <Link
              href="/shop?filter=sale"
              className="inline-flex items-center gap-1 text-[#C78703] hover:underline"
            >
              <Flame className="w-3.5 h-3.5 fill-[#C78703]" />
              <span className="uppercase tracking-wider font-bold">
                {isBn ? 'সীমিত অফার' : 'LIMITED SALE'}
              </span>
            </Link>
            <Link
              href="/shop?sort=popularity"
              className="text-stone-600 hover:text-[#012D51] transition-colors"
            >
              {isBn ? 'বেস্ট সেলার' : 'Best Seller'}
            </Link>
            <Link
              href="/shop?sort=newest"
              className="text-stone-600 hover:text-[#012D51] transition-colors"
            >
              {isBn ? 'নিউ অ্যারাইভাল' : 'New Arrival'}
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#012D51]/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-slide-up">
            <div>
              <div className="p-4 bg-white text-[#012D51] flex items-center justify-between border-b border-[#EAECEF]">
                <div className="relative w-32 h-9">
                  <Image
                    src="/images/shokhora-official-logo.png"
                    alt="SHOKHORA"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-stone-100 text-[#012D51]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl font-bold text-xs text-[#012D51] hover:bg-[#F6F7F8]"
                >
                  {isBn ? 'সকল পণ্য' : 'All Products'}
                </Link>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-[#F6F7F8] hover:text-[#012D51]"
                  >
                    {isBn ? c.nameBn : c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#EAECEF] bg-[#F6F7F8] space-y-2">
              <Link
                href={user ? '/account' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#012D51] text-white text-xs font-bold text-center block hover:bg-[#C78703] transition-colors"
              >
                {user ? t('myAccount') : t('signIn')}
              </Link>
              <p className="text-[11px] text-center text-stone-500 font-mono">
                Hotline: 01568923850
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
