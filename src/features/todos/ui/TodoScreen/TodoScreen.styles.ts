import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
  },
  headerBlock: {
    gap: 6,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textTertiary,
  },
  errorBanner: {
    borderRadius: 14,
    backgroundColor: colors.errorBannerBg,
    borderWidth: 1,
    borderColor: colors.errorBannerBorder,
    padding: 14,
    gap: 10,
  },
  errorBannerText: {
    ...typography.bodyMedium,
    color: colors.dangerText,
  },
  errorActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  errorActionButton: {
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.errorActionBorder,
  },
  errorActionText: {
    ...typography.captionBold,
    color: colors.dangerText,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    ...typography.bodyMedium,
    color: colors.textMuted,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  stateText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
