'use client';

import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode, createContext, useContext, useCallback } from 'react';
import zh from '@/locales/zh';

type Translations = typeof zh;

interface I18nContextType {
  t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const t = useCallback((key: keyof Translations) => {
    return zh[key] || String(key);
  }, []);

  const contextValue = { t };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nContext.Provider>
  );
}
