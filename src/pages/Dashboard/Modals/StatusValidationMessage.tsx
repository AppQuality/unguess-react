import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Message } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import { ProjectFormProps } from './CreateProjectModal';

export const ProjectStatusValidationMessage = ({
  formikProps,
  field_name,
}: {
  formikProps: FormikProps<ProjectFormProps>;
  field_name: keyof ProjectFormProps;
}) => {
  const { t } = useTranslation();
  const { errors, touched, values, initialValues } = formikProps;
  const status = values[`${field_name}`];
  const isTouched = touched[`${field_name}`];
  const isChanged =
    initialValues &&
    initialValues[`${field_name}`] &&
    initialValues[`${field_name}`].localeCompare(status) !== 0;

  if (!isTouched && !status && status === '') {
    return (
      <Message
        validation="warning"
        style={{ margin: `${appTheme.space.xs} 0` }}
      >
        {field_name === 'name'
          ? t(`__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_WARNING`)
          : t(`__DASHBOARD_CREATE_NEW_PROJECT_FORM_DESCRIPTION_WARNING`)}
      </Message>
    );
  }

  if (errors[`${field_name}`]) {
    return (
      <Message validation="error" style={{ margin: `${appTheme.space.xs} 0` }}>
        {errors[`${field_name}`]}
      </Message>
    );
  }
  if (isChanged === false) return null;
  return field_name === 'name' && !errors.name ? (
    <Message validation="success" style={{ margin: `${appTheme.space.xs} 0` }}>
      {t('__DASHBOARD_CREATE_NEW_PROJECT_FORM_NAME_SUCCESS')}
    </Message>
  ) : null;
};
