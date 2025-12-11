import { Col, Grid, Logo, Row } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import joinBg from 'src/assets/join-bg-1.png';
import joingBgwebp from 'src/assets/join-bg-1.webp';
import joinBg2 from 'src/assets/join-bg-2.png';
import joinBg2webp from 'src/assets/join-bg-2.webp';
import joinBg3 from 'src/assets/join-bg-3.png';
import joinBg3webp from 'src/assets/join-bg-3.webp';
import { Track } from 'src/common/Track';
import {
  useGetInvitesByProfileAndTokenQuery,
  useGetUsersMeQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { FormProvider } from './FormProvider';
import { ImagesColumn } from './ImagesColumn';
import { JoinForm } from './JoinForm';
import { JoinPageError } from './JoinPageError';
import { JoinPageLoading } from './JoinPageLoading';
import { WaitModal } from './WaitModal';

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.md};
  max-width: ${({ theme }) => theme.breakpoints.md};
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    padding: 0 ${({ theme }) => theme.space.xl};
    max-width: ${({ theme }) => theme.breakpoints.xxl};
  }
`;

const Background = styled.div<{ step: string }>`
  // Default background
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${({ step }) =>
      step === '1' &&
      `
      background-image: url(${joinBg});
      @supports (background-image: url(${joingBgwebp})) {
        background-image: url(${joingBgwebp});
      }
    `}
    ${({ step }) =>
      step === '2' &&
      `
      background-image: url(${joinBg2});
      @supports (background-image: url(${joinBg2webp})) {
        background-image: url(${joinBg2webp});
      }
    `}
    ${({ step }) =>
      step === '3' &&
      `
      background-image: url(${joinBg3});
      @supports (background-image: url(${joinBg3webp})) {
        background-image: url(${joinBg3webp});
      }
    `}
    background-repeat: no-repeat;
    background-position: right top;
    background-size: 61%;
  }
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.space.xl} * 2);
  padding: ${({ theme }) => theme.space.xl} 0 ${({ theme }) => theme.space.md};
`;

const StyledCol = styled(Col)<{ $hideOnMobile?: boolean }>`
  margin-bottom: 0;
  ${({ theme, $hideOnMobile }) =>
    $hideOnMobile &&
    `
    display: none;
    @media (min-width: ${theme.breakpoints.xl}) {
      display: block;
    }
  `}    
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.space.lg};
`;

const JoinPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { isSuccess: isLogged } = useGetUsersMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const { profile, token } = useParams();
  const shouldSkipQuery = isLogged || !(profile && token);

  const { isLoading, data, error } = useGetInvitesByProfileAndTokenQuery(
    {
      profile: profile || '',
      token: token || '',
    },
    {
      skip: shouldSkipQuery,
    }
  );

  const meta = [
    { name: 'og:description', content: t('__PAGE_JOIN_DESCRIPTION') },
    { name: 'robots', content: 'index, follow' },
  ];

  useEffect(() => {
    if (isLogged) {
      navigate(searchParams.get('redirectTo') || '/');
    }
  }, [navigate, isLogged, searchParams]);

  if (isLoading || (shouldSkipQuery && profile && token)) {
    return <JoinPageLoading />;
  }

  if (error) return <JoinPageError />;

  return (
    <Track
      title={t('__PAGE_JOIN_TITLE')}
      description={t('__PAGE_JOIN_DESCRIPTION')}
      metaTags={meta}
    >
      <FormProvider {...data}>
        {({ isSubmitting, values: { step } }) => (
          <Background step={step.toString()}>
            <CenteredXYContainer>
              {isSubmitting ? (
                <WaitModal />
              ) : (
                <Grid gutters="lg">
                  <Row>
                    <StyledCol xs={12} xl={5}>
                      <LogoWrapper>
                        <Logo type="vertical" size={100} />
                      </LogoWrapper>
                      <JoinForm />
                    </StyledCol>
                    <StyledCol xs={0} xl={7} $hideOnMobile>
                      <ImagesColumn />
                    </StyledCol>
                  </Row>
                </Grid>
              )}
            </CenteredXYContainer>
          </Background>
        )}
      </FormProvider>
    </Track>
  );
};

export default JoinPage;
