import * as LocalAuthentication from 'expo-local-authentication';

export type LocalAuthFailureReason =
  | 'no-hardware'
  | 'not-enrolled'
  | 'cancelled'
  | 'failed'
  | 'error';

export type LocalAuthResult =
  | { success: true }
  | {
      success: false;
      reason: LocalAuthFailureReason;
      message: string;
    };

function getFailureMessage(reason: LocalAuthFailureReason): string {
  switch (reason) {
    case 'no-hardware':
      return 'errors.noHardware';
    case 'not-enrolled':
      return 'errors.notEnrolled';
    case 'cancelled':
      return 'errors.cancelled';
    case 'failed':
      return 'errors.authFailed';
    case 'error':
    default:
      return 'errors.authError';
  }
}

/**
 * Requests biometric authentication from the user.
 * Handles all edge cases: unsupported device, not enrolled, cancellation and failures.
 */
export async function requireBiometricAuth(
  promptMessage: string,
): Promise<LocalAuthResult> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      return {
        success: false,
        reason: 'no-hardware',
        message: getFailureMessage('no-hardware'),
      };
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      return {
        success: false,
        reason: 'not-enrolled',
        message: getFailureMessage('not-enrolled'),
      };
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      promptSubtitle: 'Confirm your identity',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
      biometricsSecurityLevel: 'strong',
    });

    if (result.success) {
      return { success: true };
    }

    // Expo returns multiple cancel-related error codes — normalize them
    const cancelErrors = new Set([
      'user_cancel',
      'system_cancel',
      'app_cancel',
    ]);

    const reason: LocalAuthFailureReason = cancelErrors.has(result.error)
      ? 'cancelled'
      : 'failed';

    return {
      success: false,
      reason,
      message: getFailureMessage(reason),
    };
  } catch {
    // Fallback for unexpected errors (SDK issues, runtime exceptions, etc.)
    return {
      success: false,
      reason: 'error',
      message: getFailureMessage('error'),
    };
  }
}
