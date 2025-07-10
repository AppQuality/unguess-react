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
  Span,
} from '@appquality/unguess-design-system';
import { ReactComponent as Eye } from '@zendeskgarden/svg-icons/src/16/eye-fill.svg';
import { ReactComponent as EyeHide } from '@zendeskgarden/svg-icons/src/16/eye-hide-fill.svg';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { PasswordRequirements } from '../PasswordRequirements';
import { PasswordFormValues } from '../valuesType';

export const PasswordAccordion = () => {
  const { t } = useTranslation();

  const [inputType, setInputType] = useState('password');
  const handleChangeInputType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const {
    setFieldValue,
    validateForm,
    values: formValues,
    touched,
    isSubmitting,
    submitForm,
  } = useFormikContext<PasswordFormValues>();

  const isOpen = false; // Temporary, as the context is not fully implemented yet

  console.log('🚀 ~ PasswordAccordion ~ formValues:', formValues);

  return (
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
            <Field name="currentPassword">
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
                <Field name="newPassword">
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
                <Field name="confirmPassword">
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
            <div>
              <Button
                isAccent
                isPrimary
                disabled={
                  isSubmitting ||
                  !formValues.currentPassword ||
                  !formValues.newPassword ||
                  !formValues.confirmPassword
                }
                onClick={submitForm}
              >
                Save changes
              </Button>
            </div>
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </Card>
  );
};
