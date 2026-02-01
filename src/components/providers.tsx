'use client';

import { I18nProviderClient } from '@/i18n/client';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode, useEffect, useState } from 'react';

// Function to get cookie on the client side
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
  // 1. Set a default locale for the initial render (server and client)
  // This ensures there is no hydration mismatch.
  const [locale, setLocale] = useState('zh');

  // 2. On the client, after mounting, check for a saved preference in cookies.
  useEffect(() => {
    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale && (cookieLocale === 'en' || cookieLocale === 'zh')) {
      setLocale(cookieLocale);
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // 3. Render the provider with the determined locale.
  // On server: 'zh'
  // On client initial render: 'zh'
  // On client after effect: cookie value (e.g., 'en') or 'zh'
  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nProviderClient>
  );
}
