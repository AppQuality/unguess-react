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
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { useOnboarding } from '../OnboardingProvider';
import { workspaceValidationSchema } from '../validationSchema';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${(p) => p.theme.space.sm};
  justify-content: space-between;
`;

interface WorkspaceFormValues {
  workspace: string;
}

export const WorkspaceStep = () => {
  const { t } = useTranslation();
  const { data, updateData, setStep } = useOnboarding();
  const navigate = useNavigate();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });

  const handleSubmit = async (
    values: WorkspaceFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<WorkspaceFormValues>
  ) => {
    try {
      updateData(values);

      // TODO: Chiamata API per salvare tutti i dati dell'onboarding
      sendGTMevent({
        event: 'onboarding-flow',
        action: 'completed',
      });

      // TODO: Recuperare logica redirect dalla vecchia join
      navigate('/');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Onboarding save error:', error);
      sendGTMevent({
        event: 'onboarding-flow',
        action: 'error',
        content: error.message,
      });
      setFieldError(
        'workspace',
        error.message || t('ONBOARDING_ERROR_GENERIC')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  const initialValues: WorkspaceFormValues = {
    workspace: data.workspace,
  };

  return (
    <>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('SIGNUP_FORM_STEP_3_TITLE')}
        </XL>
        <Paragraph>{t('SIGNUP_FORM_STEP_3_DESCRIPTION')}</Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={workspaceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <Field name="workspace">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('SIGNUP_FORM_WORKSPACE_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <Input
                        type="text"
                        {...field}
                        placeholder={t('SIGNUP_FORM_WORKSPACE_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="onboarding-workspace-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <ButtonContainer>
                <Button
                  onClick={goToPreviousStep}
                  isBasic
                  disabled={isSubmitting}
                >
                  {t('SIGNUP_FORM_RETURN_TO_STEP_2')}
                </Button>
                <Button
                  type="submit"
                  isPrimary
                  isAccent
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('LOADING') : t('SIGNUP_FORM_SUBMIT')}
                </Button>
              </ButtonContainer>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
