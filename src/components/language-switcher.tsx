'use client';

import { useI18n } from '@/components/providers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSwitcher() {
  const { locale, changeLocale, t } = useI18n();

  return (
    <Select value={locale} onValueChange={(newLocale) => changeLocale(newLocale as 'en' | 'zh')}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('language.en')}</SelectItem>
        <SelectItem value="zh">{t('language.zh')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
