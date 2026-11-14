'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders } from '@/lib/db/store';
import { formatPrice } from '@/lib/utils/formatters';
import { Users, Search, Phone, ShoppingBag, MapPin } from 'lucide-react';

interface CustomerSummary {
  phone: string;
  fullName: string;
  email?: string;
  district: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const orders = getOrders();
    const map = new Map<string, CustomerSummary>();

    orders.forEach((o) => {
      const ph = o.customer.phone;
      if (!map.has(ph)) {
        map.set(ph, {
          phone: ph,
          fullName: o.customer.fullName,
          email: o.customer.email,
          district: o.customer.district,
          address: `${o.customer.address}, ${o.customer.area}`,
          totalOrders: 1,
          totalSpent: o.total,
          lastOrderDate: o.createdAt,
        });
      } else {
        const existing = map.get(ph)!;
        existing.totalOrders += 1;
        existing.totalSpent += o.total;
        if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = o.createdAt;
          existing.district = o.customer.district;
          existing.address = `${o.customer.address}, ${o.customer.area}`;
        }
      }
    });

    setCustomers(Array.from(map.values()));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <Users className="w-5 h-5 text-sage-600" />
            Customer Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Profiles, purchasing history, and lifetime customer value.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-taupe-50 pl-9 pr-3.5 py-2 rounded-xl border border-taupe-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-taupe-50/70 border-b border-taupe-200 text-charcoal-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-3">Phone</th>
                <th className="py-3.5 px-3">District</th>
                <th className="py-3.5 px-3">Orders Placed</th>
                <th className="py-3.5 px-3">Lifetime Value</th>
                <th className="py-3.5 px-3">Delivery Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {filtered.map((c) => (
                <tr key={c.phone} className="hover:bg-taupe-50/50">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-charcoal-950">{c.fullName}</p>
                    {c.email && <p className="text-[10px] text-charcoal-400">{c.email}</p>}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-sage-700">
                    <a href={`tel:${c.phone}`} className="hover:underline">
                      {c.phone}
                    </a>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-charcoal-800">{c.district}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-charcoal-900">
                    {c.totalOrders} {c.totalOrders === 1 ? 'order' : 'orders'}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-charcoal-950 text-sm">
                    {formatPrice(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-3 text-charcoal-600 max-w-xs truncate">{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
