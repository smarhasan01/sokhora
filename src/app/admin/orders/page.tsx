'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, updateOrderStatus, updatePaymentStatus } from '@/lib/db/store';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  RotateCcw,
  FileText,
  Eye,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const loadData = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('shokhora-store-change', loadData);
    return () => window.removeEventListener('shokhora-store-change', loadData);
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus, `Updated via admin table`, 'Admin');
    loadData();
  };

  const handlePaymentChange = (orderId: string, newPaymentStatus: PaymentStatus, total: number) => {
    const paid = newPaymentStatus === 'Paid' ? total : 0;
    updatePaymentStatus(orderId, newPaymentStatus, paid, {
      verifiedBy: 'Admin - Quick status toggle',
    });
    loadData();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (paymentFilter !== 'all' && o.paymentStatus !== paymentFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.invoiceNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.manualPaymentDetails?.transactionId?.toLowerCase().includes(q)
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
            <ShoppingBag className="w-5 h-5 text-sage-600" />
            Order & Fulfillment Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Process orders, verify manual mobile banking transactions, and track parcel delivery.
          </p>
        </div>

        <div className="text-xs font-semibold text-charcoal-700 bg-taupe-100 px-3.5 py-2 rounded-xl">
          Total Orders: <span className="font-mono text-charcoal-950">{orders.length}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-taupe-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search Order ID, phone, customer, TrxID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-taupe-50 pl-9 pr-3.5 py-2 rounded-xl border border-taupe-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-charcoal-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-taupe-300 rounded-xl px-2.5 py-2 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-charcoal-500 font-medium">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-white border border-taupe-300 rounded-xl px-2.5 py-2 font-medium"
            >
              <option value="all">All Payments</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Paid">Paid</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-taupe-50/70 border-b border-taupe-200 text-charcoal-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Order & Date</th>
                <th className="py-3.5 px-3">Customer Info</th>
                <th className="py-3.5 px-3">Destination</th>
                <th className="py-3.5 px-3">Items</th>
                <th className="py-3.5 px-3">Total Amount</th>
                <th className="py-3.5 px-3">Payment Status</th>
                <th className="py-3.5 px-3">Order Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-taupe-50/50 transition-colors">
                  {/* Order & Date */}
                  <td className="py-3.5 px-4">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="font-mono font-bold text-charcoal-950 hover:underline block"
                    >
                      {ord.id}
                    </Link>
                    <span className="text-[10px] text-charcoal-400 font-sans block">
                      {ord.invoiceNumber}
                    </span>
                    <span className="text-[10px] text-charcoal-500">
                      {formatDate(ord.createdAt)}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-charcoal-900">{ord.customer.fullName}</p>
                    <a
                      href={`tel:${ord.customer.phone}`}
                      className="font-mono text-sage-700 hover:underline block text-[11px]"
                    >
                      {ord.customer.phone}
                    </a>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-3 text-charcoal-700">
                    <p className="font-medium">{ord.customer.district}</p>
                    <p className="text-[10px] text-charcoal-500 truncate max-w-[120px]">
                      {ord.customer.area}
                    </p>
                  </td>

                  {/* Items */}
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-charcoal-900">
                      {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <p className="text-[10px] text-charcoal-500 truncate max-w-[130px]">
                      {ord.items.map((i) => i.name).join(', ')}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="py-3.5 px-3">
                    <p className="font-mono font-bold text-charcoal-950">{formatPrice(ord.total)}</p>
                    <p className="text-[10px] text-charcoal-500">{ord.paymentMethod}</p>
                  </td>

                  {/* Payment Status Dropdown */}
                  <td className="py-3.5 px-3">
                    <select
                      value={ord.paymentStatus}
                      onChange={(e) =>
                        handlePaymentChange(ord.id, e.target.value as PaymentStatus, ord.total)
                      }
                      className={`text-[11px] font-bold rounded-lg px-2 py-1 border transition-colors ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : ord.paymentStatus === 'Partially Paid'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Partially Paid">Partially Paid</option>
                      <option value="Paid">Paid</option>
                      <option value="Refunded">Refunded</option>
                    </select>

                    {ord.manualPaymentDetails?.transactionId && (
                      <p className="text-[10px] font-mono text-charcoal-600 mt-1 font-semibold">
                        Trx: {ord.manualPaymentDetails.transactionId}
                      </p>
                    )}
                  </td>

                  {/* Order Status Dropdown */}
                  <td className="py-3.5 px-3">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="text-[11px] font-semibold bg-white border border-taupe-300 rounded-lg px-2 py-1 text-charcoal-900"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-taupe-300 bg-white hover:bg-taupe-100 text-charcoal-900 font-semibold text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5 text-sage-600" />
                      View Details
                    </Link>
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
