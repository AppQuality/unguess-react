import * as Yup from 'yup';
import { t } from 'i18next';
import { BugCustomStatus } from 'src/features/api';

export interface CustomStatusFormProps {
  custom_statuses: BugCustomStatus[];
}

export const validationSchema = Yup.object().shape({
  custom_status: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string()
        .required(t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_REQUIRED'))
        .max(17, t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CUSTOM_STATUS_MAX')),
      color: Yup.string().required(),
      phase: Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().required(),
      }),
    })
  ),
});
