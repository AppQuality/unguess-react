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
import styled from 'styled-components';
import { NoObservations } from './components/NoObservations';
import { Observation } from './components/Observation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  height: 100%;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.md};
  overflow-y: auto;
`;

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
    <Container>
      <LG isBold>{t('__VIDEO_PAGE_ACTIONS_TITLE')}</LG>
      <Divider style={{ margin: `${appTheme.space.sm} auto` }} />
      {observations && observations.length ? (
        <div style={{ margin: `${appTheme.space.sm} 0` }}>
          {observations &&
            observations.map((observation) => (
              <Observation key={observation.id} observation={observation} />
            ))}
        </div>
      ) : (
        <NoObservations />
      )}
    </Container>
  );
};

export default Actions;
