import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Message } from '@appquality/unguess-design-system';

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

  const status = values.custom_statuses[field_id];
  const initialStatus = initialValues.custom_statuses[field_id];
  const isChanged = initialStatus && initialStatus.name !== status.name;

  const isTouched =
    touched.custom_statuses && touched.custom_statuses[field_id];

  // If is a newly created custom status, add it's not touched I want to show a warning message
  if (!isTouched && !status.id && status.name === '') {
    return (
      <Message
        validation="warning"
        style={{ margin: `${appTheme.space.xs} 0` }}
      >
        {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED')}
      </Message>
    );
  }

  if (!isTouched || !isChanged) return null;

  if (errors.custom_statuses && errors.custom_statuses[field_id]) {
    return (
      <Message validation="error" style={{ margin: `${appTheme.space.xs} 0` }}>
        {errors.custom_statuses[field_id]}
      </Message>
    );
  }

  return (
    <Message validation="success" style={{ margin: `${appTheme.space.xs} 0` }}>
      {status.id
        ? t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_SUCCESS')
        : t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_NEW_CUSTOM_STATUS_SUCCESS')}
    </Message>
  );
};
