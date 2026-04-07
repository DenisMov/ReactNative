import React from 'react';
import { TodoScreen } from '../features/todos/ui/TodoScreen/TodoScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from '../shared/i18n/I18nProvider';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <I18nProvider>
          <TodoScreen />
        </I18nProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
