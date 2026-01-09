'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const cycleLocale = () => {
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const nextLocale = locales[nextIndex];

    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <button
      onClick={cycleLocale}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
      title="Change language"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span>{localeNames[locale]}</span>
    </button>
  );
}
