import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Message } from '@appquality/unguess-design-system';

import { CustomStatusFormProps } from './formModel';

export const StatusValidationMessage = ({
  formikProps,
  custom_status_id,
}: {
  formikProps: FormikProps<CustomStatusFormProps>;
  custom_status_id: number;
}) => {
  const { t } = useTranslation();
  const { errors, touched, values } = formikProps;
  console.log('********', custom_status_id, '**********');
  console.log('🚀 ~ file: StatusValidationMessage.tsx:17 ~ values:', values);
  console.log('🚀 ~ file: StatusValidationMessage.tsx:17 ~ touched:', touched);
  console.log('🚀 ~ file: StatusValidationMessage.tsx:17 ~ errors:', errors);
  console.log('********', custom_status_id, '**********');

  if (!touched.custom_status) return null;

  if (errors.custom_status && errors.custom_status[custom_status_id]) {
    return (
      <Message validation="error" style={{ margin: `${appTheme.space.xs} 0` }}>
        {errors.custom_status[custom_status_id]}
      </Message>
    );
  }

  return (
    <Message validation="success" style={{ margin: `${appTheme.space.xs} 0` }}>
      {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_SUCCESS')}
    </Message>
  );
};
