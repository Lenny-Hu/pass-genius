'use client';

import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode, useEffect, useState, createContext, useContext, useCallback } from 'react';
import en from '@/locales/en';
import zh from '@/locales/zh';

type Locale = 'en' | 'zh';
type Translations = typeof en;

interface I18nContextType {
  locale: Locale;
  changeLocale: (newLocale: Locale) => void;
  t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'zh',
  changeLocale: () => { throw new Error('changeLocale called outside of I18nProvider'); },
  t: (key: keyof Translations) => { 
    // Provide a fallback for the initial server render if needed, though the provider's default should prevent this
    return zh[key] || String(key);
  },
});

export const useI18n = () => useContext(I18nContext);

const translations: Record<Locale, Translations> = { en, zh };

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh');

  useEffect(() => {
    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale && (cookieLocale === 'en' || cookieLocale === 'zh')) {
      setLocale(cookieLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    }
  };

  const t = useCallback((key: keyof Translations) => {
    return translations[locale]?.[key] || String(key);
  }, [locale]);

  const contextValue = {
    locale,
    changeLocale,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nContext.Provider>
  );
}
