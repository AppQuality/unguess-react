import {
  IconButton,
  LG,
  Skeleton,
  Tag,
  Tooltip,
  XL,
} from '@appquality/unguess-design-system';
import { ReactComponent as EditIcon } from '@zendeskgarden/svg-icons/src/16/pencil-fill.svg';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ClockIcon } from 'src/assets/icons/time-icon.svg';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { Divider } from 'src/common/components/divider';
import { Meta } from 'src/common/components/Meta';
import { Pipe } from 'src/common/components/Pipe';
import { EditVideoModal } from 'src/common/components/videos/EditVideoModal';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import {
  useGetVideosByVidObservationsQuery,
  useGetVideosByVidQuery,
} from 'src/features/api';
import styled from 'styled-components';
import { formatDuration } from '../Videos/utils/formatDuration';
import { getSeverityTagsByVideoCount } from '../Videos/utils/getSeverityTagsWithCount';
import { NoObservations } from './components/NoObservations';
import { Observation } from './components/Observation';
import { SentimentOverview } from './components/SentimentOverview';

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
  overscroll-behavior: contain;
  margin-top: 130px;
`;
const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const HeaderName = styled(XL)`
  flex-basis: 100%;
`;

const ObservationsCountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: ${({ theme }) => theme.space.xxs};
  margin-top: ${({ theme }) => theme.space.sm};
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.xs};
`;

const HeaderEditButton = styled(IconButton)`
  margin-left: auto;
`;

const Actions = () => {
  const { videoId, entityId } = useParams();
  const { isHub } = useOutletContext<CampaignHubContext>();
  const hubId = isHub ? entityId : undefined;
  const refScroll = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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

  const displayHeaderName = video.tester?.name;
  const testerId = video.tester?.id;
  const deviceType = video.device?.formFactor;

  return (
    <Container ref={refScroll}>
      <Header>
        <MetaContainer>
          {displayHeaderName && (
            <HeaderName isBold>{displayHeaderName}</HeaderName>
          )}
          <div style={{ marginTop: appTheme.space.xs }}>
            {!isHub && (
              <>
                <Meta size="medium">Tester ID: {testerId ?? '-'}</Meta>
                <Pipe />
              </>
            )}
            {deviceType && (
              <Tag hue="white" style={{ textTransform: 'capitalize' }}>
                <Tag.Avatar>{getDeviceIcon(deviceType)}</Tag.Avatar>
                {deviceType}
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
          </div>
        </MetaContainer>
        <Tooltip
          content={t('__VIDEOS_DETAIL_EDIT_VIDEO_LABEL')}
          size="large"
          type="light"
          placement="bottom-start"
          hasArrow={false}
        >
          <HeaderEditButton
            isBasic
            size="small"
            aria-label={t('__VIDEOS_DETAIL_EDIT_VIDEO_LABEL')}
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            <EditIcon />
          </HeaderEditButton>
        </Tooltip>
      </Header>
      <Divider />
      <SentimentOverview />
      <div style={{ padding: `${appTheme.space.md} 0` }}>
        <LG isBold data-qa="tagging_tool_page_title_observations">
          {t('__OBSERVATIONS_DRAWER_TOTAL')}: {observations.length}
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
      <EditVideoModal
        isOpen={isEditModalOpen}
        video={video}
        hubId={hubId}
        onClose={() => {
          setEditModalOpen(false);
        }}
      />
    </Container>
  );
};

export default Actions;
