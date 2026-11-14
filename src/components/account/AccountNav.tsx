'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  MapPin,
  Heart,
} from 'lucide-react';

export default function AccountNav() {
  const pathname = usePathname();
  const { isBn, t, formatNumber } = useLanguage();
  const { wishlistCount } = useWishlist();

  const links = [
    {
      href: '/account',
      label: isBn ? 'ওভারভিউ' : 'Overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/account/orders',
      label: isBn ? 'অর্ডারের ইতিহাস' : 'Order History',
      icon: ShoppingBag,
      exact: false,
    },
    {
      href: '/account/profile',
      label: isBn ? 'প্রোফাইল সেটিংস' : 'Profile Settings',
      icon: User,
      exact: false,
    },
    {
      href: '/account/addresses',
      label: isBn ? 'সংরক্ষিত ঠিকানা' : 'Saved Addresses',
      icon: MapPin,
      exact: false,
    },
    {
      href: '/account/wishlist',
      label: isBn ? `পছন্দের তালিকা (${formatNumber(wishlistCount)})` : `Wishlist (${wishlistCount})`,
      icon: Heart,
      exact: false,
    },
  ];

  return (
    <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 border-b border-taupe-200">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(link.href + '/');

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-charcoal-900 text-white shadow-sm'
                : 'bg-white border border-taupe-200 text-charcoal-700 hover:bg-taupe-100 hover:text-charcoal-950'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
