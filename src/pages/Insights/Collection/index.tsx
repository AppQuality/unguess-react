import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCampaignsByCidObservationsQuery,
  GetCampaignsByCidObservationsApiArg,
} from 'src/features/api';
import { styled } from 'styled-components';
import { UsecaseSection } from './components/UsecaseSection';
import { ObservationCard } from './ObservationCard';
import { CardGrid } from './components/CardGrid';
import { SectionTitle } from './components/SectionTitle';
import { GroupByToggle } from './components/GroupByToggle';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Collection = () => {
  const { t } = useTranslation();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [groupBy, setGroupBy] =
    useState<GetCampaignsByCidObservationsApiArg['groupBy']>('usecase-grapes');
  const { data, isLoading, isError } = useGetCampaignsByCidObservationsQuery({
    cid: campaignId || '',
    groupBy,
  });
  return (
    <Container>
      {isLoading && 'Loading...'}
      {isError && 'Error!'}
      {!data && 'No data'}
      <SectionTitle
        title={t('INSIGHTS_PAGE_COLLECTION_TITLE')}
        subtitle={t('INSIGHTS_PAGE_COLLECTION_SUBTITLE')}
      />
      <GroupByToggle groupBy={groupBy} setGroupBy={setGroupBy} />
      {data?.kind === 'usecase-grapes' &&
        data?.results.map((result) => (
          <UsecaseSection key={result.usecaseId} {...result} />
        ))}
      {data?.kind === 'ungrouped' && (
        <CardGrid>
          {data?.results.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </CardGrid>
      )}
    </Container>
  );
};

export { Collection };