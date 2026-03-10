/**
 * RouteGuards - Componenti per proteggere le route di JoinPage
 */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PageLoader } from 'src/common/components/PageLoader';
import { useGetUsersMeQuery } from 'src/features/api';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading } = useGetUsersMeQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  // Se c'è un utente autenticato (Cognito o legacy)
  if (userData) {
    // Se onboarding è pending
    if (userData.onboarding_pending) {
      return <Navigate to="/join/onboarding" replace />;
    }

    // Se l'utente ha completato l'onboarding
    return <Navigate to="/" replace />;
  }

  // Utente non loggato - accesso consentito
  return children;
};

/**
 * OnboardingRoute - solo con onboarding_pending
 */
export const OnboardingRoute = ({ children }: { children: ReactNode }) => {
  const { data: userData, isLoading, error } = useGetUsersMeQuery();

  if (isLoading) {
    return <PageLoader />;
  }

  // Se non c'è utente autenticato o c'è un errore (es. 401, 403)
  if (!userData || error) {
    return <Navigate to="/join/signup" replace />;
  }

  // Se onboarding NON è pending, redirect alla home
  if (!userData.onboarding_pending) {
    return <Navigate to="/" replace />;
  }

  // Utente autenticato con onboarding pending
  return children;
};

/**
 * InvitedRoute
 */
export const InvitedRoute = ({ children }: { children: ReactNode }) =>
  // TODO: capire se servono controlli specifici
  children;
