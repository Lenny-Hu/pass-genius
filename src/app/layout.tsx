import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';
import { I18nProviderClient } from '@/i18n/client';
import { getI18n, getCurrentLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getCurrentLocale();
  const t = await getI18n(locale);

  return {
    title: t('app.title'),
    description: t('app.description'),
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('app.title'),
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#D2DFF7',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getCurrentLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
      </head>
      <body className="font-body antialiased">
        <I18nProviderClient locale={locale}>
          {children}
          <Toaster />
          <SWRegister />
        </I18nProviderClient>
      </body>
    </html>
  );
}
