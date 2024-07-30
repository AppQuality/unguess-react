import { Accordion, MD, Tag, SM, LG } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/16/speech-bubble-conversation-stroke.svg';
import { InsightFormValues } from '../FormProvider';
import { AccordionLabel } from './components/AccordionLabel';
import { ButtonsFooter } from './components/ButtonsFooter';

const Insight = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { values } = useFormikContext<InsightFormValues>();
  const isCurrent = values.id === insight.id;
  return (
    <>
      <Divider />
      <Accordion
        level={3}
        style={{ padding: `${appTheme.space.xxs} 0` }}
        key={`insight_accordion_${insight.id}_${isCurrent}`}
        defaultExpandedSections={isCurrent ? [0, 1] : []}
        id={`insight-accordion-${insight.id}`}
      >
        <Accordion.Section>
          <Accordion.Header>
            <AccordionLabel insight={insight} />
          </Accordion.Header>
          <Accordion.Panel style={{ padding: `0 0 0 ${appTheme.space.xxs}` }}>
            {insight.description && (
              <div style={{ marginBottom: appTheme.space.md }}>
                <MD
                  isBold
                  style={{
                    paddingTop: appTheme.space.xs,
                    marginBottom: appTheme.space.xs,
                  }}
                >
                  Description
                </MD>
                <MD style={{ paddingBottom: appTheme.space.xs }}>
                  {insight.description}
                </MD>
              </div>
            )}
            <LG
              isBold
              style={{
                marginBottom: appTheme.space.sm,
                paddingTop: appTheme.space.sm,
              }}
            >
              <ObservationIcon color={appTheme.palette.grey[600]} />{' '}
              Observations
            </LG>
            <MD>Observations in this insight: {insight.observations.length}</MD>
            <div style={{ marginBottom: appTheme.space.md }}>
              {insight.observations.map((o) => (
                <div
                  style={{
                    borderLeft: `2px solid${appTheme.palette.grey[500]}`,
                    paddingTop: appTheme.space.sm,
                    paddingLeft: appTheme.space.sm,
                    paddingBottom: appTheme.space.sm,
                    marginTop: appTheme.space.md,
                  }}
                >
                  <MD isBold style={{ marginBottom: appTheme.space.sm }}>
                    &quot;{o.quotes}&quot;
                  </MD>
                  <Tag isPill hue={appTheme.palette.grey[100]}>
                    T{o.uploaderId}
                  </Tag>
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
