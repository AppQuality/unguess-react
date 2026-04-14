import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const getSetPasswordValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    password: Yup.string()
      .min(12, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_12_CHARACTER_LONG'))
      .matches(
        /[a-z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
      .matches(
        /[A-Z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
      .matches(
        /[0-9]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
      .required(t('SIGNUP_FORM_PASSWORD_REQUIRED')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('CONFIRM_PASSWORD_MUST_MATCH'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),
  });
