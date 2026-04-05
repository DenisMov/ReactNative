import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodySemibold,
    color: colors.textPrimary,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },
  errorText: {
    ...typography.caption,
    color: colors.dangerText,
  },
  button: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
});
