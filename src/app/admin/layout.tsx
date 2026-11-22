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
  Shield,
  ShieldCheck,
  AlertTriangle,
  Menu,
  X,
  UserCheck,
  Lock,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, isAdmin, isOwner, adminLogout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  // If on admin login page, bypass dashboard shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      const orders = getOrders();
      const products = getProducts();
      setPendingCount(orders.filter((o) => o.orderStatus === 'Pending').length);
      setLowStockCount(products.filter((p) => p.stock <= 5).length);
    }
  }, [pathname, isLoginPage]);

  // If on /admin/login, render standalone
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If user is not an authorized active admin, deny access immediately
  if (!isAdmin || !adminUser) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="relative w-40 h-12 mx-auto bg-white/5 rounded-xl p-2 border border-white/10">
            <Image src="/images/shokhora-official-logo.png" alt="SHOKHORA" fill priority className="object-contain" />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-serif font-bold text-white">
              Private Admin Portal
            </h1>
            <p className="text-xs text-taupe-400 leading-relaxed max-w-xs mx-auto">
              Access is strictly restricted to verified SHOKHORA store administrators with explicitly assigned permissions.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/admin/login"
              className="w-full py-3 px-4 rounded-xl bg-sage-600 hover:bg-sage-500 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-white" /> Go to Private Admin Sign In
            </Link>

            <Link
              href="/"
              className="block w-full py-2.5 text-xs text-taupe-400 hover:text-white font-medium transition-colors"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, badge: pendingCount > 0 ? pendingCount : null },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'bg-amber-500' },
    { label: 'Receipts & Invoices', href: '/admin/receipts', icon: FileText },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Discount Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Delivery Charges', href: '/admin/delivery', icon: Truck },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await adminLogout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-taupe-50/80 flex flex-col lg:flex-row text-charcoal-900 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden bg-charcoal-950 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-charcoal-800">
        <div className="relative w-32 h-9 bg-white/10 rounded px-1.5 py-0.5">
          <Image src="/images/shokhora-official-logo.png" alt="SHOKHORA" fill className="object-contain object-left px-1" />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-charcoal-900 text-taupe-300 hover:text-white"
            title="View Live Store"
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
              <Image src="/images/shokhora-official-logo.png" alt="SHOKHORA Admin" fill className="object-contain px-1" />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-taupe-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Authenticated Staff Badge */}
          <div className="py-4 border-b border-charcoal-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-sage-400 font-bold text-sm shrink-0">
              {adminUser.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{adminUser.fullName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    adminUser.role === 'owner'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-sage-900/60 text-sage-300 border border-sage-700/40'
                  }`}
                >
                  {adminUser.role === 'owner' ? 'Store Owner' : 'Staff Admin'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-sage-600 text-white font-semibold shadow-sm'
                      : 'text-taupe-300 hover:bg-charcoal-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white ${
                        item.badgeColor || 'bg-rose-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Owner-Only Team Management Link */}
            {isOwner && (
              <Link
                href="/admin/team"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  pathname === '/admin/team'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-amber-300 hover:bg-charcoal-900 hover:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Team & Permissions</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                  Owner
                </span>
              </Link>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-charcoal-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-taupe-300 text-xs font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sage-400" /> View Storefront
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-300 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Secure Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
