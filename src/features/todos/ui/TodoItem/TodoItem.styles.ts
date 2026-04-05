import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  headerRow: {
    gap: spacing.sm,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: spacing.xs,
  },
  statusActive: {
    backgroundColor: colors.statusActiveBg,
  },
  statusCompleted: {
    backgroundColor: colors.statusCompletedBg,
  },
  statusText: {
    ...typography.badge,
  },
  statusActiveText: {
    color: colors.statusActiveText,
  },
  statusCompletedText: {
    color: colors.statusCompletedText,
  },
  dateText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  title: {
    ...typography.bodySemibold,
    color: colors.textPrimary,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  editBlock: {
    gap: spacing.sm,
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
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  primaryButton: {
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButton: {
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    ...typography.buttonSecondary,
    color: colors.textPrimary,
  },
  dangerButton: {
    borderRadius: radius.sm,
    backgroundColor: colors.dangerBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dangerButtonText: {
    ...typography.button,
    color: colors.dangerText,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
