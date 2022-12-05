import {
  PieChart,
  Skeleton,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';
import { BugsByUseCaseVisualizationProps } from './types';
import { useBugsByUsecase } from './useBugsByUsecase';
import { useMaxItems } from './useMaxItems';

const TooltipSM = styled(SM)`
  color: ${({ theme }) => theme.colors.primaryHue};
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
    return <Skeleton />;
  }
  return (
    <div style={{ marginBottom: globalTheme.space.lg, width: '100%' }}>
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
        data={newItems}
        theme={{ labels: { text: { fontSize: 10 } } }}
        tooltip={({ label, value }) => (
          <Tooltip>
            <TooltipSM>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_TOOLTIP_USECASE_LABEL',
                `Use Case: `
              )}
              <Span isBold>{label}</Span>
            </TooltipSM>
            <TooltipSM>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_BUGS_BY_USECASE_TOOLTIP_UNIQUE_BUGS_LABEL',
                `Unique bugs: `
              )}
              <Span isBold style={{ marginLeft: globalTheme.space.xxs }}>
                {value}
              </Span>
            </TooltipSM>
          </Tooltip>
        )}
      />
    </div>
  );
};
