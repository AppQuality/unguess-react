import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Amplify } from 'aws-amplify';
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  type SignInInput,
  type SignUpInput,
  type ConfirmSignUpInput,
} from 'aws-amplify/auth';
import { awsConfig } from './config';

// Configura Amplify
Amplify.configure(awsConfig);

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  confirmSignup: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const signInInput: SignInInput = {
        username: email,
        password,
      };

      const { isSignedIn, nextStep } = await signIn(signInInput);

      if (isSignedIn) {
        await checkUser();
      } else {
        console.log('Next step:', nextStep);
        // TODO: Gestisci MFA o altri step se necessario
      }
    } catch (error: any) {
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

      console.log('Signup result:', { isSignUpComplete, userId, nextStep });

      if (!isSignUpComplete) {
        // L'utente deve confermare l'email
        console.log('Confirmation required');
      }
    } catch (error: any) {
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

      console.log('Confirm result:', { isSignUpComplete, nextStep });
    } catch (error: any) {
      console.error('Confirmation error:', error);
      throw new Error(error.message || 'Confirmation failed');
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Logout failed');
    }
  };

  const getAccessToken = async () => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.accessToken.toString();
    } catch (error) {
      console.error('Error getting access token:', error);
      return undefined;
    }
  };

  // Verifica se l'utente è già loggato all'avvio
  useEffect(() => {
    checkUser();
  }, []);

  const AuthProviderValue = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      confirmSignup,
      logout,
      getAccessToken,
    }),
    [user, loading]
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
