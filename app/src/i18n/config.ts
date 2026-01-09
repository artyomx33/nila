export const locales = ['en', 'es', 'nl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  nl: 'NL',
};

export const localeFull: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
};
