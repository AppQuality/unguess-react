import * as Yup from 'yup';

export const personalInfoValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'SIGNUP_FORM_NAME_MIN_LENGTH')
    .required('SIGNUP_FORM_NAME_REQUIRED'),
  surname: Yup.string()
    .min(2, 'SIGNUP_FORM_SURNAME_MIN_LENGTH')
    .required('SIGNUP_FORM_SURNAME_REQUIRED'),
  roleId: Yup.string().required('SIGNUP_FORM_ROLE_REQUIRED'),
  companySizeId: Yup.string().required('SIGNUP_FORM_COMPANY_SIZE_REQUIRED'),
});

export const workspaceValidationSchema = Yup.object().shape({
  workspace: Yup.string()
    .min(3, 'SIGNUP_FORM_WORKSPACE_MIN_LENGTH')
    .max(50, 'SIGNUP_FORM_WORKSPACE_MAX_LENGTH')
    .matches(/^[a-zA-Z0-9-_\s]+$/, 'SIGNUP_FORM_WORKSPACE_INVALID_CHARACTERS')
    .required('SIGNUP_FORM_WORKSPACE_REQUIRED'),
});
