'use client';

import React, { useState, useMemo } from 'react';
import { getProducts, getCategories } from '@/lib/db/store';
import ProductCard from '@/components/product/ProductCard';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NewProductsSection() {
  const { isBn, formatNumber } = useLanguage();
  const allProducts = getProducts().filter((p) => p.isPublished);
  const categories = getCategories();

  const [selectedCat, setSelectedCat] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => p.isNewArrival || p.isFeatured);
    if (list.length < 5) list = allProducts;
    if (selectedCat !== 'all') {
      list = list.filter((p) => p.category === selectedCat);
    }
    return list;
  }, [allProducts, selectedCat]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header bar matching reference */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {isBn ? 'নতুন আগমন পণ্য' : 'New Products'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isBn ? 'আমাদের সদ্য যুক্ত হওয়া পণ্যসম্ভার' : 'Fresh additions to elevate your everyday routines'}
          </p>
        </div>

        {/* Sort / Category dropdown as in reference: "Sort by: All Categories ▾" */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">Sort by:</span>
          <select
            value={selectedCat}
            onChange={(e) => {
              setSelectedCat(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 outline-none cursor-pointer hover:border-[#012D51] transition-colors"
          >
            <option value="all">{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {isBn && c.nameBn ? c.nameBn : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Column Grid as in Reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination matching reference `<  1  [2]  3  > ` */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#012D51] hover:text-[#012D51] disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-[#012D51] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#012D51] hover:text-[#012D51]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#012D51] hover:text-[#012D51] disabled:opacity-40 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
