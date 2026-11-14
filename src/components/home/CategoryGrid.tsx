'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/db/store';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  const categories = getCategories();

  return (
    <section className="py-16 bg-white border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-sage-600 mb-1">
              Curated Collections
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
              Shop by Category
            </h2>
            <p className="text-xs text-taupe-600 font-bengali mt-0.5">
              ক্যাটাগরি অনুযায়ী পছন্দ করুন
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950 flex items-center gap-1 group"
          >
            View All Products{' '}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-taupe-100 border border-taupe-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-end p-5"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sage-300">
                  {cat.itemCount || 10}+ Items
                </span>
                <h3 className="font-semibold text-sm sm:text-base leading-snug mt-0.5 group-hover:text-sage-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-taupe-300 font-bengali mt-0.5">
                  {cat.nameBn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
