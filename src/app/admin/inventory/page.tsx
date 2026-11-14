'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  getProducts,
  saveProduct,
  getInventoryMovements,
  logInventoryMovement,
} from '@/lib/db/store';
import { Product, InventoryMovement } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils/formatters';
import {
  Boxes,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RotateCcw,
  History,
  Search,
} from 'lucide-react';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentQty, setAdjustmentQty] = useState<number>(10);
  const [adjustmentType, setAdjustmentType] = useState<'stock-in' | 'stock-out'>('stock-in');
  const [adjustmentReason, setAdjustmentReason] = useState<string>('Restocked from supplier');
  const [search, setSearch] = useState('');

  const loadData = () => {
    setProducts(getProducts());
    setMovements(getInventoryMovements());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('shokhora-store-change', loadData);
    return () => window.removeEventListener('shokhora-store-change', loadData);
  }, []);

  const handleAdjustStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qty = Number(adjustmentQty);
    const oldStock = selectedProduct.stock;
    const newStock =
      adjustmentType === 'stock-in'
        ? oldStock + qty
        : Math.max(0, oldStock - qty);

    const updated = { ...selectedProduct, stock: newStock };
    saveProduct(updated);

    logInventoryMovement({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      type: adjustmentType,
      quantity: qty,
      previousStock: oldStock,
      newStock,
      reason: adjustmentReason,
      performedBy: 'Admin Inventory Manager',
    });

    setSelectedProduct(null);
    setAdjustmentQty(10);
    loadData();
  };

  const lowStockList = products.filter((p) => p.stock <= 5);
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-sage-600" />
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Monitor real-time warehouse stock levels, low-stock warnings, and stock movement logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            {lowStockList.length} Low Stock Items
          </span>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-taupe-200">
            <div className="pb-3 border-b border-taupe-200">
              <h2 className="text-base font-bold text-charcoal-950">
                Adjust Stock: {selectedProduct.name}
              </h2>
              <p className="text-xs text-charcoal-500 font-mono mt-0.5">
                SKU: {selectedProduct.sku} | Current Stock: <strong>{selectedProduct.stock}</strong> units
              </p>
            </div>

            <form onSubmit={handleAdjustStock} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1.5">Action Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustmentType('stock-in')}
                    className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                      adjustmentType === 'stock-in'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white border-taupe-300 text-charcoal-700'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" /> Stock In (Add)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustmentType('stock-out')}
                    className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                      adjustmentType === 'stock-out'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white border-taupe-300 text-charcoal-700'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" /> Stock Out (Deduct)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono font-bold text-sm focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Reason / Reference Note</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New shipment from manufacturer"
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div className="p-3 bg-taupe-50 rounded-xl border border-taupe-200 text-xs text-charcoal-700">
                <span>Resulting Stock: </span>
                <strong className="font-mono text-sm text-charcoal-950">
                  {adjustmentType === 'stock-in'
                    ? selectedProduct.stock + Number(adjustmentQty)
                    : Math.max(0, selectedProduct.stock - Number(adjustmentQty))}
                </strong>{' '}
                units
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 rounded-xl border border-taupe-300 font-semibold text-charcoal-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-950 text-white font-semibold hover:bg-charcoal-900"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Levels Table */}
      <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-taupe-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900">
            Current Stock per Product
          </h2>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search product SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-taupe-50 pl-8 pr-3 py-1.5 rounded-lg border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
            />
            <Search className="w-3.5 h-3.5 text-charcoal-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-taupe-200 text-charcoal-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Unit Price</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-taupe-50/50">
                  <td className="py-3 px-3">
                    <p className="font-semibold text-charcoal-950">{p.name}</p>
                    <p className="text-[10px] text-charcoal-400 capitalize">{p.category.replace(/-/g, ' ')}</p>
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-charcoal-600">{p.sku}</td>
                  <td className="py-3 px-3 font-mono">{formatPrice(p.discountPrice ?? p.regularPrice)}</td>
                  <td className="py-3 px-3 font-mono font-bold text-sm text-charcoal-900">{p.stock}</td>
                  <td className="py-3 px-3">
                    {p.stock <= 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        Out of Stock
                      </span>
                    ) : p.stock <= 5 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Low Stock Alert
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="px-3 py-1.5 rounded-lg border border-taupe-300 bg-white hover:bg-taupe-100 text-charcoal-900 font-semibold text-[11px]"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement Audit Log */}
      <div className="bg-white rounded-3xl p-6 border border-taupe-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-taupe-200">
          <History className="w-4 h-4 text-sage-600" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900">
            Stock Movement & Deduction Audit Trail
          </h2>
        </div>

        {movements.length === 0 ? (
          <p className="text-xs text-charcoal-500 py-4 text-center">No stock adjustments logged yet.</p>
        ) : (
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white border-b border-taupe-200">
                <tr className="text-charcoal-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Product & SKU</th>
                  <th className="py-2.5 px-3">Movement Type</th>
                  <th className="py-2.5 px-3">Change Qty</th>
                  <th className="py-2.5 px-3">Stock Before → After</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Performed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe-100 font-mono text-[11px]">
                {movements.map((m) => (
                  <tr key={m.id} className="hover:bg-taupe-50/50">
                    <td className="py-2.5 px-3 font-sans text-charcoal-500 whitespace-nowrap">
                      {formatDate(m.timestamp)}
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <p className="font-semibold text-charcoal-900">{m.productName}</p>
                      <p className="text-[10px] text-charcoal-400 font-mono">{m.sku}</p>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.type === 'stock-in' || m.type === 'order-cancel-restock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {m.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold">
                      {m.type === 'stock-in' || m.type === 'order-cancel-restock' ? `+${m.quantity}` : `-${m.quantity}`}
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-700">
                      {m.previousStock} → <strong className="text-charcoal-950">{m.newStock}</strong>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-charcoal-600 max-w-xs truncate">
                      {m.reason}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-charcoal-500">{m.performedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
