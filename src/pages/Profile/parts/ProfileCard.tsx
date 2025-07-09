import {
  Button,
  Col,
  FormField,
  Input,
  Label,
  Message,
  Row,
  Select,
  Span,
  SpecialCard,
  Tag,
  theme,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { useGetUsersRolesQuery } from 'src/features/api';
import { ProfileFormValues } from '../valuesType';

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

  console.log('🚀 ~ ProfileCard ~ values:', values);

  if (isLoading) return <>Loading...</>;

  return (
    <SpecialCard
      id="anchor-profile"
      style={{ marginBottom: theme.space.xxl }}
      title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
    >
      <SpecialCard.Meta>
        <Tag size="large" isPill hue="transparent">
          <Tag.Avatar>
            <UserIcon
              style={{
                color: theme.palette.blue[600],
              }}
            />
          </Tag.Avatar>
          {t('__PROFILE_PAGE_USER_CARD_LABEL')}
        </Tag>
      </SpecialCard.Meta>
      <SpecialCard.Body>
        <Row>
          <Col>
            <Field name="name">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && Boolean(meta.error);
                return (
                  <FormField>
                    <Label>
                      {t('__PROFILE_PAGE_USER_CARD_NAME_LABEL')}
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
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
          <Col>
            <Field name="surname">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && Boolean(meta.error);
                return (
                  <FormField>
                    <Label>
                      {t('__PROFILE_PAGE_USER_CARD_SURNAME_LABEL')}
                      <Span style={{ color: appTheme.palette.red[600] }}>
                        *
                      </Span>
                    </Label>
                    <Input
                      type="text"
                      placeholder={t('SIGNUP_FORM_SURNAME_PLACEHOLDER')}
                      {...field}
                      {...(hasError && { validation: 'error' })}
                    />
                    {hasError && (
                      <Message
                        data-qa="signup-surname-error"
                        validation="error"
                      >
                        {meta.error}
                      </Message>
                    )}
                  </FormField>
                );
              }}
            </Field>
          </Col>
        </Row>
        <Row>
          <Col>
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
        <Row>
          <Col>
            <Field name="roleId">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && Boolean(meta.error);
                return (
                  <div ref={selectRef}>
                    <Select
                      // TODO: CHECK placeholder not working
                      placeholder={t(
                        '__PROFILE_PAGE_USER_CARD_ROLE_PLACEHOLDER'
                      )}
                      data-qa="roleId-select"
                      {...field}
                      renderValue={(value) =>
                        data?.find(
                          (role) =>
                            role.id ===
                            Number.parseInt(value.inputValue ?? '', 10)
                        )?.name
                      }
                      isCompact
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
                        console.log('🚀 ~ ProfileCard ~ onSelect:', role);
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
        <div>
          <Button
            isAccent
            isPrimary
            disabled={isSubmitting || !Object.values(touched).length}
            onClick={submitForm}
          >
            Save changes
          </Button>
        </div>
      </SpecialCard.Body>
    </SpecialCard>
  );
};
