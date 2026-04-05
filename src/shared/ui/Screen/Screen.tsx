import React from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Screen.styles';

type ScreenProps = {
  children: React.ReactNode;
};

export function Screen({ children }: ScreenProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.content]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
