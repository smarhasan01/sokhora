'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductById, saveProduct, getCategories } from '@/lib/db/store';
import { Product } from '@/types';
import { ArrowLeft, Save, Trash2, Package } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const categories = getCategories();

  const [product, setProduct] = useState<Product | null>(null);

  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    const p = getProductById(id);
    if (p) {
      setProduct(p);
      setName(p.name);
      setNameBn(p.nameBn || '');
      setSlug(p.slug);
      setSku(p.sku);
      setCategory(p.category);
      setRegularPrice(p.regularPrice);
      setDiscountPrice(p.discountPrice);
      setStock(p.stock);
      setDescription(p.description);
      setDescriptionBn(p.descriptionBn || '');
      setImages(p.images || []);
      setIsFeatured(Boolean(p.isFeatured));
      setIsNewArrival(Boolean(p.isNewArrival));
      setIsBestSeller(Boolean(p.isBestSeller));
      setIsPublished(p.isPublished);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-charcoal-900">Product Not Found</h2>
        <Link href="/admin/products" className="text-xs text-charcoal-600 underline">
          Back to Products List
        </Link>
      </div>
    );
  }

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Product = {
      ...product,
      name: name.trim(),
      nameBn: nameBn.trim() || undefined,
      slug: slug.trim(),
      sku: sku.trim(),
      category,
      regularPrice: Number(regularPrice),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stock: Number(stock),
      description: description.trim(),
      descriptionBn: descriptionBn.trim() || undefined,
      images: images.length > 0 ? images : ['/images/Logo-01.png'],
      isFeatured,
      isNewArrival,
      isBestSeller,
      isPublished,
      updatedAt: new Date().toISOString(),
    };

    saveProduct(updated);
    router.push('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-taupe-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border border-taupe-200 bg-white hover:bg-taupe-100 text-charcoal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-charcoal-950">Edit Product: {product.name}</h1>
            <p className="text-xs text-charcoal-500 font-mono">SKU: {product.sku}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-charcoal-700 mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Bengali Title</label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-bengali focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs bg-white focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono uppercase focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Regular Price (৳ BDT) *</label>
              <input
                type="number"
                required
                value={regularPrice}
                onChange={(e) => setRegularPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Discount Price (৳ BDT)</label>
              <input
                type="number"
                placeholder="No discount"
                value={discountPrice ?? ''}
                onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                required
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
            Images
          </h2>

          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste new image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2.5 bg-taupe-100 hover:bg-taupe-200 text-charcoal-900 text-xs font-semibold rounded-xl"
            >
              Add Image
            </button>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded-2xl overflow-hidden border border-taupe-300 group bg-taupe-50"
              >
                <Image src={img} alt="Product preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
            Description
          </h2>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Description *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Bengali Description</label>
            <textarea
              rows={2}
              value={descriptionBn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-bengali focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
            Publish & Badges
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-taupe-300 text-charcoal-900"
              />
              <span className="font-semibold text-charcoal-900">Published</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-taupe-300 text-charcoal-900"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="rounded border-taupe-300 text-charcoal-900"
              />
              <span>New Arrival</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="rounded border-taupe-300 text-charcoal-900"
              />
              <span>Best Seller</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/admin/products"
            className="px-6 py-3 rounded-2xl border border-taupe-300 bg-white hover:bg-taupe-100 text-xs font-semibold text-charcoal-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs font-semibold shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-sage-400" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
