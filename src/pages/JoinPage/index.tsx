/**
 * JoinPage - Router principale
 * Gestisce il routing tra Signup, Onboarding e Invited User flows
 */
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SignupPage from './SignupPage';
import OnboardingPage from './OnboardingPage';
import InvitedUserPage from './InvitedUserPage';
import { PublicRoute, OnboardingRoute, InvitedRoute } from './RouteGuards';

/**
 * Componente per reindirizzare a signup mantenendo i search params
 */
const DefaultRedirect = () => {
  const location = useLocation();
  return <Navigate to={`signup${location.search}`} replace />;
};

const JoinPage = () => (
  <Routes>
    <Route
      path="signup"
      element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      }
    />
    <Route
      path="onboarding"
      element={
        <OnboardingRoute>
          <OnboardingPage />
        </OnboardingRoute>
      }
    />
    <Route
      path="invites/:profile/:token"
      element={
        <InvitedRoute>
          <InvitedUserPage />
        </InvitedRoute>
      }
    />
    <Route path="*" element={<DefaultRedirect />} />
  </Routes>
);

export default JoinPage;
