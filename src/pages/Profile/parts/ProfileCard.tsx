import {
  Button,
  Col,
  ContainerCard,
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
import { Divider } from 'src/common/components/divider';
import { useGetUsersRolesQuery } from 'src/features/api';
import styled from 'styled-components';
import { ProfileFormValues } from '../valuesType';
import { StyledFooter } from './common';

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.xs} 0;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;
const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.md};
`;

export const ProfileCard = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersRolesQuery();
  const selectRef = useRef<HTMLDivElement>(null);
  const {
    setFieldValue,
    validateForm,
    setTouched,
    status,
    values,
    touched,
    isSubmitting,
    submitForm,
  } = useFormikContext<ProfileFormValues>();

  if (isLoading) return <>Loading...</>;

  return (
    <StyledContainerCard
      id="anchor-profile"
      style={{ marginBottom: appTheme.space.xxl, height: 'auto' }}
      title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
    >
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
      <Divider style={{ marginBottom: appTheme.space.md }} />

      <Row style={{ marginBottom: appTheme.space.md }}>
        <Col style={{ marginBottom: appTheme.space.xs }}>
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
        </Col>
        <Col style={{ marginBottom: appTheme.space.xs }}>
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
        </Col>
      </Row>
      <Row style={{ marginBottom: appTheme.space.xs }}>
        <Col style={{ marginBottom: appTheme.space.sm }}>
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
        </Col>
      </Row>
      <Row style={{ marginBottom: appTheme.space.md }}>
        <Col style={{ marginBottom: appTheme.space.xs }}>
          <Field name="roleId">
            {({ field, meta }: FieldProps) => {
              const hasError = meta.touched && Boolean(meta.error);
              return (
                <div ref={selectRef}>
                  <Select
                    // TODO: CHECK placeholder not working
                    placeholder={t('__PROFILE_PAGE_USER_CARD_ROLE_PLACEHOLDER')}
                    data-qa="roleId-select"
                    {...field}
                    renderValue={(value) =>
                      data?.find(
                        (role) =>
                          role.id ===
                          Number.parseInt(value.inputValue ?? '', 10)
                      )?.name
                    }
                    inputValue={field.value}
                    selectionValue={field.value}
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
        </Col>
      </Row>
      <StyledFooter>
        <Button
          isAccent
          isPrimary
          disabled={isSubmitting || !Object.values(touched).length}
          onClick={submitForm}
        >
          Save changes
        </Button>
      </StyledFooter>
    </StyledContainerCard>
  );
};
