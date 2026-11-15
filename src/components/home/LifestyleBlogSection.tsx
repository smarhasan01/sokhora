'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';

const ARTICLES = [
  {
    tag: 'Silk Care Guide',
    tagBn: 'সিল্ক কেয়ার গাইড',
    title: 'Why Mulberry Silk is the Ultimate Secret for Healthy, Frizz-Free Hair',
    titleBn: 'চুল পড়া ও ডগা ফাটা রোধে খাঁটি মালবেরি সিল্ক কেন অপরিহার্য',
    desc: 'Discover why dermatologists and hair experts swear by pure 100% mulberry silk over standard cotton and synthetic scrunchies.',
    descBn: 'সাধারণ কটনের তুলনায় মালবেরি সিল্ক কীভাবে চুলের স্বাভাবিক আর্দ্রতা ধরে রেখে চুল ভাঙা রোধ করে জেনে নিন।',
    image: '/images/categories/scrunchies.jpg',
    date: '15 Nov 2026',
    dateBn: '১৫ নভেম্বর ২০২৬',
    readTime: '3 min read',
    readTimeBn: '৩ মিনিট পড়া',
  },
  {
    tag: 'Artisan Heritage',
    tagBn: 'ঐতিহ্যবাহী কারুশিল্প',
    title: 'The Timeless Craft of Bangladeshi Brass & Filigree Jewellery',
    titleBn: 'দেশীয় ঐতিহ্যবাহী ব্রাস ও সূক্ষ্ম কারুকাজের গহনার আভিজাত্য',
    desc: 'Behind the delicate hand-chiseled motifs, antique gold patina, and heritage jewellery crafted by local Bangladeshi artisans.',
    descBn: 'বাংলার ঐতিহ্যবাহী গহনাশিল্পীদের হাতের নিপুণ ছোঁয়ায় তৈরি ব্রাস ও এন্টিক গহনার পেছনের গল্প।',
    image: '/images/categories/jewellery.jpg',
    date: '12 Nov 2026',
    dateBn: '১২ নভেম্বর ২০২৬',
    readTime: '5 min read',
    readTimeBn: '৫ মিনিট পড়া',
  },
  {
    tag: 'Kids Fashion',
    tagBn: 'কিডস ফ্যাশন',
    title: 'Choosing Safe, Gentle, and Snag-Free Hair Accessories for Little Girls',
    titleBn: 'ছোট্ট সোনামণিদের জন্য আরামদায়ক ও নিরাপদ হেয়ার এক্সেসরিজ নির্বাচন',
    desc: 'Soft pastel clips, ribbon bows, and gentle headbands designed specifically to protect fine baby hair with comfort.',
    descBn: 'বাচ্চাদের নরম চুলের সুরক্ষায় মিষ্টি রঙের ফ্লোরাল ক্লিপ ও নমনীয় হেডব্যান্ড বেছে নেওয়ার টিপস।',
    image: '/images/categories/kids-hair.jpg',
    date: '08 Nov 2026',
    dateBn: '০৮ নভেম্বর ২০২৬',
    readTime: '4 min read',
    readTimeBn: '৪ মিনিট পড়া',
  },
];

export default function LifestyleBlogSection() {
  const { isBn } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header matching Reference 1 (Castle Chronicles) */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#EADFCF]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#10252B] tracking-tight">
            {isBn ? 'লাইফস্টাইল ও রূপচর্চা জার্নাল' : 'Lifestyle & Brand Stories'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isBn ? 'সিল্ক কেয়ার, কারুশিল্প ও ফ্যাশন নিয়ে অনুপ্রেরণাদায়ক গল্প' : 'Inspiring stories, styling guides, and hair rituals from our studio'}
          </p>
        </div>

        <Link
          href="/about"
          className="text-xs font-bold text-[#477765] hover:text-[#10252B] flex items-center gap-0.5 transition-colors"
        >
          <span>{isBn ? 'সবগুলো পড়ুন' : 'See All'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Editorial Cards Grid (Reference 1 style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((article, idx) => (
          <article
            key={idx}
            className="group bg-white rounded-2xl border border-[#EADFCF] overflow-hidden flex flex-col justify-between hover:border-[#C99A45] hover:shadow-md transition-all duration-300"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF5EE]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#10252B] text-[#C99A45] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs border border-[#C99A45]/30">
                  {isBn ? article.tagBn : article.tag}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C99A45]" />
                    <span>{isBn ? article.dateBn : article.date}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C99A45]" />
                    <span>{isBn ? article.readTimeBn : article.readTime}</span>
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#10252B] group-hover:text-[#477765] transition-colors leading-snug line-clamp-2">
                  {isBn ? article.titleBn : article.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {isBn ? article.descBn : article.desc}
                </p>
              </div>
            </div>

            {/* Read More */}
            <div className="p-5 pt-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#477765] group-hover:text-[#10252B] transition-colors">
                <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
