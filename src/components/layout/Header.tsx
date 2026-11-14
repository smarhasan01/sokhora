'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { getProducts } from '@/lib/db/store';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Truck,
  Phone,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Fashion & Clothing', nameBn: 'পোশাক', slug: 'fashion-clothing' },
  { name: 'Cosmetics & Beauty', nameBn: 'প্রসাধনী', slug: 'cosmetics-beauty' },
  { name: 'Kids Hair Clips', nameBn: 'কিডস হেয়ার ক্লিপ', slug: 'kids-hairbands-clips' },
  { name: 'Scrunchies & Hair', nameBn: 'স্ক্রাঞ্চি', slug: 'scrunchies-hair-accessories' },
  { name: 'Jewellery', nameBn: 'জুয়েলারি', slug: 'jewellery-fashion-accessories' },
  { name: 'Gifts & Lifestyle', nameBn: 'উপহার', slug: 'gifts-lifestyle' },
  { name: 'Everyday Products', nameBn: 'নিত্যপণ্য', slug: 'other-everyday' },
];

export default function Header() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Load products for live instant search suggestions
  useEffect(() => {
    setAllProducts(getProducts());
  }, []);

  // Update suggestions dynamically as user types
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length >= 2) {
      const matches = allProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.nameBn && p.nameBn.includes(q)) ||
            p.category.toLowerCase().includes(q) ||
            p.tags?.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  // Click outside to close suggestion dropdown
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
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-taupe-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      {/* 1. Slim Announcement Bar */}
      <div className="bg-charcoal-950 text-ivory-100 text-xs py-2 px-4 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 tracking-wide font-normal">
            <Truck className="w-3.5 h-3.5 text-sage-400 shrink-0" />
            <span className="hidden sm:inline">
              Delivery across Bangladesh &bull; FREE home delivery on orders over ৳2,000 &bull; Use code:{' '}
              <span className="font-bold text-amber-300 tracking-wider">SHOKHORA10</span> for 10% off
            </span>
            <span className="sm:hidden font-medium text-[11px]">
              Free delivery over ৳2,000 | Code: <strong className="text-amber-300">SHOKHORA10</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-taupe-300 text-[11px] font-medium">
            <Link
              href="/track-order"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Track Order
            </Link>
            <span className="hidden md:inline text-charcoal-700">|</span>
            <a
              href="tel:+8801712345678"
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-sage-400" />
              <span>01712-345678</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Storefront Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 rounded-xl text-charcoal-800 hover:bg-taupe-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Original SHOKHORA Logo (Never recolored, distorted, or modified) */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="relative w-36 sm:w-44 h-12 sm:h-14">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA (শখোরা)"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Prominent Live Search Bar with Suggestions (Desktop) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-lg relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search silk scrunchies, linen kurti, jewellery, hair clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                className="w-full bg-ivory-100 border border-taupe-300 text-charcoal-900 rounded-full py-2.5 pl-4 pr-11 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-900 focus:bg-white transition-all placeholder:text-charcoal-400"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-taupe-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-taupe-100 bg-ivory-50 flex items-center justify-between text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider">
                  <span>Product Suggestions</span>
                  <span>{suggestions.length} results</span>
                </div>
                <div className="divide-y divide-taupe-100 max-h-80 overflow-y-auto">
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug}`}
                      onClick={() => setShowSuggestions(false)}
                      className="p-3 flex items-center gap-3 hover:bg-ivory-100 transition-colors group"
                    >
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-ivory-200 shrink-0 border border-taupe-200">
                        <Image
                          src={item.images[0] || '/images/Logo-01.png'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-charcoal-400 capitalize">
                          {item.category.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-xs text-charcoal-900">
                          {formatPrice(item.discountPrice ?? item.regularPrice)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-2 bg-ivory-50 border-t border-taupe-100 text-center">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-medium text-charcoal-700 hover:text-charcoal-950 flex items-center justify-center gap-1 w-full py-1"
                  >
                    <span>View all matching products for &ldquo;{searchQuery}&rdquo;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Customer Account, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Customer Account Button (Customer Only) */}
            <Link
              href={user ? '/account' : '/login'}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full hover:bg-taupe-100 text-charcoal-800 transition-colors"
              title={user ? `Signed in as ${user.displayName}` : 'Customer Login / Register'}
            >
              <User className="w-5 h-5 text-charcoal-800" />
              <span className="hidden xl:inline text-xs font-medium">
                {user ? user.displayName?.split(' ')[0] || 'My Account' : 'Sign In'}
              </span>
            </Link>

            {/* Wishlist Button with Badge */}
            <Link
              href="/shop"
              className="relative p-2.5 rounded-full hover:bg-taupe-100 text-charcoal-800 transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-white transition-all shadow-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-xs font-medium tracking-wide">Bag</span>
              {itemCount > 0 && (
                <span className="bg-amber-400 text-charcoal-950 text-[11px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Simple Category Navigation Bar with Dropdown (Desktop) */}
        <nav className="hidden md:flex items-center justify-between border-t border-taupe-200/70 py-2.5 text-xs font-medium text-charcoal-700">
          <div className="flex items-center gap-6 lg:gap-7 overflow-x-auto no-scrollbar">
            <Link
              href="/shop"
              className="hover:text-charcoal-950 font-bold transition-colors whitespace-nowrap text-charcoal-900"
            >
              All Products
            </Link>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="hover:text-charcoal-950 transition-colors whitespace-nowrap text-charcoal-700 hover:font-semibold"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5 text-taupe-600 shrink-0 pl-4 border-l border-taupe-200">
            <Link href="/about" className="hover:text-charcoal-900 transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-charcoal-900 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>

      {/* 4. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[112px] z-50 bg-white/98 backdrop-blur-md p-5 overflow-y-auto border-t border-taupe-200 animate-in fade-in duration-200 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products in Bangladesh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ivory-100 border border-taupe-300 rounded-xl py-2.5 pl-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-charcoal-700"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Categories */}
            <div>
              <p className="text-[11px] uppercase font-bold tracking-wider text-charcoal-400 mb-2">
                Shop By Category
              </p>
              <div className="divide-y divide-taupe-100">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold text-charcoal-900"
                >
                  View All Products
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-sm text-charcoal-700 hover:text-charcoal-950"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs font-bengali text-taupe-500">{cat.nameBn}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Care Links */}
            <div>
              <p className="text-[11px] uppercase font-bold tracking-wider text-charcoal-400 mb-2">
                Customer Care
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-charcoal-600">
                <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  Track Order
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  Contact Us
                </Link>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  FAQ
                </Link>
                <Link href="/delivery-policy" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  Delivery Policy
                </Link>
                <Link href="/return-refund-policy" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  Return Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Account Footer in Mobile Menu */}
          <div className="pt-6 mt-6 border-t border-taupe-200">
            <Link
              href={user ? '/account' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-900 text-white text-sm font-medium shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>{user ? 'My Customer Account' : 'Customer Sign In / Register'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
