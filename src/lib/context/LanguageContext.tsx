'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Language, Translations, translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations, fallback?: string) => string;
  isBn: boolean;
  formatPrice: (amount: number) => string;
  formatNumber: (n: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const BENGALI_NUMERALS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shokhora_lang') as Language;
      if (saved === 'en' || saved === 'bn') {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        if (saved === 'bn') {
          document.body.classList.add('font-bengali');
        } else {
          document.body.classList.remove('font-bengali');
        }
      }
    } catch {
      // ignore SSR/localStorage errors
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('shokhora_lang', lang);
      document.cookie = `shokhora_lang=${lang}; path=/; max-age=31536000`;
      document.documentElement.lang = lang;
      if (lang === 'bn') {
        document.body.classList.add('font-bengali');
      } else {
        document.body.classList.remove('font-bengali');
      }
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
  };

  const isBn = language === 'bn';

  const t = (key: keyof Translations, fallback?: string): string => {
    const dict = translations[language] || translations.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    return fallback || (translations.en[key] as string) || String(key);
  };

  const formatNumber = (n: number | string): string => {
    const str = String(n);
    if (!isBn) return str;
    return str.replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[digit] || digit);
  };

  const formatPrice = (amount: number): string => {
    const rounded = Math.round(amount);
    const formatted = rounded.toLocaleString('en-US');
    if (!isBn) {
      return `৳${formatted}`;
    }
    const bnNum = formatted.replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[digit] || digit);
    return `৳${bnNum}`;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isBn,
      formatPrice,
      formatNumber,
    }),
    [language, isBn]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
