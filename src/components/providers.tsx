'use client';

import { I18nProviderClient } from '@/i18n/client';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { ReactNode } from 'react';

export function Providers({ children, locale }: { children: ReactNode, locale: string }) {

  return (
    <I18nProviderClient locale={locale}>
      {children}
      <Toaster />
      <SWRegister />
    </I18nProviderClient>
  );
}
