import {
  AccordionNew,
  Button,
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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { styled } from 'styled-components';
import { PasswordRequirements } from '../PasswordRequirements';
import { PasswordFormValues } from '../valuesType';
import { StyledFooter } from './common';

const StyledAccordionSection = styled(AccordionNew.Section)`
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;

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

  return (
    <AccordionNew
      level={3}
      key={`password_accordion_${isOpen}`}
      hasBorder
      defaultExpandedSections={isOpen ? [0, 1] : []}
    >
      <StyledAccordionSection>
        <AccordionNew.Header
          icon={
            <KeyIcon
              style={{
                width: appTheme.iconSizes.md,
                height: appTheme.iconSizes.md,
                color: appTheme.palette.blue[600],
              }}
            />
          }
        >
          <AccordionNew.Label
            style={{
              color: appTheme.palette.grey[800],
            }}
            label={t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL')}
          />
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <div
            style={{
              marginTop: appTheme.space.base * 4,
              marginBottom: appTheme.space.md,
            }}
          >
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
          </div>
          <Row style={{ marginTop: appTheme.space.xs }}>
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
          <div
            style={{
              marginTop: appTheme.space.xs,
              marginBottom: appTheme.space.xs,
            }}
          >
            <PasswordRequirements />
          </div>

          <StyledFooter style={{ marginTop: appTheme.space.md }}>
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
          </StyledFooter>
        </AccordionNew.Panel>
      </StyledAccordionSection>
    </AccordionNew>
  );
};
