import { Accordion, Button, LG, MD } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { useTranslation } from 'react-i18next';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { InsightFormValues } from './FormProvider';

const Insight = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { t } = useTranslation();
  const { values, setValues, isSubmitting } =
    useFormikContext<InsightFormValues>();
  const isCurrent = values.id === insight.id;

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
            <Accordion.Label style={{ padding: 0 }}>
              <LG isBold>{insight.title}</LG>
            </Accordion.Label>
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
              onClick={() => {}}
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
