'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InvoiceView from '@/components/invoice/InvoiceView';
import { getOrders, getSettings } from '@/lib/db/store';
import { Order, OrderStatus } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Phone,
  ChevronRight,
} from 'lucide-react';

const STATUS_STEPS: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId, initialPhone);
    }
  }, [initialOrderId, initialPhone]);

  const handleSearch = (oid = orderId, ph = phone) => {
    setHasSearched(true);
    const orders = getOrders();
    const cleanId = oid.trim().toUpperCase();
    const cleanPhone = ph.trim().replace(/\s+/g, '');

    const found = orders.find((o) => {
      const idMatch = o.id.toUpperCase() === cleanId || o.invoiceNumber.toUpperCase() === cleanId;
      if (cleanPhone) {
        return idMatch && o.customer.phone.replace(/\s+/g, '').includes(cleanPhone);
      }
      return idMatch;
    });

    setSearchedOrder(found || null);
  };

  const getStepIndex = (status: OrderStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-mono">
          <Link href="/" className="hover:text-[#012D51]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-medium">Track Order</span>
        </nav>

        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C78703] block mb-1 font-mono">
            Real-Time Tracking • অর্ডার ট্র্যাকিং
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
            Track Your Shokhora Order
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Enter your Order ID (e.g. SHK-2026-XXXXXX) and registered phone number to check live delivery progress.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div className="bg-[#F6F7F8] rounded-3xl p-6 sm:p-8 border border-[#EAECEF] shadow-xs mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-3"
          >
            <div className="sm:col-span-6">
              <label className="block text-[11px] font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                Order ID or Invoice No *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SHK-2026-842109"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs font-mono uppercase focus:border-[#012D51] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-[#012D51] uppercase tracking-wider mb-1 font-mono">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAECEF] bg-white text-xs font-mono focus:border-[#012D51] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#012D51] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#C78703] transition-colors flex items-center justify-center gap-1.5 shadow-xs btn-press"
              >
                <Search className="w-3.5 h-3.5" /> Track
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          searchedOrder ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Order Status Banner */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-taupe-200">
                  <div>
                    <span className="text-xs uppercase font-mono text-charcoal-500">Order ID:</span>
                    <h2 className="text-lg font-bold font-mono text-charcoal-950">{searchedOrder.id}</h2>
                    <p className="text-xs text-charcoal-500 mt-0.5">Placed on {formatDate(searchedOrder.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-charcoal-900 text-white">
                      Status: {searchedOrder.orderStatus}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        searchedOrder.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      Payment: {searchedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Status Timeline Bar */}
                {searchedOrder.orderStatus !== 'Cancelled' && searchedOrder.orderStatus !== 'Returned' ? (
                  <div className="py-4">
                    <div className="relative flex items-center justify-between">
                      {/* Connecting line */}
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-taupe-200 z-0" />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-sage-600 transition-all duration-500 z-0"
                        style={{
                          width: `${(Math.max(0, getStepIndex(searchedOrder.orderStatus)) / (STATUS_STEPS.length - 1)) * 100}%`,
                        }}
                      />

                      {STATUS_STEPS.map((st, idx) => {
                        const currentIdx = getStepIndex(searchedOrder.orderStatus);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={st} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-sage-600 text-white ring-4 ring-sage-100'
                                  : 'bg-white border-2 border-taupe-300 text-charcoal-400'
                              }`}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[10px] sm:text-xs mt-2 font-medium text-center ${
                                isCurrent ? 'text-charcoal-950 font-bold' : 'text-charcoal-500'
                              }`}
                            >
                              {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50 text-rose-900 rounded-xl text-xs flex items-center gap-2 border border-rose-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                    <span>This order has been marked as <strong>{searchedOrder.orderStatus}</strong>.</span>
                  </div>
                )}

                {/* Delivery & Items Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-taupe-200 text-xs text-charcoal-700">
                  <div>
                    <h3 className="font-bold text-charcoal-900 uppercase tracking-wider mb-2">Delivery Address</h3>
                    <p className="font-semibold text-charcoal-950">{searchedOrder.customer.fullName}</p>
                    <p className="text-charcoal-600 mt-0.5">{searchedOrder.customer.phone}</p>
                    <p className="text-charcoal-600 mt-0.5">
                      {searchedOrder.customer.address}, {searchedOrder.customer.area}, {searchedOrder.customer.district}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-charcoal-900 uppercase tracking-wider mb-2">Payment Summary</h3>
                    <p className="flex justify-between py-1 border-b border-taupe-100">
                      <span>Method:</span>
                      <strong className="text-charcoal-950">{searchedOrder.paymentMethod}</strong>
                    </p>
                    <p className="flex justify-between py-1 border-b border-taupe-100">
                      <span>Total Amount:</span>
                      <strong className="font-mono text-charcoal-950">{formatPrice(searchedOrder.total)}</strong>
                    </p>
                    <p className="flex justify-between py-1 text-emerald-800">
                      <span>Paid:</span>
                      <strong className="font-mono">{formatPrice(searchedOrder.paidAmount)}</strong>
                    </p>
                    <p className="flex justify-between py-1 text-rose-800 font-semibold">
                      <span>Due Amount:</span>
                      <strong className="font-mono">{formatPrice(searchedOrder.dueAmount)}</strong>
                    </p>
                  </div>
                </div>

                {/* Receipt Trigger */}
                <div className="pt-4 border-t border-taupe-200 flex justify-between items-center">
                  <button
                    onClick={() => setShowInvoice(!showInvoice)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-900 hover:text-charcoal-700 underline"
                  >
                    <FileText className="w-4 h-4" />
                    {showInvoice ? 'Hide Printable Receipt' : 'View Official Money Receipt'}
                  </button>

                  <a
                    href="tel:+8801712345678"
                    className="inline-flex items-center gap-1 text-xs text-sage-700 hover:text-sage-900 font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" /> Helpline: +880 1712-345678
                  </a>
                </div>
              </div>

              {showInvoice && (
                <InvoiceView order={searchedOrder} settings={getSettings()} />
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-taupe-200 shadow-sm space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="font-bold text-charcoal-900 text-sm">No Order Found</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Please verify your Order ID and phone number. If you just placed an order, please allow
                a few minutes for our records to synchronize.
              </p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory-100 flex items-center justify-center">Loading tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
