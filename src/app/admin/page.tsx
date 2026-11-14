'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDashboardMetrics } from '@/lib/db/store';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  PlusCircle,
  Truck,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState(getDashboardMetrics());

  useEffect(() => {
    setMetrics(getDashboardMetrics());

    const handleStoreChange = () => {
      setMetrics(getDashboardMetrics());
    };

    window.addEventListener('shokhora-store-change', handleStoreChange);
    return () => window.removeEventListener('shokhora-store-change', handleStoreChange);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sage-600 block mb-1">
            Bangladeshi Lifestyle E-Commerce
          </span>
          <h1 className="text-2xl font-serif font-bold text-charcoal-950">
            Welcome to SHOKHORA Command Center
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Real-time sales, order fulfillment, payment status, and stock monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-sage-400" /> Add New Product
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-taupe-100 hover:bg-taupe-200 text-charcoal-900 rounded-xl text-xs font-semibold transition-colors"
          >
            Manage Orders ({metrics.pendingOrders} pending)
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-charcoal-950">
            {formatPrice(metrics.totalRevenue)}
          </p>
          <p className="text-[11px] text-emerald-700 font-medium">
            From verified & delivered orders
          </p>
        </div>

        {/* Today's Sales */}
        <div className="bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Today's Orders
            </span>
            <div className="w-8 h-8 rounded-full bg-sage-50 text-sage-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-charcoal-950">
            {formatPrice(metrics.todaySales)}
          </p>
          <p className="text-[11px] text-charcoal-500">Sales created today</p>
        </div>

        {/* Total Orders & Pending */}
        <div className="bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Orders Status
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-charcoal-950">
              {metrics.totalOrders}
            </span>
            <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {metrics.pendingOrders} Pending
            </span>
          </div>
          <p className="text-[11px] text-charcoal-500">{metrics.deliveredOrders} delivered successfully</p>
        </div>

        {/* Outstanding Due */}
        <div className="bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
              Outstanding Due
            </span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-rose-700">
            {formatPrice(metrics.outstandingDue)}
          </p>
          <p className="text-[11px] text-charcoal-500">Uncollected Cash on Delivery / Unverified</p>
        </div>
      </div>

      {/* Secondary KPI Bar: Products, Inventory, Customers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-taupe-100 text-charcoal-800 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-charcoal-500 uppercase font-semibold">Total Catalog Products</p>
            <p className="text-lg font-bold text-charcoal-950">{metrics.totalProducts} Active SKUs</p>
          </div>
        </div>

        <Link
          href="/admin/inventory"
          className="bg-white p-5 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4 hover:border-amber-400 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-charcoal-500 uppercase font-semibold">Low Stock Alert (&le; 5)</p>
            <p className="text-lg font-bold text-amber-700">{metrics.lowStockProducts} Needs Restock</p>
          </div>
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-taupe-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-charcoal-500 uppercase font-semibold">Registered Customers</p>
            <p className="text-lg font-bold text-charcoal-950">{metrics.totalCustomers} Unique Buyers</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-taupe-200">
          <div>
            <h2 className="text-lg font-serif font-bold text-charcoal-950">Recent Orders</h2>
            <p className="text-xs text-charcoal-500 mt-0.5">Latest customer orders requiring fulfillment</p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1 group"
          >
            View All Orders <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-taupe-200 text-charcoal-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Payment Method</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Payment Status</th>
                <th className="py-3 px-3">Order Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {metrics.recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-taupe-50/50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-charcoal-900">
                    <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                      {ord.id}
                    </Link>
                    <p className="text-[10px] text-charcoal-400 font-normal">{ord.invoiceNumber}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-charcoal-900">{ord.customer.fullName}</p>
                    <p className="text-charcoal-500 text-[11px] font-mono">{ord.customer.phone}</p>
                  </td>
                  <td className="py-3.5 px-3 text-charcoal-600">{ord.customer.district}</td>
                  <td className="py-3.5 px-3 font-medium text-charcoal-800">{ord.paymentMethod}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-charcoal-950">
                    {formatPrice(ord.total)}
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
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-charcoal-100 text-charcoal-800">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="px-3 py-1.5 rounded-lg border border-taupe-300 bg-white hover:bg-taupe-100 text-charcoal-900 font-semibold text-[11px] inline-block"
                    >
                      Details & Invoice
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
