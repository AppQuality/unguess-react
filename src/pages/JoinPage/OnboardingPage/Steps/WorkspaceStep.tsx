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
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePostUsersMutation } from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { AuthStepWrapper } from 'src/common/components/AuthCardWrapper';
import { useOnboarding } from '../OnboardingProvider';
import { getWorkspaceValidationSchema } from '../validationSchema';
import { sendToHubspot } from '../../sendToHubspot';

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
  const [searchParams] = useSearchParams();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const [postUsers] = usePostUsersMutation();
  const templateParam = searchParams.get('template');
  const templateId = templateParam !== null ? Number(templateParam) : undefined;

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

      try {
        await sendToHubspot({
          email: userData.email!,
          firstName: data.name,
          lastName: data.surname,
          searchParams: Object.fromEntries(searchParams.entries()),
        });
      } catch (err) {
        console.error('Error sending data to HubSpot:', err);
      }

      // Pulisci sessionStorage per utenti invitati
      if (userData.type === 'invite') {
        sessionStorage.removeItem('inviteProfileId');
        sessionStorage.removeItem('inviteToken');
      }

      if (res.projectId) {
        window.location.href = `/projects/${res.projectId}`;
      } else {
        window.location.href = '/';
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
    <AuthStepWrapper>
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
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
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
                  disabled={isSubmitting || !isValid}
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
    </AuthStepWrapper>
  );
};
