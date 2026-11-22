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

  const freeDeliveryThreshold = settings?.freeDeliveryThreshold || 1500;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-8">
          <Link href="/" className="hover:text-[#012D51] transition-colors">
            {t('navHome')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#012D51] font-semibold">{t('cartTitle')}</span>
        </div>

        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EAECEF]">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#C78703] font-semibold">
              {isBn ? 'আপনার নির্বাচন' : 'Review & Checkout'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#012D51] tracking-tight mt-1">
              {isBn ? 'শপিং ব্যাগ' : 'Your Shopping Bag'}
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono text-stone-400 hover:text-rose-600 transition-colors"
            >
              {t('clearCart')}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-[#F6F7F8] rounded-3xl border border-[#EAECEF] p-8 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-white text-[#012D51] flex items-center justify-center mx-auto mb-4 border border-[#EAECEF]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#012D51]">
              {t('emptyCart')}
            </h2>
            <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
              {isBn
                ? 'আপনার ব্যাগটি বর্তমানে খালি। আমাদের কালেকশনগুলো ঘুরে পছন্দের পণ্য বেছে নিন।'
                : 'Explore our latest collections to discover handcrafted luxury and lifestyle staples.'}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 rounded-full bg-[#012D51] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#C78703] transition-colors shadow-xs btn-press"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? 'কালেকশন দেখুন' : 'Explore Collections'}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery bar */}
              <div className="p-4 rounded-2xl bg-[#FDF8ED] border border-[#F8ECCB] text-xs">
                {amountNeededForFreeDelivery > 0 ? (
                  <div className="space-y-1.5">
                    <p className="text-[#012D51] font-mono text-xs">
                      {isBn ? 'আর মাত্র ' : 'Add '}
                      <strong className="font-bold text-[#C78703]">{formatPrice(amountNeededForFreeDelivery)}</strong>
                      {isBn
                        ? ' টাকার পণ্য যোগ করলেই ঢাকা সিটিতে ফ্রি হোম ডেলিভারি!'
                        : ' more to unlock FREE delivery in Dhaka City!'}
                    </p>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div
                        className="h-full bg-[#C78703] transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-emerald-900 font-mono font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isBn ? 'অভিনন্দন! আপনি ঢাকা সিটিতে ফ্রি ডেলিভারি পাচ্ছেন।' : 'Congratulations! You unlocked FREE Delivery in Dhaka City.'}</span>
                  </p>
                )}
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-[#EAECEF] divide-y divide-[#EAECEF] overflow-hidden shadow-xs">
                {items.map((item) => {
                  const itemPrice = item.price;
                  const displayName = item.name;
                  return (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                          <Image
                            src={item.image || '/images/shokhora-official-logo.png'}
                            alt={displayName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-semibold">
                            SHOKHORA
                          </span>
                          <Link href={`/product/${item.productId}`} className="block hover:text-stone-700">
                            <h3 className="font-serif font-medium text-sm sm:text-base text-stone-900 line-clamp-1">
                              {displayName}
                            </h3>
                          </Link>
                          {(item.selectedColor || item.selectedSize) && (
                            <p className="text-xs text-stone-500 font-mono">
                              {item.selectedColor && `Color: ${item.selectedColor} `}
                              {item.selectedSize && `• Size: ${item.selectedSize}`}
                            </p>
                          )}
                          <p className="text-xs font-mono text-stone-600 sm:hidden">
                            {formatPrice(itemPrice)} each
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        {/* Stepper */}
                        <div className="flex items-center rounded-xl border border-stone-300 bg-white p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="font-mono font-bold text-sm sm:text-base text-stone-900 min-w-[80px] text-right">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-900 hover:text-stone-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isBn ? 'আরো কেনাকাটা করুন' : 'Continue Shopping'}</span>
                </Link>
              </div>
            </div>

            {/* Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#F6F7F8] rounded-3xl border border-[#EAECEF] p-6 sm:p-7 shadow-xs space-y-6">
                <h2 className="font-bold text-lg text-[#012D51] pb-3 border-b border-[#EAECEF]">
                  {t('orderSummary')}
                </h2>

                {/* Delivery Zone Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                    {t('deliveryLocation')}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('inside-dhaka')}
                      className={`p-3 rounded-2xl border text-center transition-all btn-press ${
                        deliveryZone === 'inside-dhaka'
                          ? 'border-[#012D51] bg-[#012D51] text-white shadow-xs'
                          : 'border-[#EAECEF] bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block font-bold">{t('insideDhaka')}</span>
                      <span className="text-[10px] opacity-80">৳৭০ (২৪-৪৮ ঘণ্টা)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('outside-dhaka')}
                      className={`p-3 rounded-2xl border text-center transition-all btn-press ${
                        deliveryZone === 'outside-dhaka'
                          ? 'border-[#012D51] bg-[#012D51] text-white shadow-xs'
                          : 'border-[#EAECEF] bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="block font-bold">{t('outsideDhaka')}</span>
                      <span className="text-[10px] opacity-80">৳১৩০ (২-৪ দিন)</span>
                    </button>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                    {t('promoCode')}
                  </span>
                  {coupon ? (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#F8ECCB] text-xs font-mono text-[#012D51]">
                      <div>
                        <span className="font-bold">{coupon.code}</span>
                        <span className="text-[#C78703] ml-1.5">(-{formatPrice(couponDiscount)})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-rose-600 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponSubmit} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="SHOKHORA10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#EAECEF] text-xs font-mono uppercase focus:outline-none focus:border-[#012D51]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-[#012D51] text-white text-xs font-mono font-bold uppercase hover:bg-[#C78703] transition-colors shadow-xs btn-press"
                      >
                        {t('apply')}
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-xs text-rose-600 font-mono">{couponError}</p>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-[#EAECEF] text-xs font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>{t('subtotal')}:</span>
                    <span className="font-bold text-[#012D51]">{formatPrice(subtotal)}</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-[#C78703] font-bold">
                      <span>{t('discount')}:</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>{t('deliveryFee')}:</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#012D51] pt-3 border-t border-[#EAECEF]">
                    <span>{t('total')}:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-3.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-md btn-press"
                >
                  <span>{isBn ? 'চেকআউট করুন' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
