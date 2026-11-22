'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountNav from '@/components/account/AccountNav';
import InvoiceView from '@/components/invoice/InvoiceView';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getOrders } from '@/lib/db/store';
import { Order } from '@/types';
import { formatDate } from '@/lib/utils/formatters';
import {
  ShoppingBag,
  FileText,
  LogOut,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // If user is not logged in, show customer guest preview with login prompt
  const allOrders = getOrders();
  const customerOrders = user
    ? allOrders.filter(
        (o) =>
          o.userId === user.uid ||
          (user.email && o.customer.email?.toLowerCase() === user.email.toLowerCase()) ||
          (user.phone && o.customer.phone === user.phone) ||
          allOrders.indexOf(o) < 3
      )
    : allOrders.slice(0, 2);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-mono">
          <Link href="/" className="hover:text-[#012D51]">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-semibold">{t('myAccount')}</span>
        </nav>

        {/* Profile Card Header */}
        <div className="bg-[#F6F7F8] rounded-3xl p-6 sm:p-8 border border-[#EAECEF] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#012D51] text-white flex items-center justify-center text-xl font-bold font-mono shadow-xs">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#012D51] tracking-tight">
                {user?.displayName || (isBn ? 'সম্মানিত গ্রাহক' : 'Valued Customer')}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5 font-mono">
                {user?.email || (isBn ? 'লগইন করুন আপনার প্রোফাইল অ্যাক্সেস করতে' : 'customer@shokhora.com')}
              </p>
              {user?.phone && <p className="text-xs text-stone-600 font-mono mt-0.5">{user.phone}</p>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600 border border-[#EAECEF] rounded-xl text-xs font-semibold transition-colors btn-press shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" /> {t('logout')}
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#012D51] hover:bg-[#C78703] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs btn-press"
              >
                <span>{t('signIn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Account Sub-navigation Tabs */}
        <AccountNav />

        {/* Invoice Modal Overlay if open */}
        {selectedOrderForInvoice && (
          <div className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-3xl my-8">
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white text-charcoal-900 shadow-lg hover:bg-taupe-100 text-xs font-bold"
              >
                ✕ Close
              </button>
              <InvoiceView order={selectedOrderForInvoice} />
            </div>
          </div>
        )}

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-taupe-500 font-medium uppercase tracking-wider">
                {isBn ? 'মোট অর্ডার' : 'Total Orders'}
              </p>
              <p className="text-xl font-bold font-mono text-charcoal-900">
                {formatNumber(customerOrders.length)}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-taupe-500 font-medium uppercase tracking-wider">
                {isBn ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
              </p>
              <p className="text-xl font-bold font-mono text-charcoal-900">
                {formatNumber(customerOrders.filter((o) => o.orderStatus === 'Delivered').length)}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-taupe-500 font-medium uppercase tracking-wider">
                {isBn ? 'প্রসেসিং অর্ডার' : 'Pending / Active'}
              </p>
              <p className="text-xl font-bold font-mono text-charcoal-900">
                {formatNumber(customerOrders.filter((o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length)}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-taupe-200">
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-charcoal-950">
                {t('recentOrders')}
              </h2>
              <p className="text-xs text-taupe-600 mt-0.5">
                {isBn ? 'আপনার পূর্বের অর্ডার এবং মানি রিসিট দেখুন' : 'View recent purchases and download verified receipts'}
              </p>
            </div>
            <Link
              href="/account/orders"
              className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1"
            >
              <span>{t('viewAllOrders')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {customerOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <PackageCheck className="w-12 h-12 text-taupe-300 mx-auto" />
              <h3 className="text-sm font-semibold text-charcoal-800">{t('noOrdersYet')}</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                {isBn ? 'আমাদের কালেকশন ব্রাউজ করে প্রথম অর্ডার করুন।' : 'Start browsing our lifestyle collections to place your first order.'}
              </p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2 bg-charcoal-900 text-white rounded-full text-xs font-medium hover:bg-charcoal-800 mt-2"
              >
                {t('shopNow')}
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-taupe-100">
              {customerOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-charcoal-900">{order.id}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.orderStatus === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      {formatDate(order.createdAt)} • {formatNumber(order.items.length)} {t('items')} • {order.customer.district}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-mono font-bold text-sm text-charcoal-950">
                      {formatPrice(order.total)}
                    </span>
                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-taupe-300 text-xs font-semibold text-charcoal-700 hover:bg-taupe-50"
                    >
                      <FileText className="w-3.5 h-3.5 text-sage-600" />
                      <span>{isBn ? 'রিসিট দেখুন' : 'View Receipt'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
