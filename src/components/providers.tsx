'use client';

import { I18nProviderClient } from '@/i18n/client';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode, useState, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client, after the initial render.
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    
    // Fallback to 'zh' if no cookie is found
    setLocale(cookieValue || 'zh');
  }, []);

  // To prevent hydration mismatch, we wait until the locale is determined on the client.
  // You can show a loader here if you prefer.
  if (!locale) {
    return null;
  }

  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nProviderClient>
  );
}
