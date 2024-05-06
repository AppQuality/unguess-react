import { LG, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useGetVideoByVidObservationsQuery,
  useGetVideoByVidQuery,
} from 'src/features/api';
import { Divider } from 'src/common/components/divider';
import { Pipe } from 'src/common/components/Pipe';
import { appTheme } from 'src/app/theme';
import { NoObservations } from './components/NoObservations';
import { Observation } from './components/Observation';

const Actions = () => {
  const { videoId } = useParams();
  const { t } = useTranslation();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideoByVidObservationsQuery({
    vid: videoId || '',
  });

  if (!video || isErrorVideo) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingObservations || isLoadingObservations) return <Skeleton />;

  return (
    <>
      <LG>
        {t('__VIDEO_PAGE_ACTIONS_TITLE')} VIDEO #{video.id}
      </LG>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: `${appTheme.space.sm} 0`,
        }}
      >
        T{video.tester.id} <Pipe style={{ marginLeft: appTheme.space.sm }} />{' '}
        {video.tester.name} {video.tester.surname}
      </div>
      <Divider />
      {observations && observations.length ? (
        <div style={{ margin: `${appTheme.space.md} 0` }}>
          {observations &&
            observations.map((observation) => (
              <Observation key={observation.id} observation={observation} />
            ))}
        </div>
      ) : (
        <NoObservations />
      )}
    </>
  );
};

export default Actions;
