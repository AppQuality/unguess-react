import { SunburstChart, SM } from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useBugsByDevices } from './useBugsByDevices';
import { getChildrenValue } from './getChildrenValue';
import { WidgetLoader } from '../../widgetLoader';

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  max-width: 216px;
`;

export const ChartTotalBugsByDevice = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const { t } = useTranslation();
  const { chartData, isLoading } = useBugsByDevices(campaignId);
  const [totalBugs, setTotalBugs] = useState(0);
  const centerLabelDefault = t(
    '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_CHART_HEADER',
    'Tot bug'
  );
  const [centerLabel, setCenterLabel] = useState<string>(centerLabelDefault);

  useEffect(() => {
    setTotalBugs(getChildrenValue(chartData));
  }, [chartData]);

  if (isLoading) return <WidgetLoader size="md" align="center" />;

  return chartData.children && chartData.children.length > 0 ? (
    <SunburstChart
      data={chartData}
      centerItem={{
        label: centerLabel,
        value: totalBugs.toString(),
        fontSizeMultiplier: 0.8,
      }}
      tooltip={({ label, value, data }) => (
        <Tooltip>
          {!data?.isLast ? (
            <StyledSM isBold>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_CHART_TOOLTIP_DRILLDOWN'
              )}
            </StyledSM>
          ) : null}
          <StyledSM isBold>{label}</StyledSM>
          <StyledSM>
            <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_BUGS_BY_DEVICE_CHART_TOOLTIP_VALUE">
              Bugs:{' '}
              {{
                value,
              }}
            </Trans>
          </StyledSM>
        </Tooltip>
      )}
      onChange={(data) => {
        setTotalBugs(getChildrenValue(data));
        setCenterLabel(data.label ?? centerLabelDefault);
      }}
      width="100%"
      height="300px"
      legend={{
        columns: chartData.children.length,
      }}
    />
  ) : null;
};
