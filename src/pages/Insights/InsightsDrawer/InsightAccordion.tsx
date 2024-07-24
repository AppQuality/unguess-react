import {
  Accordion,
  Button,
  MD,
  useToast,
  Notification,
} from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useTranslation } from 'react-i18next';
import {
  GetCampaignsByCidInsightsApiResponse,
  useDeleteInsightsByIidMutation,
} from 'src/features/api';
import { InsightFormValues } from '../FormProvider';
import { AccordionLabel } from './components/AccordionLabel';

const Insight = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { values, setValues, isSubmitting } =
    useFormikContext<InsightFormValues>();
  const isCurrent = values.id === insight.id;

  const [deleteInsight] = useDeleteInsightsByIidMutation();

  const handleDelete = (insight_id: number) => {
    deleteInsight({ iid: insight_id.toString() })
      .unwrap()
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={
                e.message ? e.message : t('_TOAST_GENERIC_ERROR_MESSAGE')
              }
              closeText="X"
              isPrimary
            />
          ),
          { placement: 'top' }
        );
      });
  };

  return (
    <>
      <Divider />
      <Accordion
        level={3}
        style={{ padding: `${appTheme.space.md} 0` }}
        key={`insight_accordion_${insight.id}_${isCurrent}`}
        defaultExpandedSections={isCurrent ? [0, 1] : []}
        id={`insight-accordion-${insight.id}`}
      >
        <Accordion.Section>
          <Accordion.Header>
            <AccordionLabel
              title={insight.title}
              isPublished={insight.visible}
              id={insight.id.toString()}
            />
          </Accordion.Header>
          <Accordion.Panel style={{ padding: 0 }}>
            <MD>{insight.title}</MD>
            <Button
              isBasic
              disabled={isSubmitting}
              style={{
                marginRight: appTheme.space.sm,
                color: appTheme.palette.red[500],
              }}
              onClick={() => {
                handleDelete(insight.id);
              }}
            >
              {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_DELETE')}
            </Button>
            <Button
              style={{ marginTop: appTheme.space.md }}
              isPrimary
              onClick={() =>
                setValues({
                  ...insight,
                  severity: insight.severity.id,
                  observations: insight.observations.map((o) => ({
                    ...o,
                    uploaderId: 0,
                    mediaId: o.video.id,
                    deviceType: '',
                    usecaseTitle: '',
                  })),
                })
              }
            >
              {t('__INSIGHTS_PAGE_INSIGHT_FORM_BUTTON_EDIT')}
            </Button>
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </>
  );
};

export { Insight };
