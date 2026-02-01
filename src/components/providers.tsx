'use client';

import { I18nProviderClient } from '@/i18n/client';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode, useState, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>('zh');

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    
    if (cookieValue && (cookieValue === 'en' || cookieValue === 'zh')) {
        setLocale(cookieValue);
    }
  }, []);

  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nProviderClient>
  );
}
