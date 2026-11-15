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

  const freeDeliveryThreshold = settings?.freeDeliveryThreshold || 1500;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#191817]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-[#FAF7F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif font-medium text-lg text-stone-900">
                {isBn ? 'আপনার শপিং ব্যাগ' : 'Shopping Bag'}
              </h2>
              <span className="text-xs font-mono font-bold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <p className="text-emerald-900 font-mono text-[11px]">
                  {isBn ? 'আর মাত্র ' : 'Add '}
                  <strong className="text-emerald-950 font-bold">{formatPrice(amountNeededForFreeDelivery)}</strong>
                  {isBn ? ' যোগ করলেই ঢাকা সিটিতে ফ্রি ডেলিভারি!' : ' more to get FREE delivery in Dhaka!'}
                </p>
                <div className="w-full h-1.5 rounded-full bg-emerald-200/70 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-900 font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{isBn ? 'অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।' : 'Congratulations! You unlocked FREE Delivery.'}</span>
              </p>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-medium text-lg text-stone-900">
                  {isBn ? 'ব্যাগটি বর্তমানে খালি' : 'Your bag is empty'}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  {isBn
                    ? 'আমাদের নতুন কালেকশন এবং বেস্টসেলারগুলো ঘুরে দেখুন।'
                    : 'Discover our handcrafted mulberry silk and lifestyle collections.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#191817] text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
                >
                  <span>{isBn ? 'শপিং শুরু করুন' : 'Start Shopping'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = item.price;
                const displayName = item.name;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-stone-200/80"
                  >
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0 border border-stone-200">
                      <Image
                        src={item.image || '/images/Logo-01.png'}
                        alt={displayName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-medium text-xs sm:text-sm text-stone-900 line-clamp-2">
                            {displayName}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-stone-400 hover:text-rose-600 transition-colors shrink-0"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {(item.selectedColor || item.selectedSize) && (
                          <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                            {item.selectedColor && `Color: ${item.selectedColor} `}
                            {item.selectedSize && `• Size: ${item.selectedSize}`}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Stepper */}
                        <div className="flex items-center rounded-lg border border-stone-300 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-xs sm:text-sm text-stone-900">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Panel */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FAF7F2] space-y-4">
              {/* Delivery Zone Switch */}
              <div className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-stone-200 font-mono">
                <span className="text-stone-500 text-[11px]">Delivery Location:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setDeliveryZone('inside-dhaka')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      deliveryZone === 'inside-dhaka'
                        ? 'bg-[#191817] text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Dhaka (৳60)
                  </button>
                  <button
                    onClick={() => setDeliveryZone('outside-dhaka')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      deliveryZone === 'outside-dhaka'
                        ? 'bg-[#191817] text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Outside (৳120)
                  </button>
                </div>
              </div>

              {/* Subtotal, Shipping, Total */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-stone-600">
                  <span>{t('subtotal')}:</span>
                  <span className="font-bold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({coupon.code}):</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping:</span>
                  <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total BDT:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#477765] text-white hover:bg-[#10252B] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span>{isBn ? 'অর্ডার সম্পন্ন করুন' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-mono text-stone-600 hover:text-stone-950 block"
                >
                  {isBn ? 'সম্পূর্ণ কার্ট পেজ দেখুন' : 'View Detailed Bag & Apply Coupon'} &rarr;
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
