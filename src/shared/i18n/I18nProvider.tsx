import React, { createContext, useContext, useMemo, useState } from 'react';
import { messages, Locale } from './messages'; // new

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string; // new
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

type I18nProviderProps = {
  children: React.ReactNode;
};

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): string | undefined {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj) as string | undefined;
}

export function I18nProvider({
  children,
}: I18nProviderProps): React.JSX.Element {
  const [locale, setLocale] = useState<Locale>('en');

  const value = useMemo<I18nContextValue>(() => {
    const currentMessages = messages[locale] as Record<string, unknown>;

    return {
      locale,
      setLocale,
      t: (key: string) => getNestedValue(currentMessages, key) ?? key,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider');
  }

  return context;
}
