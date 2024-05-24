import { Anchor, MD, SM, Tag } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';
import { getColorWithAlpha } from 'src/common/utils';
import { ReactComponent as PlaceholderVideo } from 'src/assets/icons/placeholder-video.svg';
import { getSeverityTagsByVideoCount } from '../utils/getSeverityTagsWithCount';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }

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

  > img,
  svg {
    width: 100%;
    height: auto;
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

const Poster = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => (
  <ThumbnailContainer>
    {video.poster ? (
      <img src={video.poster} alt={`Video ${video.id}`} />
    ) : (
      <PlaceholderVideo />
    )}
  </ThumbnailContainer>
);

const Video = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => {
  const { campaignId } = useParams();
  const videoUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${video.id}`
  );

  const severityTotals = video.observations
    ? getSeverityTagsByVideoCount(video.observations)
    : [];
  return (
    <StyledAnchor href={videoUrl}>
      <Container>
        <Poster video={video} />
        <div>
          <MD isBold>{video.tester.name}</MD>
          <SM color={appTheme.palette.grey[600]}>ID: {video.id}</SM>
          <ObservationsTotalContainer>
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
          </ObservationsTotalContainer>
        </div>
      </Container>
    </StyledAnchor>
  );
};

export { Video };
