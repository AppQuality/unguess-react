import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    email: yup.string().when('step', {
      is: 1,
      then: yup
        .string()
        .required(t('SIGNUP_FORM_EMAIL_IS_REQUIRED'))
        .email(t('SIGNUP_FORM_EMAIL_MUST_BE_A_VALID_EMAIL')),
    }),
    password: yup.string().when('step', {
      is: 1,
      then: yup
        .string()
        .min(6, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTER_LONG'))
        .matches(
          /[0-9]/,
          t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
        )
        .matches(
          /[A-Z]/,
          t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
        )
        .matches(
          /[a-z]/,
          t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
        )
        .required(t('SIGNUP_FORM_PASSWORD_IS_A_REQUIRED_FIELD')),
    }),
    name: yup.string().when('step', {
      is: 2,
      then: yup.string().required(t('SIGNUP_FORM_NAME_IS_REQUIRED')),
    }),
    surname: yup.string().when('step', {
      is: 2,
      then: yup.string().required(t('SIGNUP_FORM_SURNAME_IS_REQUIRED')),
    }),
    roleId: yup.number().when('step', {
      is: 2,
      then: yup.number().positive(t('SIGNUP_FORM_ROLE_IS_REQUIRED')),
    }),
    companySizeId: yup.number().when('step', {
      is: 2,
      then: yup.number().positive(t('SIGNUP_FORM_COMPANY_SIZE_IS_REQUIRED')),
    }),
    workspace: yup.string().when('step', {
      is: 3,
      then: yup.string().required(t('SIGNUP_FORM_WORKSPACE_IS_REQUIRED')),
    }),
  });
};
