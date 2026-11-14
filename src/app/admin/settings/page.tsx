'use client';

import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/db/store';
import { StoreSettings } from '@/types';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(getSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleChange = (field: keyof StoreSettings, val: any) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <Settings className="w-5 h-5 text-sage-600" />
            Store Settings & Payment Gateways
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Manage your brand info, merchant mobile numbers, and active checkout options.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Store settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Brand Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Store Name (English) *</label>
                <input
                  type="text"
                  required
                  value={settings.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Store Name (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={settings.storeNameBn}
                  onChange={(e) => handleChange('storeNameBn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-bengali focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Tagline (English) *</label>
                <input
                  type="text"
                  required
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Tagline (Bengali) *</label>
                <input
                  type="text"
                  required
                  value={settings.taglineBn}
                  onChange={(e) => handleChange('taglineBn', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-bengali focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-taupe-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Customer Contact & Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Hotline & WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={settings.contactPhone}
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Support Email *</label>
                <input
                  type="email"
                  required
                  value={settings.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-charcoal-700 mb-1">Physical Store / Studio Address *</label>
                <input
                  type="text"
                  required
                  value={settings.contactAddress}
                  onChange={(e) => handleChange('contactAddress', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateways & Mobile Banking */}
          <div className="space-y-4 pt-4 border-t border-taupe-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal-900 pb-2 border-b border-taupe-100">
              Bangladeshi Payment Methods
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">
                  bKash Merchant / Personal Account Number *
                </label>
                <input
                  type="text"
                  required
                  value={settings.bkashMerchantNumber}
                  onChange={(e) => handleChange('bkashMerchantNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">
                  Nagad Account Number *
                </label>
                <input
                  type="text"
                  required
                  value={settings.nagadMerchantNumber}
                  onChange={(e) => handleChange('nagadMerchantNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono focus:outline-none focus:ring-1 focus:ring-charcoal-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableCod}
                  onChange={(e) => handleChange('enableCod', e.target.checked)}
                  className="rounded border-taupe-300 text-charcoal-900"
                />
                <span className="font-semibold text-charcoal-900">Enable COD</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableBkash}
                  onChange={(e) => handleChange('enableBkash', e.target.checked)}
                  className="rounded border-taupe-300 text-charcoal-900"
                />
                <span className="font-semibold text-charcoal-900">Enable bKash</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNagad}
                  onChange={(e) => handleChange('enableNagad', e.target.checked)}
                  className="rounded border-taupe-300 text-charcoal-900"
                />
                <span className="font-semibold text-charcoal-900">Enable Nagad</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableOnlineGateway}
                  onChange={(e) => handleChange('enableOnlineGateway', e.target.checked)}
                  className="rounded border-taupe-300 text-charcoal-900"
                />
                <span className="font-semibold text-charcoal-900">Enable Online Gateway</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-taupe-200">
            <button
              type="submit"
              className="px-6 py-3 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-sage-400" /> Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
