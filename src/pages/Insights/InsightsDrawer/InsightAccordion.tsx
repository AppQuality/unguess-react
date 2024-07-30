import { Accordion, MD, Tag, SM, LG } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/16/speech-bubble-conversation-stroke.svg';
import { InsightFormValues } from '../FormProvider';
import { AccordionLabel } from './components/AccordionLabel';
import { getBgColor, getSeverityColor } from '../utils/getSeverityColor';
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
            <div style={{ marginBottom: appTheme.space.xl, display: 'flex' }}>
              <Tag
                isPill
                color={getSeverityColor(insight.severity.name)}
                hue={getBgColor(insight.severity.name)}
              >
                {insight.severity.name}
              </Tag>
              {insight.usecases.map((usecase) => (
                <SM>{usecase.name}</SM>
              ))}
            </div>
            {insight.description && (
              <div style={{ marginBottom: appTheme.space.md }}>
                <MD isBold style={{ marginBottom: appTheme.space.xs }}>
                  Description
                </MD>
                <MD style={{ paddingBottom: appTheme.space.xs }}>
                  {insight.description}
                </MD>
              </div>
            )}
            <LG isBold style={{ marginBottom: appTheme.space.sm }}>
              <ObservationIcon /> Observations
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
                  <SM isBold style={{ marginBottom: appTheme.space.sm }}>
                    &quot;{o.quotes}&quot;
                  </SM>
                  <Tag isPill hue="">
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
