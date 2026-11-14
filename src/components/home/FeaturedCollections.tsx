'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'The Mulberry Silk Edit',
    titleBn: 'মালবেরি সিল্ক কালেকশন',
    subtitle: 'Pure 19-Momme Grade-6A Silk for hair health.',
    subtitleBn: 'চুলের সুরক্ষায় শতভাগ খাঁটি মালবেরি সিল্ক।',
    image: '/images/categories/scrunchies.jpg',
    href: '/category/scrunchies-hair-accessories',
    tag: 'Silk Luxury',
    tagBn: 'খাঁটি সিল্ক',
  },
  {
    title: 'Heritage Brass & Pearls',
    titleBn: 'ঐতিহ্যবাহী ব্রাস ও মুক্তা',
    subtitle: 'Artisanal filigree jewelry with antique warm finish.',
    subtitleBn: 'দেশীয় কারিগরদের হাতে তৈরি ঐতিহ্যবাহী গহনা।',
    image: '/images/categories/jewellery.jpg',
    href: '/category/jewellery-fashion-accessories',
    tag: 'Handcrafted',
    tagBn: 'হস্তশিল্প',
  },
  {
    title: 'Botanical Beauty Rituals',
    titleBn: 'অর্গানিক বিউটি রিচুয়াল',
    subtitle: 'Pure organic rosewater, plant butters, and gentle tints.',
    subtitleBn: 'প্রাকৃতিক অর্গানিক রূপচর্চা সামগ্রী।',
    image: '/images/categories/beauty.jpg',
    href: '/category/cosmetics-beauty',
    tag: 'Pure & Organic',
    tagBn: 'অর্গানিক',
  },
];

export default function FeaturedCollections() {
  const { isBn, t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {isBn ? 'সিগনেচার লুকবুক' : 'Signature Lookbook'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#191817] mt-2">
            {isBn ? 'শখোরা সিগনেচার কালেকশন' : 'The Signature Collections'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            {isBn
              ? 'আমাদের বিশেষ তিনটি অনন্য সিরিজ — ঐতিহ্যবাহী কারুকাজ ও আধুনিক ডিজাইনের মেলবন্ধন।'
              : 'Three curated narratives blending Bangladeshi artisan heritage with modern minimalist silhouettes.'}
          </p>
        </div>

        {/* 3 Large Editorial Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[3/4] bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 border border-stone-200"
            >
              <Image
                src={col.image}
                alt={isBn ? col.titleBn : col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Tag Pill */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white border border-white/30">
                  {isBn ? col.tagBn : col.tag}
                </span>
              </div>

              {/* Content Box */}
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-serif font-medium leading-snug group-hover:text-amber-200 transition-colors">
                  {isBn ? col.titleBn : col.title}
                </h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed font-sans">
                  {isBn ? col.subtitleBn : col.subtitle}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>{isBn ? 'কালেকশন দেখুন' : 'Explore The Edit'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
