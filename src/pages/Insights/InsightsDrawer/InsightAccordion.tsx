import { Accordion, MD, Tag, SM, LG } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { useMemo } from 'react';
import { InsightFormValues } from '../FormProvider';
import { AccordionLabel } from './components/AccordionLabel';
import { getBgColor, getSeverityColor } from '../utils/getSeverityColor';
import { ButtonsFooter } from './components/ButtonsFooter';

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
            <div style={{ marginBottom: appTheme.space.xl }}>
              <Tag
                isPill
                color={getSeverityColor(insight.severity.name)}
                hue={getBgColor(insight.severity.name)}
              >
                {insight.severity.name}
              </Tag>
            </div>
            <MD isBold style={{ marginBottom: appTheme.space.xs }}>
              Description
            </MD>
            <MD style={{ marginBottom: appTheme.space.sm }}>
              {insight.description}
            </MD>
            <LG isBold style={{ marginBottom: appTheme.space.sm }}>
              Observations
            </LG>
            <MD>
              In this insight there are: {insight.observations.length}{' '}
              observations
            </MD>
            <div style={{ marginBottom: appTheme.space.md }}>
              {insight.observations.map((o) => (
                <div
                  style={{
                    borderLeft: `2px solid${appTheme.palette.grey[500]}`,
                    paddingTop: appTheme.space.md,
                    paddingLeft: appTheme.space.md,
                    paddingBottom: appTheme.space.md,
                    marginTop: appTheme.space.md,
                  }}
                >
                  <SM isBold>&quot;{o.quotes}&quot;</SM>
                </div>
              ))}
            </div>
            <ButtonsFooter insight={insight} />
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </>
  );
};

export { Insight };
