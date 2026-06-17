import {
  Anchor,
  MD,
  SM,
  Spinner,
  Tag,
} from '@appquality/unguess-design-system';
import { ReactComponent as AlertWarningIcon } from '@zendeskgarden/svg-icons/src/16/alert-warning-stroke.svg';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import AudioPoster from 'src/assets/audio_poster.png';
import { ReactComponent as PlaceholderVideo } from 'src/assets/icons/placeholder-video.svg';
import { getColorWithAlpha } from 'src/common/utils';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { useAnalytics } from 'use-analytics';
import { VideoWithObservations } from '../useVideos';
import { getSeverityTagsByVideoCount } from '../utils/getSeverityTagsWithCount';

const ContentContainer = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} 0`};
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.black};
  height: 70px;
  width: 110px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};

  > img {
    height: 100%;
    width: auto;
  }
`;

const PlaceholderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: auto;

  > svg {
    height: 100%;
    width: auto;
  }
`;

const StyledAnchor = styled(Anchor)<{ $isDisabled: boolean }>`
  width: 100%;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};

  &:hover {
    text-decoration: none;
  }
`;

const ObservationsTotalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space.xs};
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Poster = ({ video }: { video: VideoWithObservations }) => {
  const isProcessing = video.processingStatus === 'processing';
  const isError = video.processingStatus === 'error';
  const isAudio = video.url?.endsWith('.mp3');

  if (isProcessing) {
    return (
      <ThumbnailContainer
        style={{ backgroundColor: appTheme.palette.azure[100] }}
      >
        <Spinner size={appTheme.space.lg} color={appTheme.palette.blue[600]} />
      </ThumbnailContainer>
    );
  }

  if (isAudio) {
    return (
      <ThumbnailContainer>
        <img src={AudioPoster} alt="Audio poster" />
      </ThumbnailContainer>
    );
  }

  if (isError) {
    return (
      <ThumbnailContainer
        style={{ backgroundColor: appTheme.palette.red[100] }}
      >
        <AlertWarningIcon color={appTheme.palette.red[700]} />
      </ThumbnailContainer>
    );
  }

  return (
    <ThumbnailContainer>
      {video.poster ? (
        <img src={video.poster} alt={`Video ${video.id}`} />
      ) : (
        <PlaceholderWrapper>
          <PlaceholderVideo />
        </PlaceholderWrapper>
      )}
    </ThumbnailContainer>
  );
};

const Video = ({ video }: { video: VideoWithObservations }) => {
  const { t } = useTranslation();
  const { track } = useAnalytics();
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const prefix = isHub ? 'hubs' : 'campaigns';
  const videoUrl = useLocalizeRoute(`${prefix}/${entityId}/videos/${video.id}`);
  const testerName = video.tester?.name || '--';
  const fileName = video.filename || '--';
  const displayName = isHub ? fileName : testerName;
  const testerId = video.tester?.id;
  const participantName = video.tester?.name?.trim();
  const isOptimizationPending = video.processingStatus === 'processing';
  const isOptimizationFailed = video.processingStatus === 'error';
  const isVideoOpenDisabled = isOptimizationPending || isOptimizationFailed;
  const anchorHref = isVideoOpenDisabled ? undefined : videoUrl;

  const severityTotals = video.observations
    ? getSeverityTagsByVideoCount(video.observations)
    : [];

  return (
    <StyledAnchor
      $isDisabled={isVideoOpenDisabled}
      href={anchorHref}
      aria-disabled={isVideoOpenDisabled}
      onClick={(event) => {
        if (isVideoOpenDisabled) {
          event.preventDefault();
          return;
        }

        track('mediaItemOpened', {
          processingStatus: video.processingStatus,
        });
      }}
    >
      <ContentContainer>
        <Poster video={video} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MD isBold style={{ color: appTheme.palette.blue[600] }}>
            {displayName}
          </MD>
          {isHub && participantName && (
            <SM
              color={appTheme.palette.grey[600]}
              isBold
              style={{ marginTop: appTheme.space.xxs }}
            >
              {t('__VIDEOS_LIST_PARTICIPANT_LABEL')}: {participantName}
            </SM>
          )}
          {!isHub && (
            <SM
              color={appTheme.palette.grey[600]}
              isBold
              style={{ marginTop: appTheme.space.xxs }}
            >
              Tester ID: {testerId ? `T${testerId}` : '--'}
            </SM>
          )}
          <ObservationsTotalContainer>
            <TagsContainer>
              {isOptimizationPending && (
                <Tag
                  hue={appTheme.palette.blue[100]}
                  color={appTheme.palette.blue[700]}
                >
                  {t(
                    '__VIDEOS_LIST_VIDEO_OPTIMIZATION_PENDING',
                    'Optimizing media... This may take a few minutes.'
                  )}
                </Tag>
              )}
              {isOptimizationFailed && (
                <Tag
                  hue={appTheme.palette.red[100]}
                  color={appTheme.palette.red[700]}
                >
                  {t(
                    '__VIDEOS_LIST_VIDEO_OPTIMIZATION_FAILED',
                    'Optimization failed. Delete the media and try again.'
                  )}
                </Tag>
              )}
              {severityTotals.map((tag) => (
                <Tag
                  hue={getColorWithAlpha(
                    tag.style || appTheme.palette.grey[600],
                    0.1
                  )}
                  color={tag.style || appTheme.palette.grey[600]}
                >
                  {tag.name} {tag.count}
                </Tag>
              ))}
            </TagsContainer>
          </ObservationsTotalContainer>
        </div>
      </ContentContainer>
    </StyledAnchor>
  );
};

export { Video };
