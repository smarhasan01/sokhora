'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getOrders, getProducts } from '@/lib/db/store';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Truck,
  FileText,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  Menu,
  X,
  Bell,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    const orders = getOrders();
    const products = getProducts();
    setPendingCount(orders.filter((o) => o.orderStatus === 'Pending').length);
    setLowStockCount(products.filter((p) => p.stock <= 5).length);
  }, [pathname]);

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, badge: pendingCount > 0 ? pendingCount : null },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'bg-amber-500' },
    { label: 'Receipts / Invoices', href: '/admin/receipts', icon: FileText },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Discount Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Delivery Charges', href: '/admin/delivery', icon: Truck },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  // If user is not admin, show secure access screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="relative w-40 h-12 mx-auto">
            <Image src="/images/Logo-01.png" alt="SHOKHORA" fill priority className="object-contain" />
          </div>

          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-serif font-bold text-charcoal-950">
              Admin Access Required
            </h1>
            <p className="text-xs text-charcoal-500">
              This area is strictly restricted to authorized administrators of SHOKHORA.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => loginAsAdmin()}
              className="w-full py-3 px-4 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-sage-400" /> Sign In as Administrator (Demo Access)
            </button>

            <Link
              href="/"
              className="block w-full py-2.5 text-xs text-charcoal-600 hover:text-charcoal-900 font-medium"
            >
              ← Back to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-taupe-50/80 flex flex-col lg:flex-row text-charcoal-900 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden bg-charcoal-950 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-charcoal-800">
        <div className="relative w-32 h-9 bg-white/10 rounded px-1.5 py-0.5">
          <Image src="/images/Logo-01.png" alt="SHOKHORA" fill className="object-contain object-left px-1" />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-charcoal-900 text-taupe-300 hover:text-white"
            title="View Store"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-charcoal-900 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-charcoal-950 text-taupe-300 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-charcoal-800`}
      >
        <div className="p-6">
          {/* Brand Logo in Admin */}
          <div className="flex items-center justify-between pb-6 border-b border-charcoal-800">
            <div className="relative w-36 h-11 bg-white/10 rounded-lg p-1.5">
              <Image src="/images/Logo-01.png" alt="SHOKHORA Admin" fill className="object-contain px-1" />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-taupe-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-2 pb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-500 px-3">
              Admin Portal
            </span>
          </div>

          {/* Nav List */}
          <nav className="space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-sage-600/30 text-white border border-sage-500/40 shadow-sm'
                      : 'hover:bg-charcoal-900 hover:text-white text-taupe-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sage-400' : 'text-taupe-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                        item.badgeColor || 'bg-rose-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-charcoal-800 bg-charcoal-900/40 space-y-3">
          <div className="flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-sage-600 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="truncate max-w-[110px]">
                <p className="font-semibold text-white truncate text-[11px]">Administrator</p>
                <p className="text-[10px] text-taupe-400 truncate">admin@shokhora.com</p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="p-1.5 rounded-lg text-taupe-400 hover:text-rose-400 hover:bg-charcoal-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-medium border border-charcoal-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sage-400" /> View Customer Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar (Desktop) */}
        <header className="hidden lg:flex items-center justify-between bg-white border-b border-taupe-200 px-8 py-4 sticky top-0 z-30 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-charcoal-950">
              SHOKHORA Management Dashboard
            </h2>
            <p className="text-xs text-charcoal-500">Live operational & inventory data</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/admin/orders"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-taupe-100 text-charcoal-700 hover:bg-taupe-200 font-medium transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-sage-600" />
              <span>{pendingCount} Pending Orders</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl font-semibold transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sage-400" /> Open Storefront
            </Link>
          </div>
        </header>

        {/* Child Pages Content */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
