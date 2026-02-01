'use client';

import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import en from '@/locales/en';
import zh from '@/locales/zh';
import { type ThemeName } from '@/lib/themes';

// --- I18n ---
type Translations = typeof zh;
type Locale = 'en' | 'zh';
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations) => string;
}
const I18nContext = createContext<I18nContextType | undefined>(undefined);
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }
  return context;
}

// --- Theme ---
interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// --- Cookie Helpers ---
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

// The main provider component
export function Providers({ children }: { children: ReactNode }) {
  // I18n state
  const [locale, setLocaleState] = useState<Locale>('zh');
  useEffect(() => {
    const savedLocale = getCookie('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
      setLocaleState(savedLocale);
    }
  }, []);
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setCookie('locale', newLocale, 365);
  }, []);
  const t = useCallback(
    (key: keyof Translations) => {
      const translations: Record<Locale, Translations> = { en, zh };
      return translations[locale][key] || String(key);
    },
    [locale]
  );
  const i18nContextValue = { locale, setLocale, t };

  // Theme state
  const [theme, setThemeState] = useState<ThemeName>('default');
  useEffect(() => {
    const savedTheme = getCookie('theme') as ThemeName;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    setCookie('theme', newTheme, 365);
  }, []);
  const themeContextValue = { theme, setTheme };

  return (
    <I18nContext.Provider value={i18nContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        {children}
        <Toaster />
        <SWRegister />
      </ThemeContext.Provider>
    </I18nContext.Provider>
  );
}
