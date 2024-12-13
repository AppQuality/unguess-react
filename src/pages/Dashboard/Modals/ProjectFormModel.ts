import * as Yup from 'yup';

import { t } from 'i18next';

export interface ProjectFormProps {
  name: string;
  description: string;
}

export const validationProjectSchema = Yup.object().shape({
  name: Yup.string()
    .required(t('__PROJECT_FORM_NAME_REQUIRED'))
    .max(64, t('__PROJECT_FORM_NAME_MAX')),
  description: Yup.string().max(234, t('__PROJECT_FORM_DESCRIPTION_MAX')),
});
