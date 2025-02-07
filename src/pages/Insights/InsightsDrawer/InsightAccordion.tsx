import {
  MD,
  Tag,
  LG,
  Span,
  AccordionNew,
} from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetCampaignsByCidInsightsApiResponse } from 'src/features/api';
import { ReactComponent as ObservationIcon } from '@zendeskgarden/svg-icons/src/16/speech-bubble-conversation-stroke.svg';
import { Trans, useTranslation } from 'react-i18next';
import { InsightFormValues } from '../FormProvider';
import { AccordionLabel } from './components/AccordionLabel';
import { ButtonsFooter } from './components/ButtonsFooter';

const Insight = ({
  insight,
}: {
  insight: GetCampaignsByCidInsightsApiResponse[number];
}) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<InsightFormValues>();
  const isCurrent = values.id === insight.id;
  return (
    <>
      <Divider />
      <AccordionNew
        level={3}
        key={`insight_accordion_${insight.id}_${isCurrent}`}
        defaultExpandedSections={isCurrent ? [0, 1] : []}
        id={`insight-accordion-${insight.id}`}
        role="listitem"
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionLabel insight={insight} />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {insight.description && (
              <div style={{ marginBottom: appTheme.space.md }}>
                <MD
                  isBold
                  color={appTheme.palette.grey[800]}
                  style={{
                    paddingTop: appTheme.space.xs,
                    marginBottom: appTheme.space.xs,
                  }}
                >
                  {t('__INSIGHTS_PAGE_INSIGHT_ACCORDION_DESCRIPTION_LABEL')}
                </MD>
                <MD
                  color={appTheme.palette.grey[700]}
                  style={{ paddingBottom: appTheme.space.xs }}
                >
                  {insight.description}
                </MD>
              </div>
            )}
            {insight.usecases.length > 0 && (
              <div style={{ marginBottom: appTheme.space.md }}>
                <MD
                  isBold
                  color={appTheme.palette.grey[800]}
                  style={{
                    paddingTop: appTheme.space.xs,
                    marginBottom: appTheme.space.xs,
                  }}
                >
                  {t('__INSIGHTS_PAGE_INSIGHT_ACCORDION_USECASES_LABEL')}
                </MD>
                <MD
                  color={appTheme.palette.grey[700]}
                  style={{ paddingBottom: appTheme.space.xs }}
                >
                  <ul style={{ listStyle: 'disc', paddingLeft: '1em' }}>
                    {insight.usecases.map((usecase) => (
                      <li key={usecase.id}>{usecase.name}</li>
                    ))}
                  </ul>
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
              {t('__INSIGHTS_PAGE_INSIGHT_ACCORDION_OBSERVATIONS_LABEL')}
            </LG>
            <Trans
              i18nKey="__INSIGHTS_PAGE_INSIGHT_ACCORDION_OBSERVATIONS_DESCRIPTION"
              components={{
                span: <Span isBold />,
                md: <MD color={appTheme.palette.grey[700]} />,
              }}
              values={{ counter: insight.observations.length }}
              default="Observations in this insight: <span>{{ counter }}</span>"
            />
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
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
    </>
  );
};

export { Insight };
