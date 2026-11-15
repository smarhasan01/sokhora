'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { createOrder } from '@/lib/db/store';
import { isValidBdPhone, BD_DISTRICTS } from '@/lib/utils/formatters';
import { PaymentMethod, DeliveryDetails } from '@/types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
  Info,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { isBn, t, formatPrice, formatNumber } = useLanguage();
  const {
    items,
    subtotal,
    deliveryCharge,
    deliveryZone,
    setDeliveryZone,
    coupon,
    couponDiscount,
    total,
    clearCart,
    settings,
  } = useCart();

  // Form State
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [district, setDistrict] = useState(deliveryZone === 'inside-dhaka' ? 'Dhaka' : 'Chattogram');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [bkashSender, setBkashSender] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [nagadSender, setNagadSender] = useState('');
  const [nagadTrxId, setNagadTrxId] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Auto sync delivery zone if district changes
  const handleDistrictChange = (d: string) => {
    setDistrict(d);
    if (d === 'Dhaka') {
      setDeliveryZone('inside-dhaka');
    } else {
      setDeliveryZone('outside-dhaka');
    }
  };

  const merchantNumber = '01568923850';

  const copyMerchantNumber = (num: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(num);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = isBn ? 'আপনার পূর্ণ নাম লিখুন' : 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = isBn ? 'আপনার মোবাইল নম্বর লিখুন' : 'Please enter your mobile phone number';
    } else if (!isValidBdPhone(phone)) {
      errs.phone = isBn ? 'সঠিক বাংলাদেশি নম্বর দিন (যেমন: 017XXXXXXXX)' : 'Please enter a valid Bangladeshi number (e.g. 017XXXXXXXX)';
    }

    if (!district) errs.district = isBn ? 'জেলা নির্বাচন করুন' : 'Please select your delivery district';
    if (!area.trim()) errs.area = isBn ? 'থানা বা এলাকা লিখুন' : 'Please enter your Upazila or Area';
    if (!address.trim()) errs.address = isBn ? 'বিস্তারিত ডেলিভারি ঠিকানা লিখুন' : 'Please enter your detailed delivery address';

    // Payment validation
    if (paymentMethod === 'bKash') {
      if (!bkashSender.trim()) errs.bkashSender = isBn ? 'বিকাশ প্রেরক নম্বর লিখুন' : 'Please enter the bKash sender number';
      if (!bkashTrxId.trim()) errs.bkashTrxId = isBn ? 'বিকাশ ট্রানজেকশন আইডি (TrxID) দিন' : 'Please enter your bKash Transaction ID';
    } else if (paymentMethod === 'Nagad') {
      if (!nagadSender.trim()) errs.nagadSender = isBn ? 'নগদ প্রেরক নম্বর লিখুন' : 'Please enter the Nagad sender number';
      if (!nagadTrxId.trim()) errs.nagadTrxId = isBn ? 'নগদ ট্রানজেকশন আইডি (TrxID) দিন' : 'Please enter your Nagad Transaction ID';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      router.push('/shop');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const customerDetails: DeliveryDetails = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        district,
        area: area.trim(),
        address: address.trim(),
        notes: notes.trim() || undefined,
        deliveryZone,
      };

      const manualDetails =
        paymentMethod === 'bKash'
          ? { senderNumber: bkashSender.trim(), transactionId: bkashTrxId.trim() }
          : paymentMethod === 'Nagad'
          ? { senderNumber: nagadSender.trim(), transactionId: nagadTrxId.trim() }
          : undefined;

      const order = createOrder({
        customer: customerDetails,
        userId: user?.uid,
        isGuest: !user,
        items: items.map((it) => ({
          productId: it.productId,
          name: it.name,
          image: it.image,
          sku: it.sku,
          price: it.price,
          quantity: it.quantity,
          subtotal: it.price * it.quantity,
          selectedColor: it.selectedColor,
          selectedSize: it.selectedSize,
        })),
        subtotal,
        discount: couponDiscount,
        deliveryCharge,
        total,
        paidAmount: 0,
        couponCode: coupon?.code,
        paymentMethod,
        paymentStatus: 'Unpaid',
        orderStatus: 'Pending',
        manualPaymentDetails: manualDetails,
      });

      // Clear Cart
      clearCart();

      // Redirect to Order Confirmation
      router.push(`/order/${order.id}`);
    } catch (err) {
      console.error('Failed to create order:', err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-2">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-stone-900">{t('cartEmptyTitle')}</h2>
          <p className="text-xs text-stone-500 font-mono">{t('cartEmptySubtitle')}</p>
          <Link href="/shop" className="mt-2 px-8 py-3.5 bg-[#191817] text-white rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-md">
            {t('shopNow')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 font-mono mb-8">
          <Link href="/" className="hover:text-stone-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/cart" className="hover:text-stone-900">{t('cartTitle')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">{t('checkoutTitle')}</span>
        </nav>

        {/* Phase 1 Prototype Notice Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-mono">
            <p className="font-bold">{isBn ? 'ফেজ ১ ফ্রন্টএন্ড ডেমো চেকআউট' : 'Phase 1 Frontend Demonstration Mode'}</p>
            <p className="text-amber-800 mt-1">
              {t('checkoutDisclaimer')}
            </p>
          </div>
        </div>

        <div className="mb-8 pb-4 border-b border-stone-200">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-400 font-semibold">
            {isBn ? 'নিরাপদ চেকআউট' : 'Secure Checkout'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#191817] mt-1">
            {t('checkoutTitle')}
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Delivery Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-taupe-200">
                <h2 className="text-base font-bold text-charcoal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-charcoal-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                  {t('deliveryAddressTitle')}
                </h2>
                {!user && (
                  <span className="text-[11px] text-taupe-600 font-medium bg-taupe-100 px-2.5 py-1 rounded-full">
                    {isBn ? 'গেস্ট চেকআউট' : 'Guest Checkout'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusrat Anjum"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-rose-500 ring-rose-200' : 'border-taupe-300 focus:ring-charcoal-800'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 ${
                      errors.phone ? 'border-rose-500 ring-rose-200' : 'border-taupe-300 focus:ring-charcoal-800'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('emailOptional')}
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('district')} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                  >
                    {BD_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} {dist === 'Dhaka' ? `(${isBn ? 'ঢাকার ভেতরে - ৳৭০' : 'Inside Dhaka - ৳70'})` : `(${isBn ? 'ঢাকার বাইরে - ৳১৩০' : 'Outside Dhaka - ৳130'})`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area / Upazila */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('area')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhanmondi, Mirpur, or Sadar"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                      errors.area ? 'border-rose-500 ring-rose-200' : 'border-taupe-300 focus:ring-charcoal-800'
                    }`}
                  />
                  {errors.area && <p className="text-[11px] text-rose-600 mt-1">{errors.area}</p>}
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('fullAddress')} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. House 42, Road 4/A, Flat 3B, Dhanmondi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                      errors.address ? 'border-rose-500 ring-rose-200' : 'border-taupe-300 focus:ring-charcoal-800'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    {t('deliveryNotes')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arrival or deliver after 2 PM"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-5">
              <div className="pb-3 border-b border-taupe-200">
                <h2 className="text-base font-bold text-charcoal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-charcoal-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                  {t('paymentMethodTitle')}
                </h2>
              </div>

              <div className="space-y-3">
                {/* Method 1: Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-charcoal-900 bg-taupe-50/70 shadow-sm'
                      : 'border-taupe-200 hover:bg-taupe-50/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-1 text-charcoal-900 focus:ring-charcoal-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs sm:text-sm font-semibold text-charcoal-900">
                        {t('paymentCod')}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                      {t('paymentCodDesc')}
                    </p>
                  </div>
                </label>

                {/* Method 2: Manual bKash */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bKash'
                      ? 'border-pink-600 bg-pink-50/40 shadow-sm'
                      : 'border-taupe-200 hover:bg-taupe-50/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bKash'}
                    onChange={() => setPaymentMethod('bKash')}
                    className="mt-1 text-pink-600 focus:ring-pink-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-pink-700">
                          {t('paymentBkash')}
                        </span>
                        <span className="text-[10px] bg-pink-100 text-pink-800 font-semibold px-2 py-0.5 rounded">
                          Send Money / Payment
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      {t('paymentBkashDesc')}
                    </p>

                    {/* bKash instructions & input fields */}
                    {paymentMethod === 'bKash' && (
                      <div className="mt-4 pt-4 border-t border-pink-200/80 space-y-3 bg-white p-4 rounded-xl border">
                        <div className="flex items-center justify-between text-xs bg-pink-50 p-2.5 rounded-lg border border-pink-200">
                          <div>
                            <p className="text-[11px] text-pink-700 font-medium">bKash Account / Merchant No:</p>
                            <p className="font-mono font-bold text-charcoal-900 text-sm">
                              {merchantNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyMerchantNumber(merchantNumber)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-pink-700 font-semibold text-xs border border-pink-300 hover:bg-pink-100"
                          >
                            {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            {copiedNumber ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি করুন' : 'Copy')}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              {isBn ? 'আপনার বিকাশ নম্বর *' : 'Your bKash Sender Number *'}
                            </label>
                            <input
                              type="tel"
                              placeholder="01XXXXXXXXX"
                              value={bkashSender}
                              onChange={(e) => setBkashSender(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-taupe-300 font-mono text-xs focus:ring-1 focus:ring-pink-600 focus:outline-none"
                            />
                            {errors.bkashSender && <p className="text-[10px] text-rose-600 mt-0.5">{errors.bkashSender}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              {isBn ? 'ট্রানজেকশন আইডি (TrxID) *' : 'bKash Transaction ID (TrxID) *'}
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. BK9X82KL01"
                              value={bkashTrxId}
                              onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                              className="w-full px-3 py-2 rounded-lg border border-taupe-300 font-mono text-xs uppercase focus:ring-1 focus:ring-pink-600 focus:outline-none"
                            />
                            {errors.bkashTrxId && <p className="text-[10px] text-rose-600 mt-0.5">{errors.bkashTrxId}</p>}
                          </div>
                        </div>

                        <p className="text-[11px] text-charcoal-500 italic">
                          {isBn
                            ? '*নোট: এটি একটি ম্যানুয়াল পেমেন্ট প্লেসহোল্ডার। ট্রানজেকশন আইডি অ্যাডমিন প্যানেল থেকে যাচাই না করা পর্যন্ত পেমেন্ট Unpaid থাকবে।'
                            : '*Note: This is a manual payment placeholder. The order will remain Unpaid until verified by the admin.'}
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 3: Manual Nagad */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Nagad'
                      ? 'border-orange-600 bg-orange-50/40 shadow-sm'
                      : 'border-taupe-200 hover:bg-taupe-50/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Nagad'}
                    onChange={() => setPaymentMethod('Nagad')}
                    className="mt-1 text-orange-600 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-orange-700">
                          {t('paymentNagad')}
                        </span>
                        <span className="text-[10px] bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded">
                          Send Money
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      {t('paymentNagadDesc')}
                    </p>

                    {/* Nagad instructions & input fields */}
                    {paymentMethod === 'Nagad' && (
                      <div className="mt-4 pt-4 border-t border-orange-200/80 space-y-3 bg-white p-4 rounded-xl border">
                        <div className="flex items-center justify-between text-xs bg-orange-50 p-2.5 rounded-lg border border-orange-200">
                          <div>
                            <p className="text-[11px] text-orange-700 font-medium">Nagad Account No:</p>
                            <p className="font-mono font-bold text-charcoal-900 text-sm">
                              {merchantNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyMerchantNumber(merchantNumber)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-orange-700 font-semibold text-xs border border-orange-300 hover:bg-orange-100"
                          >
                            {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            {copiedNumber ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি করুন' : 'Copy')}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              {isBn ? 'আপনার নগদ নম্বর *' : 'Your Nagad Sender Number *'}
                            </label>
                            <input
                              type="tel"
                              placeholder="01XXXXXXXXX"
                              value={nagadSender}
                              onChange={(e) => setNagadSender(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-taupe-300 font-mono text-xs focus:ring-1 focus:ring-orange-600 focus:outline-none"
                            />
                            {errors.nagadSender && <p className="text-[10px] text-rose-600 mt-0.5">{errors.nagadSender}</p>}
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              {isBn ? 'ট্রানজেকশন আইডি (TrxID) *' : 'Nagad Transaction ID (TrxID) *'}
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. NGD83921AA"
                              value={nagadTrxId}
                              onChange={(e) => setNagadTrxId(e.target.value.toUpperCase())}
                              className="w-full px-3 py-2 rounded-lg border border-taupe-300 font-mono text-xs uppercase focus:ring-1 focus:ring-orange-600 focus:outline-none"
                            />
                            {errors.nagadTrxId && <p className="text-[10px] text-rose-600 mt-0.5">{errors.nagadTrxId}</p>}
                          </div>
                        </div>

                        <p className="text-[11px] text-charcoal-500 italic">
                          {isBn
                            ? '*নোট: নগদ ট্রানজেকশন সম্পন্ন করার পর এডমিন ভেরিফাই করবে।'
                            : '*Note: Order verification will occur once transaction is reviewed.'}
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-charcoal-950 pb-3 border-b border-taupe-200">
              {t('orderSummary')} ({formatNumber(items.length)} {t('items')})
            </h2>

            {/* Items mini list */}
            <div className="max-h-60 overflow-y-auto divide-y divide-taupe-100 pr-1">
              {items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-taupe-100 border border-taupe-200 shrink-0">
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-900 line-clamp-1">{it.name}</p>
                      <p className="text-[11px] text-charcoal-500">
                        {formatPrice(it.price)} × {formatNumber(it.quantity)}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-charcoal-950 shrink-0">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation */}
            <div className="space-y-2 pt-4 border-t border-taupe-200 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-mono font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>{isBn ? 'কুপন ডিসকাউন্ট' : 'Coupon Discount'} ({coupon?.code})</span>
                  <span className="font-mono font-medium">-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('deliveryFee')} ({district === 'Dhaka' ? (isBn ? 'ঢাকা' : 'Dhaka') : (isBn ? 'ঢাকার বাইরে' : 'Outside')})</span>
                <span className="font-mono font-medium text-charcoal-900">
                  {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">{isBn ? 'ফ্রি' : 'FREE'}</span> : formatPrice(deliveryCharge)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-charcoal-950 pt-3 border-t border-taupe-200">
                <span>{t('estimatedTotal')}</span>
                <span className="font-mono text-xl">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FF5B37] hover:bg-[#FA4A23] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 active:scale-98"
            >
              <span>{isSubmitting ? t('placingOrder') : t('placeOrder')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust badge */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-taupe-600 text-center">
              <ShieldCheck className="w-4 h-4 text-sage-600" />
              <span>{isBn ? 'নিরাপদ চেকআউট • কোনো ক্রেডিট কার্ড বাধ্যবাধকতা নেই' : '100% Verified Bangladesh Courier Dispatch'}</span>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
