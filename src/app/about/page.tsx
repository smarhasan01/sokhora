import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sparkles, Heart, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Our Heritage & Vision
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-950">
            About SHOKHORA (শখোরা)
          </h1>
          <p className="text-sm font-bengali text-taupe-700">
            আপনার পছন্দ, আমাদের ভালোবাসা — একটি আধুনিক বাংলাদেশী ব্র্যান্ড।
          </p>
        </div>

        {/* Hero image with original brand */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-taupe-200 bg-white">
          <Image
            src="/images/Shokhora Facebook Cover Photo.jpg"
            alt="SHOKHORA Bangladesh"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Brand Story Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-taupe-200 shadow-sm space-y-8 text-charcoal-800 leading-relaxed text-sm">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-950">
              The Story of SHOKHORA
            </h2>
            <p>
              Born in Dhaka, Bangladesh, <strong>SHOKHORA (শখোরা)</strong> was founded on a simple
              yet timeless belief: every individual deserves everyday products that blend authentic
              craftsmanship, tactile luxury, and effortless elegance.
            </p>
            <p>
              From 100% genuine mulberry silk scrunchies that pamper hair without breakage, to
              handcrafted brass filigree jewellery shaped by heritage artisans, we curate items that
              bring joy to daily routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-taupe-200">
            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Sparkles className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">Pure Quality</h3>
              <p className="text-xs text-charcoal-600">
                We select premium natural fabrics, non-toxic organic skincare botanicals, and long-lasting materials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Heart className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">Handcrafted Passion</h3>
              <p className="text-xs text-charcoal-600">
                Every piece tells a story of local craftsmanship, ethical sourcing, and artistic dedication.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-taupe-50/70 space-y-2 border border-taupe-200">
              <Users className="w-6 h-6 text-sage-600" />
              <h3 className="font-bold text-charcoal-950 text-sm">Customer First</h3>
              <p className="text-xs text-charcoal-600">
                Delivering transparency through verified money receipts, nationwide cash on delivery, and genuine support.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
