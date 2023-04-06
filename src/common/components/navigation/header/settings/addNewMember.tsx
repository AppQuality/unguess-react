import {
  Input,
  Message,
  Button,
  Label,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import * as Yup from 'yup';

const formInitialValues = {
  email: '',
};

const EmailTextField = styled(Field)`
  display: flex;
  width: 100%;
`;

export const AddNewMemberInput = () => {
  const { t } = useTranslation();

  const handleValidation = (values: FormikValues) => {
    const errors: { email?: string } = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

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
      onSubmit={(values, actions) => {
        console.log('submit', values);
        alert('Not implemented yet');
        actions.setSubmitting(false);
      }}
    >
      {({
        errors,
        getFieldProps,
        handleSubmit,
        ...formProps
      }: FormikProps<{ email: string }>) => (
        <Form onSubmit={handleSubmit}>
          <Label>{t('__WORKSPACE_SETTINGS_ADD_MEMBER_EMAIL_LABEL')}</Label>
          <EmailTextField>
            <Input
              placeholder={t(
                '__WORKSPACE_SETTINGS_ADD_MEMBER_EMAIL_PLACEHOLDER'
              )}
              {...getFieldProps('email')}
              {...(errors.email && { validation: 'error' })}
            />
            <Button isPrimary type="submit" disabled={formProps.isSubmitting}>
              {t('__WORKSPACE_SETTINGS_ADD_MEMBER_BUTTON')}
            </Button>
          </EmailTextField>
          {errors.email && (
            <Message
              validation="error"
              style={{ marginTop: globalTheme.space.xs }}
            >
              {errors.email}
            </Message>
          )}
        </Form>
      )}
    </Formik>
  );
};
