/**
 * OnboardingPage - Flusso di onboarding multi-step
 * Step 1: Dati personali (nome, cognome, ruolo, company size)
 * Step 2: Nome workspace
 */
import { useTranslation } from 'react-i18next';
import { Track } from 'src/common/Track';
import { useGetUsersMeQuery } from 'src/features/api';
import styled from 'styled-components';
import { AuthHeader } from '../../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../../LoginPage/parts/AuthFooter';
import { ImagesColumn } from '../ImagesColumn';
import { JoinBackground } from '../JoinBackground';
import { OnboardingProvider, OnboardingUserData } from './OnboardingProvider';
import { PersonalInfoStep } from './Steps/PersonalInfoStep';
import { WorkspaceStep } from './Steps/WorkspaceStep';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentRow = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const OnboardingPage = () => {
  const { t } = useTranslation();
  const { data: currentUser, isLoading } = useGetUsersMeQuery();

  // Costruisci userData da useGetUsersMeQuery
  let userData: OnboardingUserData | undefined;
  if (currentUser) {
    // Controlla se è un utente invitato (profileId e token in sessionStorage)
    const inviteProfileId = sessionStorage.getItem('inviteProfileId');
    const inviteToken = sessionStorage.getItem('inviteToken');

    if (inviteProfileId && inviteToken) {
      // Utente invitato
      userData = {
        type: 'invite',
        email: currentUser.email,
        profileId: Number(inviteProfileId),
        token: inviteToken,
      };
    } else {
      // Utente nuovo
      userData = {
        type: 'new',
        email: currentUser.email,
      };
    }
  }

  if (isLoading || !userData) {
    return null;
  }

  const meta = [
    { name: 'og:description', content: t('__PAGE_ONBOARDING_DESCRIPTION') },
    { name: 'robots', content: 'noindex, nofollow' },
  ];

  return (
    <Track
      title={t('__PAGE_ONBOARDING_TITLE')}
      description={t('__PAGE_ONBOARDING_DESCRIPTION')}
      metaTags={meta}
    >
      <PageWrapper>
        <AuthHeader />
        <OnboardingProvider userData={userData}>
          {({ step }) => (
            <ContentRow>
              <LeftColumn>
                {step === 1 && <PersonalInfoStep />}
                {step === 2 && userData.type === 'new' && <WorkspaceStep />}
              </LeftColumn>
              <RightColumn>
                <JoinBackground step={step + 1}>
                  <ImagesColumn step={step + 1} />
                </JoinBackground>
              </RightColumn>
            </ContentRow>
          )}
        </OnboardingProvider>
        <AuthFooter />
      </PageWrapper>
    </Track>
  );
};

export default OnboardingPage;
