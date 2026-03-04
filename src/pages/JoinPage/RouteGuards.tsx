/**
 * RouteGuards - Componenti per proteggere le route di JoinPage
 */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import { useAuth } from 'src/features/auth/context';
import { useGetUsersMeQuery } from 'src/features/api';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { data: userData, isLoading: userDataLoading } = useGetUsersMeQuery(
    undefined,
    {
      skip: !user,
    }
  );

  if (authLoading || userDataLoading) {
    return <PageLoader />;
  }

  // Se c'è un utente Cognito autenticato
  if (user) {
    // Se onboarding è pending
    if (userData?.onboarding_pending) {
      return <Navigate to="/join/onboarding" replace />;
    }

    // Se l'utente loggato e ha completato l'onboarding
    if (userData && !userData.onboarding_pending) {
      return <Navigate to="/" replace />;
    }
  }

  // Utente non loggato - accesso consentito
  return children;
};

/**
 * OnboardingRoute - solo con onboarding_pending
 */
export const OnboardingRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { data: userData, isLoading: userDataLoading } = useGetUsersMeQuery(
    undefined,
    {
      skip: !user,
    }
  );

  if (authLoading || userDataLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/join/signup" replace />;
  }

  // Se onboarding NON è pending
  if (userData && !userData.onboarding_pending) {
    return <Navigate to="/" replace />;
  }

  // Utente loggato con onboarding pending
  return children;
};

/**
 * InvitedRoute
 */
export const InvitedRoute = ({ children }: { children: ReactNode }) =>
  // TODO: capire se servono controlli specifici
  children;
