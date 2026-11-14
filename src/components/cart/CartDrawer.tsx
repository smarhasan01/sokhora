'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCouponCode(couponInput.trim());
    if (ok) {
      setCouponInput('');
    }
  };

  const amountNeededForFreeDelivery = Math.max(0, settings.freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / settings.freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-taupe-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-taupe-100 rounded-full text-charcoal-900">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-charcoal-900">{t('cartTitle')}</h2>
                <p className="text-xs text-charcoal-500">
                  {formatNumber(items.length)} {t('items')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-charcoal-400 hover:text-charcoal-700 hover:bg-taupe-100 rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-taupe-50 px-4 py-3 border-b border-taupe-200">
            <div className="flex items-center justify-between text-xs font-medium text-charcoal-800 mb-1.5">
              <span className="flex items-center gap-1.5 truncate">
                <Truck className="w-4 h-4 text-sage-600 shrink-0" />
                {amountNeededForFreeDelivery > 0 ? (
                  <span className="truncate">
                    {isBn ? (
                      <>
                        আর <strong className="text-charcoal-950">{formatPrice(amountNeededForFreeDelivery)}</strong> টাকার অর্ডারে <strong className="text-sage-700">ফ্রি ডেলিভারি</strong>
                      </>
                    ) : (
                      <>
                        Add <strong>{formatPrice(amountNeededForFreeDelivery)}</strong> for <strong className="text-sage-700">FREE Delivery</strong>
                      </>
                    )}
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 truncate">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> {isBn ? 'ফ্রি ডেলিভারি আনলক হয়েছে!' : 'FREE Delivery unlocked!'}
                  </span>
                )}
              </span>
              <span className="font-mono text-xs shrink-0">{formatNumber(progressPercent)}%</span>
            </div>
            <div className="w-full bg-taupe-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-sage-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-taupe-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-taupe-100 flex items-center justify-center text-taupe-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-charcoal-900">{t('cartEmptyTitle')}</h3>
                <p className="text-xs text-charcoal-500 max-w-xs">
                  {t('cartEmptySubtitle')}
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-charcoal-900 text-white rounded-full text-xs font-medium hover:bg-charcoal-800 transition-colors shadow-sm"
                >
                  {t('shopNow')}
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-taupe-100 flex-shrink-0 border border-taupe-200">
                    <Image
                      src={item.image || '/images/Logo-01.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-xs sm:text-sm text-charcoal-900 hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-taupe-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-charcoal-500 mt-0.5">
                          {item.selectedColor && `${isBn ? 'রং' : 'Color'}: ${item.selectedColor}`}
                          {item.selectedColor && item.selectedSize && ' | '}
                          {item.selectedSize && `${isBn ? 'সাইজ' : 'Size'}: ${item.selectedSize}`}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-charcoal-900 mt-1">
                        {formatPrice(item.price)}
                        {item.regularPrice > item.price && (
                          <span className="text-[10px] text-charcoal-400 line-through ml-1.5 font-normal">
                            {formatPrice(item.regularPrice)}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-taupe-300 rounded-lg bg-white p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-taupe-100 rounded text-charcoal-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {formatNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:bg-taupe-100 rounded text-charcoal-600 disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono font-bold text-xs text-charcoal-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-taupe-200 bg-ivory-50 space-y-4">
              {/* Delivery Zone Toggle in Drawer */}
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside-dhaka')}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    deliveryZone === 'inside-dhaka'
                      ? 'border-charcoal-900 bg-white font-semibold text-charcoal-900 shadow-2xs'
                      : 'border-taupe-200 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  {isBn ? 'ঢাকার ভেতরে (৳৭০)' : 'Inside Dhaka (৳70)'}
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside-dhaka')}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all ${
                    deliveryZone === 'outside-dhaka'
                      ? 'border-charcoal-900 bg-white font-semibold text-charcoal-900 shadow-2xs'
                      : 'border-taupe-200 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  {isBn ? 'ঢাকার বাইরে (৳১৩০)' : 'Outside Dhaka (৳130)'}
                </button>
              </div>

              {/* Coupon */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <span className="font-semibold text-emerald-800">
                      {coupon.code} (-{formatPrice(couponDiscount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
                    >
                      {isBn ? 'বাতিল' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. SHOKHORA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-taupe-300 text-xs uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-charcoal-900 text-white rounded-lg text-xs font-semibold hover:bg-charcoal-800"
                    >
                      {t('applyCoupon')}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-600">
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
                <div className="flex justify-between text-sm font-bold text-charcoal-950 pt-2 border-t border-taupe-200">
                  <span>{t('estimatedTotal')}</span>
                  <span className="font-mono">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block py-2.5 text-center text-xs text-charcoal-700 hover:text-charcoal-950 font-medium"
                >
                  {isBn ? 'সম্পূর্ণ শপিং ব্যাগ দেখুন' : 'View Full Shopping Bag'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
