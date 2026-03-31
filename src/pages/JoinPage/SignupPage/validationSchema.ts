import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const getSignupValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string()
      .email(t('SIGNUP_FORM_EMAIL_INVALID'))
      .required(t('SIGNUP_FORM_EMAIL_REQUIRED')),
    password: Yup.string()
      .min(12, t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_12_CHARACTER_LONG'))
      .matches(
        /[a-z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
      .matches(
        /[0-9]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
      .matches(
        /[A-Z]/,
        t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
      .required(t('SIGNUP_FORM_PASSWORD_REQUIRED')),
    termsAccepted: Yup.boolean()
      .oneOf([true], t('SIGNUP_FORM_TERMS_REQUIRED'))
      .required(t('SIGNUP_FORM_TERMS_REQUIRED')),
    privacyAccepted: Yup.boolean()
      .oneOf([true], t('SIGNUP_FORM_PRIVACY_REQUIRED'))
      .required(t('SIGNUP_FORM_PRIVACY_REQUIRED')),
  });
