import React, { createContext, useContext, useMemo } from 'react';
import {
  signIn,
  signUp,
  confirmSignUp,
  confirmSignIn,
  signOut,
  fetchAuthSession,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  type SignInInput,
  type SignUpInput,
  type ConfirmSignUpInput,
} from 'aws-amplify/auth';
import { isDev } from 'src/common/isDevEnvironment';
import { syncWordpress } from './syncWordpress';

type MfaChallengeStep =
  | 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'
  | 'CONFIRM_SIGN_IN_WITH_SMS_CODE';

interface LoginResult {
  isSignedIn: boolean;
  mfaChallenge?: MfaChallengeStep;
}

interface ForgotPasswordResult {
  deliveryMedium?: string;
  destination?: string;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<LoginResult>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  confirmSignup: (email: string, code: string) => Promise<void>;
  resendSignupCode: (email: string) => Promise<void>;
  confirmMfaSignIn: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResult>;
  confirmForgotPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
  isLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      const signInInput: SignInInput = {
        username: email,
        password,
      };

      const { isSignedIn, nextStep } = await signIn(signInInput);

      if (!isSignedIn) {
        const mfaSteps: string[] = [
          'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
          'CONFIRM_SIGN_IN_WITH_SMS_CODE',
        ];
        if (mfaSteps.includes(nextStep.signInStep)) {
          return {
            isSignedIn: false,
            mfaChallenge: nextStep.signInStep as MfaChallengeStep,
          };
        }
      }

      await syncWordpress();

      return { isSignedIn: true };
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const confirmMfaSignIn = async (code: string): Promise<void> => {
    try {
      const { isSignedIn } = await confirmSignIn({ challengeResponse: code });
      if (!isSignedIn) {
        throw new Error('MFA verification failed');
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('MFA verification error:', error);
      throw new Error(error.message || 'MFA verification failed');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const signUpInput: SignUpInput = {
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      };

      const { isSignUpComplete, userId, nextStep } = await signUp(signUpInput);

      if (isDev()) {
        // eslint-disable-next-line no-console
        console.log('Signup result:', { isSignUpComplete, userId, nextStep });

        if (!isSignUpComplete) {
          // L'utente deve confermare l'email
          // eslint-disable-next-line no-console
          console.log('Confirmation required');
        }
      }
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const resendSignupCode = async (email: string) => {
    try {
      await resendSignUpCode({ username: email });
    } catch (error: any) {
      throw new Error(error.message || 'Resend code failed');
    }
  };

  const confirmSignup = async (email: string, code: string) => {
    try {
      const confirmInput: ConfirmSignUpInput = {
        username: email,
        confirmationCode: code,
      };

      const { isSignUpComplete, nextStep } = await confirmSignUp(confirmInput);

      if (isDev()) {
        // eslint-disable-next-line no-console
        console.log('Confirm result:', { isSignUpComplete, nextStep });
      }
    } catch (error: any) {
      throw new Error(error.message || 'Confirmation failed');
    }
  };

  const forgotPassword = async (
    email: string
  ): Promise<ForgotPasswordResult> => {
    try {
      const { nextStep } = await resetPassword({ username: email });
      const details = nextStep?.codeDeliveryDetails;
      return {
        deliveryMedium: details?.deliveryMedium,
        destination: details?.destination,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset code');
    }
  };

  const confirmForgotPasswordFn = async (
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  };

  const getAccessToken = async () => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken.toString();
    } catch (error) {
      return undefined;
    }
  };

  const AuthProviderValue = useMemo(
    () => ({
      login,
      signup,
      confirmSignup,
      resendSignupCode,
      confirmMfaSignIn,
      forgotPassword,
      confirmForgotPassword: confirmForgotPasswordFn,
      logout,
      getAccessToken,
    }),
    []
  );

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
