import {
  Logo,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import WPAPI from 'src/common/wpapi';
import { useGetUsersMeQuery } from 'src/features/api';
import { useAuth } from 'src/features/auth/context';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { Track } from 'src/common/Track';
import { LoginForm } from './LoginForm';
import { LoginFormFields } from './type';
import { AuthHeader } from './parts/AuthHeader';
import { AuthFooter } from './parts/AuthFooter';

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
`;

const CardWrapper = styled.div`
  width: 100%;
  max-width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
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

  const showGenericErrorToast = (title?: string) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={`${title}${t('__TOAST_GENERIC_ERROR_MESSAGE')}`}
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
    // STEP 1: Tenta login con Cognito
    try {
      const result = await cognitoLogin(values.email, values.password);

      if (result.mfaChallenge) {
        navigate(verifyCodeRoute, {
          state: {
            email: values.email,
            challengeType: result.mfaChallenge,
            from,
          },
        });
        return;
      }

      // Login Cognito riuscito
      setCta(`${t('__LOGIN_FORM_CTA_REDIRECT_STATE')}`);
      document.location.href = from || '/';
      return;
    } catch (cognitoError: any) {
      // Non è possibile gestire l'errore, se utente Cognito sbaglia password verrà fatto fallback al login legacy
      // eslint-disable-next-line no-console
      console.error('Cognito login error:', cognitoError);
    }

    // STEP 2: Fallback a WordPress legacy login (se utente non esiste su Cognito)
    let nonce;
    try {
      nonce = await WPAPI.getNonce();
    } catch (err: any) {
      if (err?.status !== 200) {
        showGenericErrorToast('Get Nonce: ');
        setSubmitting(false);
        return;
      }
    }
    try {
      await WPAPI.login({
        username: values.email,
        password: values.password,
        security: nonce,
      });

      setCta(`${t('__LOGIN_FORM_CTA_REDIRECT_STATE')}`);
      document.location.href = from || '/';
    } catch (e: any) {
      if (e?.status !== 200) {
        showGenericErrorToast('Login: ');
        setSubmitting(false);
        return;
      }
      const { message } = e as Error;
      const error = JSON.parse(message);

      if (error.type === 'invalid') {
        setStatus({ message: `${t('__LOGIN_FORM_FAILED_INVALID')}` });
      } else {
        showGenericErrorToast();
      }
    }

    setSubmitting(false);
  };

  return (
    <Track title={t('__PAGE_TITLE_LOGIN')}>
      <PageWrapper>
        <AuthHeader />
        <CenteredXYContainer>
          <CardWrapper>
            <StyledLogo type="icon" size={40} />
            <LoginForm onSubmit={loginUser} buttonText={cta} />
          </CardWrapper>
        </CenteredXYContainer>
        <AuthFooter />
      </PageWrapper>
    </Track>
  );
};

export default LoginPage;
