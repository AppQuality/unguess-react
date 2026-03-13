import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Track } from 'src/common/Track';
import {
  Anchor,
  Avatar,
  Button,
  CodeVerifier,
  MD,
  SM,
  Title,
  XL,
} from '@appquality/unguess-design-system';
import { useGetUsersMeQuery } from 'src/features/api';
import { prepareGravatar } from 'src/common/utils';
import { getInitials } from 'src/common/components/navigation/header/utils';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { AuthHeader } from '../LoginPage/parts/AuthHeader';
import { AuthFooter } from '../LoginPage/parts/AuthFooter';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  flex: 1;
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 376px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg} 0;
`;

const RESEND_COOLDOWN_SECONDS = 60;

const VerifyCodePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginRoute = useLocalizeRoute('login');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = useCallback(() => {
    // TODO: call resend code API
    setSecondsLeft(RESEND_COOLDOWN_SECONDS);
  }, []);

  const { data: user, isLoading, isError } = useGetUsersMeQuery();
  return (
    <Track title={t('__PAGE_TITLE_VERIFY_CODE')}>
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <CardWrapper>
            {user && (
              <Avatar avatarType={user.picture ? 'image' : 'text'}>
                {user.picture
                  ? prepareGravatar(user.picture, 64)
                  : getInitials(user.name)}
              </Avatar>
            )}
            <Title
              style={{
                textAlign: 'center',
                marginTop: appTheme.space.sm,
              }}
            >
              <XL isBold style={{ color: appTheme.palette.blue[600] }}>
                {t('__VERIFY_CODE_TITLE')}
              </XL>
            </Title>
            <MD
              style={{
                textAlign: 'center',
                color: appTheme.palette.grey[600],
                marginBottom: appTheme.space.lg,
              }}
            >
              {user?.email}
            </MD>
            <FormContainer>
              <MD
                style={{
                  textAlign: 'center',
                  color: appTheme.palette.grey[800],
                  marginBottom: appTheme.space.lg,
                }}
              >
                Enter the code from the email
              </MD>
              <CodeVerifier length={6} />
              <SM
                style={{
                  color: appTheme.palette.grey[600],
                  marginTop: appTheme.space.md,
                }}
              >
                {secondsLeft > 0 ? (
                  `${t('__VERIFY_CODE_RESEND_TIMER_PREFIX')} ${Math.floor(
                    secondsLeft / 60
                  )}:${String(secondsLeft % 60).padStart(2, '0')}`
                ) : (
                  <Anchor
                    onClick={handleResend}
                    style={{
                      color: appTheme.palette.blue[600],
                      cursor: 'pointer',
                    }}
                  >
                    {t('__VERIFY_CODE_RESEND_CTA')}
                  </Anchor>
                )}
              </SM>
              <Button
                isPrimary
                isAccent
                isStretched
                disabled
                style={{
                  marginTop: appTheme.space.lg,
                }}
              >
                {t('__LOGIN_FORM_CTA')}
              </Button>
              <Button
                isBasic
                onClick={() => navigate(loginRoute)}
                style={{
                  marginTop: appTheme.space.xs,
                  color: appTheme.palette.blue[600],
                }}
              >
                {t('__VERIFY_CODE_BACK_CTA')}
              </Button>
            </FormContainer>
          </CardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </Track>
  );
};

export default VerifyCodePage;
