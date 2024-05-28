import {
  Button,
  LG,
  Skeleton,
  Tooltip,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Meta } from 'src/common/components/Meta';
import { Pipe } from 'src/common/components/Pipe';
import { Divider } from 'src/common/components/divider';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { ReactComponent as ClockIcon } from 'src/assets/icons/time-icon.svg';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { useRef } from 'react';
import queryString from 'query-string';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import { formatDuration } from '../Videos/utils/formatDuration';
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
  min-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.md};
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.palette.grey[200]};
  scroll-behavior: smooth;
`;
const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const Actions = () => {
  const { campaignId, videoId } = useParams();
  const { t } = useTranslation();
  const refScroll = useRef<HTMLDivElement>(null);

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideosByVidQuery({
    vid: videoId || '',
  });

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetVideosByVidObservationsQuery({
    vid: videoId || '',
  });

  const handleUseCaseExport = () => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        id: campaignId,
        action: 'ug_generate_research_report',
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) window.open(res.data.file, '_blank');
        // eslint-disable-next-line no-console
        else console.error(res);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  };

  if (!video || isErrorVideo) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingObservations || isLoadingObservations) return <Skeleton />;

  return (
    <Container ref={refScroll}>
      <LG isBold>{video.tester.name}</LG>
      <MetaContainer>
        <Meta size="medium">T{video.tester.id}</Meta>
        <Pipe />
        {video.tester.device && (
          <Tag hue="white" style={{ textTransform: 'capitalize' }}>
            <Tag.Avatar>{getDeviceIcon(video.tester.device.type)}</Tag.Avatar>
            {video.tester.device.type === 'desktop'
              ? video.tester.device.desktop_type
              : `${video.tester.device.manufacturer} ${video.tester.device.model}`}
          </Tag>
        )}
        {video.duration && (
          <Tag hue="white" style={{ fontSize: appTheme.fontSizes.sm }}>
            <Tag.Avatar>
              <ClockIcon />
            </Tag.Avatar>
            {formatDuration(video.duration)}
          </Tag>
        )}
      </MetaContainer>
      <Divider style={{ margin: `${appTheme.space.sm} auto` }} />
      {observations && observations.length ? (
        <div style={{ margin: `${appTheme.space.sm} 0` }}>
          {observations &&
            observations.map((observation) => (
              <Observation
                refScroll={refScroll}
                key={observation.id}
                observation={observation}
                {...(video.transcript && {
                  transcript: video.transcript,
                })}
              />
            ))}
        </div>
      ) : (
        <NoObservations />
      )}
    </Container>
  );
};

export default Actions;
