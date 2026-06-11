import {
  Logo,
  Notification,
  Span,
  useToast,
} from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthCardWrapper } from 'src/common/components/AuthCardWrapper';
import { normalizeEmail } from 'src/common/normalizeEmail';
import { Track } from 'src/common/Track';
import { useGetUsersMeQuery } from 'src/features/api';
import { useAuth } from 'src/features/auth/context';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import { AuthFooter } from './parts/AuthFooter';
import { AuthHeader } from './parts/AuthHeader';
import { LoginFormFields } from './type';

const StyledLogo = styled(Logo)`
  margin: ${({ theme }) => theme.space.md};
  width: 100%;
`;

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
  padding: 0 ${({ theme }) => theme.space.md};
`;

interface NavigationState {
  from: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const [cta, setCta] = useState<string>(t('__LOGIN_FORM_CTA'));
  const { isSuccess } = useGetUsersMeQuery();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const { addToast } = useToast();
  const { login: cognitoLogin } = useAuth();
  const verifyCodeRoute = useLocalizeRoute('verify-code');
  const signupRoute = useLocalizeRoute('join/signup');

  const from = (locationState as NavigationState)?.from || '/';
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isSuccess) {
      navigate(from || '/');
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    if (searchParams.get('session_expired') === 'true') {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={t('__LOGIN_SESSION_EXPIRED_MESSAGE')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    }
  }, []);

  const showInvalidCredentialsToast = () => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={
            (
              <Trans
                i18nKey="__LOGIN_FORM_INVALID_CREDENTIALS_TOAST"
                components={{ bold: <Span isBold /> }}
              />
            ) as unknown as string
          }
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  };

  const loginUser = async (
    values: LoginFormFields,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormFields>
  ) => {
    const normalizedEmail = normalizeEmail(values.email);
    try {
      const result = await cognitoLogin(normalizedEmail, values.password);

      if (result.mfaChallenge) {
        navigate(verifyCodeRoute, {
          state: {
            email: normalizedEmail,
            challengeType: result.mfaChallenge,
            from,
          },
        });
        return;
      }

      if (result.requiresSignUpConfirmation) {
        navigate(signupRoute, {
          state: {
            email: normalizedEmail,
            password: values.password,
            needsConfirmation: true,
          },
        });
        return;
      }

      // Login Cognito riuscito
      setCta(`${t('__LOGIN_FORM_CTA_REDIRECT_STATE')}`);
      document.location.href = from || '/';
    } catch (cognitoError: any) {
      showInvalidCredentialsToast();
      setStatus({
        message: t('__LOGIN_FORM_FAILED_INVALID'),
        type: 'invalid',
      });
      setSubmitting(false);
      // eslint-disable-next-line no-console
      console.error('Cognito login error:', cognitoError);
    }
  };

  return (
    <Track title={t('__PAGE_TITLE_LOGIN')}>
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <AuthCardWrapper>
            <StyledLogo type="icon" size={40} />
            <LoginForm onSubmit={loginUser} buttonText={cta} />
          </AuthCardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </Track>
  );
};

export default LoginPage;
