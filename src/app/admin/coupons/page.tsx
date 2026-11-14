'use client';

import React, { useState, useEffect } from 'react';
import { getCoupons, saveCoupon, deleteCoupon } from '@/lib/db/store';
import { Coupon } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { Tag, Plus, Trash2, X, Check, Clock, Percent } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrderAmount, setMinOrderAmount] = useState(500);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(300);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [usageLimit, setUsageLimit] = useState(500);

  const loadData = () => {
    setCoupons(getCoupons());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('shokhora-store-change', loadData);
    return () => window.removeEventListener('shokhora-store-change', loadData);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      expiryDate,
      usageLimit: Number(usageLimit),
      timesUsed: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    saveCoupon(newCoupon);
    setIsModalOpen(false);
    setCode('');
    loadData();
  };

  const handleToggleActive = (c: Coupon) => {
    saveCoupon({ ...c, isActive: !c.isActive });
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this coupon?')) {
      deleteCoupon(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <Tag className="w-5 h-5 text-sage-600" />
            Discount Coupons & Vouchers
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Create promotional codes with minimum spend requirements and usage limits.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-sage-400" /> Create Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-taupe-50/70 border-b border-taupe-200 text-charcoal-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-3">Discount</th>
                <th className="py-3.5 px-3">Min Order</th>
                <th className="py-3.5 px-3">Usage (Used / Limit)</th>
                <th className="py-3.5 px-3">Expires On</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-taupe-50/50">
                  <td className="py-3.5 px-4 font-mono font-bold text-sm text-charcoal-950">
                    {c.code}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-charcoal-900">
                    {c.discountType === 'percentage' ? `${c.discountValue}%` : formatPrice(c.discountValue)}
                    {c.maxDiscount && (
                      <span className="text-[10px] text-charcoal-400 block font-normal">
                        Max cap: {formatPrice(c.maxDiscount)}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-charcoal-700">
                    {formatPrice(c.minOrderAmount)}
                  </td>
                  <td className="py-3.5 px-3 font-mono">
                    <span className="font-bold text-charcoal-900">{c.timesUsed}</span> / {c.usageLimit}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-charcoal-600">{c.expiryDate}</td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleToggleActive(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-taupe-200 text-charcoal-600'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded-lg border border-taupe-200 hover:bg-rose-50 text-rose-600"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-taupe-200">
            <div className="flex items-center justify-between pb-3 border-b border-taupe-100">
              <h2 className="text-base font-bold text-charcoal-950">Create New Coupon</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EIDSPECIAL"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono uppercase text-xs focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">
                    Discount Value ({discountType === 'percentage' ? '%' : '৳'}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Min Order (৳ BDT) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Max Discount Cap (৳)</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={maxDiscount ?? ''}
                    onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 mb-1">Usage Limit *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-taupe-300 font-semibold text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-950 text-white font-semibold hover:bg-charcoal-900"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
