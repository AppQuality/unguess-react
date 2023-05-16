import { Trans } from 'react-i18next';
import { MD, Span } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useUniqueBugs } from 'src/pages/Campaign/widgets/UniqueBugs/useUniqueBugs';

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
      <Trans i18nKey="__BUGS_PAGE_HEADER_UNIQUE_BUGS_ON_TOTAL">
        <MD>
          <Span
            isBold
            style={{ color: globalTheme.components.colors.primaryText }}
          >
            {{ numerator: uniqueBugs }}{' '}
          </Span>
          <Span
            isBold
            style={{ color: globalTheme.components.colors.primaryText }}
          >
            unique bugs
          </Span>
          <Span style={{ color: globalTheme.palette.grey['700'] }}>
            /{{ denominator: totalBugs }} tot.
          </Span>
          <Span
            style={{
              color: globalTheme.palette.grey['600'],
              marginLeft: globalTheme.space.xs,
            }}
          >
            {' '}
            of which
          </Span>
        </MD>
      </Trans>
    </CounterContainer>
  );
};
