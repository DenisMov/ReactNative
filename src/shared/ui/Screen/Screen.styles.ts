import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../shared/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});
