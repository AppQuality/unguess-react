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
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetUsersRolesQuery } from 'src/features/api';
import { useMemo } from 'react';
import { JoinFormValues } from '../FormProvider';

export const Step2 = () => {
  const { setFieldValue, values, status, validateForm, setTouched } =
    useFormikContext<JoinFormValues>();
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersRolesQuery();
  const renderOptions = useMemo(
    () =>
      data?.map((role) => (
        <Select.Option key={role.id} value={role.id.toString()}>
          {role.name}
        </Select.Option>
      )),
    [data]
  );
  const goToNextStep = async () => {
    await setTouched({
      name: true,
      surname: true,
      roleId: true,
    });
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    }
    setFieldValue('step', 3);
  };
  const goToPreviousStep = () => {
    setFieldValue('step', 1);
  };
  return (
    <div role="tabpanel" title="Step 2">
      <Field name="name">
        {({ field, form, meta }: FieldProps) => {
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
        {({ field, form, meta }: FieldProps) => {
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
        {({ field, form, meta }: FieldProps) => {
          const hasError = meta.touched && Boolean(meta.error);
          return (
            <>
              <Label>
                {t('SIGNUP_FORM_ROLE_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
              </Label>
              <Select
                data-qa="roleId-select"
                renderValue={(value) =>
                  data?.find((role) => role.id === Number(value.inputValue))
                    ?.name
                }
                isCompact
                inputValue={field.value}
                selectionValue={field.value}
                onSelect={async (roleId) => {
                  setFieldValue('roleId', roleId);
                }}
              >
                {renderOptions}
              </Select>
              {hasError && (
                <Message data-qa="signup-role-error" validation="error">
                  {meta.error}
                </Message>
              )}
            </>
          );
        }}
      </Field>
      <Button onClick={goToPreviousStep}>
        {t('SIGNUP_FORM_RETURN_TO_STEP_1')}
      </Button>
      <Button onClick={goToNextStep}>{t('SIGNUP_FORM_GO_TO_STEP_3')}</Button>
    </div>
  );
};
