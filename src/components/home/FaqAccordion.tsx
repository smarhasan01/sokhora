'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I place an order on SHOKHORA?',
    questionBn: 'শখোরা থেকে কীভাবে অর্ডার করবেন?',
    answer:
      'Simply browse our 5 approved categories, select your desired items, click "Add to Cart", and proceed to checkout. You can check out as a guest or create an account for order tracking.',
    answerBn:
      'আমাদের ৫টি অনুমোদিত ক্যাটাগরি থেকে আপনার পছন্দের পণ্যটি নির্বাচন করুন, "Add to Cart"-এ ক্লিক করুন এবং চেকআউট সম্পন্ন করুন। অ্যাকাউন্ট তৈরি করে অথবা গেস্ট হিসেবেও সরাসরি অর্ডার করতে পারেন।',
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    questionBn: 'আপনারা কী কী পেমেন্ট মাধ্যম গ্রহণ করেন?',
    answer:
      'We support Cash on Delivery (COD) across all 64 districts of Bangladesh, as well as manual bKash and Nagad payments to our verified merchant number (01568923850).',
    answerBn:
      'আমরা বাংলাদেশের সকল ৬৪ জেলায় ক্যাশ অন ডেলিভারি (COD) সমর্থন করি। এছাড়াও আমাদের ভেরিফাইড মার্চেন্ট নম্বরে (01568923850) বিকাশ ও নগদ পেমেন্ট করা যায়।',
  },
  {
    id: 'faq-3',
    question: 'What are the delivery charges and timelines?',
    questionBn: 'ডেলিভারি চার্জ এবং সময় কত?',
    answer:
      'Inside Dhaka delivery fee is ৳70 (takes 24-48 hours). Outside Dhaka delivery fee is ৳130 (takes 2-4 business days). Orders over ৳2,000 enjoy nationwide FREE delivery!',
    answerBn:
      'ঢাকার ভেতরে ডেলিভারি চার্জ ৭০৳ (২৪-৪৮ ঘণ্টার মধ্যে)। ঢাকার বাইরে ১৩০৳ (২-৪ কার্যদিবসের মধ্যে)। ২০০০৳ বা তদূর্ধ্ব অর্ডারে উপভোগ করুন দেশজুড়ে সম্পূর্ণ ফ্রি ডেলিভারি!',
  },
  {
    id: 'faq-4',
    question: 'Are SHOKHORA silk scrunchies made of real silk?',
    questionBn: 'শখোরার সিল্ক স্ক্রাঞ্চি কি খাঁটি সিল্কের?',
    answer:
      'Yes! Our signature Mulberry Silk Cloud Scrunchies are handcrafted with genuine 19-momme natural mulberry silk to protect hair from breakage, frizz, and ponytail dents.',
    answerBn:
      'হ্যাঁ! আমাদের সিগনেচার মালবেরি সিল্ক স্ক্রাঞ্চিগুলো ১০০% খাঁটি ১৯-মমি প্রাকৃতিক সিল্কে তৈরি, যা চুল ভাঙা ও রুক্ষ হওয়া রোধ করে।',
  },
  {
    id: 'faq-5',
    question: 'What is your return and exchange policy?',
    questionBn: 'আপনাদের রিটার্ন ও এক্সচেঞ্জ পলিসি কেমন?',
    answer:
      'We offer an easy 7-day hassle-free exchange policy for unused items in original packaging if any manufacturing defect or incorrect item is received. Contact our customer hotline at 01568923850.',
    answerBn:
      'কোনো ত্রুটি বা ভুল পণ্য পেলে মূল প্যাকেজিংসহ ৭ দিনের মধ্যে সহজ এক্সচেঞ্জ সুবিধা রয়েছে। বিস্তারিত তথ্যের জন্য আমাদের কাস্টমার হটলাইনে (01568923850) যোগাযোগ করুন।',
  },
];

export default function FaqAccordion() {
  const { isBn } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#F7F8FA] px-3 py-1 rounded-full text-xs font-bold text-[#012D51] mb-2 border border-[#E2E5E8]">
          <HelpCircle className="w-3.5 h-3.5 text-[#C78703]" />
          <span>{isBn ? 'সহায়তা ও তথ্য' : 'Customer Help'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#202833]">
          {isBn ? 'সাধারণ ' : 'Frequently Asked '}
          <span className="text-[#012D51] border-b-2 border-[#C78703] pb-0.5">
            {isBn ? 'প্রশ্নাবলী' : 'Questions'}
          </span>
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                isOpen ? 'border-[#012D51] shadow-md' : 'border-[#E2E5E8] hover:border-[#012D51]/40'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isOpen ? 'bg-[#012D51] text-white' : 'text-[#202833] hover:bg-[#F7F8FA]'
                }`}
                aria-expanded={isOpen}
              >
                <span>{isBn ? faq.questionBn : faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-180 text-[#C78703]' : 'text-gray-400 group-hover:text-[#012D51]'
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 sm:p-5 text-xs sm:text-sm text-gray-600 bg-white leading-relaxed border-t border-gray-100 animate-slide-up">
                  {isBn ? faq.answerBn : faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
