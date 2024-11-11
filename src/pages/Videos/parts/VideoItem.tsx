import { Anchor, MD, SM, Tag } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { getColorWithAlpha } from 'src/common/utils';
import { ReactComponent as PlaceholderVideo } from 'src/assets/icons/placeholder-video.svg';
import { Pipe } from 'src/common/components/Pipe';
import addQueryParamToRoute from 'src/common/addQueryParamToRoute';
import { getSeverityTagsByVideoCount } from '../utils/getSeverityTagsWithCount';
import { formatDuration } from '../utils/formatDuration';
import { VideoWithObservations } from '../useVideos';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }
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

  > img,
  svg {
    height: 100%;
    width: auto;
  }
`;

const StyledAnchor = styled(Anchor)`
  width: 100%;

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

const Poster = ({ video }: { video: VideoWithObservations }) => (
  <ThumbnailContainer>
    {video.poster ? (
      <img src={video.poster} alt={`Video ${video.id}`} />
    ) : (
      <PlaceholderVideo />
    )}
  </ThumbnailContainer>
);

const Video = ({ video }: { video: VideoWithObservations }) => {
  const { campaignId } = useParams();
  const videoUrl = addQueryParamToRoute(
    useLocalizeRoute(`campaigns/${campaignId}/videos/${video.id}`),
    'usecase',
    video.usecaseId.toString()
  );

  const severityTotals = video.observations
    ? getSeverityTagsByVideoCount(video.observations)
    : [];

  return (
    <StyledAnchor href={videoUrl}>
      <Container>
        <Poster video={video} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <MD isBold style={{ color: appTheme.palette.blue[600] }}>
            {video.tester.name}
          </MD>
          <SM
            color={appTheme.palette.grey[600]}
            isBold
            style={{ marginTop: appTheme.space.xxs }}
          >
            Tester ID: T{video.tester.id}
          </SM>
          <ObservationsTotalContainer>
            <TagsContainer>
              {video.duration && (
                <Tag
                  hue={appTheme.palette.grey[200]}
                  color={appTheme.palette.grey[700]}
                >
                  {formatDuration(video.duration)}
                </Tag>
              )}
              {video.duration && severityTotals.length > 0 && <Pipe />}
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
      </Container>
    </StyledAnchor>
  );
};

export { Video };
