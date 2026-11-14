'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { createOrder } from '@/lib/db/store';
import { formatPrice, isValidBdPhone, BD_DISTRICTS } from '@/lib/utils/formatters';
import { PaymentMethod, DeliveryDetails } from '@/types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
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

  const copyMerchantNumber = (num: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(num);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your mobile phone number';
    } else if (!isValidBdPhone(phone)) {
      errs.phone = 'Please enter a valid Bangladeshi number (e.g. 017XXXXXXXX)';
    }

    if (!district) errs.district = 'Please select your delivery district';
    if (!area.trim()) errs.area = 'Please enter your Upazila or Area';
    if (!address.trim()) errs.address = 'Please enter your detailed delivery address';

    // Payment validation
    if (paymentMethod === 'bKash') {
      if (!bkashSender.trim()) errs.bkashSender = 'Please enter the bKash sender number';
      if (!bkashTrxId.trim()) errs.bkashTrxId = 'Please enter your bKash Transaction ID';
    } else if (paymentMethod === 'Nagad') {
      if (!nagadSender.trim()) errs.nagadSender = 'Please enter the Nagad sender number';
      if (!nagadTrxId.trim()) errs.nagadTrxId = 'Please enter your Nagad Transaction ID';
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
        paidAmount: 0, // initially 0 until admin verifies manual payment or online gateway completes
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
      <div className="min-h-screen flex flex-col bg-ivory-100">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-charcoal-900">Your bag is empty</h2>
          <p className="text-xs text-charcoal-500">Please add items to your shopping bag before checking out.</p>
          <Link href="/shop" className="px-6 py-2.5 bg-charcoal-950 text-white rounded-full text-xs font-semibold">
            Return to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link href="/cart" className="hover:text-charcoal-900">Shopping Bag</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">Checkout</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950 mb-8">
          Checkout & Delivery
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Delivery Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-taupe-200">
                <h2 className="text-base font-bold text-charcoal-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-charcoal-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                  Delivery Information (ডেলিভারি ঠিকানা)
                </h2>
                {!user && (
                  <span className="text-[11px] text-taupe-600 font-medium bg-taupe-100 px-2.5 py-1 rounded-full">
                    Guest Checkout
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Full Name (সম্পূর্ণ নাম) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tahmidur Rahman"
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
                    Mobile Phone (মোবাইল নম্বর) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
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
                    Email Address <span className="text-charcoal-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tahmid@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    District (জেলা) *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                  >
                    {BD_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} {dist === 'Dhaka' ? '(Inside Dhaka - ৳70)' : '(Outside Dhaka - ৳130)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area / Upazila */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Thana / Upazila / Area (থানা / এলাকা) *
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
                    Full Delivery Address (রোড, বাড়ি, ফ্ল্যাট নম্বর) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. House 42, Road 9/A, Flat 3B, Dhanmondi"
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
                    Delivery Instructions / Notes <span className="text-charcoal-400 font-normal lowercase">(optional)</span>
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
                  Payment Method (পেমেন্ট পদ্ধতি)
                </h2>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Choose how you would like to pay for your order
                </p>
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
                        Cash on Delivery (ক্যাশ অন ডেলিভারি)
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                      Pay with cash when your parcel is delivered to your doorstep.
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
                        <span className="font-bold text-xs sm:text-sm text-pink-700">bKash Manual Payment</span>
                        <span className="text-[10px] bg-pink-100 text-pink-800 font-semibold px-2 py-0.5 rounded">
                          Merchant / Send Money
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Send payment to our verified bKash number and submit the transaction ID.
                    </p>

                    {/* bKash instructions & input fields */}
                    {paymentMethod === 'bKash' && (
                      <div className="mt-4 pt-4 border-t border-pink-200/80 space-y-3 bg-white p-4 rounded-xl border">
                        <div className="flex items-center justify-between text-xs bg-pink-50 p-2.5 rounded-lg border border-pink-200">
                          <div>
                            <p className="text-[11px] text-pink-700 font-medium">bKash Merchant / Personal No:</p>
                            <p className="font-mono font-bold text-charcoal-900 text-sm">
                              {settings.bkashMerchantNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyMerchantNumber(settings.bkashMerchantNumber)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-pink-700 font-semibold text-xs border border-pink-300 hover:bg-pink-100"
                          >
                            {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            {copiedNumber ? 'Copied' : 'Copy'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              Your bKash Sender Number *
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
                              bKash Transaction ID (TrxID) *
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
                          * Your order will remain pending until our admin verifies the transaction ID.
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
                        <span className="font-bold text-xs sm:text-sm text-orange-700">Nagad Manual Payment</span>
                        <span className="text-[10px] bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded">
                          Send Money
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Send payment to our Nagad account and submit the transaction ID.
                    </p>

                    {/* Nagad instructions & input fields */}
                    {paymentMethod === 'Nagad' && (
                      <div className="mt-4 pt-4 border-t border-orange-200/80 space-y-3 bg-white p-4 rounded-xl border">
                        <div className="flex items-center justify-between text-xs bg-orange-50 p-2.5 rounded-lg border border-orange-200">
                          <div>
                            <p className="text-[11px] text-orange-700 font-medium">Nagad Account No:</p>
                            <p className="font-mono font-bold text-charcoal-900 text-sm">
                              {settings.nagadMerchantNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyMerchantNumber(settings.nagadMerchantNumber)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white text-orange-700 font-semibold text-xs border border-orange-300 hover:bg-orange-100"
                          >
                            {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            {copiedNumber ? 'Copied' : 'Copy'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
                              Your Nagad Sender Number *
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
                              Nagad Transaction ID (TrxID) *
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
                          * Order will be confirmed upon verification by our team.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 4: Online Gateway */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Online Gateway (SSLCOMMERZ)'
                      ? 'border-blue-600 bg-blue-50/30 shadow-sm'
                      : 'border-taupe-200 hover:bg-taupe-50/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Online Gateway (SSLCOMMERZ)'}
                    onChange={() => setPaymentMethod('Online Gateway (SSLCOMMERZ)')}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-xs sm:text-sm font-semibold text-charcoal-900">
                        Online Cards / Mobile Banking (SSLCOMMERZ)
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Pay securely with Visa, Mastercard, American Express, or internet banking.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-charcoal-950 pb-3 border-b border-taupe-200">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            {/* Items mini list */}
            <div className="max-h-60 overflow-y-auto divide-y divide-taupe-100 pr-1">
              {items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-taupe-100 border border-taupe-200 flex-shrink-0">
                      <Image src={it.image || '/images/Logo-01.png'} alt={it.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-900 line-clamp-1">{it.name}</p>
                      <p className="text-[11px] text-charcoal-500 font-mono">
                        {it.quantity} x {formatPrice(it.price)}
                        {it.selectedColor ? ` • ${it.selectedColor}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-charcoal-900 whitespace-nowrap">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-taupe-200 space-y-2 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span className="font-mono font-medium">-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>
                  Delivery Charge ({district === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
                </span>
                <span className="font-mono font-medium text-charcoal-900">
                  {deliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatPrice(deliveryCharge)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-charcoal-950 pt-3 border-t border-taupe-200">
                <span>Total Amount Due</span>
                <span className="font-mono text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  Confirm Order ({formatPrice(total)}) <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 text-[11px] text-charcoal-500 text-center">
              <p className="flex items-center justify-center gap-1.5 text-sage-700 font-medium">
                <ShieldCheck className="w-4 h-4" /> 100% Genuine Bangladeshi Brand Guarantee
              </p>
              <p>By placing this order, you agree to our Terms & Delivery policies.</p>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
