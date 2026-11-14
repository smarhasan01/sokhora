'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getCategories, getProducts } from '@/lib/db/store';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, PackageOpen } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const categories = getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return notFound();
  }

  const allProducts = getProducts();
  const products = allProducts.filter(
    (p) => p.category === slug && p.isPublished
  );

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1">
        {/* Category Hero Banner */}
        <div className="relative bg-charcoal-900 text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/90 to-charcoal-900/60" />

          <div className="relative max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-taupe-400 mb-3">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/shop" className="hover:text-white transition-colors">
                Shop
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm font-bengali text-sage-300 mt-1">{category.nameBn}</p>
            {category.description && (
              <p className="text-xs sm:text-sm text-taupe-300 mt-2 max-w-xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-taupe-200 text-xs text-charcoal-600">
            <span>
              Showing <span className="font-bold text-charcoal-900">{products.length}</span> items
            </span>
            <Link
              href="/shop"
              className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950"
            >
              Browse All Collections →
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-taupe-200 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-charcoal-900 text-base">
                No products currently in this category
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                We are refreshing our catalog with new handcrafted pieces. Please check back soon or
                explore our other categories.
              </p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2.5 bg-charcoal-900 text-white rounded-full text-xs font-semibold hover:bg-charcoal-800 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
