'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InvoiceView from '@/components/invoice/InvoiceView';
import { getOrderById, updateOrderStatus, updatePaymentStatus, getSettings } from '@/lib/db/store';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Printer,
  FileText,
  Truck,
  AlertTriangle,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  Save,
} from 'lucide-react';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>('Pending');
  const [statusNote, setStatusNote] = useState('');
  const [paymentStatus, setPaymentStatusState] = useState<PaymentStatus>('Unpaid');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [verificationNote, setVerificationNote] = useState('');
  const [verifiedTrxId, setVerifiedTrxId] = useState('');
  const [showInvoiceTab, setShowInvoiceTab] = useState(false);

  const loadOrder = () => {
    const o = getOrderById(id);
    if (o) {
      setOrder(o);
      setStatus(o.orderStatus);
      setPaymentStatusState(o.paymentStatus);
      setPaidAmount(o.paidAmount || 0);
      setVerifiedTrxId(o.manualPaymentDetails?.transactionId || '');
      setVerificationNote(o.manualPaymentDetails?.paymentNote || '');
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-charcoal-900">Order Not Found</h2>
        <Link href="/admin/orders" className="text-xs text-charcoal-600 underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.id, status, statusNote.trim() || undefined, 'Admin');
    setStatusNote('');
    loadOrder();
  };

  const handleVerifyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaymentStatus(order.id, paymentStatus, Number(paidAmount), {
      transactionId: verifiedTrxId.trim(),
      note: verificationNote.trim() || 'Verified by Admin against gateway/statement',
      verifiedBy: 'Admin Authorized Officer',
    });
    loadOrder();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-taupe-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 rounded-xl border border-taupe-200 bg-white hover:bg-taupe-100 text-charcoal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-charcoal-950 font-mono">
                Order {order.id}
              </h1>
              <span className="text-xs font-mono text-charcoal-500">({order.invoiceNumber})</span>
            </div>
            <p className="text-xs text-charcoal-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>

        <button
          onClick={() => setShowInvoiceTab(!showInvoiceTab)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal-900 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-charcoal-800 transition-colors"
        >
          <FileText className="w-4 h-4" />
          {showInvoiceTab ? 'Hide Money Receipt' : 'View / Print Money Receipt'}
        </button>
      </div>

      {/* Printable Invoice View if toggled */}
      {showInvoiceTab && (
        <div className="bg-white p-6 rounded-3xl border border-taupe-200 shadow-lg animate-in fade-in duration-300">
          <InvoiceView order={order} settings={getSettings()} />
        </div>
      )}

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Items & Customer (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Items Card */}
          <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Ordered Items ({order.items.length})
            </h2>

            <div className="divide-y divide-taupe-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-taupe-100 border border-taupe-200 flex-shrink-0">
                      <Image
                        src={item.image || '/images/shokhora-official-logo.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-900">{item.name}</p>
                      <p className="text-[11px] text-charcoal-500 font-mono">
                        SKU: {item.sku}
                        {item.selectedColor ? ` | Color: ${item.selectedColor}` : ''}
                        {item.selectedSize ? ` | Size: ${item.selectedSize}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-charcoal-600">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                    <p className="font-mono font-bold text-charcoal-950">
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-taupe-200 space-y-1.5 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.couponCode})</span>
                  <span className="font-mono font-medium">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-mono font-medium">
                  {order.deliveryCharge === 0 ? 'FREE' : formatPrice(order.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-charcoal-950 text-sm pt-2 border-t border-taupe-200">
                <span>Grand Total</span>
                <span className="font-mono text-base">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold pt-1">
                <span>Verified Paid</span>
                <span className="font-mono">{formatPrice(order.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-rose-800 font-semibold">
                <span>Outstanding Due</span>
                <span className="font-mono">{formatPrice(order.dueAmount)}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100 flex items-center gap-2">
              <User className="w-4 h-4 text-sage-600" />
              Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-700">
              <div>
                <p className="font-semibold text-charcoal-950 text-sm">{order.customer.fullName}</p>
                <a
                  href={`tel:${order.customer.phone}`}
                  className="font-mono text-sage-700 hover:underline flex items-center gap-1 mt-1 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" /> {order.customer.phone}
                </a>
                {order.customer.email && (
                  <p className="text-charcoal-500 mt-1">{order.customer.email}</p>
                )}
              </div>

              <div>
                <p className="font-semibold text-charcoal-900">Delivery Address:</p>
                <p className="text-charcoal-600 mt-0.5 leading-relaxed">
                  {order.customer.address}, {order.customer.area}, {order.customer.district}
                </p>
                {order.customer.notes && (
                  <p className="text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 border border-amber-200">
                    <strong>Note:</strong> {order.customer.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Status Timeline History */}
          <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Order Timeline & Audit Log
            </h2>

            <div className="space-y-3">
              {order.statusHistory.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-taupe-100 text-charcoal-700 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-charcoal-900">{h.status}</span>
                      <span className="text-[10px] text-charcoal-400 font-mono">
                        {formatDate(h.timestamp)}
                      </span>
                    </div>
                    {h.note && <p className="text-charcoal-600 text-[11px] mt-0.5">{h.note}</p>}
                    {h.updatedBy && (
                      <p className="text-taupe-500 text-[10px]">by {h.updatedBy}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions, Status & Verification (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Status Controller */}
          <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Update Order Status
            </h2>

            <form onSubmit={handleUpdateStatus} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-semibold text-xs bg-white focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled (Restocks stock)</option>
                  <option value="Returned">Returned (Restocks stock)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Admin Audit Note</label>
                <input
                  type="text"
                  placeholder="e.g. Courier tracking Steadfast #4928"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-charcoal-950 hover:bg-charcoal-900 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save Status
              </button>
            </form>
          </div>

          {/* Payment Verification Controller */}
          <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              Payment Verification
            </h2>

            <div className="bg-taupe-50 p-3 rounded-xl border border-taupe-200 text-xs space-y-1">
              <p>
                <span className="font-semibold text-charcoal-700">Method:</span>{' '}
                <strong className="text-charcoal-950">{order.paymentMethod}</strong>
              </p>
              {order.manualPaymentDetails?.senderNumber && (
                <p>
                  <span className="font-semibold text-charcoal-700">Sender Number:</span>{' '}
                  <span className="font-mono font-bold text-charcoal-950">
                    {order.manualPaymentDetails.senderNumber}
                  </span>
                </p>
              )}
              {order.manualPaymentDetails?.transactionId && (
                <p>
                  <span className="font-semibold text-charcoal-700">Customer TrxID:</span>{' '}
                  <span className="font-mono font-bold text-pink-700">
                    {order.manualPaymentDetails.transactionId}
                  </span>
                </p>
              )}
            </div>

            <form onSubmit={handleVerifyPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => {
                    const ps = e.target.value as PaymentStatus;
                    setPaymentStatusState(ps);
                    if (ps === 'Paid') setPaidAmount(order.total);
                    if (ps === 'Unpaid') setPaidAmount(0);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-semibold text-xs bg-white focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Paid">Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Verified Paid Amount (৳ BDT)</label>
                <input
                  type="number"
                  min={0}
                  max={order.total}
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Confirmed TrxID</label>
                <input
                  type="text"
                  placeholder="e.g. BK9A72X8KL"
                  value={verifiedTrxId}
                  onChange={(e) => setVerifiedTrxId(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono text-xs uppercase focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Verification Note</label>
                <input
                  type="text"
                  placeholder="Verified from bKash / Nagad statement"
                  value={verificationNote}
                  onChange={(e) => setVerificationNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Save Verification
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
