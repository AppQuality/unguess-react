import { PieChart, SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { WidgetLoader } from '../../widgetLoader';
import { BugsByUseCaseVisualizationProps } from '../types';
import { useBugsByUsecase } from '../useBugsByUsecase';
import { useMaxItems } from '../useMaxItems';

const TooltipSM = styled(SM)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  max-width: 25ch;
`;

export const ChartUniqueBugs4UseCase = ({
  campaignId,
}: BugsByUseCaseVisualizationProps) => {
  const { t } = useTranslation();
  const { items, total, isLoading, isError } = useBugsByUsecase(campaignId);
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
            '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_CHART_HEADER',
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
            <TooltipSM color={appTheme.components.text.primaryColor}>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_TOOLTIP_USECASE_LABEL'
              )}
              <Span isBold>{label}</Span>
            </TooltipSM>
            <TooltipSM>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_TOOLTIP_UNIQUE_BUGS_LABEL'
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
