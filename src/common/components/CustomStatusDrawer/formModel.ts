import * as Yup from 'yup';
import { BugCustomStatus } from 'src/features/api';
import { t } from 'i18next';

export interface CustomStatusFormProps {
  custom_statuses: BugCustomStatus[];
}

export const validationSchema = Yup.object().shape({
  custom_statuses: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string()
        .max(17, t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_MAX'))
        .required(t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED')),
      color: Yup.string(),
      phase: Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
    })
  ),
});
