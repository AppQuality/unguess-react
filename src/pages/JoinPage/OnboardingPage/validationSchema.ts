import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const getPersonalInfoValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string()
      .min(2, t('SIGNUP_FORM_NAME_MIN_LENGTH'))
      .required(t('SIGNUP_FORM_NAME_REQUIRED')),
    surname: Yup.string()
      .min(2, t('SIGNUP_FORM_SURNAME_MIN_LENGTH'))
      .required(t('SIGNUP_FORM_SURNAME_REQUIRED')),
    roleId: Yup.string().required(t('SIGNUP_FORM_ROLE_REQUIRED')),
    companySizeId: Yup.string().required(
      t('SIGNUP_FORM_COMPANY_SIZE_REQUIRED')
    ),
  });

export const getWorkspaceValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    workspace: Yup.string()
      .min(3, t('SIGNUP_FORM_WORKSPACE_MIN_LENGTH'))
      .max(50, t('SIGNUP_FORM_WORKSPACE_MAX_LENGTH'))
      .matches(
        /^[a-zA-Z0-9-_\s]+$/,
        t('SIGNUP_FORM_WORKSPACE_INVALID_CHARACTERS')
      )
      .required(t('SIGNUP_FORM_WORKSPACE_REQUIRED')),
  });
