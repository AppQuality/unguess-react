import {
  Input,
  Message,
  Button,
  Label,
  Textarea,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import * as Yup from 'yup';

const formInitialValues = {
  email: '',
};

const EmailTextField = styled(Field)`
  display: flex;
  width: 100%;
  align-items: first baseline;
  margin-top: ${({ theme }) => theme.space.xs};

  button {
    margin-left: ${({ theme }) => theme.space.sm};
  }
`;

export const AddNewMemberInput = ({
  onSubmit,
}: {
  onSubmit: (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => void;
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('__WORKSPACE_SETTINGS_ADD_MEMBER_INVALID_EMAIL_ERROR'))
      .required(t('__WORKSPACE_SETTINGS_ADD_MEMBER_REQUIRED_EMAIL_ERROR')),
  });

  return (
    <Formik
      initialValues={formInitialValues}
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        getFieldProps,
        handleSubmit,
        ...formProps
      }: FormikProps<{ email: string }>) => (
        <Form
          onSubmit={handleSubmit}
          style={{ marginBottom: appTheme.space.sm }}
        >
          <Label>{t('__WORKSPACE_SETTINGS_ADD_MEMBER_EMAIL_LABEL')}</Label>
          <Input
            style={{
              marginBottom: appTheme.space.sm,
            }}
            placeholder={t('__WORKSPACE_SETTINGS_ADD_MEMBER_EMAIL_PLACEHOLDER')}
            {...getFieldProps('email')}
            {...(errors.email && { validation: 'error' })}
          />
          {errors.email && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.sm }}
            >
              {errors.email}
            </Message>
          )}
          <Textarea
            style={{
              marginBottom: appTheme.space.sm,
            }}
            placeholder={t(
              '__WORKSPACE_SETTINGS_ADD_MEMBER_MESSAGE_PLACEHOLDER'
            )}
            rows={4}
            {...getFieldProps('message')}
          />
          <Button
            isPrimary
            isAccent
            type="submit"
            disabled={formProps.isSubmitting}
          >
            {t('__WORKSPACE_SETTINGS_ADD_MEMBER_BUTTON')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
