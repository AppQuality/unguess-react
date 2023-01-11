import { useTranslation, Trans } from 'react-i18next';
import { Span } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';

const CounterContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-right: ${({ theme }) => theme.space.xs};
`;

export const UniqueBugsCounter = ({
  uniqueBugs,
  totalBugs,
}: {
  uniqueBugs: string;
  totalBugs: string;
}) => {
  const { t } = useTranslation();

  return (
    <CounterContainer>
      <Trans i18nKey="__BUGS_PAGE_HEADER_UNIQUE_BUGS_ON_TOTAL">
        <Span>{{ numerator: uniqueBugs }}</Span> unique bugs
        <Span style={{ color: globalTheme.palette.grey['700'] }}>
          /{{ denominator: totalBugs }} tot.
        </Span>
        <Span style={{ color: globalTheme.palette.grey['600'] }}>
          {' '}
          of which
        </Span>
      </Trans>
    </CounterContainer>
  );
};
