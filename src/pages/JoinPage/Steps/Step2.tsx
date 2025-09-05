import {
  Button,
  FormField,
  Input,
  Label,
  Message,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import {
  useGetUsersRolesQuery,
  useGetCompaniesSizesQuery,
} from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { JoinFormValues } from '../valuesType';
import { ButtonContainer } from './ButtonContainer';

export const Step2 = () => {
  const { setFieldValue, validateForm, setTouched, status } =
    useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  const sendGTMevent = useSendGTMevent({ loggedUser: false });
  const { data: dataRoles, isLoading: isLoadingRoles } =
    useGetUsersRolesQuery();
  const { data: dataCompanySizes, isLoading: isLoadingCompanySizes } =
    useGetCompaniesSizesQuery();
  const selectRef = useRef<HTMLDivElement>(null);
  const roleSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sendGTMevent({
      event: 'sign-up-flow',
      category: `is invited: ${status?.isInvited}`,
      content: 'step 2 rendered',
    });
  }, []);

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
    [dataRoles]
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
    [dataCompanySizes]
  );
  const goToNextStep = async () => {
    await setTouched({
      name: true,
      surname: true,
      roleId: true,
      companySizeId: true,
    });
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      sendGTMevent({
        event: 'sign-up-flow',
        category: `is invited: ${status?.isInvited}`,
        action: 'step 2 validation error',
        content: `error count: ${Object.keys(errors).length}`,
      });
      return;
    }
    setFieldValue('step', 3);
  };
  const goToPreviousStep = () => {
    setFieldValue('step', 1);
  };
  return (
    <>
      <Field name="name">
        {({ field, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <FormField>
              <Label>
                {t('SIGNUP_FORM_NAME_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                type="text"
                {...field}
                placeholder={t('SIGNUP_FORM_NAME_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && (
                <Message data-qa="signup-name-error" validation="error">
                  {meta.error}
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
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Input
                type="text"
                {...field}
                placeholder={t('SIGNUP_FORM_SURNAME_PLACEHOLDER')}
                {...(hasError && { validation: 'error' })}
              />
              {hasError && (
                <Message data-qa="signup-surname-error" validation="error">
                  {meta.error}
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
                {...field}
                inputValue={
                  field.value
                    ? dataRoles?.find((role) => role.id === Number(field.value))
                        ?.name || ''
                    : ''
                }
                selectionValue={field.value ? field.value.toString() : ''}
                label={
                  <>
                    {t('SIGNUP_FORM_ROLE_LABEL')}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </>
                }
                onSelect={(roleId) => {
                  setFieldValue('roleId', Number(roleId));
                  (
                    roleSelectRef.current?.querySelector(
                      '[role="combobox"]'
                    ) as HTMLElement | null
                  )?.blur();
                }}
              >
                {renderRolesOptions}
              </Select>
              {hasError && (
                <Message data-qa="signup-role-error" validation="error">
                  {meta.error}
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
                {...field}
                inputValue={
                  field.value
                    ? dataCompanySizes?.find(
                        (size) => size.id === Number(field.value)
                      )?.name || ''
                    : ''
                }
                selectionValue={field.value ? field.value.toString() : ''}
                label={
                  <>
                    {t('SIGNUP_FORM_COMPANY_SIZE_LABEL')}
                    <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                  </>
                }
                onSelect={(companySizeId) => {
                  setFieldValue('companySizeId', Number(companySizeId));
                  (
                    selectRef.current?.querySelector(
                      '[role="combobox"]'
                    ) as HTMLElement | null
                  )?.blur();
                }}
              >
                {renderCompanySizes}
              </Select>
              {hasError && (
                <Message data-qa="signup-company-size-error" validation="error">
                  {meta.error}
                </Message>
              )}
            </div>
          );
        }}
      </Field>
      <ButtonContainer>
        <Button onClick={goToPreviousStep} isBasic>
          {t('SIGNUP_FORM_RETURN_TO_STEP_1')}
        </Button>
        <Button onClick={goToNextStep} isPrimary isAccent>
          {t('SIGNUP_FORM_GO_TO_STEP_3')}
        </Button>
      </ButtonContainer>
    </>
  );
};
