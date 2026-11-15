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

  const allProducts = getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id && p.isPublished)
    .slice(0, 4);

  const displayName = isBn && product.nameBn ? product.nameBn : product.name;
  const displayBrand = isBn && product.brandBn ? product.brandBn : (product.brand || 'SHOKHORA');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#191C1F]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200/80 bg-white py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
              <Link href="/" className="hover:text-stone-900 transition-colors">
                {t('navHome')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <Link href="/shop" className="hover:text-stone-900 transition-colors">
                {t('allProducts')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <Link
                href={`/category/${product.category}`}
                className="hover:text-stone-900 transition-colors capitalize"
              >
                {product.category.replace(/-/g, ' ')}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-900 font-semibold truncate max-w-xs">{displayName}</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnail Strip */}
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white shadow-sm ${
                      selectedImage === img
                        ? 'border-stone-900 ring-2 ring-stone-900/10'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${displayName} ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>

              {/* Main Active Image Container */}
              <div className="relative flex-1 aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-lg">
                <Image
                  src={selectedImage}
                  alt={displayName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />

                {/* Badges on Gallery */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {hasDiscount && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#191817] text-amber-300 shadow">
                      -{formatNumber(discountPercent)}%
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 text-stone-900 border border-stone-300 shadow">
                      {isBn ? 'নতুন' : 'NEW'}
                    </span>
                  )}
                </div>

                {/* Floating Wishlist Heart */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-all shadow-md ${
                    inWishlist
                      ? 'bg-white text-rose-600 scale-105'
                      : 'bg-white/90 backdrop-blur-sm text-stone-700 hover:text-rose-600 hover:bg-white'
                  }`}
                  title={inWishlist ? t('removeFromWishlist') : t('wishlist')}
                >
                  <Heart
                    className={`w-5 h-5 ${inWishlist ? 'fill-rose-600 text-rose-600' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
                  <span className="uppercase tracking-widest font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {displayBrand}
                  </span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-[#191817] leading-tight">
                  {displayName}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mt-3 pt-2 text-xs font-mono">
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900">{product.rating || '4.9'}</span>
                    <span className="text-stone-400">({product.reviewCount || 42} reviews)</span>
                  </div>
                  <span className="text-stone-300">&bull;</span>
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      {isBn ? 'স্টকে আছে' : 'In Stock'} ({formatNumber(product.stock)} items)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-semibold">
                      {isBn ? 'স্টক শেষ' : 'Out of Stock'}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Panel */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-sm flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#FF5B37]">
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm font-mono text-gray-400 line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#FF5B37] bg-[#FFF0ED] px-2 py-0.5 rounded border border-[#FFD7CC]">
                      {isBn ? 'সাশ্রয়' : 'Save'} {formatPrice(product.regularPrice - price)}
                    </span>
                  </>
                )}
              </div>

              {/* Color Variation Selector */}
              {product.variations?.colors && product.variations.colors.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 uppercase tracking-wider font-mono">
                      {isBn ? 'রং নির্বাচন:' : 'Select Color:'}
                    </span>
                    <span className="text-stone-500 font-mono">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variations.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-stone-900 bg-white ring-2 ring-stone-900/15 text-stone-900 shadow-sm'
                            : 'border-stone-300 bg-white/60 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.variations?.sizes && product.variations.sizes.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 uppercase tracking-wider font-mono">
                      {isBn ? 'সাইজ নির্বাচন:' : 'Select Size:'}
                    </span>
                    <span className="text-stone-500 font-mono">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                          selectedSize === s
                            ? 'bg-[#191817] text-white border-[#191817] shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag / Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-2xl border border-stone-300 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 disabled:opacity-30 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="p-2 rounded-xl hover:bg-stone-100 text-stone-600 disabled:opacity-30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`flex-1 py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FF5B37] text-white hover:bg-[#FA4A23]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{isBn ? 'ব্যাগে যোগ হয়েছে' : 'Added to Bag'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t('addToCart')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full py-3.5 px-6 rounded-xl bg-gray-900 text-white hover:bg-black text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{t('buyNow')}</span>
                </button>
              </div>

              {/* Express Delivery Information Box */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 font-mono">
                      {isBn ? 'দ্রুত হোম ডেলিভারি' : 'Express Home Delivery'}
                    </p>
                    <p className="text-stone-500 text-[11px] mt-0.5 font-mono">
                      {isBn
                        ? 'ঢাকা সিটি: ২৪-৪৮ ঘণ্টা (৳৬০) • ঢাকার বাইরে: ২-৪ দিন (৳১২০)'
                        : 'Inside Dhaka: 24-48 hrs (৳60) • Outside Dhaka: 2-4 days (৳120)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-stone-100">
                  <RefreshCw className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-stone-900 font-mono">
                      {isBn ? '৭ দিনের সহজ এক্সচেঞ্জ' : '7-Day Return & Exchange'}
                    </p>
                    <p className="text-stone-500 text-[11px] mt-0.5 font-mono">
                      {isBn
                        ? 'দরজায় কোনো ঝামেলা ছাড়াই সাইজ বা কালার এক্সচেঞ্জ সুবিধা।'
                        : 'Doorstep size and color replacement nationwide.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabbed Content: Details / Specifications / Shipping */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex border-b border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2.5 px-3 border-b-2 font-mono uppercase tracking-wider transition-colors ${
                      activeTab === 'desc'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {isBn ? 'বিবরণ' : 'Description'}
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 px-3 border-b-2 font-mono uppercase tracking-wider transition-colors ${
                      activeTab === 'specs'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {isBn ? 'স্পেসিফিকেশন' : 'Details & Care'}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 px-3 border-b-2 font-mono uppercase tracking-wider transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {isBn ? 'ডেলিভারি' : 'Shipping'}
                  </button>
                </div>

                <div className="pt-4 text-xs text-stone-600 leading-relaxed font-sans">
                  {activeTab === 'desc' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      {product.descriptionBn && (
                        <p className="text-stone-500 pt-1 font-bengali">
                          {product.descriptionBn}
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-400">Brand</span>
                        <span className="text-stone-900 font-semibold">{product.brand || 'SHOKHORA'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-400">Category</span>
                        <span className="text-stone-900 font-semibold">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-400">Item SKU</span>
                        <span className="text-stone-900 font-semibold">{product.sku}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-400">Origin</span>
                        <span className="text-stone-900 font-semibold">Bangladesh</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2 font-sans">
                      <p>
                        {isBn
                          ? 'আমাদের নিজস্ব ডেলিভারি পার্টনারের মাধ্যমে ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি দেওয়া হয়। ডেলিভারিম্যান উপস্থিত থাকা অবস্থায় পণ্য চেক করে রিসিভ করার সুযোগ রয়েছে।'
                          : 'Orders are dispatched via trusted courier networks across Bangladesh. You may inspect your package upon delivery before completing cash payment.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-stone-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-400 font-semibold">
                    {isBn ? 'একই ক্যাটাগরির পণ্য' : 'Curated Matching'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 mt-1">
                    {isBn ? 'সম্পর্কিত অন্যান্য পণ্য' : 'You May Also Cherish'}
                  </h2>
                </div>
                <Link
                  href={`/category/${product.category}`}
                  className="text-xs uppercase tracking-widest font-bold text-stone-900 hover:text-stone-600 font-mono"
                >
                  {isBn ? 'সব দেখুন' : 'View All'} &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
