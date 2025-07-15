import {
  Button,
  Col,
  FormField,
  Input,
  Label,
  LG,
  Message,
  Row,
  Select,
  Span,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { useGetUsersRolesQuery } from 'src/features/api';
import { ProfileFormValues } from '../valuesType';
import { Loader } from './cardLoader';
import {
  CardInnerPanel,
  StyledCardHeader,
  StyledContainerCard,
  StyledFooter,
} from './common';

export const ProfileCard = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersRolesQuery();
  const selectRef = useRef<HTMLDivElement>(null);
  const { setFieldValue, touched, isSubmitting, submitForm } =
    useFormikContext<ProfileFormValues>();

  if (isLoading) return <Loader />;

  return (
    <StyledContainerCard
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
              <div ref={selectRef}>
                <Select
                  placeholder={t('__PROFILE_PAGE_USER_CARD_ROLE_PLACEHOLDER')}
                  data-qa="roleId-select"
                  {...field}
                  inputValue={field.value}
                  selectionValue={field.value}
                  renderValue={(value) =>
                    data?.find(
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
                      selectRef.current?.querySelector(
                        '[role="combobox"]'
                      ) as HTMLElement | null
                    )?.blur();
                  }}
                >
                  {data?.map((role) => (
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
    </StyledContainerCard>
  );
};
