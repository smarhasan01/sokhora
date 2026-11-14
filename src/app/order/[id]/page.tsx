'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InvoiceView from '@/components/invoice/InvoiceView';
import { getOrderById, getSettings } from '@/lib/db/store';
import { Order, StoreSettings } from '@/types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  FileText,
  Clock,
  Phone,
} from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [settings, setSettings] = useState<StoreSettings>(getSettings());
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const found = getOrderById(orderId);
    if (found) {
      setOrder(found);
    }
    setSettings(getSettings());

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory-100">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-charcoal-900">Order Not Found</h2>
          <p className="text-xs text-charcoal-500">
            We could not locate an order with ID: <span className="font-mono">{orderId}</span>
          </p>
          <Link href="/shop" className="px-6 py-2.5 bg-charcoal-950 text-white rounded-full text-xs font-semibold">
            Return to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-taupe-200 shadow-sm text-center space-y-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Order Confirmed • অর্ডার কনফার্ম হয়েছে
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            Thank you, {order.customer.fullName}!
          </h1>

          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
            Your order has been recorded in our system. We are preparing your parcel with love and care.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-taupe-50 px-4 py-2.5 rounded-2xl border border-taupe-200 text-xs font-mono">
            <span>
              Order ID: <strong className="text-charcoal-900">{order.id}</strong>
            </span>
            <span>•</span>
            <span>
              Invoice: <strong className="text-charcoal-900">{order.invoiceNumber}</strong>
            </span>
            <span>•</span>
            <span className="capitalize font-sans font-semibold text-charcoal-800">
              {order.paymentMethod}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowInvoice(!showInvoice)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              {showInvoice ? 'Hide Money Receipt' : 'View / Print Money Receipt'}
            </button>

            <Link
              href={`/track-order?orderId=${order.id}&phone=${order.customer.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-taupe-300 text-charcoal-800 text-xs font-semibold hover:bg-taupe-50 transition-colors shadow-sm"
            >
              <Truck className="w-4 h-4 text-sage-600" /> Track Order Status
            </Link>
          </div>
        </div>

        {/* Manual Payment Verification Notice if applicable */}
        {(order.paymentMethod === 'bKash' || order.paymentMethod === 'Nagad') && (
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-8 flex items-start gap-3 text-xs text-amber-900">
            <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Manual Payment Verification In Progress</p>
              <p className="mt-1 leading-relaxed">
                You selected {order.paymentMethod} with Transaction ID:{' '}
                <strong className="font-mono">{order.manualPaymentDetails?.transactionId}</strong>.
                Our team will verify your transaction against our statement and update your payment status.
                For urgent verification, please WhatsApp our support at {settings.contactPhone}.
              </p>
            </div>
          </div>
        )}

        {/* Integrated Money Receipt & Invoice View */}
        {showInvoice && (
          <div className="animate-in fade-in duration-300">
            <InvoiceView order={order} settings={settings} />
          </div>
        )}

        {/* Quick Back to Shop */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-700 hover:text-charcoal-950 transition-colors"
          >
            ← Continue Shopping at SHOKHORA
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
