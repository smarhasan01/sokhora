'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  FileText,
  Truck,
  ChevronRight,
  PackageOpen,
  ArrowRight,
} from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const allOrders = getOrders();
  const orders = user
    ? allOrders.filter(
        (o) =>
          o.userId === user.uid ||
          (user.email && o.customer.email?.toLowerCase() === user.email.toLowerCase()) ||
          (user.phone && o.customer.phone === user.phone) ||
          allOrders.indexOf(o) < 4
      )
    : allOrders.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-mono">
          <Link href="/" className="hover:text-[#012D51]">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/account" className="hover:text-[#012D51]">{t('myAccount')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-semibold">{t('orderHistory')}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight mb-6">
          {t('orderHistory')}
        </h1>

        <AccountNav />

        {/* Invoice Modal Overlay */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-3xl my-8">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white text-charcoal-900 shadow-lg hover:bg-taupe-100 text-xs font-bold"
              >
                ✕ Close
              </button>
              <InvoiceView order={selectedOrder} />
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-taupe-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h2 className="text-base font-semibold text-charcoal-900">{t('noOrdersYet')}</h2>
            <p className="text-xs text-charcoal-500">
              {isBn ? 'আপনার কোনো সক্রিয় অর্ডার নেই।' : 'You have not placed any orders yet.'}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800"
            >
              <span>{t('shopNow')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-taupe-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-charcoal-950">{order.id}</span>
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
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
                      {isBn ? 'অর্ডারের তারিখ:' : 'Placed on:'} {formatDate(order.createdAt)} • {isBn ? 'পদ্ধতি:' : 'Payment:'} {order.paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-charcoal-950">
                      {formatPrice(order.total)}
                    </span>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-taupe-300 text-xs font-semibold text-charcoal-700 hover:bg-taupe-50"
                    >
                      <FileText className="w-3.5 h-3.5 text-sage-600" />
                      <span>{isBn ? 'রিসিট' : 'Receipt'}</span>
                    </button>
                    <Link
                      href={`/order/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800"
                    >
                      <span>{isBn ? 'ট্র্যাকিং' : 'Track'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-taupe-100">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-taupe-100 border border-taupe-200 shrink-0">
                          <Image src={it.image} alt={it.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal-900">{it.name}</p>
                          <p className="text-[11px] text-charcoal-400">
                            {formatPrice(it.price)} × {formatNumber(it.quantity)}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-charcoal-900">
                        {formatPrice(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-taupe-600 border-t border-taupe-100">
                  <span>
                    {isBn ? 'ডেলিভারি ঠিকানা:' : 'Delivery Address:'} {order.customer.address}, {order.customer.area}, {order.customer.district}
                  </span>
                  <span className="font-mono text-charcoal-500">{order.customer.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
