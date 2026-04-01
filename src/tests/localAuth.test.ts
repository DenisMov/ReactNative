import * as LocalAuthentication from 'expo-local-authentication';
import { requireBiometricAuth } from '../features/auth/services/localAuth';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

const mockedLocalAuthentication = LocalAuthentication as jest.Mocked<
  typeof LocalAuthentication
>;

describe('requireBiometricAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns no-hardware when device does not support biometrics', async () => {
    mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(false);

    const result = await requireBiometricAuth('Authenticate');

    expect(result).toEqual({
      success: false,
      reason: 'no-hardware',
      message: 'Biometric authentication is not available on this device.',
    });
  });

  it('returns not-enrolled when no biometrics are configured', async () => {
    mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    mockedLocalAuthentication.isEnrolledAsync.mockResolvedValue(false);

    const result = await requireBiometricAuth('Authenticate');

    expect(result).toEqual({
      success: false,
      reason: 'not-enrolled',
      message: 'No biometric credentials are enrolled on this device.',
    });
  });

  it('returns success when authentication succeeds', async () => {
    mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    mockedLocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
    mockedLocalAuthentication.authenticateAsync.mockResolvedValue({
      success: true,
    } as Awaited<ReturnType<typeof LocalAuthentication.authenticateAsync>>);

    const result = await requireBiometricAuth('Authenticate');

    expect(result).toEqual({ success: true });
  });

  it('returns cancelled when user cancels authentication', async () => {
    mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    mockedLocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
    mockedLocalAuthentication.authenticateAsync.mockResolvedValue({
      success: false,
      error: 'user_cancel',
    } as Awaited<ReturnType<typeof LocalAuthentication.authenticateAsync>>);

    const result = await requireBiometricAuth('Authenticate');

    expect(result).toEqual({
      success: false,
      reason: 'cancelled',
      message: 'Authentication was cancelled.',
    });
  });
});
