import { retrieveComponentStyles } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

const WaffleTooltipContainer = styled.div<{ width: string }>`
  padding: ${({ theme }) => theme.space.xxs} ${({ theme }) => theme.space.xs};
  ${(props) => retrieveComponentStyles('text.primary', props)};
  width: ${({ width }) => width};
  text-align: center;
  background: white;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
`;

const WaffleTooltip = ({
  value,
  label,
  percentage,
}: {
  value: string | number;
  label: string | number;
  percentage: number;
}) => {
  switch (label) {
    case 'unique':
      return (
        <WaffleTooltipContainer width="22ch">
          <Trans
            tag="paragraph"
            i18nKey="__CAMPAIGN_PAGE_WIDGET_UNIQUE_BUGS_WAFFLE_TOOLTIP_UNIQUE"
          >
            {{ value }} unique bugs - {{ percent: percentage }}%
          </Trans>
        </WaffleTooltipContainer>
      );
    case 'total':
      return (
        <WaffleTooltipContainer width="16ch">
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
