'use client';

import { PasswordGenerator } from '@/components/password-generator';
import { useI18n, I18nProviderClient } from '@/i18n/client';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Toaster } from '@/components/ui/toaster';
import { SWRegister } from '@/components/sw-register';

function AppContent() {
  const t = useI18n();

  const translations = {
    appTitle: t('app.title'),
    appDescription: t('app.description'),
    masterPassword: t('master.password'),
    masterPasswordPlaceholder: t('master.password.placeholder'),
    saltKeyword: t('salt.keyword'),
    saltKeywordPlaceholder: t('salt.keyword.placeholder'),
    passwordType: t('password.type'),
    passwordTypeGeneral: t('password.type.general'),
    passwordType6Digit: t('password.type.6-digit'),
    passwordType8Digit: t('password.type.8-digit'),
    generatePassword: t('generate.password'),
    generating: t('generating'),
    error: t('error'),
    errorEmptyFields: t('error.empty.fields'),
    generationFailed: t('generation.failed'),
    generationFailed6Digit: t('generation.failed.6-digit'),
    generationFailed8Digit: t('generation.failed.8-digit'),
    unexpectedError: t('unexpected.error'),
    copied: t('copied'),
    copiedDescription: t('copied.description'),
    yourGeneratedPassword: t('your.generated.password'),
    copyYourPassword: t('copy.your.password'),
    copyPassword: t('copy.password'),
    close: t('close'),
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 md:p-6">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <PasswordGenerator translations={translations} />
      <Toaster />
      <SWRegister />
    </main>
  );
}


export default function Home() {
  return (
    <I18nProviderClient locale="zh">
      <AppContent />
    </I18nProviderClient>
  );
}
