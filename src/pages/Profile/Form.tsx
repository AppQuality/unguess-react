import {
  AccordionNew,
  Button,
  Card,
  Col,
  FormField,
  Input,
  Label,
  MediaInput,
  Message,
  Row,
  Select,
  Span,
  SpecialCard,
  Tag,
  theme,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { useGetUsersRolesQuery } from 'src/features/api';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import styled from 'styled-components';
import { ProfileFormValues } from './valuesType';
import { PasswordRequirements } from './PasswordRequirements';

// styled card header
const StyledCardHeader = styled.div``;

export const Form = () => {
  const { t } = useTranslation();
  const { data: roleData, isLoading: roleIsLoading } = useGetUsersRolesQuery();
  const renderOptions = useMemo(
    () =>
      roleIsLoading || !roleData ? (
        <Select.Option value="loading">loading...</Select.Option>
      ) : (
        roleData?.map((role) => (
          <Select.Option key={role.id} value={role.id.toString()}>
            {role.name}
          </Select.Option>
        ))
      ),
    [roleData]
  );

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const selectRef = useRef<HTMLDivElement>(null);

  const { setFieldValue, validateForm, setTouched, status } =
    useFormikContext<ProfileFormValues>();
  const isOpen = false; // Temporary, as the context is not fully implemented yet

  // On change of the form, console log the form values
  useEffect(() => {
    const logFormValues = async () => {
      const values = await validateForm();
      console.log(`Form values: ${JSON.stringify(values, null, 2)}`);
    };
    logFormValues();
  }, [setFieldValue, validateForm]);
  return (
    <>
      <SpecialCard
        id="anchor-profile"
        style={{ marginBottom: theme.space.xxl }}
        title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
      >
        <SpecialCard.Meta>
          <Tag size="large" isPill>
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
                        {...field}
                        placeholder={t('SIGNUP_FORM_SURNAME_PLACEHOLDER')}
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
                    // TODO: CHECK placeholder not working
                    placeholder={t('__PROFILE_PAGE_USER_CARD_ROLE_PLACEHOLDER')}
                    data-qa="roleId-select"
                    {...field}
                    renderValue={(value) =>
                      roleData?.find(
                        (role) => role.id === Number(value.inputValue)
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
                    onSelect={(roleId) => {
                      setFieldValue('roleId', Number(roleId));
                      (
                        selectRef.current?.querySelector(
                          '[role="combobox"]'
                        ) as HTMLElement | null
                      )?.blur();
                    }}
                  >
                    {renderOptions}
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
          <div>
            <Button
              isAccent
              isPrimary
              onClick={() => {
                alert('User profile update functionality not implemented yet.');
              }}
            >
              Save changes
            </Button>
          </div>
        </SpecialCard.Body>
      </SpecialCard>
      <Card>
        <AccordionNew
          level={3}
          key={`password_accordion_${isOpen}`}
          defaultExpandedSections={isOpen ? [0, 1] : []}
        >
          <AccordionNew.Section>
            <AccordionNew.Header icon={<KeyIcon />}>
              <AccordionNew.Label
                style={{
                  color: appTheme.palette.blue[600],
                }}
                label={t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL')}
              />
            </AccordionNew.Header>
            <AccordionNew.Panel>
              <Field name="current-password">
                {({ field, meta }: FieldProps) => {
                  const hasError = meta.touched && Boolean(meta.error);
                  return (
                    <FormField>
                      <Label>
                        {t('__PAGE_PROFILE_CURRENT_PASSWORD_LABEL')}
                        <Span style={{ color: appTheme.palette.red[600] }}>
                          {' '}
                          *
                        </Span>
                      </Label>

                      <MediaInput
                        type={inputType}
                        role="textbox"
                        title="Current Password"
                        end={
                          inputType === 'password' ? (
                            <Eye
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangeInputType}
                              title={t(
                                '__PAGE_PROFILE_FORM_CURRENT_PASSWORD_SHOW'
                              )}
                            />
                          ) : (
                            <EyeHide
                              style={{ cursor: 'pointer' }}
                              onClick={handleChangeInputType}
                              title={t(
                                '__PAGE_PROFILE_FORM_CURRENT_PASSWORD_HIDE'
                              )}
                            />
                          )
                        }
                        {...field}
                        placeholder={t(
                          '__PAGE_PROFILE_CURRENT_PASSWORD_PLACEHOLDER'
                        )}
                        {...(hasError && { validation: 'error' })}
                      />

                      {hasError && (
                        <Message
                          data-qa="message-error-current-password"
                          validation="error"
                        >
                          {meta.error}
                        </Message>
                      )}
                    </FormField>
                  );
                }}
              </Field>
              <Row>
                <Col>
                  <Field name="new-password">
                    {({ field, meta }: FieldProps) => {
                      const hasError = meta.touched && Boolean(meta.error);
                      return (
                        <FormField>
                          <Label>
                            {t('__PAGE_PROFILE_NEW_PASSWORD_LABEL')}
                            <Span style={{ color: appTheme.palette.red[600] }}>
                              *
                            </Span>
                          </Label>
                          <Input
                            type="text"
                            {...field}
                            placeholder={t(
                              '__PAGE_PROFILE_NEW_PASSWORD_PLACEHOLDER'
                            )}
                            {...(hasError && { validation: 'error' })}
                          />
                          {hasError && (
                            <Message
                              data-qa="profile-new-pass-error"
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
                <Col>
                  <Field name="confirm-password">
                    {({ field, meta }: FieldProps) => {
                      const hasError = meta.touched && Boolean(meta.error);
                      return (
                        <FormField>
                          <Label>
                            {t('__PAGE_PROFILE_CONFIRM_PASSWORD_LABEL')}
                            <Span style={{ color: appTheme.palette.red[600] }}>
                              *
                            </Span>
                          </Label>
                          <Input
                            type="text"
                            {...field}
                            placeholder={t(
                              '__PAGE_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER'
                            )}
                            {...(hasError && { validation: 'error' })}
                          />
                          {hasError && (
                            <Message
                              data-qa="profile-confirm-pass-error"
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
              <PasswordRequirements />
            </AccordionNew.Panel>
          </AccordionNew.Section>
        </AccordionNew>
      </Card>
    </>
  );
};
