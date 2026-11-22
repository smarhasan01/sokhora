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
    total,
    settings,
  } = useCart();

  const { isBn, t, formatPrice } = useLanguage();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = settings?.freeDeliveryThreshold || 1500;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#012D51]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#EAECEF] animate-slide-up">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EAECEF] bg-[#F6F7F8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#012D51] border border-[#EAECEF] shadow-xs">
                <ShoppingBag className="w-4 h-4 text-[#012D51]" />
              </div>
              <h2 className="font-bold text-base text-[#012D51]">
                {isBn ? 'আপনার শপিং ব্যাগ' : 'Shopping Bag'}
              </h2>
              <span className="text-xs font-mono font-bold text-[#C78703] bg-white px-2.5 py-0.5 rounded-full border border-[#EAECEF] shadow-xs">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-[#012D51] hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="p-3.5 bg-[#FDF8ED] border-b border-[#F8ECCB] text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[#012D51] font-mono text-[11px]">
                  {isBn ? 'আর মাত্র ' : 'Add '}
                  <strong className="text-[#C78703] font-bold">{formatPrice(amountNeededForFreeDelivery)}</strong>
                  {isBn ? ' যোগ করলেই ফ্রি ডেলিভারি!' : ' more to get FREE nationwide delivery!'}
                </p>
                <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-[#C78703] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isBn ? 'অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।' : 'Congratulations! You unlocked FREE delivery.'}</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F6F7F8] flex items-center justify-center text-stone-400 border border-[#EAECEF]">
                  <ShoppingBag className="w-8 h-8 text-[#012D51]" />
                </div>
                <h3 className="font-bold text-base text-[#012D51]">
                  {isBn ? 'আপনার ব্যাগটি খালি' : 'Your bag is empty'}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  {isBn
                    ? 'আমাদের কালেকশন থেকে আপনার পছন্দের সিল্ক স্ক্রাঞ্চি, ব্রাস জুয়েলারি ও লাইফস্টাইল পণ্য বেছে নিন।'
                    : 'Explore our curated collections and add your favorite lifestyle items to cart.'}
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs btn-press"
                >
                  {isBn ? 'কেনাকাটা শুরু করুন' : 'Start Shopping'}
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#F6F7F8] border border-[#EAECEF] relative group"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-[#EAECEF] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#012D51] line-clamp-1">
                      {item.name}
                    </h4>

                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-[11px] text-stone-500 font-mono">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedColor && item.selectedSize && <span> • </span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 font-mono">
                      <span className="font-bold text-xs sm:text-sm text-[#012D51]">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white rounded-full border border-[#EAECEF] px-2 py-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-500 hover:text-[#012D51] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-[#252525]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="text-stone-500 hover:text-[#012D51] disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Panel */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAECEF] bg-[#F6F7F8] space-y-3.5">
              {/* Delivery Zone Switch */}
              <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-[#EAECEF] font-mono">
                <span className="text-stone-500 text-[11px] font-sans">
                  {isBn ? 'ডেলিভারি লোকেশন:' : 'Delivery Location:'}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('inside-dhaka')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      deliveryZone === 'inside-dhaka'
                        ? 'bg-[#012D51] text-white shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Dhaka (৳70)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('outside-dhaka')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      deliveryZone === 'outside-dhaka'
                        ? 'bg-[#012D51] text-white shadow-xs'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Outside (৳130)
                  </button>
                </div>
              </div>

              {/* Subtotal, Shipping, Total */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-stone-600">
                  <span>{t('subtotal')}:</span>
                  <span className="font-bold text-[#012D51]">{formatPrice(subtotal)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-[#C78703] font-bold">
                    <span>Discount ({coupon.code}):</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping:</span>
                  <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#012D51] pt-2 border-t border-[#EAECEF]">
                  <span>Total BDT:</span>
                  <span className="text-[#012D51]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#012D51] hover:bg-[#C78703] text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-md btn-press"
                >
                  <span>{isBn ? 'অর্ডার সম্পন্ন করুন' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 text-center text-xs font-bold text-[#012D51] hover:text-[#C78703] block transition-colors"
                >
                  {isBn ? 'সম্পূর্ণ কার্ট পেজ দেখুন ও কুপন দিন' : 'View Detailed Bag & Apply Coupon'} &rarr;
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
