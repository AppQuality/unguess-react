import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('SIGNUP_FORM_EMAIL_INVALID')
    .required('SIGNUP_FORM_EMAIL_REQUIRED'),
  password: Yup.string()
    .min(12, 'SIGNUP_FORM_PASSWORD_MIN_LENGTH')
    .matches(/[a-z]/, 'SIGNUP_FORM_PASSWORD_LOWERCASE')
    .matches(/[A-Z]/, 'SIGNUP_FORM_PASSWORD_UPPERCASE')
    .matches(/[0-9]/, 'SIGNUP_FORM_PASSWORD_NUMBER')
    .required('SIGNUP_FORM_PASSWORD_REQUIRED'),
  terms: Yup.boolean()
    .oneOf([true], 'SIGNUP_FORM_TERMS_REQUIRED')
    .required('SIGNUP_FORM_TERMS_REQUIRED'),
});
