'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'What payment methods do you accept?',
    qBn: 'আপনারা কোন কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?',
    a: 'We accept Cash on Delivery (COD) across all 64 districts in Bangladesh, as well as manual bKash and Nagad payments to our official merchant account: 01568923850.',
    aBn: 'আমরা সারাদেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি (COD) গ্রহণ করি। এছাড়াও আমাদের অফিসিয়াল মার্চেন্ট নম্বর ০১৫৬৮৯২৩৮৫০-এ ম্যানুয়াল বিকাশ ও নগদ পেমেন্ট করা যায়।',
  },
  {
    q: 'How long does the product shipping take?',
    qBn: 'অর্ডার করা পণ্য পৌঁছাতে কতদিন সময় লাগে?',
    a: 'Delivery takes 24 to 48 hours within Dhaka City (৳60), and 2 to 4 business days for all districts outside Dhaka (৳120). Orders over ৳1,500 qualify for free delivery.',
    aBn: 'ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে (৳৬০) এবং ঢাকার বাইরে ২ থেকে ৪ কার্যদিবসের মধ্যে (৳১২০) ডেলিভারি সম্পন্ন হয়। ৳১,৫০০ টাকার অধিক অর্ডারে ডেলিভারি সম্পূর্ণ ফ্রি।',
  },
  {
    q: 'Do you offer nationwide cash on delivery?',
    qBn: 'আপনারা কি সারা বাংলাদেশে ক্যাশ অন ডেলিভারি দেন?',
    a: 'Yes! We deliver to all 64 districts of Bangladesh via reliable courier partners with Cash on Delivery option available.',
    aBn: 'হ্যাঁ! আমাদের নিজস্ব ও বিশ্বস্ত কুরিয়ার পার্টনারদের মাধ্যমে বাংলাদেশের ৬৪টি জেলার প্রত্যন্ত অঞ্চলেও ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।',
  },
  {
    q: 'Can I track my order?',
    qBn: 'আমি কি আমার অর্ডার ট্র্যাক করতে পারব?',
    a: 'Absolutely! Once your order is confirmed, an invoice number is generated. You can track your real-time status anytime on our "Track Order" page or through your customer account.',
    aBn: 'অবশ্যই! অর্ডার কনফার্ম হওয়ার সাথে সাথেই ইনভয়েস নম্বর পাওয়া যায়। আমাদের "Track Order" পেজে ইনভয়েস নম্বর দিয়ে যেকোনো সময় ডেলিভারি স্ট্যাটাস চেক করতে পারবেন।',
  },
  {
    q: 'What is your return & exchange policy?',
    qBn: 'আপনাদের রিটার্ন ও এক্সচেঞ্জ পলিসি কেমন?',
    a: 'We offer a 7-day hassle-free doorstep exchange policy for any unworn items with tags intact if you need a different size, color, or style replacement.',
    aBn: 'পণ্য হাতে পাওয়ার পর ৭ দিনের মধ্যে খুব সহজেই দরজায় এক্সচেঞ্জ সুবিধা নিতে পারবেন। সাইজ, কালার বা যেকোনো পরিবর্তনের জন্য আমাদের হটলাইনে যোগাযোগ করতে পারেন।',
  },
];

export default function FaqAccordion() {
  const { isBn } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open like reference

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          {isBn
            ? 'পেমেন্ট, ডেলিভারি এবং এক্সচেঞ্জ পলিসি সম্পর্কে প্রয়োজনীয় সব তথ্য'
            : 'Everything you need to know about our products, delivery, and payments'}
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-white border-[#FF5B37]/40 shadow-sm'
                  : 'bg-[#F8F9FA] border-gray-200/80 hover:border-gray-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  {/* Coral dot indicator matching reference */}
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                    isOpen ? 'bg-[#FF5B37]' : 'bg-gray-300'
                  }`} />
                  <span className="font-semibold text-xs sm:text-sm text-gray-900">
                    {isBn ? faq.qBn : faq.q}
                  </span>
                </div>

                <div className="text-gray-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF5B37]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 pl-10 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans border-t border-gray-100">
                  {isBn ? faq.aBn : faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
