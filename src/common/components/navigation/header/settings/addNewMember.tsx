import {
  Input,
  Message,
  Button,
  Label,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
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
  const { activeWorkspace, campaignId, projectId } = useAppSelector(
    (state) => state.navigation
  );
  const [addNewWorkspaceMember] = usePostWorkspacesByWidUsersMutation();
  // const [addNewProjectMember] = usePostProjectByWidUsersMutation();
  // const [addNewCampaignMember] = usePostCampaignByWidUsersMutation();

  if (!activeWorkspace) return null;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('__WORKSPACE_SETTINGS_ADD_MEMBER_INVALID_EMAIL_ERROR'))
      .required(t('__WORKSPACE_SETTINGS_ADD_MEMBER_REQUIRED_EMAIL_ERROR')),
  });

  const onSubmitNewWorkspaceMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    addNewWorkspaceMember({
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
  };

  const onSubmitNewProjectMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    // addNewProjectMember({
    //   wid: projectId || '',
    //   body: {
    //     email: values.email,
    //   },
    // })
    //   .then(() => {
    //     actions.setSubmitting(false);
    //   })
    //   .catch((err) => {
    //     // eslint-disable-next-line no-console
    //     console.error(err);
    //     actions.setSubmitting(false);
    //   });

    // eslint-disable-next-line no-console
    console.log('submit new project member: ', values.email);
  };

  const onSubmitNewCampaignMember = (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    // addNewCampaignMember({
    //   wid: campaignId || '',
    //   body: {
    //     email: values.email,
    //   },
    // })
    //   .then(() => {
    //     actions.setSubmitting(false);
    //   })
    //   .catch((err) => {
    //     // eslint-disable-next-line no-console
    //     console.error(err);
    //     actions.setSubmitting(false);
    //   });

    // eslint-disable-next-line no-console
    console.log('submit new campaign member: ', values.email);
  };

  const onSubmit = () => {
    if (projectId) return onSubmitNewProjectMember;
    if (campaignId) return onSubmitNewCampaignMember;

    return onSubmitNewWorkspaceMember;
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      onSubmit={onSubmit()}
    >
      {({
        errors,
        getFieldProps,
        handleSubmit,
        ...formProps
      }: FormikProps<{ email: string }>) => (
        <Form
          onSubmit={handleSubmit}
          style={{ marginBottom: globalTheme.space.sm }}
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
              isPill
              themeColor={globalTheme.palette.water[600]}
              type="submit"
              disabled={formProps.isSubmitting}
            >
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
