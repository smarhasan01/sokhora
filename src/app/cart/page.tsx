'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryCharge,
    deliveryZone,
    setDeliveryZone,
    coupon,
    couponDiscount,
    couponError,
    applyCouponCode,
    removeCoupon,
    total,
    settings,
  } = useCart();

  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const [couponInput, setCouponInput] = useState('');

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCouponCode(couponInput.trim());
    if (ok) setCouponInput('');
  };

  const amountNeededForFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / settings.freeDeliveryThreshold) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900 transition-colors">
            {t('navHome')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('cartTitle')}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 mb-8">
          {t('cartTitle')} ({formatNumber(items.length)} {t('items')})
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-taupe-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center mx-auto text-charcoal-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold text-charcoal-900">
              {t('cartEmptyTitle')}
            </h2>
            <p className="text-xs text-charcoal-500">
              {t('cartEmptySubtitle')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-950 text-white rounded-full text-xs font-semibold hover:bg-charcoal-800 transition-all shadow-md"
            >
              <span>{t('shopNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
              {/* Free Delivery Bar */}
              <div className="bg-taupe-50 p-4 rounded-2xl border border-taupe-200">
                <div className="flex items-center justify-between text-xs font-medium text-charcoal-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-sage-600" />
                    {amountNeededForFreeDelivery > 0 ? (
                      <span>
                        {isBn ? (
                          <>
                            আর <strong className="text-charcoal-950">{formatPrice(amountNeededForFreeDelivery)}</strong> টাকার কেনাকাটায় পাবেন <strong className="text-sage-700">ফ্রি ডেলিভারি</strong>
                          </>
                        ) : (
                          <>
                            Add <strong>{formatPrice(amountNeededForFreeDelivery)}</strong> more for <strong className="text-sage-700">FREE Nationwide Delivery</strong>
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {isBn ? 'অভিনন্দন! আপনি ফ্রি ডেলিভারি আনলক করেছেন!' : 'Congratulations! You unlocked FREE shipping!'}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-xs font-bold">{formatNumber(progressPercent)}%</span>
                </div>
                <div className="w-full bg-taupe-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sage-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-taupe-100">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-taupe-100 border border-taupe-200 flex-shrink-0">
                        <Image
                          src={item.image || '/images/Logo-01.png'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <Link
                          href={`/product/${item.productId}`}
                          className="font-medium text-sm sm:text-base text-charcoal-900 hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {(item.selectedColor || item.selectedSize) && (
                          <p className="text-xs text-charcoal-500 mt-0.5">
                            {item.selectedColor && `${isBn ? 'রং' : 'Color'}: ${item.selectedColor}`}
                            {item.selectedColor && item.selectedSize && ' • '}
                            {item.selectedSize && `${isBn ? 'সাইজ' : 'Size'}: ${item.selectedSize}`}
                          </p>
                        )}
                        <p className="text-xs text-charcoal-400 font-mono mt-0.5">SKU: {item.sku}</p>
                        <p className="text-xs font-semibold text-charcoal-900 mt-1 sm:hidden">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-charcoal-400">{isBn ? 'মূল্য' : 'Unit Price'}</p>
                        <p className="text-sm font-semibold text-charcoal-900 font-mono">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center border border-taupe-300 rounded-xl bg-white p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-taupe-100 rounded-lg text-charcoal-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-charcoal-900">
                          {formatNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1.5 hover:bg-taupe-100 rounded-lg text-charcoal-700 disabled:opacity-40 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-right min-w-[70px]">
                        <p className="text-sm sm:text-base font-bold font-mono text-charcoal-950">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-taupe-400 hover:text-rose-600 p-2 rounded-lg hover:bg-taupe-100 transition-colors"
                        title={isBn ? 'পণ্যটি সরান' : 'Remove item'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-taupe-200 text-xs">
                <button
                  onClick={clearCart}
                  className="text-rose-600 hover:text-rose-800 font-medium"
                >
                  {isBn ? 'ব্যাগ খালি করুন' : 'Clear Bag'}
                </button>
                <Link href="/shop" className="text-charcoal-700 hover:text-charcoal-950 font-medium flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('continueShopping')}</span>
                </Link>
              </div>
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
              <h2 className="text-lg font-serif font-bold text-charcoal-950 pb-4 border-b border-taupe-200">
                {t('orderSummary')}
              </h2>

              {/* Delivery Zone Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                  {isBn ? 'ডেলিভারি এরিয়া নির্বাচন করুন' : 'Select Delivery Zone'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('inside-dhaka')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryZone === 'inside-dhaka'
                        ? 'border-charcoal-900 bg-taupe-50 font-semibold text-charcoal-900 shadow-sm'
                        : 'border-taupe-200 text-charcoal-600 hover:bg-taupe-50'
                    }`}
                  >
                    <p className="font-medium">{isBn ? 'ঢাকার ভেতরে' : 'Inside Dhaka'}</p>
                    <p className="text-[11px] text-charcoal-500 font-mono mt-0.5">
                      {subtotal >= settings.freeDeliveryThreshold ? (isBn ? 'ফ্রি' : 'FREE') : formatPrice(settings.insideDhakaDeliveryFee)}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryZone('outside-dhaka')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryZone === 'outside-dhaka'
                        ? 'border-charcoal-900 bg-taupe-50 font-semibold text-charcoal-900 shadow-sm'
                        : 'border-taupe-200 text-charcoal-600 hover:bg-taupe-50'
                    }`}
                  >
                    <p className="font-medium">{isBn ? 'ঢাকার বাইরে (৬৪ জেলা)' : 'Outside Dhaka'}</p>
                    <p className="text-[11px] text-charcoal-500 font-mono mt-0.5">
                      {subtotal >= settings.freeDeliveryThreshold ? (isBn ? 'ফ্রি' : 'FREE') : formatPrice(settings.outsideDhakaDeliveryFee)}
                    </p>
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
                  {t('couponCode')}
                </label>
                {coupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-700" />
                      <span className="font-semibold text-emerald-800">
                        {coupon.code} (-{formatPrice(couponDiscount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 underline text-xs font-semibold"
                    >
                      {isBn ? 'বাতিল' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SHOKHORA10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-taupe-300 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-charcoal-900 text-white rounded-xl text-xs font-semibold hover:bg-charcoal-800 transition-colors"
                    >
                      {t('applyCoupon')}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1.5">{couponError}</p>}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2.5 pt-4 border-t border-taupe-200 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono text-charcoal-900 font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{isBn ? 'ডিসকাউন্ট' : 'Discount'} ({coupon?.code})</span>
                    <span className="font-mono font-medium">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t('deliveryFee')}</span>
                  <span className="font-mono text-charcoal-900 font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">{isBn ? 'ফ্রি' : 'FREE'}</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-charcoal-950 pt-3 border-t border-taupe-200">
                  <span>{t('estimatedTotal')}</span>
                  <span className="font-mono text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Link */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Guarantee */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-taupe-600 text-center">
                <ShieldCheck className="w-4 h-4 text-sage-600" />
                <span>{isBn ? '১০০% নিরাপদ ও সুরক্ষিত চেকআউট' : '100% Secure Checkout & Guarantee'}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
