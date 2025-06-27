import { useEffect, useState } from 'react';
import { LoginForm, Logo } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import WPAPI from 'src/common/wpapi';
import { FormikHelpers } from 'formik';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { Track } from 'src/common/Track';
import { LoginFormFields } from './type';

const StyledLogo = styled(Logo)`
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 70%;
  }
`;

const CenteredXYContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

interface NavigationState {
  from: string;
}

const LoginPage = () => {
  const { t } = useTranslation();
  const [cta, setCta] = useState<string>(t('__LOGIN_FORM_CTA'));
  const { status } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const from = (locationState as NavigationState)?.from || '/';

  useEffect(() => {
    if (status === 'logged') {
      navigate(from || '/');
    }
  }, [navigate, status]);

  const loginUser = async (
    values: LoginFormFields,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormFields>
  ) => {
    try {
      const nonce = await WPAPI.getNonce();
      await WPAPI.login({
        username: values.email,
        password: values.password,
        security: nonce,
      });

      setCta(`${t('__LOGIN_FORM_CTA_REDIRECT_STATE')}`);
      document.location.href = from || '/';
    } catch (e: unknown) {
      const { message } = e as Error;
      const error = JSON.parse(message);

      if (error.type === 'invalid') {
        setStatus({ message: `${t('__LOGIN_FORM_FAILED_INVALID')}` });
      } else {
        document.location.href = from || '/';
      }
    }

    setSubmitting(false);
  };

  const defaultArgs: any = {
    onSubmit: loginUser,
    title: t('__LOGIN_FORM_TITLE'),
    buttonText: cta,
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    errors: false,
    touched: {},
    validate: (values: any) => {
      const errors: any = {};
      if (!values.email) {
        errors.email = t('__FORM_FIELD_REQUIRED_MESSAGE');
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = t('__LOGIN_FORM_EMAIL_FIELD_INVALID_MESSAGE');
      }

      if (!values.password) {
        errors.password = t('__FORM_FIELD_REQUIRED_MESSAGE');
      }

      return errors;
    },
    card: {
      isFloating: true,
      style: {
        width: '100%',
        maxWidth: '400px',
      },
    },
    passwordForgotLabel: t('__LOGIN_FORM_PASSWORD_FORGOT_LABEL'),
    passwordForgotLink: '/wp-login.php?action=lostpassword',
    backToLabel: t('__LOGIN_FORM_BACK_TO_LABEL'),
    placeholderEmail: t('__LOGIN_FORM_EMAIL_PLACEHOLDER'),
    placeholderPassword: t('__LOGIN_FORM_PASSWORD_PLACEHOLDER'),
    onBackClick: () => {
      document.location.href = 'https://unguess.io';
    },
  };

  return (
    <Track title={t('__PAGE_TITLE_LOGIN')}>
      <CenteredXYContainer>
        <StyledLogo type="vertical" size={200} />
        <LoginForm {...defaultArgs} />
      </CenteredXYContainer>
    </Track>
  );
};

export default LoginPage;
