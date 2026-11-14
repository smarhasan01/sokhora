'use client';

import React, { useState, useEffect } from 'react';
import { getOrders, getSettings } from '@/lib/db/store';
import { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import InvoiceView from '@/components/invoice/InvoiceView';
import {
  FileText,
  Search,
  Printer,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  ShieldCheck,
} from 'lucide-react';

export default function AdminReceiptsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filtered = orders.filter((o) => {
    if (paymentFilter !== 'all' && o.paymentStatus !== paymentFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.invoiceNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sage-600" />
            Official Money Receipts & Invoices
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Search, preview, reprint, and verify authentic SHOKHORA financial receipts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Financial Records
          </span>
        </div>
      </div>

      {/* Invoice Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-950/75 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-6 max-h-[92vh] overflow-y-auto shadow-2xl">
            <InvoiceView
              order={selectedOrder}
              settings={getSettings()}
              onBack={() => setSelectedOrder(null)}
            />
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-taupe-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Invoice No, Order ID, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-taupe-50 pl-9 pr-3.5 py-2 rounded-xl border border-taupe-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-charcoal-500 font-medium">Payment Verification:</span>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-white border border-taupe-300 rounded-xl px-3 py-2 font-medium"
          >
            <option value="all">All Receipts ({orders.length})</option>
            <option value="Paid">Paid Only</option>
            <option value="Unpaid">Unpaid Only</option>
            <option value="Partially Paid">Partially Paid</option>
          </select>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-taupe-50/70 border-b border-taupe-200 text-charcoal-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Receipt / Invoice No</th>
                <th className="py-3.5 px-3">Order ID</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Total Amount</th>
                <th className="py-3.5 px-3">Paid Amount</th>
                <th className="py-3.5 px-3">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-taupe-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-charcoal-950">
                    {ord.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-charcoal-700">{ord.id}</td>
                  <td className="py-3.5 px-3 text-charcoal-600 whitespace-nowrap">
                    {formatDate(ord.createdAt)}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-charcoal-900">{ord.customer.fullName}</p>
                    <p className="text-[10px] text-charcoal-400 font-mono">{ord.customer.phone}</p>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-charcoal-950">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-800">
                    {formatPrice(ord.paidAmount)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.paymentStatus === 'Partially Paid'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-taupe-300 bg-white hover:bg-taupe-100 text-charcoal-900 font-semibold text-[11px] shadow-sm transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-sage-600" />
                      View / Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
