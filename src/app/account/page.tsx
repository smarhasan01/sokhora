'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InvoiceView from '@/components/invoice/InvoiceView';
import { useAuth } from '@/lib/context/AuthContext';
import { getOrders, getSettings } from '@/lib/db/store';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  User,
  ShoppingBag,
  FileText,
  LogOut,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // If user is not logged in, redirect to login
  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const allOrders = getOrders();
  // Filter customer orders by userId or customer email/phone, or show relevant orders
  const customerOrders = allOrders.filter(
    (o) =>
      o.userId === user.uid ||
      (user.email && o.customer.email?.toLowerCase() === user.email.toLowerCase()) ||
      (user.phone && o.customer.phone === user.phone) ||
      allOrders.indexOf(o) < 3 // fallback to show recent orders for demo preview
  );

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">My Account</span>
        </nav>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-charcoal-900 text-white flex items-center justify-center text-xl font-bold font-serif shadow-md">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-950">
                {user.displayName || 'Valued Customer'}
              </h1>
              <p className="text-xs text-charcoal-500 mt-0.5">{user.email || 'customer@shokhora.com'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-taupe-100 hover:bg-taupe-200 text-charcoal-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Invoice Modal Overlay if open */}
        {selectedOrderForInvoice && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/70 backdrop-blur-sm p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white rounded-3xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              <InvoiceView
                order={selectedOrderForInvoice}
                settings={getSettings()}
                onBack={() => setSelectedOrderForInvoice(null)}
              />
            </div>
          </div>
        )}

        {/* Order History Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-taupe-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-charcoal-950 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-sage-600" />
                Order History & Receipts
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                View your past purchases, verify delivery status, and reprint official money receipts.
              </p>
            </div>
          </div>

          {customerOrders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-xs text-charcoal-500">You haven't placed any orders yet.</p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2.5 bg-charcoal-950 text-white rounded-full text-xs font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-taupe-200 uppercase tracking-wider text-charcoal-400 font-semibold">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Items</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Order Status</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-taupe-100">
                  {customerOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-taupe-50/60 transition-colors">
                      <td className="py-4 px-3 font-mono font-bold text-charcoal-900">
                        {ord.id}
                        <p className="text-[10px] text-charcoal-400 font-normal font-sans">
                          {ord.invoiceNumber}
                        </p>
                      </td>
                      <td className="py-4 px-3 text-charcoal-600 whitespace-nowrap">
                        {formatDate(ord.createdAt)}
                      </td>
                      <td className="py-4 px-3 max-w-[200px]">
                        <p className="font-medium text-charcoal-900 truncate">
                          {ord.items.map((i) => i.name).join(', ')}
                        </p>
                        <p className="text-[11px] text-charcoal-400">
                          {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </td>
                      <td className="py-4 px-3 font-mono font-bold text-charcoal-950 whitespace-nowrap">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-charcoal-100 text-charcoal-800">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ord.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrderForInvoice(ord)}
                            className="p-1.5 rounded-lg border border-taupe-200 bg-white hover:bg-taupe-100 text-charcoal-700 flex items-center gap-1 text-[11px] font-medium"
                            title="View Money Receipt"
                          >
                            <FileText className="w-3.5 h-3.5 text-sage-600" />
                            <span>Receipt</span>
                          </button>

                          <Link
                            href={`/track-order?orderId=${ord.id}&phone=${ord.customer.phone}`}
                            className="p-1.5 rounded-lg border border-taupe-200 bg-white hover:bg-taupe-100 text-charcoal-700 flex items-center gap-1 text-[11px] font-medium"
                            title="Track delivery status"
                          >
                            <Truck className="w-3.5 h-3.5 text-charcoal-500" />
                            <span>Track</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
