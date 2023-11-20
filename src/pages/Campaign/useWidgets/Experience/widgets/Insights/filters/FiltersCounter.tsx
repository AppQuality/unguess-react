import { SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const StyledSpan = styled(Span)`
  color: ${({ theme }) => theme.palette.blue[600]};
`;

export const FiltersCounter = ({
  count,
  total,
}: {
  count: number;
  total: number;
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <SM>
        {t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_FILTERS_COUNT_LABEL')}{' '}
        {count === total || (total && !count) ? (
          <StyledSpan isBold>{count}</StyledSpan>
        ) : (
          <>
            <StyledSpan isBold>{count}</StyledSpan> / {total}
          </>
        )}
      </SM>
    </Container>
  );
};
