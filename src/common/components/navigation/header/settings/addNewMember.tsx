import {
  Input,
  Message,
  Button,
  Label,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { Form, Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import * as Yup from 'yup';
import { usePostWorkspacesByWidUsersMutation } from 'src/features/api';
import { useAppSelector } from 'src/app/hooks';

const formInitialValues = {
  email: '',
};

const EmailTextField = styled(Field)`
  display: flex;
  width: 100%;
  align-items: first baseline;
  button {
    margin-left: ${({ theme }) => theme.space.sm};
  }
`;

export const AddNewMemberInput = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const [addNewMember] = usePostWorkspacesByWidUsersMutation();

  if (!activeWorkspace) return null;

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
        addNewMember({
          wid: activeWorkspace?.id.toString() || '',
          body: {
            email: values.email,
          },
        })
          .then(() => {
            actions.setSubmitting(false);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
            actions.setSubmitting(false);
          });
      }}
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
          <EmailTextField>
            <Input
              placeholder={t(
                '__WORKSPACE_SETTINGS_ADD_MEMBER_EMAIL_PLACEHOLDER'
              )}
              {...getFieldProps('email')}
              {...(errors.email && { validation: 'error' })}
            />
            <Button
              isPrimary
              isAccent
              type="submit"
              disabled={formProps.isSubmitting}
            >
              {t('__WORKSPACE_SETTINGS_ADD_MEMBER_BUTTON')}
            </Button>
          </EmailTextField>
          {errors.email && (
            <Message
              validation="error"
              style={{ marginTop: appTheme.space.xs }}
            >
              {errors.email}
            </Message>
          )}
        </Form>
      )}
    </Formik>
  );
};
