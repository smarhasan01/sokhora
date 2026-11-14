'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountNav from '@/components/account/AccountNav';
import { useAuth } from '@/lib/context/AuthContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { BD_DISTRICTS } from '@/lib/utils/formatters';
import { MapPin, Plus, Trash2, CheckCircle2, ChevronRight, X } from 'lucide-react';

interface AddressItem {
  id: string;
  name: string;
  phone: string;
  district: string;
  area: string;
  address: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { user } = useAuth();
  const { isBn, t } = useLanguage();

  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      name: user?.displayName || 'Nusrat Jahan',
      phone: user?.phone || '01712345678',
      district: 'Dhaka',
      area: 'Dhanmondi',
      address: 'House 42, Road 4/A, Flat 3B',
      isDefault: true,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState(user?.displayName || '');
  const [formPhone, setFormPhone] = useState(user?.phone || '');
  const [formDistrict, setFormDistrict] = useState('Dhaka');
  const [formArea, setFormArea] = useState('');
  const [formAddress, setFormAddress] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formArea.trim() || !formAddress.trim()) return;

    const newAddr: AddressItem = {
      id: `addr-${Date.now()}`,
      name: formName.trim(),
      phone: formPhone.trim(),
      district: formDistrict,
      area: formArea.trim(),
      address: formAddress.trim(),
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddr]);
    setModalOpen(false);
    setFormArea('');
    setFormAddress('');
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#191817]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6">
          <Link href="/" className="hover:text-charcoal-900">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <Link href="/account" className="hover:text-charcoal-900">{t('myAccount')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-taupe-400" />
          <span className="text-charcoal-900 font-medium">{t('savedAddresses')}</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-950">
            {t('savedAddresses')}
          </h1>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('addNewAddress')}</span>
          </button>
        </div>

        <AccountNav />

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
                addr.isDefault ? 'border-charcoal-900 shadow-md ring-1 ring-charcoal-900' : 'border-taupe-200 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-charcoal-950">
                    {addr.name}
                  </span>
                  {addr.isDefault ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {isBn ? 'ডিফল্ট' : 'Default'}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[11px] text-taupe-600 hover:text-charcoal-900 underline"
                    >
                      {isBn ? 'ডিফল্ট করুন' : 'Make Default'}
                    </button>
                  )}
                </div>

                <div className="text-xs text-charcoal-600 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                    <span>{addr.address}, {addr.area}, {addr.district}</span>
                  </p>
                  <p className="font-mono text-charcoal-500 pl-5">{addr.phone}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-taupe-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'মুছে ফেলুন' : 'Delete'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-taupe-200 shadow-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-taupe-200">
                <h3 className="font-serif font-bold text-lg text-charcoal-950">
                  {t('addNewAddress')}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-md text-charcoal-400 hover:text-charcoal-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('district')} *
                  </label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300 bg-white"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('area')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhanmondi / Gulshan / Mirpur"
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal-700 uppercase tracking-wider mb-1">
                    {t('fullAddress')} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House, Road, Flat"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-taupe-300"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-taupe-300 text-charcoal-700 hover:bg-taupe-100"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-charcoal-900 text-white font-semibold hover:bg-charcoal-800"
                  >
                    {t('save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
