import { Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface InsightFormValues {
  id: number;
  title: string;
  severity: number;
  observations: {
    id: number;
    title: string;
    severity: number;
    quotes: string;
  }[];
}

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const initialValues: InsightFormValues = {
    id: 0,
    title: '',
    severity: 0,
    observations: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_ERROR'))
      .required(t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_TITLE_ERROR')),
    severity: Yup.number()
      .min(1, t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_SEVERITY_ERROR'))
      .required(t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_SEVERITY_ERROR')),
    observations: Yup.array()
      .min(1, t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_ERROR'))
      .required(t('__INSIGHTS_PAGE_INSIGHT_FORM_FIELD_OBSERVATIONS_ERROR')),
  });

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
      onSubmit={(
        values: InsightFormValues,
        { setSubmitting, resetForm }: FormikHelpers<InsightFormValues>
      ) => {
        // eslint-disable-next-line no-console
        console.log(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

export { FormProvider };
