import {
  Anchor,
  Button,
  Checkbox,
  FormField,
  Input,
  Label,
  Message,
  Paragraph,
  SM,
  Select,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  useFormikContext,
} from 'formik';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import {
  useGetUsersRolesQuery,
  useGetCompaniesSizesQuery,
  usePostUsersMutation,
} from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import styled from 'styled-components';
import { AuthStepWrapper } from 'src/common/components/AuthCardWrapper';
import { useOnboarding } from '../OnboardingProvider';
import { getPersonalInfoValidationSchema } from '../validationSchema';

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: ${(p) => p.theme.space.sm};
`;

interface PersonalInfoFormValues {
  name: string;
  surname: string;
  roleId: string;
  companySizeId: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const TEXT_FIELDS: (keyof PersonalInfoFormValues)[] = ['name', 'surname'];

/**
 * Syncs browser-autofilled input values into Formik state.
 * Chrome autofill often skips React synthetic events, leaving Formik
 * unaware of pre-filled values. This component listens for native DOM
 * change events (which Chrome does fire for autofill on user interaction)
 * and pushes them into Formik.
 */
const AutofillSync = () => {
  const { setFieldValue, values } = useFormikContext<PersonalInfoFormValues>();
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const syncAutofill = useCallback(() => {
    TEXT_FIELDS.forEach((fieldName) => {
      const input = document.querySelector<HTMLInputElement>(
        `input[name="${fieldName}"]`
      );
      if (
        input &&
        input.value &&
        input.value !== valuesRef.current[`${fieldName}`]
      ) {
        setFieldValue(fieldName, input.value, true);
      }
    });
  }, [setFieldValue]);

  // Catch Chrome's delayed native change events for autofilled inputs
  useEffect(() => {
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (
        target.tagName === 'INPUT' &&
        target.name &&
        TEXT_FIELDS.includes(target.name as keyof PersonalInfoFormValues)
      ) {
        if (
          target.value !==
          valuesRef.current[target.name as keyof PersonalInfoFormValues]
        ) {
          setFieldValue(target.name, target.value, true);
        }
      }
    };

    document.addEventListener('change', handleChange, true);
    return () => document.removeEventListener('change', handleChange, true);
  }, [setFieldValue]);

  // Also check once shortly after mount for autofill that happened before
  // any user interaction
  useEffect(() => {
    const timer = setTimeout(syncAutofill, 300);
    return () => clearTimeout(timer);
  }, [syncAutofill]);

  return null;
};

export const PersonalInfoStep = () => {
  const { t } = useTranslation();
  const { data, userData, updateData, setStep } = useOnboarding();
  const [searchParams] = useSearchParams();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const [postUsers] = usePostUsersMutation();
  const { data: dataRoles, isLoading: isLoadingRoles } =
    useGetUsersRolesQuery();
  const { data: dataCompanySizes, isLoading: isLoadingCompanySizes } =
    useGetCompaniesSizesQuery();
  const selectRef = useRef<HTMLDivElement>(null);
  const roleSelectRef = useRef<HTMLDivElement>(null);

  const templateParam = searchParams.get('template');
  const templateId = templateParam !== null ? Number(templateParam) : undefined;
  const redirectTo = searchParams.get('redirect') || undefined;

  const renderRolesOptions = useMemo(
    () =>
      isLoadingRoles || !dataRoles ? (
        <Select.Option value="loading">loading...</Select.Option>
      ) : (
        dataRoles?.map((role) => (
          <Select.Option
            key={role.id}
            value={role.id.toString()}
            label={role.name}
          >
            {role.name}
          </Select.Option>
        ))
      ),
    [dataRoles, isLoadingRoles]
  );

  const renderCompanySizes = useMemo(
    () =>
      isLoadingCompanySizes || !dataCompanySizes ? (
        <Select.Option value="loading">loading...</Select.Option>
      ) : (
        dataCompanySizes?.map((size) => (
          <Select.Option
            key={size.id}
            value={size.id.toString()}
            label={size.name}
          >
            {size.name}
          </Select.Option>
        ))
      ),
    [dataCompanySizes, isLoadingCompanySizes]
  );

  const handleSubmit = async (
    values: PersonalInfoFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<PersonalInfoFormValues>
  ) => {
    try {
      sendGTMevent({
        event: 'onboarding-flow',
        action: 'personal-info-completed',
      });

      updateData(values);

      // Se è un utente invitato, fa il submit finale qui
      if (userData.type === 'invite') {
        const basicInfo = {
          name: values.name,
          surname: values.surname,
          roleId: Number(values.roleId),
          companySizeId: Number(values.companySizeId),
          ...(templateId !== undefined && { templateId }),
        };

        sendGTMevent({
          event: 'onboarding-flow',
          category: `type: ${userData.type}`,
          action: 'start submit',
        });

        const res = await postUsers({
          body: {
            type: 'invite',
            ...basicInfo,
            profileId: userData.profileId!,
            token: userData.token!,
          },
        }).unwrap();

        sendGTMevent({
          event: 'onboarding-flow',
          category: `type: ${userData.type}`,
          action: 'completed',
          content: res.projectId ? 'with project' : 'without project',
        });

        // Pulisci sessionStorage
        sessionStorage.removeItem('inviteProfileId');
        sessionStorage.removeItem('inviteToken');

        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          window.location.href = '/';
        }
      } else {
        // Utente nuovo: vai allo step 2 (workspace)
        setStep(2);
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Onboarding error:', error);
      sendGTMevent({
        event: 'onboarding-flow',
        category: `type: ${userData.type}`,
        action: 'error',
        content: error.message,
      });
      setFieldError(
        'name',
        error.data?.message || t('ONBOARDING_ERROR_GENERIC')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: PersonalInfoFormValues = {
    name: data.name,
    surname: data.surname,
    roleId: data.roleId,
    companySizeId: data.companySizeId,
    termsAccepted: data.termsAccepted,
    privacyAccepted: data.privacyAccepted,
  };

  return (
    <AuthStepWrapper>
      <div style={{ marginBottom: appTheme.space.lg, textAlign: 'center' }}>
        <XL isBold style={{ marginBottom: appTheme.space.xs }}>
          {t('SIGNUP_FORM_STEP_2_TITLE')}
        </XL>
        <Paragraph>{t('SIGNUP_FORM_STEP_2_DESCRIPTION')}</Paragraph>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={getPersonalInfoValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <AutofillSync />
            <FieldContainer>
              <Field name="name">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('SIGNUP_FORM_NAME_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <Input
                        type="text"
                        {...field}
                        placeholder={t('SIGNUP_FORM_NAME_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="onboarding-name-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Field name="surname">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('SIGNUP_FORM_SURNAME_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          *
                        </Span>
                      </Label>
                      <Input
                        type="text"
                        {...field}
                        placeholder={t('SIGNUP_FORM_SURNAME_PLACEHOLDER')}
                        {...(hasError && { validation: 'error' })}
                      />
                      {hasError && (
                        <Message
                          data-qa="onboarding-surname-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Field name="roleId">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <div ref={roleSelectRef}>
                      <Select
                        placeholder={t('SIGNUP_FORM_ROLE_PLACEHOLDER')}
                        data-qa="roleId-select"
                        inputValue={
                          field.value
                            ? dataRoles?.find(
                                (role) => role.id === Number(field.value)
                              )?.name || ''
                            : ''
                        }
                        selectionValue={
                          field.value ? field.value.toString() : ''
                        }
                        label={
                          <>
                            {t('SIGNUP_FORM_ROLE_LABEL')}
                            <Span style={{ color: appTheme.palette.red[600] }}>
                              *
                            </Span>
                          </>
                        }
                        onSelect={(roleId) => {
                          setFieldValue('roleId', Number(roleId), true);
                          (
                            roleSelectRef.current?.querySelector(
                              '[role="combobox"]'
                            ) as HTMLElement | null
                          )?.blur();
                        }}
                        {...(hasError && { validation: 'error' })}
                      >
                        {renderRolesOptions}
                      </Select>
                      {hasError && (
                        <Message
                          data-qa="onboarding-role-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="companySizeId">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <div ref={selectRef}>
                      <Select
                        placeholder={t('SIGNUP_FORM_COMPANY_SIZE_PLACEHOLDER')}
                        data-qa="companySizeId-select"
                        inputValue={
                          field.value
                            ? dataCompanySizes?.find(
                                (size) => size.id === Number(field.value)
                              )?.name || ''
                            : ''
                        }
                        selectionValue={
                          field.value ? field.value.toString() : ''
                        }
                        label={
                          <>
                            {t('SIGNUP_FORM_COMPANY_SIZE_LABEL')}
                            <Span style={{ color: appTheme.palette.red[600] }}>
                              *
                            </Span>
                          </>
                        }
                        onSelect={(sizeId) => {
                          setFieldValue('companySizeId', Number(sizeId), true);
                          (
                            selectRef.current?.querySelector(
                              '[role="combobox"]'
                            ) as HTMLElement | null
                          )?.blur();
                        }}
                        {...(hasError && { validation: 'error' })}
                      >
                        {renderCompanySizes}
                      </Select>
                      {hasError && (
                        <Message
                          data-qa="onboarding-company-size-error"
                          validation="error"
                        >
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="privacyAccepted">
                {({ field, form, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField data-qa="privacy-policy">
                      <Checkbox
                        checked={field.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          form.setFieldValue(
                            'privacyAccepted',
                            e.target.checked
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <Label>
                          <SM style={{ fontStyle: 'italic' }}>
                            <Trans
                              i18nKey="SIGNUP_FORM_PRIVACY_CHECKBOX"
                              components={{
                                'privacy-link': (
                                  <Anchor
                                    isExternal
                                    href="https://unguess.io/privacy-policy/"
                                    target="_blank"
                                    title="Privacy Policy"
                                    style={{ fontWeight: 600 }}
                                  />
                                ),
                              }}
                            />
                          </SM>
                        </Label>
                      </Checkbox>
                      {hasError && (
                        <Message validation="error">
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <Field name="termsAccepted">
                {({ field, form, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField data-qa="terms-and-conditions">
                      <Checkbox
                        checked={field.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          form.setFieldValue('termsAccepted', e.target.checked)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                      >
                        <Label>
                          <SM style={{ fontStyle: 'italic' }}>
                            <Trans
                              i18nKey="SIGNUP_FORM_TERMS_CHECKBOX"
                              components={{
                                'terms-link': (
                                  <Anchor
                                    isExternal
                                    href="https://unguess.io/terms-and-conditions/"
                                    target="_blank"
                                    title="Terms and Conditions of Service"
                                    style={{ fontWeight: 600 }}
                                  />
                                ),
                              }}
                            />
                          </SM>
                        </Label>
                      </Checkbox>
                      {hasError && (
                        <Message validation="error">
                          {t(meta.error as string)}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>

              <ButtonRow>
                <Button
                  type="submit"
                  isPrimary
                  isAccent
                  isStretched
                  size="medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('LOADING') : t('SIGNUP_FORM_NEXT_STEP')}
                </Button>
              </ButtonRow>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </AuthStepWrapper>
  );
};
