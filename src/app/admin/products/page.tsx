'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, deleteProduct, saveProduct, getCategories } from '@/lib/db/store';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import {
  Package,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categories = getCategories();

  const loadData = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('shokhora-store-change', loadData);
    return () => window.removeEventListener('shokhora-store-change', loadData);
  }, []);

  const handleTogglePublish = (p: Product) => {
    const updated = { ...p, isPublished: !p.isPublished };
    saveProduct(updated);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    loadData();
  };

  const filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.nameBn?.toLowerCase().includes(q)
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
            <Package className="w-5 h-5 text-sage-600" />
            Product Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Manage your product inventory, variations, prices, and publishing status.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-sage-400" /> Add Product
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-taupe-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by title, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-taupe-50 pl-9 pr-3.5 py-2 rounded-xl border border-taupe-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
          />
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-medium text-charcoal-600 hidden sm:inline">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-white border border-taupe-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-charcoal-800"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-taupe-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-charcoal-950 text-sm">Delete Product?</h3>
            <p className="text-xs text-charcoal-500">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 px-3 rounded-xl border border-taupe-300 text-xs font-semibold text-charcoal-700 hover:bg-taupe-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-taupe-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-taupe-50/70 border-b border-taupe-200 text-charcoal-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-3">SKU</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Stock</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-taupe-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-taupe-100 border border-taupe-200 flex-shrink-0">
                        <Image
                          src={prod.images[0] || '/images/Logo-01.png'}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="max-w-xs">
                        <p className="font-semibold text-charcoal-950 line-clamp-1">{prod.name}</p>
                        {prod.nameBn && (
                          <p className="text-[11px] font-bengali text-taupe-600 line-clamp-1">
                            {prod.nameBn}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-charcoal-600 text-xs">{prod.sku}</td>
                  <td className="py-3.5 px-3 capitalize text-charcoal-700">
                    {prod.category.replace(/-/g, ' ')}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-mono font-bold text-charcoal-900">
                      {formatPrice(prod.discountPrice ?? prod.regularPrice)}
                    </p>
                    {prod.discountPrice && (
                      <p className="text-[10px] text-charcoal-400 line-through font-mono">
                        {formatPrice(prod.regularPrice)}
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    {prod.stock <= 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        0 (Out)
                      </span>
                    ) : prod.stock <= 5 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {prod.stock} (Low)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {prod.stock} units
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleTogglePublish(prod)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        prod.isPublished
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-taupe-100 text-charcoal-500 border border-taupe-300'
                      }`}
                    >
                      {prod.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {prod.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-taupe-200 hover:bg-taupe-100 text-charcoal-600 transition-colors"
                        title="View on Storefront"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/products/${prod.id}/edit`}
                        className="p-1.5 rounded-lg border border-taupe-200 hover:bg-taupe-100 text-charcoal-600 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => setDeleteConfirmId(prod.id)}
                        className="p-1.5 rounded-lg border border-taupe-200 hover:bg-rose-50 text-rose-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
