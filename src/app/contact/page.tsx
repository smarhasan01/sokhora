'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSettings } from '@/lib/db/store';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const settings = getSettings();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sage-600 block">
            Customer Support & Hotline
          </span>
          <h1 className="text-3xl font-serif font-bold text-charcoal-950">
            Contact SHOKHORA
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
            Have questions regarding an order, product sizing, or bulk gift inquiries? Reach out to our Dhaka support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-taupe-200 shadow-sm space-y-6">
            <h2 className="text-lg font-serif font-bold text-charcoal-950">Get in Touch</h2>

            <div className="space-y-4 text-xs text-charcoal-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">Studio & Flagship Office</p>
                  <p className="text-charcoal-600 mt-0.5 leading-relaxed">{settings.contactAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">Hotline & WhatsApp</p>
                  <p className="font-mono text-charcoal-600 mt-0.5">{settings.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">Email Inquiries</p>
                  <p className="text-charcoal-600 mt-0.5">{settings.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal-950">Operating Hours</p>
                  <p className="text-charcoal-600 mt-0.5">Saturday - Thursday: 10:00 AM – 8:00 PM</p>
                  <p className="text-charcoal-500 text-[11px]">Friday: 2:00 PM – 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-taupe-200 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-charcoal-950 text-base">Message Sent Successfully</h3>
                <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
                  Thank you, {name}. Our customer support executive will contact you shortly via phone or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-serif font-bold text-charcoal-950 mb-2">Send us a Message</h2>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhana Akter"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs font-mono focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-1 focus:ring-charcoal-800 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
