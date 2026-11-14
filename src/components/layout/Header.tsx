'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Shield,
  Truck,
  Phone,
  ChevronDown,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Fashion & Clothing', slug: 'fashion-clothing' },
  { name: 'Cosmetics & Beauty', slug: 'cosmetics-beauty' },
  { name: 'Kids Hair Clips', slug: 'kids-hairbands-clips' },
  { name: 'Scrunchies & Hair', slug: 'scrunchies-hair-accessories' },
  { name: 'Jewellery', slug: 'jewellery-fashion-accessories' },
  { name: 'Gifts & Lifestyle', slug: 'gifts-lifestyle' },
  { name: 'Everyday Products', slug: 'other-everyday' },
];

export default function Header() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-taupe-200 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-charcoal-900 text-ivory-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-sage-400" />
            <span className="hidden sm:inline">
              Delivery all over Bangladesh | Free shipping over ৳2,000 | Use code:{' '}
              <span className="font-semibold text-white tracking-wider">SHOKHORA10</span>
            </span>
            <span className="sm:hidden font-medium">Free shipping over ৳2,000</span>
          </div>

          <div className="flex items-center gap-4 text-taupe-300">
            <Link
              href="/track-order"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Track Order
            </Link>
            <span className="hidden md:inline">|</span>
            <a
              href="tel:+8801712345678"
              className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" /> +880 1712-345678
            </a>
            {isAdmin && (
              <>
                <span>|</span>
                <Link
                  href="/admin"
                  className="bg-sage-600 hover:bg-sage-700 text-white px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Shield className="w-3 h-3" /> Admin Panel
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal-700 hover:bg-taupe-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Preserving original branding) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
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

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-6 relative"
          >
            <input
              type="text"
              placeholder="Search silk scrunchies, kurti, jewellery, hair clips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-taupe-50 border border-taupe-300 text-charcoal-900 rounded-full py-2.5 pl-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-800 focus:bg-white transition-all placeholder:text-charcoal-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Account Link */}
            <Link
              href={user ? (isAdmin ? '/admin' : '/account') : '/login'}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-taupe-100 text-charcoal-800 transition-colors"
              title={user ? user.displayName || 'My Account' : 'Login / Register'}
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-xs font-medium">
                {user ? user.displayName?.split(' ')[0] : 'Sign In'}
              </span>
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-taupe-100 hover:bg-taupe-200 text-charcoal-900 transition-colors flex items-center justify-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-charcoal-900" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-charcoal-950 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center justify-between border-t border-taupe-200/80 py-2.5 text-xs font-medium text-charcoal-700">
          <div className="flex items-center gap-6">
            <Link href="/shop" className="hover:text-charcoal-950 font-semibold transition-colors">
              All Products
            </Link>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="hover:text-charcoal-950 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-taupe-600">
            <Link href="/about" className="hover:text-charcoal-900 transition-colors">
              Our Story
            </Link>
            <Link href="/contact" className="hover:text-charcoal-900 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[116px] z-50 bg-white/95 backdrop-blur-md p-6 overflow-y-auto border-t border-taupe-200 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-taupe-50 border border-taupe-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-800"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-600"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-xs uppercase font-bold tracking-wider text-charcoal-400">
              Categories
            </p>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-charcoal-900 border-b border-taupe-100"
            >
              Shop All Products
            </Link>

            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-charcoal-700 hover:text-charcoal-950 border-b border-taupe-100"
              >
                {cat.name}
              </Link>
            ))}

            <p className="text-xs uppercase font-bold tracking-wider text-charcoal-400 pt-4">
              Help & Information
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-charcoal-600">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                Track Order
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                About Shokhora
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                FAQ
              </Link>
              <Link
                href="/delivery-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                Delivery Policy
              </Link>
              <Link
                href="/return-refund-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-charcoal-900"
              >
                Return Policy
              </Link>
            </div>

            <div className="pt-6 border-t border-taupe-200">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-charcoal-900 text-white text-sm font-medium"
              >
                <Shield className="w-4 h-4" /> Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
