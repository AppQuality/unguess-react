import { SM, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign, useGetCampaignsByCidUxQuery } from 'src/features/api';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledSpan = styled(Span)`
  color: ${({ theme }) => theme.palette.blue[600]};
`;

export const FiltersCounter = ({
  campaign,
  isPreview,
  count,
}: {
  campaign: Campaign;
  isPreview?: boolean;
  count: number;
}) => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaign.id ? campaign.id.toString() : '',
    showAsCustomer: isPreview ?? false,
  });

  if (!data || isLoading || isFetching || isError) return null;

  if (data && data.findings && data.findings.length === 0) return null;

  const total = data?.findings?.length;

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
