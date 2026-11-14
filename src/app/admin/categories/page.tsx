'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCategories, saveCategory, deleteCategory, getProducts } from '@/lib/db/store';
import { Category } from '@/types';
import { FolderTree, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const loadData = () => {
    const cats = getCategories();
    const prods = getProducts();
    const catsWithCounts = cats.map((c) => ({
      ...c,
      itemCount: prods.filter((p) => p.category === c.slug).length,
    }));
    setCategories(catsWithCounts);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('shokhora-store-change', loadData);
    return () => window.removeEventListener('shokhora-store-change', loadData);
  }, []);

  const openNewModal = () => {
    setEditingCategory(null);
    setName('');
    setNameBn('');
    setSlug('');
    setDescription('');
    setImage('/images/categories/fashion.jpg');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setNameBn(c.nameBn || '');
    setSlug(c.slug);
    setDescription(c.description || '');
    setImage(c.image || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: name.trim(),
      nameBn: nameBn.trim(),
      slug: slug.trim(),
      description: description.trim(),
      image: image.trim() || '/images/categories/fashion.jpg',
    };

    saveCategory(toSave);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-sage-600" />
            Category Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Organize products into customer-facing departments and collection pages.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-sage-400" /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-taupe-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full bg-taupe-100">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
              <div className="absolute top-3 right-3 bg-charcoal-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-mono">
                {cat.itemCount || 0} Products
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-charcoal-950 text-sm">{cat.name}</h3>
                <p className="text-xs font-bengali text-taupe-600 mt-0.5">{cat.nameBn}</p>
                {cat.description && (
                  <p className="text-xs text-charcoal-500 mt-2 line-clamp-2">{cat.description}</p>
                )}
                <p className="text-[10px] text-charcoal-400 font-mono mt-2">Slug: {cat.slug}</p>
              </div>

              <div className="pt-3 border-t border-taupe-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-sage-700 font-semibold">Active</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 rounded-lg border border-taupe-200 hover:bg-taupe-100 text-charcoal-700 transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 rounded-lg border border-taupe-200 hover:bg-rose-50 text-rose-600 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-taupe-200">
            <div className="flex items-center justify-between pb-3 border-b border-taupe-100">
              <h2 className="text-base font-bold text-charcoal-950">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Category Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk Scrunchies"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory && !slug) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Category Name (Bengali)</label>
                <input
                  type="text"
                  placeholder="e.g. সিল্ক স্ক্রাঞ্চি"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-bengali focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="silk-scrunchies"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of this collection..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-taupe-300 text-charcoal-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-950 text-white font-semibold hover:bg-charcoal-900"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
