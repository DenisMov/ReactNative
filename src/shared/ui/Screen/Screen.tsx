import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './Screen.styles';
import { colors } from '../../../shared/theme';

type ScreenProps = {
  children: React.ReactNode;
};

export function Screen({ children }: ScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundScreen}
        translucent={false}
      />

      <View
        style={[
          styles.root,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.content}>{children}</View>
      </View>
    </>
  );
}
