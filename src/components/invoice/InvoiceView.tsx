'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Order, StoreSettings } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import { Printer, Download, ArrowLeft, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface InvoiceViewProps {
  order: Order;
  settings: StoreSettings;
  onBack?: () => void;
  showActions?: boolean;
}

export default function InvoiceView({ order, settings, onBack, showActions = true }: InvoiceViewProps) {
  const [layoutMode, setLayoutMode] = useState<'a4' | 'slip'>('a4');
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" /> PAID (পরিশোধিত)
          </span>
        );
      case 'Partially Paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" /> PARTIALLY PAID (আংশিক পরিশোধ)
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
            <AlertTriangle className="w-3.5 h-3.5" /> REFUNDED (ফেরতকৃত)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-3.5 h-3.5" /> UNPAID (অপরিশোধিত - COD)
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 px-4">
      {/* Top Action Bar (hidden on print) */}
      {showActions && (
        <div className="no-print bg-white p-4 rounded-xl shadow-sm border border-taupe-200 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-taupe-100 text-charcoal-700 transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="font-semibold text-charcoal-900">
                Invoice #{order.invoiceNumber}
              </h2>
              <p className="text-xs text-charcoal-500">Order ID: {order.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Layout switch */}
            <div className="flex rounded-lg border border-taupe-200 p-0.5 bg-taupe-50 text-xs">
              <button
                type="button"
                onClick={() => setLayoutMode('a4')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  layoutMode === 'a4'
                    ? 'bg-white text-charcoal-900 shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                Standard A4
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('slip')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  layoutMode === 'slip'
                    ? 'bg-white text-charcoal-900 shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                Thermal Slip
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>
        </div>
      )}

      {/* A4 Invoice Layout */}
      {layoutMode === 'a4' ? (
        <div
          ref={invoiceRef}
          className="print-container bg-white rounded-2xl shadow-sm border border-taupe-200 p-8 md:p-12 text-charcoal-900"
          style={{ minHeight: '1050px' }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-taupe-200 gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-44 h-16">
                <Image
                  src="/images/Logo-01.png"
                  alt="SHOKHORA"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <div className="hidden sm:block border-l border-taupe-200 pl-4">
                <p className="text-xs uppercase tracking-wider text-charcoal-500 font-medium">
                  Official Money Receipt
                </p>
                <p className="text-xs text-taupe-600 font-bengali">অফিসিয়াল মানি রিসিপ্ট</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-2xl font-bold tracking-tight text-charcoal-950 font-serif">
                INVOICE
              </span>
              <p className="text-sm font-mono text-charcoal-600 mt-1 font-semibold">
                {order.invoiceNumber}
              </p>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Date: {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Info Blocks: Company & Customer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-taupe-200 text-sm">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">
                Billed From (প্রেরক)
              </h3>
              <p className="font-semibold text-charcoal-900 text-base">{settings.storeName}</p>
              <p className="text-xs text-taupe-600 mb-1 font-bengali">{settings.storeNameBn} — {settings.taglineBn}</p>
              <p className="text-charcoal-600 text-xs leading-relaxed max-w-xs">{settings.contactAddress}</p>
              <p className="text-charcoal-600 text-xs mt-1">
                <span className="font-medium text-charcoal-700">Phone:</span> {settings.contactPhone}
              </p>
              <p className="text-charcoal-600 text-xs">
                <span className="font-medium text-charcoal-700">Email:</span> {settings.contactEmail}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">
                Billed To (গ্রাহক বিবরণ)
              </h3>
              <p className="font-semibold text-charcoal-900 text-base">{order.customer.fullName}</p>
              <p className="text-charcoal-600 text-xs mt-1">
                <span className="font-medium text-charcoal-700">Phone:</span>{' '}
                <span className="font-mono">{order.customer.phone}</span>
              </p>
              {order.customer.email && (
                <p className="text-charcoal-600 text-xs">
                  <span className="font-medium text-charcoal-700">Email:</span> {order.customer.email}
                </p>
              )}
              <p className="text-charcoal-600 text-xs mt-1 leading-relaxed">
                <span className="font-medium text-charcoal-700">Delivery Address:</span>{' '}
                {order.customer.address}, {order.customer.area}, {order.customer.district}
              </p>
              {order.customer.notes && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded mt-2 border border-amber-200">
                  <span className="font-semibold">Note:</span> {order.customer.notes}
                </p>
              )}
            </div>
          </div>

          {/* Payment Status Bar */}
          <div className="py-4 my-6 px-5 rounded-xl bg-taupe-50 border border-taupe-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-charcoal-500 font-medium">Payment Status:</span>
              {getStatusBadge(order.paymentStatus)}
            </div>
            <div>
              <span className="text-charcoal-500 font-medium">Method:</span>{' '}
              <span className="font-semibold text-charcoal-800">{order.paymentMethod}</span>
            </div>
            {order.manualPaymentDetails?.transactionId && (
              <div>
                <span className="text-charcoal-500 font-medium">TrxID:</span>{' '}
                <span className="font-mono font-semibold text-charcoal-800">
                  {order.manualPaymentDetails.transactionId}
                </span>
                {order.manualPaymentDetails.senderNumber && (
                  <span className="text-charcoal-500 ml-1">
                    (Sender: {order.manualPaymentDetails.senderNumber})
                  </span>
                )}
              </div>
            )}
            <div>
              <span className="text-charcoal-500 font-medium">Order Status:</span>{' '}
              <span className="font-semibold text-charcoal-900 uppercase tracking-wide">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-taupe-300 text-xs uppercase tracking-wider text-charcoal-500">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Item Description</th>
                  <th className="py-3 px-2">SKU</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe-100">
                {order.items.map((item, index) => (
                  <tr key={`${item.productId}-${index}`} className="text-charcoal-800">
                    <td className="py-3.5 px-2 text-xs text-charcoal-400">{index + 1}</td>
                    <td className="py-3.5 px-2">
                      <p className="font-medium text-charcoal-900">{item.name}</p>
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-xs text-charcoal-500 mt-0.5">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedColor && item.selectedSize && ' | '}
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-2 font-mono text-xs text-charcoal-500">{item.sku}</td>
                    <td className="py-3.5 px-2 text-right font-mono text-xs">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-3.5 px-2 text-center font-medium">{item.quantity}</td>
                    <td className="py-3.5 px-2 text-right font-mono font-medium">
                      {formatPrice(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Breakdown */}
          <div className="flex justify-end pt-6 border-t border-taupe-200">
            <div className="w-full sm:w-80 space-y-2.5 text-sm">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal:</span>
                <span className="font-mono">{formatPrice(order.subtotal)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>
                    Discount {order.couponCode ? `(${order.couponCode})` : ''}:
                  </span>
                  <span className="font-mono">-{formatPrice(order.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-charcoal-600">
                <span>Delivery Charge:</span>
                <span className="font-mono">
                  {order.deliveryCharge === 0 ? 'FREE' : formatPrice(order.deliveryCharge)}
                </span>
              </div>

              <div className="pt-2 border-t-2 border-taupe-300 flex justify-between text-base font-bold text-charcoal-900">
                <span>Grand Total:</span>
                <span className="font-mono text-lg">{formatPrice(order.total)}</span>
              </div>

              <div className="flex justify-between text-xs text-emerald-800 bg-emerald-50/60 p-2 rounded">
                <span className="font-semibold">Paid Amount:</span>
                <span className="font-mono font-bold">{formatPrice(order.paidAmount)}</span>
              </div>

              <div className="flex justify-between text-xs text-rose-800 bg-rose-50/60 p-2 rounded">
                <span className="font-semibold">Due Balance:</span>
                <span className="font-mono font-bold">{formatPrice(order.dueAmount)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms & Verification Note */}
          <div className="mt-16 pt-8 border-t border-taupe-200 text-xs text-charcoal-500 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="font-semibold text-charcoal-800 mb-1">Terms & Conditions:</p>
              <ul className="list-disc list-inside space-y-0.5 text-taupe-600">
                <li>Goods can be exchanged within 7 days with original receipt and tag.</li>
                <li>Delivery fees are non-refundable once dispatched.</li>
                <li>For any product inquiry, please call {settings.contactPhone}.</li>
              </ul>
            </div>

            <div className="text-left md:text-right">
              <div className="h-12 border-b border-taupe-300 w-44 md:ml-auto mb-1"></div>
              <p className="text-xs font-medium text-charcoal-700">Authorized Signature</p>
              <p className="text-[10px] text-charcoal-400">SHOKHORA Bangladesh</p>
            </div>
          </div>
        </div>
      ) : (
        /* Thermal Slip Layout */
        <div
          ref={invoiceRef}
          className="print-container bg-white rounded-xl shadow-sm border border-taupe-200 p-6 max-w-sm mx-auto text-charcoal-900 font-mono text-xs"
        >
          <div className="text-center pb-4 border-b border-dashed border-taupe-400">
            <div className="relative w-32 h-10 mx-auto mb-1">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="font-bold text-sm tracking-wider">{settings.storeName}</p>
            <p className="text-[11px] text-charcoal-600">{settings.contactAddress}</p>
            <p className="text-[11px] text-charcoal-600">Hotline: {settings.contactPhone}</p>
          </div>

          <div className="py-3 border-b border-dashed border-taupe-400 space-y-1">
            <p>
              <span className="font-bold">INVOICE:</span> {order.invoiceNumber}
            </p>
            <p>
              <span className="font-bold">ORDER ID:</span> {order.id}
            </p>
            <p>
              <span className="font-bold">DATE:</span> {formatDate(order.createdAt)}
            </p>
            <p>
              <span className="font-bold">CUSTOMER:</span> {order.customer.fullName}
            </p>
            <p>
              <span className="font-bold">PHONE:</span> {order.customer.phone}
            </p>
            <p className="leading-tight">
              <span className="font-bold">ADDR:</span> {order.customer.address}, {order.customer.area},{' '}
              {order.customer.district}
            </p>
          </div>

          <div className="py-3 border-b border-dashed border-taupe-400">
            <div className="flex justify-between font-bold pb-1 border-b border-taupe-200">
              <span>ITEM</span>
              <span>QTY x PRICE</span>
            </div>
            <div className="divide-y divide-taupe-100 pt-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-1.5 flex justify-between">
                  <div className="pr-2">
                    <p className="font-sans font-medium text-xs">{item.name}</p>
                    <p className="text-[10px] text-charcoal-500">
                      SKU: {item.sku}
                      {item.selectedColor ? ` | ${item.selectedColor}` : ''}
                    </p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <p>
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                    <p className="font-bold">{formatPrice(item.subtotal)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-3 border-b border-dashed border-taupe-400 space-y-1 text-right">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{order.deliveryCharge === 0 ? 'FREE' : formatPrice(order.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm pt-1 border-t border-taupe-300">
              <span>TOTAL:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-800">
              <span>PAID:</span>
              <span>{formatPrice(order.paidAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-rose-800">
              <span>DUE:</span>
              <span>{formatPrice(order.dueAmount)}</span>
            </div>
          </div>

          <div className="pt-3 text-center space-y-1">
            <p className="font-bold">
              PAYMENT: {order.paymentMethod.toUpperCase()} — {order.paymentStatus.toUpperCase()}
            </p>
            {order.manualPaymentDetails?.transactionId && (
              <p className="text-[10px]">TrxID: {order.manualPaymentDetails.transactionId}</p>
            )}
            <p className="text-[10px] text-charcoal-500 pt-2">Thank you for shopping with SHOKHORA!</p>
            <p className="text-[10px] text-charcoal-400 font-bengali">আপনার পছন্দ, আমাদের ভালোবাসা।</p>
          </div>
        </div>
      )}
    </div>
  );
}
