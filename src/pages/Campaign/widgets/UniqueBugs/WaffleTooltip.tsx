import { Trans } from 'react-i18next';
import styled from 'styled-components';

const WaffleTooltipContainer = styled.div`
  padding: ${({ theme }) => theme.space.xxs} ${({ theme }) => theme.space.xs};
`;

const WaffleTooltip = ({
  value,
  label,
  percentage,
}: {
  value: number;
  label: string;
  percentage: number;
}) => {
  switch (label) {
    case 'unique':
      return (
        <WaffleTooltipContainer>
          <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_WAFFLE_TOOLTIP_UNIQUE">
            {{ value }} unique bugs - {{ percent: percentage }}%
          </Trans>
        </WaffleTooltipContainer>
      );
    case 'total':
      return (
        <WaffleTooltipContainer>
          <Trans i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_WAFFLE_TOOLTIP_TOTAL">
            Total bugs: {{ value }}
          </Trans>
        </WaffleTooltipContainer>
      );
    default:
      return null;
  }
};
export default WaffleTooltip;
