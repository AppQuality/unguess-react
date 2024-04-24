import { LG, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetVideoByVidObservationsQuery } from 'src/features/api';
import { NoObservations } from './components/NoObservations';

const Actions = () => {
  const { campaignId, videoId } = useParams();
  const { t } = useTranslation();

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideoByVidObservationsQuery({
    vid: videoId || '',
  });

  if (!observations || isErrorObservations) return null;

  if (isFetchingObservations || isLoadingObservations) return <Skeleton />;

  return (
    <>
      <LG>{t('__VIDEO_PAGE_ACTIONS_TITLE')}</LG>
      {observations.length > 0 ? (
        <ul>
          {observations.map((observation) => (
            <li key={observation.id}>
              Observation #{observation.id} - {observation.title}
            </li>
          ))}
        </ul>
      ) : (
        <NoObservations />
      )}
    </>
  );
};

export default Actions;
