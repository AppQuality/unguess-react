import {
  BarChart,
  Col,
  Grid,
  Row,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';

import { CapitalizeFirstLetter } from 'src/pages/Campaign/widgetCards/common/CapitalizeFirstLetter';
import { useSeveritiesDistributionData } from '../hooks/useSeveritiesDistributionData';
import { getMaxSeverity } from '../utils/getMaxSeverity';
import { getSeverityColor } from '../../utils/getSeverityColor';

export const ProgressMonitoringWidget = ({
  campaignId,
}: {
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const {
    countObservationSeverity,
    countPositiveFindings,
    countMajorIssue,
    countMinorIssue,
    countObservations,
  } = useSeveritiesDistributionData(campaignId);

  const graphData = [
    {
      label: '',
      keys: {
        Observation: countObservationSeverity,
        Positive: countPositiveFindings,
        Minor: countMinorIssue,
        Major: countMajorIssue,
      },
    },
  ];
  const maxSeverity = getMaxSeverity(
    countMajorIssue,
    countMinorIssue,
    countPositiveFindings,
    countObservationSeverity
  );
  return (
    <BasicWidget className="progress-monitoring-widget">
      <BasicWidget.Header
        tooltipContent={t('_CAMPAIGN_WIDGET_UX_TEST_PROGRESS_MONITORING')}
      >
        <CapitalizeFirstLetter>
          {t('_CAMPAIGN_WIDGET_UX_TEST_PROGRESS_MONITORING_HEADER')}
        </CapitalizeFirstLetter>
      </BasicWidget.Header>
      <Grid style={{ marginTop: appTheme.space.lg }} gutters={false}>
        <Row>
          <Col
            sm={5}
            style={{ marginBottom: appTheme.space.md, overflow: 'hidden' }}
          >
            <BasicWidget.Description
              header={t(
                '_CAMPAIGN_WIDGET_UX_TEST_PROGRESS_MONITORING_DESCRIPTION_HEADER'
              )}
              content={
                <span
                  style={{
                    color: getSeverityColor(maxSeverity.name),
                  }}
                >
                  {maxSeverity.count}
                  <XL
                    tag="span"
                    isBold
                    color={getSeverityColor(maxSeverity.name)}
                    style={{ marginLeft: appTheme.space.xs }}
                  >
                    {maxSeverity.name.toLowerCase()}
                  </XL>
                </span>
              }
              footer={
                <Trans
                  // TODO: change the translation key
                  i18nKey="__CAMPAIGN_WIDGET_UX_PROGRESS_TOTAL_LABEL"
                  defaults="out of <bold>{{total}}</bold> total observations"
                  count={countObservations}
                  components={{
                    bold: (
                      <Span
                        isBold
                        style={{ color: appTheme.components.text.primaryColor }}
                      />
                    ),
                  }}
                  values={{
                    total: countObservations,
                  }}
                />
              }
            />
          </Col>
          <Col sm={7} style={{ marginBottom: appTheme.space.md }}>
            <div style={{ marginLeft: appTheme.space.md }}>
              <BarChart
                height="70px"
                margin={{ left: 8, right: 8 }}
                colors={[
                  appTheme.colors.bySeverity.medium,
                  appTheme.colors.bySeverity.low,
                  appTheme.colors.bySeverity.high,
                  appTheme.colors.bySeverity.critical,
                ]}
                data={graphData}
                legend={{
                  width: '100%',
                  columns: 4,
                }}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    </BasicWidget>
  );
};
