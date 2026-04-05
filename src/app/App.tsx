import React from 'react';
import { TodoScreen } from '../features/todos/ui/TodoScreen/TodoScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from '../shared/i18n/I18nProvider';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <TodoScreen />
      </I18nProvider>
    </SafeAreaProvider>
  );
}
