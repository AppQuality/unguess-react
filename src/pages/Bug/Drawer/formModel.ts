import * as Yup from 'yup';
import { t } from 'i18next';

export interface CustomStatusFormProps {
  custom_status: string[];
}

export const validationSchema = Yup.object().shape({
  custom_status: Yup.array().of(
    Yup.string()
      .required(t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED'))
      .max(17, t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_MAX'))
  ),
});
