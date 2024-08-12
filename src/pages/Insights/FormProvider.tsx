import { Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  GetCampaignsByCidInsightsApiResponse,
  Grape,
  usePatchInsightsByIidMutation,
  usePostCampaignsByCidInsightsMutation,
} from 'src/features/api';
import * as Yup from 'yup';

export type InsightFormValues = Omit<
  GetCampaignsByCidInsightsApiResponse[number],
  'severity' | 'observations' | 'usecases'
> & {
  severity: number;
  observations: Grape['observations'];
};

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const [createInsight] = usePostCampaignsByCidInsightsMutation();
  const [patchInsight] = usePatchInsightsByIidMutation();
  const initialValues: InsightFormValues = {
    id: 0,
    title: '',
    description: '',
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
      enableReinitialize={false}
      onSubmit={(
        values: InsightFormValues,
        { setSubmitting, resetForm }: FormikHelpers<InsightFormValues>
      ) => {
        if (values.id === -1) {
          // create
          createInsight({
            cid: campaignId || '',
            body: {
              title: values.title,
              description: values.description,
              severity_id: values.severity,
              observations_ids: values.observations.map((o) => o.id),
              comment: values.comment,
              visible: 0,
            },
          })
            .then(() => {
              resetForm();
              setSubmitting(false);
            })
            .catch((e) => {
              setSubmitting(false);
              // eslint-disable-next-line no-console
              console.error(e);
            });
        } else if (values.id > 0) {
          // update
          patchInsight({
            iid: values.id.toString(),
            body: {
              title: values.title,
              description: values.description,
              severity_id: values.severity,
              observations_ids: values.observations.map((o) => o.id),
              comment: values.comment,
              visible: values.visible,
            },
          })
            .then(() => {
              resetForm();
              setSubmitting(false);
            })
            .catch((e) => {
              setSubmitting(false);
              // eslint-disable-next-line no-console
              console.error(e);
            });
        }
      }}
    >
      <Form>{children}</Form>
    </Formik>
  );
};

export { FormProvider };
