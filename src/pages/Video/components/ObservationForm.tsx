import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

const ObservationForm = ({
  onSubmit,
}: {
  onSubmit: (
    values: { email: string; message?: string },
    actions: FormikHelpers<{ email: string }>
  ) => void;
}) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('__WORKSPACE_SETTINGS_ADD_MEMBER_INVALID_EMAIL_ERROR'))
      .required(t('__WORKSPACE_SETTINGS_ADD_MEMBER_REQUIRED_EMAIL_ERROR')),
  });

  return <>Form</>;
};

export { ObservationForm };
