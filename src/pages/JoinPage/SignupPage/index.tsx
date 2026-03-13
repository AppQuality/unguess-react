/**
 * SignupPage - Pagina di registrazione con Cognito
 * Step 1: Email + Password
 * Step 2: Conferma email con codice OTP
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SignupForm } from './SignupForm';
import { ConfirmEmailForm } from './ConfirmEmailForm';
import { AuthHeader } from '../../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../../LoginPage/parts/AuthFooter';
import { NotLogged } from '../../../features/templates/NotLogged';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xxl}`};
  max-width: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const PlaceholderImage = styled.div`
  width: 80%;
  max-width: 500px;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const SignupPage = () => {
  const { t } = useTranslation();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const meta = [
    { name: 'og:description', content: t('__PAGE_JOIN_DESCRIPTION') },
    { name: 'robots', content: 'index, follow' },
  ];

  return (
    <NotLogged
      title={t('__PAGE_JOIN_TITLE')}
      description={t('__PAGE_JOIN_DESCRIPTION')}
      metaTags={meta}
    >
      <PageWrapper>
        <AuthHeader />
        <ContentWrapper>
          <LeftColumn>
            {needsConfirmation ? (
              <ConfirmEmailForm email={userEmail} password={userPassword} />
            ) : (
              <SignupForm
                onSignupSuccess={(email, password) => {
                  setUserEmail(email);
                  setUserPassword(password);
                  setNeedsConfirmation(true);
                }}
              />
            )}
          </LeftColumn>
          <RightColumn>
            <PlaceholderImage>Placeholder</PlaceholderImage>
          </RightColumn>
        </ContentWrapper>
        <AuthFooter />
      </PageWrapper>
    </NotLogged>
  );
};

export default SignupPage;
