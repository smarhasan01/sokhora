'use client';

import React, { useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProductBySlug, getProducts } from '@/lib/db/store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import {
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  Star,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Check,
  Heart,
  Tag,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const { addItem, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const inWishlist = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '/images/Logo-01.png');
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variations?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variations?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = product.discountPrice ?? product.regularPrice;
  const hasDiscount = product.discountPrice && product.discountPrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.discountPrice!) / product.regularPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addItem(product, quantity, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    if (product.stock <= 0) return;
    addItem(product, quantity, selectedColor, selectedSize);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products
  const relatedProducts = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id && p.isPublished)
    .slice(0, 4);

  const displayName = isBn && product.nameBn ? product.nameBn : product.name;
  const displayBrand = isBn && product.brandBn ? product.brandBn : (product.brand || 'SHOKHORA');
  const displayDesc = isBn && product.descriptionBn ? product.descriptionBn : product.description;

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-charcoal-900 transition-colors">
            {t('navHome')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link href="/shop" className="hover:text-charcoal-900 transition-colors">
            {t('navAllProducts')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-charcoal-900 transition-colors capitalize"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium truncate max-w-xs">{displayName}</span>
        </nav>

        {/* Product Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-taupe-200 shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? 'border-charcoal-950 shadow-sm'
                        : 'border-taupe-200 hover:border-taupe-400'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative aspect-square flex-1 rounded-2xl overflow-hidden bg-taupe-100 border border-taupe-200">
              <Image
                src={selectedImage}
                alt={displayName}
                fill
                priority
                className="object-cover object-center"
              />

              {hasDiscount && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-terracotta-500 text-white shadow-md">
                  {isBn ? `ছাড় ${formatNumber(discountPercent)}%` : `SAVE ${discountPercent}%`}
                </span>
              )}

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full backdrop-blur-sm shadow-sm transition-all ${
                    inWishlist
                      ? 'bg-white text-terracotta-500 shadow-md scale-105'
                      : 'bg-white/90 text-charcoal-700 hover:text-terracotta-500 hover:bg-white'
                  }`}
                  title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      inWishlist ? 'fill-terracotta-500 stroke-terracotta-500' : 'stroke-current'
                    }`}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-700 hover:bg-white hover:text-charcoal-900 shadow-sm transition-all"
                  title={t('share')}
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/shop?brand=${encodeURIComponent(product.brand || '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-taupe-100 text-charcoal-800 hover:bg-taupe-200 transition-colors"
                >
                  <Tag className="w-3 h-3 text-sage-600" />
                  <span>{displayBrand}</span>
                </Link>

                {product.stock > 5 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />{' '}
                    {isBn ? `স্টকে আছে (${formatNumber(product.stock)}টি)` : `In Stock (${product.stock} available)`}
                  </span>
                ) : product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    {isBn ? `সীমিত স্টক: মাত্র ${formatNumber(product.stock)}টি বাকি!` : `Low Stock: Only ${product.stock} left!`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                    {t('outOfStock')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 leading-tight">
                {displayName}
              </h1>

              {/* Rating & SKU */}
              <div className="flex items-center gap-4 text-xs text-charcoal-500 pt-1">
                {product.rating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating || 0)
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'text-taupe-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-charcoal-800">
                      {formatNumber(product.rating.toFixed(1))}
                    </span>
                    <span className="text-charcoal-400">
                      ({formatNumber(product.reviewCount || 12)} {isBn ? 'মতামত' : 'reviews'})
                    </span>
                  </div>
                )}
                <span>•</span>
                <span className="font-mono text-xs">SKU: {product.sku}</span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-taupe-50/80 border border-taupe-200 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-charcoal-950">
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-charcoal-400 line-through font-mono">
                      {formatPrice(product.regularPrice)}
                    </span>
                    <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200">
                      {isBn
                        ? `সাশ্রয় ${formatPrice(product.regularPrice - product.discountPrice!)}`
                        : `You save ${formatPrice(product.regularPrice - product.discountPrice!)}`}
                    </span>
                  </>
                )}
              </div>

              {/* Variations: Colors */}
              {product.variations?.colors && product.variations.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-charcoal-700 uppercase tracking-wider">
                      {t('selectColor')}: <span className="text-charcoal-950 font-normal">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variations.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-charcoal-900 bg-charcoal-900 text-white shadow-sm'
                            : 'border-taupe-300 bg-white text-charcoal-700 hover:border-taupe-500'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variations: Sizes */}
              {product.variations?.sizes && product.variations.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                    {t('selectSize')}: <span className="text-charcoal-950 font-normal">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          selectedSize === s
                            ? 'border-charcoal-900 bg-charcoal-900 text-white shadow-sm'
                            : 'border-taupe-300 bg-white text-charcoal-700 hover:border-taupe-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2 block">
                  {t('quantity')}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-taupe-300 rounded-xl bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-1.5 hover:bg-taupe-100 rounded-lg text-charcoal-700 disabled:opacity-40 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-charcoal-900">
                      {formatNumber(quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                      className="p-1.5 hover:bg-taupe-100 rounded-lg text-charcoal-700 disabled:opacity-40 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-charcoal-500">
                    {isBn ? 'মোট:' : 'Subtotal:'}{' '}
                    <span className="font-mono font-bold text-charcoal-900">
                      {formatPrice(price * quantity)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="pt-6 border-t border-taupe-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-50 disabled:opacity-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedAnimation ? t('addedToCart') : t('addToCart')}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="py-3.5 px-6 rounded-2xl font-semibold text-sm bg-charcoal-950 hover:bg-charcoal-900 text-white transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Zap className="w-4 h-4" /> {t('buyNow')}
                </button>
              </div>

              {/* Trust Features Strip */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-charcoal-600 border-t border-taupe-100">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-sage-600" />
                  <span>{isBn ? '৪৮-৭২ ঘণ্টার ডেলিভারি' : 'Delivery in 48-72h'}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                  <span>{isBn ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-sage-600" />
                  <span>{isBn ? '৭ দিনের এক্সচেঞ্জ' : '7 Days Exchange'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-taupe-200 shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-taupe-200 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'desc'
                  ? 'text-charcoal-950 border-b-2 border-charcoal-950'
                  : 'text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              {isBn ? 'পণ্যের বিবরণ' : 'Product Description'}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'specs'
                  ? 'text-charcoal-950 border-b-2 border-charcoal-950'
                  : 'text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              {isBn ? 'স্পেসিফিকেশন ও তথ্য' : 'Specifications'}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'shipping'
                  ? 'text-charcoal-950 border-b-2 border-charcoal-950'
                  : 'text-charcoal-400 hover:text-charcoal-700'
              }`}
            >
              {isBn ? 'ডেলিভারি ও রিটার্ন পলিসি' : 'Shipping & Returns'}
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-base leading-relaxed">{displayDesc}</p>
                <div className="pt-4 border-t border-taupe-100">
                  <h4 className="font-semibold text-charcoal-900 mb-2">
                    {isBn ? 'যত্ন ও ব্যবহারের নিয়মাবলী:' : 'Care Instructions:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-charcoal-600 text-xs sm:text-sm">
                    <li>{isBn ? 'সিল্ক ও ফ্যাব্রিক পণ্য ঠান্ডা পানিতে মৃদু সাবান বা শ্যাম্পু দিয়ে ধুয়ে নিন।' : 'For silk items: Hand wash in cold water using a mild ph-neutral detergent.'}</li>
                    <li>{isBn ? 'সরাসরি প্রখর রোদে শুকানো থেকে বিরত থাকুন।' : 'Avoid drying under direct harsh sunlight.'}</li>
                    <li>{isBn ? 'জুয়েলারি ও হেয়ার ক্লিপ শুকনো এবং ধুলাবালি মুক্ত বাক্সে সংরক্ষণ করুন।' : 'Store accessories in dry, dust-free containers to preserve polish.'}</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl space-y-2.5">
                <div className="flex justify-between py-2 border-b border-taupe-100">
                  <span className="text-charcoal-500">{t('productBrand')}</span>
                  <span className="font-semibold text-charcoal-900">{displayBrand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-taupe-100">
                  <span className="text-charcoal-500">{t('productSku')}</span>
                  <span className="font-mono text-charcoal-900">{product.sku}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-taupe-100">
                  <span className="text-charcoal-500">{t('productCategory')}</span>
                  <span className="capitalize text-charcoal-900">{product.category.replace(/-/g, ' ')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-taupe-100">
                  <span className="text-charcoal-500">{isBn ? 'উৎস / প্রস্তুতকারী' : 'Country of Origin'}</span>
                  <span className="text-charcoal-900">Bangladesh (বাংলাদেশ)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-taupe-100">
                  <span className="text-charcoal-500">{isBn ? 'কোয়ালিটি গ্যারান্টি' : 'Authenticity Guarantee'}</span>
                  <span className="text-emerald-700 font-semibold">{isBn ? '১০০% খাঁটি পণ্য' : '100% Genuine'}</span>
                </div>
                <p className="text-[11px] text-taupe-400 font-mono pt-2">
                  *Phase 1 Prototype: Sample development attributes for UI demonstration.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-4">
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">{t('deliveryDhaka')}</h4>
                  <p className="text-xs text-charcoal-600">
                    {isBn ? 'ডেলিভারি চার্জ ৳৭০। ২-৩ কার্যদিবসের মধ্যে কুরিয়ারের মাধ্যমে হোম ডেলিভারি।' : 'Standard courier delivery within 2-3 business days. Charge ৳70.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">{t('deliveryOutsideDhaka')}</h4>
                  <p className="text-xs text-charcoal-600">
                    {isBn ? 'ডেলিভারি চার্জ ৳১৩০। ৩-৫ কার্যদিবসের মধ্যে নির্ভরযোগ্য কুরিয়ারের মাধ্যমে ডেলিভারি।' : 'Nationwide 64 districts delivery within 3-5 business days. Charge ৳130.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">{t('sevenDaysReturn')}</h4>
                  <p className="text-xs text-charcoal-600">
                    {isBn ? 'পণ্য অব্যবহৃত অবস্থায় মূল প্যাকেজিং ও ইনভয়েস সহ ৭ দিনের ভেতর সহজে পরিবর্তন করা যাবে।' : 'Items are eligible for a 7-day exchange with original tags and packaging.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-taupe-200">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-950">
                {t('relatedProducts')}
              </h2>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-semibold text-charcoal-800 hover:text-charcoal-950"
              >
                {t('viewAll')} →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
