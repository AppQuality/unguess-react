import { Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export interface JoinFormValues {
  step: number;
  mail: string;
  password: string;
  name: string;
  surname: string;
  workspace: string;
  roleId: number;
}

interface FormProviderProps {
  children: React.ReactNode;
  mail?: string;
  name?: string;
  surname?: string;
  workspace?: string;
}
export const FormProvider = ({
  children,
  mail,
  name,
  surname,
  workspace,
}: FormProviderProps) => {
  const initialValues: JoinFormValues = {
    step: 1,
    mail: mail || '',
    password: '',
    name: name || '',
    surname: surname || '',
    roleId: 0,
    workspace: workspace || '',
  };

  const { t } = useTranslation();

  const validationSchema = {
    email: yup
      .string()
      .required(t('SIGNUP_FORM_EMAIL_IS_REQUIRED'))
      .email(t('SIGNUP_FORM_EMAIL_MUST_BE_A_VALID_EMAIL')),
    password: yup
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
      then: yup
        .boolean()
        .required(t('SIGNUP_FORM_YOU_MUST_ACCEPT_TO_RECEIVE_EMAILS'))
        .oneOf([true], t('SIGNUP_FORM_YOU_MUST_ACCEPT_TO_RECEIVE_EMAILS')),
    }),
    workspace: yup.string().when('step', {
      is: 3,
      then: yup.string().required(t('SIGNUP_FORM_COUNTRY_IS_REQUIRED')),
    }),
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
      enableReinitialize={false}
      onSubmit={(
        values: JoinFormValues,
        { setSubmitting, resetForm }: FormikHelpers<JoinFormValues>
      ) => {
        setSubmitting(true);
        // todo api call
        setSubmitting(false);
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};
