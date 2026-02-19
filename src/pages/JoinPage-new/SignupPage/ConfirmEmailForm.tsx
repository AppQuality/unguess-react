/**
 * ConfirmEmailForm - Form per confermare l'email con codice OTP
 * Dopo la registrazione, l'utente riceve un codice via email
 */
import {
  Button,
  FormField,
  Input,
  Label,
  Message,
  Paragraph,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useAuth } from 'src/features/auth/context';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import * as Yup from 'yup';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface ConfirmEmailFormValues {
  code: string;
}

interface ConfirmEmailFormProps {
  email: string;
}

const confirmEmailValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('CONFIRM_EMAIL_CODE_REQUIRED')
    .min(6, 'CONFIRM_EMAIL_CODE_MIN_LENGTH'),
});

export const ConfirmEmailForm = ({ email }: ConfirmEmailFormProps) => {
  const { t } = useTranslation();
  const { confirmSignup } = useAuth();
  const navigate = useNavigate();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });

  const handleSubmit = async (
    values: ConfirmEmailFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<ConfirmEmailFormValues>
  ) => {
    try {
      await confirmSignup(email, values.code);

      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'email confirmed',
      });

      // Redirect all'onboarding
      navigate('/join/onboarding');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Confirmation error:', error);
      sendGTMevent({
        event: 'sign-up-flow',
        category: 'not invited',
        action: 'confirmation error',
        content: error.message,
      });
      setFieldError('code', error.message || t('CONFIRM_EMAIL_ERROR_GENERIC'));
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: ConfirmEmailFormValues = {
    code: '',
  };

  return (
    <>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('CONFIRM_EMAIL_TITLE')}
        </XL>
        <Paragraph>{t('CONFIRM_EMAIL_DESCRIPTION', { email })}</Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={confirmEmailValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <Field name="code">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('CONFIRM_EMAIL_CODE_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <Input
                        type="text"
                        {...field}
                        placeholder={t('CONFIRM_EMAIL_CODE_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="confirm-code-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Button type="submit" isPrimary isAccent disabled={isSubmitting}>
                {isSubmitting ? t('LOADING') : t('CONFIRM_EMAIL_BUTTON')}
              </Button>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
