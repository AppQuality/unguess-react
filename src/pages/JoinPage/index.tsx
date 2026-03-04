/**
 * JoinPage - Router principale
 * Gestisce il routing tra Signup, Onboarding e Invited User flows
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './SignupPage';
import OnboardingPage from './OnboardingPage';
import InvitedUserPage from './InvitedUserPage';
import { PublicRoute, OnboardingRoute, InvitedRoute } from './RouteGuards';

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
      path=":profile/:token"
      element={
        <InvitedRoute>
          <InvitedUserPage />
        </InvitedRoute>
      }
    />
    <Route path="*" element={<Navigate to="signup" replace />} />
  </Routes>
);

export default JoinPage;
