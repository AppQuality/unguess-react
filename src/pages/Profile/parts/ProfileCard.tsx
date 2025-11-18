import {
  Button,
  ContainerCard,
  FormField,
  Input,
  Label,
  LG,
  Message,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import {
  useGetUsersRolesQuery,
  useGetCompaniesSizesQuery,
} from 'src/features/api';
import { ProfileFormValues } from '../valuesType';
import { Loader } from './cardLoader';
import { CardInnerPanel, StyledCardHeader, StyledFooter } from './common';

export const ProfileCard = () => {
  const { t } = useTranslation();
  const { data: userRolesData, isLoading: userRoleIsLoading } =
    useGetUsersRolesQuery();
  const { data: userCompanySizesData, isLoading: userCompanySizesIsLoading } =
    useGetCompaniesSizesQuery();
  const selectRoleRef = useRef<HTMLDivElement>(null);
  const selectCompanyRef = useRef<HTMLDivElement>(null);
  const { setFieldValue, touched, isSubmitting, submitForm } =
    useFormikContext<ProfileFormValues>();

  if (userRoleIsLoading || userCompanySizesIsLoading) return <Loader />;

  return (
    <ContainerCard
      id="anchor-profile-id"
      data-qa="profile-card"
      title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
    >
      <CardInnerPanel>
        <StyledCardHeader>
          <UserIcon
            style={{
              color: appTheme.palette.blue[600],
              width: appTheme.iconSizes.md,
              height: appTheme.iconSizes.md,
            }}
          />
          <LG isBold style={{ color: appTheme.palette.grey[800] }}>
            {t('__PROFILE_PAGE_USER_CARD_LABEL')}
          </LG>
        </StyledCardHeader>

        <Field name="name">
          {({ field, meta }: FieldProps) => {
            const hasError = meta.touched && Boolean(meta.error);
            return (
              <FormField>
                <Label>
                  {t('__PROFILE_PAGE_USER_CARD_NAME_LABEL')}
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                </Label>
                <Input
                  type="text"
                  placeholder={t('SIGNUP_FORM_NAME_PLACEHOLDER')}
                  {...field}
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
                  {t('__PROFILE_PAGE_USER_CARD_SURNAME_LABEL')}
                  <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
                </Label>
                <Input
                  type="text"
                  placeholder={t('SIGNUP_FORM_SURNAME_PLACEHOLDER')}
                  {...field}
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

        <Field name="email">
          {({ field }: FieldProps) => (
            <FormField>
              <Label>
                {t('__PROFILE_PAGE_USER_CARD_EMAIL_LABEL')}
                <Span style={{ color: appTheme.palette.red[600] }}> *</Span>
              </Label>
              <Input
                disabled
                type="email"
                role="textbox"
                title="Email"
                {...field}
              />
            </FormField>
          )}
        </Field>

        <Field name="roleId">
          {({ field, meta }: FieldProps) => {
            const hasError = meta.touched && Boolean(meta.error);
            return (
              <div ref={selectRoleRef}>
                <Select
                  placeholder={t('__PROFILE_PAGE_USER_CARD_ROLE_PLACEHOLDER')}
                  data-qa="roleId-select"
                  {...field}
                  inputValue={field.value}
                  selectionValue={field.value}
                  renderValue={(value) =>
                    userRolesData?.find(
                      (role) =>
                        role.id === Number.parseInt(value.inputValue ?? '', 10)
                    )?.name
                  }
                  label={
                    <>
                      {t('__PROFILE_PAGE_USER_CARD_ROLE_LABEL')}
                      <Span
                        style={{
                          color: appTheme.palette.red[600],
                        }}
                      >
                        *
                      </Span>
                    </>
                  }
                  onSelect={(role) => {
                    setFieldValue('roleId', Number.parseInt(role, 10));
                    (
                      selectRoleRef.current?.querySelector(
                        '[role="combobox"]'
                      ) as HTMLElement | null
                    )?.blur();
                  }}
                >
                  {userRolesData?.map((role) => (
                    <Select.Option key={role.id} value={role.id.toString()}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
                {hasError && (
                  <Message
                    data-qa="update-profile-role-error"
                    validation="error"
                  >
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
              <div ref={selectCompanyRef}>
                <Select
                  placeholder={t(
                    '__PROFILE_PAGE_USER_CARD_COMPANY_SIZE_PLACEHOLDER'
                  )}
                  data-qa="companySizeId-select"
                  {...field}
                  inputValue={field.value}
                  selectionValue={field.value}
                  renderValue={(value) =>
                    userCompanySizesData?.find(
                      (companySize) =>
                        companySize.id ===
                        Number.parseInt(value.inputValue ?? '', 10)
                    )?.name
                  }
                  label={
                    <>
                      {t('__PROFILE_PAGE_USER_CARD_COMPANY_SIZE_LABEL')}
                      <Span
                        style={{
                          color: appTheme.palette.red[600],
                        }}
                      >
                        *
                      </Span>
                    </>
                  }
                  onSelect={(companySize) => {
                    setFieldValue(
                      'companySizeId',
                      Number.parseInt(companySize, 10)
                    );
                    (
                      selectCompanyRef.current?.querySelector(
                        '[role="combobox"]'
                      ) as HTMLElement | null
                    )?.blur();
                  }}
                >
                  {userCompanySizesData?.map((companySize) => (
                    <Select.Option
                      key={companySize.id}
                      value={companySize.id.toString()}
                    >
                      {companySize.name}
                    </Select.Option>
                  ))}
                </Select>
                {hasError && (
                  <Message
                    data-qa="update-profile-companySizeId-error"
                    validation="error"
                  >
                    {meta.error}
                  </Message>
                )}
              </div>
            );
          }}
        </Field>

        <StyledFooter>
          <Button
            isAccent
            isPrimary
            disabled={isSubmitting || !Object.values(touched).length}
            onClick={submitForm}
          >
            {t('__PAGE_PROFILE_SAVE_CHANGES_BUTTON')}
          </Button>
        </StyledFooter>
      </CardInnerPanel>
    </ContainerCard>
  );
};
