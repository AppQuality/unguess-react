import {
  AccordionNew,
  Button,
  Card,
  Col,
  FormField,
  Input,
  Label,
  LG,
  Message,
  Row,
  Select,
  Span,
  theme,
} from '@appquality/unguess-design-system';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { useGetUsersRolesQuery } from 'src/features/api';
import { ProfileFormValues } from './valuesType';

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
  const selectRef = useRef<HTMLDivElement>(null);

  const { setFieldValue, validateForm, setTouched, status } =
    useFormikContext<ProfileFormValues>();
  const isOpen = false; // Temporary, as the context is not fully implemented yet
  return (
    <>
      <Card
        id="anchor-profile"
        style={{ marginBottom: theme.space.xxl }}
        title={t('__PROFILE_PAGE_USER_CARD_LABEL')}
      >
        <Row>
          <UserIcon
            style={{
              color: theme.palette.blue[600],
              marginRight: theme.space.base,
            }}
          />
          <LG style={{ color: theme.palette.grey[800] }}>
            {t('__PROFILE_PAGE_USER_CARD_LABEL')}
          </LG>
        </Row>
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
      </Card>
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
            <AccordionNew.Panel>bla bla</AccordionNew.Panel>
          </AccordionNew.Section>
        </AccordionNew>
      </Card>
    </>
  );
};
