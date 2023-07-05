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
      <Trans i18nKey="__BUGS_PAGE_HEADER_UNIQUE_BUGS_ON_TOTAL">
        <MD>
          <Span isBold style={{ color: appTheme.components.text.primaryColor }}>
            {{ numerator: uniqueBugs }}{' '}
          </Span>
          <Span isBold style={{ color: appTheme.components.text.primaryColor }}>
            unique bugs
          </Span>
          <Span style={{ color: appTheme.palette.grey['700'] }}>
            /{{ denominator: totalBugs }} tot.
          </Span>
          <Span
            style={{
              color: appTheme.palette.grey['600'],
              marginLeft: appTheme.space.xs,
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
