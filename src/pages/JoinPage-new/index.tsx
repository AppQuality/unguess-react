/**
 * JoinPage-new - Router principale
 * Gestisce il routing tra Signup, Onboarding e Invited User flows
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './SignupPage';
import OnboardingPage from './OnboardingPage';
import InvitedUserPage from './InvitedUserPage';

const JoinPageNew = () => {
  console.log('JoinPageNew render');
  return (
    <Routes>
      <Route path="signup" element={<SignupPage />} />
      <Route path="onboarding" element={<OnboardingPage />} />
      <Route path=":profile/:token" element={<InvitedUserPage />} />
      <Route path="*" element={<Navigate to="signup" replace />} />
    </Routes>
  );
};

export default JoinPageNew;
