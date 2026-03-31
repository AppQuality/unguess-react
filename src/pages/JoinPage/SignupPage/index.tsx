/**
 * SignupPage - Pagina di registrazione con Cognito
 * Step 1: Email + Password
 * Step 2: Conferma email con codice OTP
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import joinBg from 'src/assets/join-bg-1.png';
import joingBgwebp from 'src/assets/join-bg-1.webp';
import styled from 'styled-components';
import { SignupForm } from './SignupForm';
import { ConfirmEmailForm } from './ConfirmEmailForm';
import { AuthHeader } from '../../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../../LoginPage/parts/AuthFooter';
import { NotLogged } from '../../../features/templates/NotLogged';
import { ImagesColumn } from '../ImagesColumn';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    background-image: url(${joinBg});
    @supports (background-image: url(${joingBgwebp})) {
      background-image: url(${joingBgwebp});
    }
    background-repeat: no-repeat;
    background-position: right top;
    background-size: 61%;
  }
`;

const BoxedContentRow = styled(LayoutWrapper)`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const CenteredContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftColumn = styled.div`
  flex: 0 0 41%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;

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
        {needsConfirmation ? (
          <CenteredContent>
            <LayoutWrapper>
              <ConfirmEmailForm email={userEmail} password={userPassword} />
            </LayoutWrapper>
          </CenteredContent>
        ) : (
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
        )}
        <AuthFooter showTryberLink />
      </PageWrapper>
    </NotLogged>
  );
};

export default SignupPage;
