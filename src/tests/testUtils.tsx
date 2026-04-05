import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { I18nProvider } from '../shared/i18n/I18nProvider';

function AllProviders({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}
