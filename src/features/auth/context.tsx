import React, { createContext, useContext, useMemo } from 'react';
import { Amplify } from 'aws-amplify';
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  fetchAuthSession,
  type SignInInput,
  type SignUpInput,
  type ConfirmSignUpInput,
} from 'aws-amplify/auth';
import { awsConfig } from './config';

// Configura Amplify
Amplify.configure(awsConfig);

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  confirmSignup: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
  isLoggedIn?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const login = async (email: string, password: string) => {
    try {
      const signInInput: SignInInput = {
        username: email,
        password,
      };

      const { isSignedIn, nextStep } = await signIn(signInInput);

      if (!isSignedIn) {
        // eslint-disable-next-line no-console
        console.log('Next step:', nextStep);
        // TODO: Gestisci MFA o altri step se necessario
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
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

      // eslint-disable-next-line no-console
      console.log('Signup result:', { isSignUpComplete, userId, nextStep });

      if (!isSignUpComplete) {
        // L'utente deve confermare l'email
        // eslint-disable-next-line no-console
        console.log('Confirmation required');
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    }
  };

  const confirmSignup = async (email: string, code: string) => {
    try {
      const confirmInput: ConfirmSignUpInput = {
        username: email,
        confirmationCode: code,
      };

      const { isSignUpComplete, nextStep } = await confirmSignUp(confirmInput);

      // eslint-disable-next-line no-console
      console.log('Confirm result:', { isSignUpComplete, nextStep });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Confirmation error:', error);
      throw new Error(error.message || 'Confirmation failed');
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
      throw new Error(error.message || 'Logout failed');
    }
  };

  const getAccessToken = async () => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken.toString();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error getting access token:', error);
      return undefined;
    }
  };

  const AuthProviderValue = useMemo(
    () => ({
      login,
      signup,
      confirmSignup,
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
