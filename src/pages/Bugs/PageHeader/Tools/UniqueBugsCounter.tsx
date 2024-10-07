import { MD, Span } from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { useUniqueBugs } from './useUniqueBugs';

const CounterContainer = styled.div`
  display: inline-block;
  margin-right: ${({ theme }) => theme.space.xs};
}
`;

export const UniqueBugsCounter = ({
  campaignId,
  ...props
}: {
  campaignId: number;
}) => {
  const { totalBugs, uniqueBugs } = useUniqueBugs(campaignId);

  return (
    <CounterContainer {...props}>
      <Trans
        i18nKey="__BUGS_PAGE_HEADER_UNIQUE_BUGS_ON_TOTAL"
        components={{
          md: <MD />,
          span: (
            <Span
              isBold
              style={{ color: appTheme.components.text.primaryColor }}
            />
          ),
          greySpan: <Span style={{ color: appTheme.palette.grey['700'] }} />,
          lastSpan: (
            <Span
              style={{
                color: appTheme.palette.grey['600'],
                marginLeft: appTheme.space.xs,
              }}
            />
          ),
        }}
        values={{
          numerator: uniqueBugs,
          denominator: totalBugs,
        }}
        defaults="
        
        <md>
          <span>{{numerator}} </span>
          <span>unique bugs</span>
          <greySpan>{{denominator}} tot.</greySpan>
          <lastSpan> of which</lastSpan>"
      />
    </CounterContainer>
  );
};
