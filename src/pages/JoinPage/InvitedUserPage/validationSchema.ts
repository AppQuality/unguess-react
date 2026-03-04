import * as Yup from 'yup';

export const setPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(12, 'SIGNUP_FORM_PASSWORD_MIN_LENGTH')
    .matches(/[a-z]/, 'SIGNUP_FORM_PASSWORD_LOWERCASE')
    .matches(/[A-Z]/, 'SIGNUP_FORM_PASSWORD_UPPERCASE')
    .matches(/[0-9]/, 'SIGNUP_FORM_PASSWORD_NUMBER')
    .required('SIGNUP_FORM_PASSWORD_REQUIRED'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'CONFIRM_PASSWORD_MUST_MATCH')
    .required('CONFIRM_PASSWORD_REQUIRED'),
});
