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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePostUsersMutation } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { useOnboarding } from '../OnboardingProvider';
import { getWorkspaceValidationSchema } from '../validationSchema';

const StepWrapper = styled.div`
  width: 100%;
  max-width: 376px;
  margin: 0 auto;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
  justify-content: center;
`;

interface WorkspaceFormValues {
  workspace: string;
}

export const WorkspaceStep = () => {
  const { t } = useTranslation();
  const { data, userData, updateData, setStep } = useOnboarding();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const [postUsers] = usePostUsersMutation();

  const templateParam = searchParams.get('template');
  let templateId: number | undefined;

  if (templateParam !== null) {
    const parsed = Number(templateParam);
    if (Number.isInteger(parsed)) {
      templateId = parsed;
    }
  }

  const handleSubmit = async (
    values: WorkspaceFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<WorkspaceFormValues>
  ) => {
    try {
      updateData(values);

      const basicInfo = {
        name: data.name,
        surname: data.surname,
        roleId: Number(data.roleId),
        companySizeId: Number(data.companySizeId),
        ...(templateId !== undefined && { templateId }),
      };

      sendGTMevent({
        event: 'onboarding-flow',
        category: `type: ${userData.type}`,
        action: 'start submit',
      });

      let res;
      if (userData.type === 'invite') {
        res = await postUsers({
          body: {
            type: 'invite',
            ...basicInfo,
            profileId: userData.profileId!,
            token: userData.token!,
          },
        }).unwrap();
      } else {
        res = await postUsers({
          body: {
            type: 'new',
            ...basicInfo,
            email: userData.email!,
            workspace: values.workspace,
          },
        }).unwrap();
      }

      sendGTMevent({
        event: 'onboarding-flow',
        category: `type: ${userData.type}`,
        action: 'completed',
        content: res.projectId ? 'with project' : 'without project',
      });

      // Pulisci sessionStorage per utenti invitati
      if (userData.type === 'invite') {
        sessionStorage.removeItem('inviteProfileId');
        sessionStorage.removeItem('inviteToken');
      }

      // Redirect appropriato (utente già loggato)
      if (res.projectId) {
        navigate(`/projects/${res.projectId}`);
      } else {
        navigate('/');
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Onboarding save error:', error);
      sendGTMevent({
        event: 'onboarding-flow',
        category: `type: ${userData.type}`,
        action: 'error',
        content: error.message,
      });
      setFieldError(
        'workspace',
        error.data?.message || error.message || t('ONBOARDING_ERROR_GENERIC')
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
    <StepWrapper>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('SIGNUP_FORM_STEP_3_TITLE')}
        </XL>
        <Paragraph>{t('SIGNUP_FORM_STEP_3_DESCRIPTION')}</Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getWorkspaceValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
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
                  type="submit"
                  isPrimary
                  isAccent
                  isStretched
                  size="medium"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  {isSubmitting ? t('LOADING') : t('SIGNUP_FORM_SUBMIT')}
                </Button>
                <Button
                  onClick={goToPreviousStep}
                  isBasic
                  isStretched
                  disabled={isSubmitting}
                >
                  {t('SIGNUP_FORM_RETURN_TO_STEP_2')}
                </Button>
              </ButtonContainer>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </StepWrapper>
  );
};
