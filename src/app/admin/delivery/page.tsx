'use client';

import React, { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/db/store';
import { StoreSettings } from '@/types';
import { formatPrice } from '@/lib/utils/formatters';
import { Truck, Save, CheckCircle2 } from 'lucide-react';

export default function AdminDeliveryPage() {
  const [settings, setSettings] = useState<StoreSettings>(getSettings());
  const [insideDhaka, setInsideDhaka] = useState(settings.insideDhakaDeliveryFee);
  const [outsideDhaka, setOutsideDhaka] = useState(settings.outsideDhakaDeliveryFee);
  const [freeThreshold, setFreeThreshold] = useState(settings.freeDeliveryThreshold);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getSettings();
    setSettings(s);
    setInsideDhaka(s.insideDhakaDeliveryFee);
    setOutsideDhaka(s.outsideDhakaDeliveryFee);
    setFreeThreshold(s.freeDeliveryThreshold);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreSettings = {
      ...settings,
      insideDhakaDeliveryFee: Number(insideDhaka),
      outsideDhakaDeliveryFee: Number(outsideDhaka),
      freeDeliveryThreshold: Number(freeThreshold),
    };

    updateSettings(updated);
    setSettings(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-taupe-200 shadow-sm">
        <div>
          <h1 className="text-xl font-serif font-bold text-charcoal-950 flex items-center gap-2">
            <Truck className="w-5 h-5 text-sage-600" />
            Delivery Rates & Free Shipping Rules
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Configure shipping fees applied during cart and checkout calculations across Bangladesh.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-taupe-200 shadow-sm space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Delivery rules updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1.5">
                Inside Dhaka City Fee (৳ BDT) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono text-sm font-bold focus:ring-1 focus:ring-charcoal-800"
              />
              <p className="text-[11px] text-charcoal-400 mt-1">Default: ৳70</p>
            </div>

            <div>
              <label className="block font-semibold text-charcoal-700 mb-1.5">
                Outside Dhaka (All 64 Districts) (৳ BDT) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono text-sm font-bold focus:ring-1 focus:ring-charcoal-800"
              />
              <p className="text-[11px] text-charcoal-400 mt-1">Default: ৳130</p>
            </div>
          </div>

          <div className="pt-2">
            <label className="block font-semibold text-charcoal-700 mb-1.5">
              Free Nationwide Delivery Order Threshold (৳ BDT) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(Number(e.target.value))}
              className="w-full max-w-sm px-3.5 py-2.5 rounded-xl border border-taupe-300 font-mono text-sm font-bold focus:ring-1 focus:ring-charcoal-800"
            />
            <p className="text-[11px] text-charcoal-400 mt-1">
              Orders equal to or above this subtotal qualify for 100% free delivery. Default: ৳2,000.
            </p>
          </div>

          <div className="pt-4 border-t border-taupe-200">
            <button
              type="submit"
              className="px-6 py-3 bg-charcoal-950 hover:bg-charcoal-900 text-white rounded-xl font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-sage-400" /> Save Delivery Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
