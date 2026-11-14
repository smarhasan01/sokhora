'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'Mulberry Silk Scrunchies',
    titleBn: 'মালবেরি সিল্ক স্ক্রাঞ্চি',
    description: '19-Momme pure silk crafted to prevent frizz, breakage, and hair tangles.',
    image: '/images/categories/scrunchies.jpg',
    href: '/category/scrunchies-hair-accessories',
    tag: 'Silk Luxury',
  },
  {
    title: 'Artisan Brass & Pearl Jewellery',
    titleBn: 'হস্তশিল্প গহনা ও পার্ল',
    description: 'Handmade filigree chokers and minimalist earrings with 18k gold polish.',
    image: '/images/categories/jewellery.jpg',
    href: '/category/jewellery-fashion-accessories',
    tag: 'Artisan Crafted',
  },
  {
    title: 'Natural Botanical Skincare',
    titleBn: 'অর্গানিক রূপচর্চা সামগ্রী',
    description: 'Gentle organic beetroot lip balms and refreshing rosewater facial serums.',
    image: '/images/categories/beauty.jpg',
    href: '/category/cosmetics-beauty',
    tag: 'Pure & Organic',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-14 sm:py-16 bg-ivory-100 border-b border-taupe-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase font-bold tracking-wider text-sage-700 mb-1">
            Signature Aesthetics
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            Featured Collections
          </h2>
          <p className="text-xs text-taupe-600 font-bengali mt-1">
            শখোরার বিশেষ সিগনেচার কালেকশন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] bg-taupe-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-taupe-200/80"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent" />

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-amber-200">
                  {col.tag}
                </span>
                <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight group-hover:text-amber-200 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-taupe-200 leading-relaxed line-clamp-2">
                  {col.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
