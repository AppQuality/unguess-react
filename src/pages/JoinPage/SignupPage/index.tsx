/**
 * SignupPage - Pagina di registrazione con Cognito
 * Step 1: Email + Password
 * Step 2: Conferma email con codice OTP
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import joinBg from 'src/assets/join-bg-1.png';
import joingBgwebp from 'src/assets/join-bg-1.webp';
import styled from 'styled-components';
import { AccountTypeChooser } from './AccountTypeChooser';
import { SignupForm } from './SignupForm';
import { ConfirmEmailForm } from './ConfirmEmailForm';
import { AuthHeader } from '../../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../../LoginPage/parts/AuthFooter';
import { NotLogged } from '../../../features/templates/NotLogged';
import { ImagesColumn } from '../ImagesColumn';

const PageWrapper = styled.div<{ $showBg: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${({ $showBg }) =>
      $showBg &&
      `
      background-image: url(${joinBg});
      @supports (background-image: url(${joingBgwebp})) {
        background-image: url(${joingBgwebp});
      }
      background-repeat: no-repeat;
      background-position: right top;
      background-size: 61%;
    `}
  }
`;

const BoxedContentRow = styled(LayoutWrapper)`
  display: flex;
  flex: 1;
  min-height: 0;
  gap: ${({ theme }) => theme.space.xxl};
`;

const CenteredContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmStepWrapper = styled.div`
  width: 415px;
  max-width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.md}`};
  }
`;

const LeftColumn = styled.div`
  flex: 0 0 415px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space.xl} 0`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 1;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

interface SignupLocationState {
  email?: string;
  password?: string;
  needsConfirmation?: boolean;
}

const SignupPage = () => {
  const { t } = useTranslation();
  const { state: locationState } = useLocation();
  const navState = locationState as SignupLocationState | null;
  const [searchParams] = useSearchParams();
  const showForm = searchParams.get('type') === 'business';

  const [userEmail, setUserEmail] = useState(navState?.email || '');
  const [userPassword, setUserPassword] = useState(navState?.password || '');
  const [needsConfirmation, setNeedsConfirmation] = useState(
    navState?.needsConfirmation || false
  );

  const meta = [
    { name: 'og:description', content: t('__PAGE_JOIN_DESCRIPTION') },
    { name: 'robots', content: 'index, follow' },
  ];

  const renderContent = () => {
    if (needsConfirmation) {
      return (
        <CenteredContent>
          <ConfirmStepWrapper data-qa="confirm-email-step">
            <ConfirmEmailForm email={userEmail} password={userPassword} />
          </ConfirmStepWrapper>
        </CenteredContent>
      );
    }
    if (!showForm) {
      return (
        <CenteredContent>
          <AccountTypeChooser />
        </CenteredContent>
      );
    }
    return (
      <BoxedContentRow>
        <LeftColumn>
          <SignupForm
            onSignupSuccess={(email, password) => {
              setUserEmail(email);
              setUserPassword(password);
              setNeedsConfirmation(true);
            }}
          />
        </LeftColumn>
        <RightColumn>
          <ImagesColumn step={1} />
        </RightColumn>
      </BoxedContentRow>
    );
  };

  return (
    <NotLogged
      title={t('__PAGE_JOIN_TITLE')}
      description={t('__PAGE_JOIN_DESCRIPTION')}
      metaTags={meta}
    >
      <PageWrapper $showBg={needsConfirmation || showForm}>
        <AuthHeader />
        {renderContent()}
        <AuthFooter />
      </PageWrapper>
    </NotLogged>
  );
};

export default SignupPage;
