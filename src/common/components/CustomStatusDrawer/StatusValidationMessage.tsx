import { FormikErrors, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Message } from '@appquality/unguess-design-system';
import { BugCustomStatus } from 'src/features/api';
import { CustomStatusFormProps } from './formModel';

export const StatusValidationMessage = ({
  formikProps,
  field_id,
}: {
  formikProps: FormikProps<CustomStatusFormProps>;
  field_id: number;
}) => {
  const { t } = useTranslation();
  const { errors, touched, values, initialValues } = formikProps;
  const status = values.custom_statuses[`${field_id}`];
  const initialStatus = initialValues.custom_statuses.find(
    (cs) => cs.id === status.id
  );
  const isChanged =
    initialStatus &&
    initialStatus.name &&
    initialStatus.name.localeCompare(status.name) !== 0;
  const isTouched =
    touched.custom_statuses && touched.custom_statuses[`${field_id}`];

  // If is a newly created custom status, add it's not touched I want to show a warning message
  if (!isTouched && !status?.id && status.name === '') {
    return (
      <Message
        validation="warning"
        style={{ margin: `${appTheme.space.xs} 0` }}
      >
        {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED')}
      </Message>
    );
  }

  // If there are errors, show them
  if (errors.custom_statuses && errors.custom_statuses[`${field_id}`]) {
    const errObj = errors.custom_statuses[
      `${field_id}`
    ] as FormikErrors<BugCustomStatus>;

    return (
      <Message validation="error" style={{ margin: `${appTheme.space.xs} 0` }}>
        {t(
          errObj.name ??
            '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED'
        )}
      </Message>
    );
  }

  if (isChanged === false) return null;

  // Show success message otherwise
  return (
    <Message validation="success" style={{ margin: `${appTheme.space.xs} 0` }}>
      {status.id
        ? t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_SUCCESS')
        : t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_NEW_CUSTOM_STATUS_SUCCESS')}
    </Message>
  );
};
