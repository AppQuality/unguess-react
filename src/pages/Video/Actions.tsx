import { LG, Skeleton, Tag, XL } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Meta } from 'src/common/components/Meta';
import { Pipe } from 'src/common/components/Pipe';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { ReactComponent as ClockIcon } from 'src/assets/icons/time-icon.svg';
import { Divider } from 'src/common/components/divider';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { useRef } from 'react';
import { getSeverityTagsByVideoCount } from '../Videos/utils/getSeverityTagsWithCount';
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
  height: 100vh;
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

const ObservationsCountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const Actions = () => {
  const { videoId } = useParams();
  const refScroll = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
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

  const severities = observations
    ? getSeverityTagsByVideoCount(observations)
    : [];

  if (!video || isErrorVideo) return null;
  if (!observations || isErrorObservations) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;
  if (isFetchingObservations || isLoadingObservations) return <Skeleton />;

  return (
    <Container ref={refScroll}>
      <XL isBold style={{ marginTop: 130 }}>
        {video.tester.name}
      </XL>
      <MetaContainer>
        <Meta size="medium">Tester ID: {video.tester.id}</Meta>
        <Pipe />
        {video.tester.device && (
          <Tag hue="white" style={{ textTransform: 'capitalize' }}>
            <Tag.Avatar>{getDeviceIcon(video.tester.device.type)}</Tag.Avatar>
            {video.tester.device.type}
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
      <Divider />
      <MetaContainer>
        <div style={{ marginTop: appTheme.space.xs }}>
          <LG isBold>
            {t('__OBSERVATIONS_DRAWER_TOTAL')}:{observations.length}
          </LG>
          {observations && severities && severities.length > 0 && (
            <ObservationsCountWrapper>
              {severities.map((severity) => (
                <Meta
                  size="large"
                  color={severity.style}
                  secondaryText={severity.count}
                >
                  {capitalizeFirstLetter(severity.name)}
                </Meta>
              ))}
            </ObservationsCountWrapper>
          )}
        </div>
      </MetaContainer>
      {observations && observations.length ? (
        observations.map((observation) => (
          <Observation
            refScroll={refScroll}
            key={observation.id}
            observation={observation}
            {...(video.transcript && {
              transcript: video.transcript,
            })}
          />
        ))
      ) : (
        <NoObservations />
      )}
    </Container>
  );
};

export default Actions;
