'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does the product shipping take across Bangladesh?',
    qBn: 'অর্ডার করা পণ্য পৌঁছাতে কতদিন সময় লাগে?',
    a: 'Delivery takes 24 to 48 hours within Dhaka City (৳60), and 2 to 4 business days for all districts outside Dhaka (৳120). Orders over ৳1,500 qualify for free nationwide delivery.',
    aBn: 'ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে (৳৬০) এবং ঢাকার বাইরে ২ থেকে ৪ কার্যদিবসের মধ্যে (৳১২০) ডেলিভারি সম্পন্ন হয়। ৳১,৫০০ টাকার অধিক অর্ডারে ডেলিভারি সম্পূর্ণ ফ্রি।',
  },
  {
    q: 'What payment methods do you accept?',
    qBn: 'আপনারা কোন কোন পেমেন্ট পদ্ধতি গ্রহণ করেন?',
    a: 'We accept Cash on Delivery (COD) across all 64 districts in Bangladesh, as well as bKash, Nagad, Visa, and Mastercard.',
    aBn: 'আমরা সারাদেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি (COD) গ্রহণ করি। এছাড়াও বিকাশ, নগদ, ভিসা ও মাস্টারকার্ডের মাধ্যমে সহজে পেমেন্ট করা যায়।',
  },
  {
    q: 'What is your return & exchange policy?',
    qBn: 'আপনাদের রিটার্ন ও এক্সচেঞ্জ পলিসি কেমন?',
    a: 'We offer a 7-day hassle-free doorstep exchange policy for unworn items with tags intact if you need a different size, color, or style replacement.',
    aBn: 'পণ্য হাতে পাওয়ার পর ৭ দিনের মধ্যে খুব সহজেই দরজায় এক্সচেঞ্জ সুবিধা নিতে পারবেন। সাইজ বা কালার পরিবর্তনের জন্য আমাদের হটলাইন ০১৫৬৮৯২৩৮৫০-এ যোগাযোগ করুন।',
  },
  {
    q: 'Are SHOKHORA silk scrunchies made from real silk?',
    qBn: 'শখোরার সিল্ক স্ক্রাঞ্চি কি খাঁটি মালবেরি সিল্কের তৈরি?',
    a: 'Yes, 100%! All our signature silk scrunchies are handcrafted using certified Grade 6A pure mulberry silk to prevent hair breakage and promote hair health.',
    aBn: 'হ্যাঁ, শতভাগ! আমাদের সিগনেচার স্ক্রাঞ্চিগুলো গ্রেড ৬এ খাঁটি মালবেরি সিল্ক দিয়ে তৈরি, যা চুল পড়া কমায় এবং চুলের স্বাভাবিক আর্দ্রতা ধরে রাখে।',
  },
  {
    q: 'Can I track my order in real time?',
    qBn: 'আমি কি আমার অর্ডার ট্র্যাক করতে পারব?',
    a: 'Absolutely! Once your order is placed, an invoice number is issued. You can track real-time delivery status on our "Track Order" page anytime.',
    aBn: 'অবশ্যই! অর্ডার কনফার্ম হওয়ার সাথে সাথেই ইনভয়েস নম্বর পাওয়া যায়। আমাদের "Track Order" পেজে গিয়ে যেকোনো সময় ডেলিভারি স্ট্যাটাস চেক করতে পারবেন।',
  },
];

export default function FaqAccordion() {
  const { isBn } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open like Reference 1

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="text-center space-y-2 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F7F8] text-[#012D51] font-mono text-[11px] font-bold border border-[#EAECEF]">
          <HelpCircle className="w-3.5 h-3.5 text-[#C78703]" />
          <span>+ FAQ</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012D51] tracking-tight">
          {isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          {isBn
            ? 'পেমেন্ট, ডেলিভারি এবং এক্সচেঞ্জ পলিসি সম্পর্কে প্রয়োজনীয় তথ্য'
            : 'Everything you need to know about our products, delivery, and payments'}
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#012D51] text-white border-[#012D51] shadow-md'
                  : 'bg-white text-[#252525] border-[#EAECEF] hover:border-[#012D51]/40'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 btn-press"
              >
                <span className={`font-semibold text-xs sm:text-sm ${isOpen ? 'text-white' : 'text-[#252525]'}`}>
                  {isBn ? faq.qBn : faq.q}
                </span>

                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-white/20 text-white' : 'bg-[#F6F7F8] text-stone-500'
                }`}>
                  {isOpen ? <Minus className="w-4 h-4 text-[#C78703]" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/90 leading-relaxed font-sans border-t border-white/15 animate-fade-in">
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
