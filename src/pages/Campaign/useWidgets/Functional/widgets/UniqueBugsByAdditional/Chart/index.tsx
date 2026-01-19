import { PieChart, SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { WidgetLoader } from '../../widgetLoader';
import { useBugsByAdditional } from '../useBugsByAdditional';
import { useMaxItems } from '../useMaxItems';

const TooltipSM = styled(SM)`
  color: ${({ theme }) => theme.components.text.primaryColor};
`;

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow()};
  max-width: 25ch;
`;

export const Chart = ({
  slug,
  name,
  campaignId,
}: {
  name: string;
  slug: string;
  campaignId: string;
}) => {
  const { t } = useTranslation();
  const { items, total, isLoading, isError } = useBugsByAdditional({
    campaignId,
    slug,
  });
  const newItems = useMaxItems(items, 6);

  if (isLoading || isError) {
    return <WidgetLoader size="md" align="center" />;
  }
  return (
    <div style={{ marginBottom: appTheme.space.lg, width: '100%' }}>
      <PieChart
        legend={{
          width: '100%',
          columns: 2,
        }}
        width="100%"
        height="270px"
        centerItem={{
          label: t(
            '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_ADDITIONAL_CHART_HEADER',
            'Tot. bugs'
          ),
          value: total.toString(),
        }}
        labelFormatter={({ labelPosition, data, id, label }) => {
          if (labelPosition === 'arclink' && label) return label.toString();
          if (labelPosition === 'legend' && data?.fullName)
            return data.fullName.toString();
          return id.toString();
        }}
        data={newItems}
        theme={{ labels: { text: { fontSize: 10 } } }}
        tooltip={({ label, value }) => (
          <Tooltip>
            <TooltipSM>
              {name}: <Span isBold>{label}</Span>
            </TooltipSM>
            <TooltipSM>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_ADDITIONAL_TOOLTIP_UNIQUE_BUGS_LABEL'
              )}
              <Span isBold style={{ marginLeft: appTheme.space.xxs }}>
                {value}
              </Span>
            </TooltipSM>
          </Tooltip>
        )}
      />
    </div>
  );
};
