import { Anchor, MD, SM } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }

  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

const ThumbnailContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.black};
  width: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledAnchor = styled(Anchor)<{ disabled?: boolean }>`
  width: 100%;

  ${({ disabled }) =>
    disabled &&
    ` 
    pointer-events: none;
    cursor: default;
    `}

  &:hover {
    text-decoration: none;
  }

  video {
    width: 100%;
    height: 68px;
  }
`;

const Poster = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => {
  if (video.poster) {
    return (
      <img
        src={video.poster}
        alt={`video poster preview of video ${video.id}`}
      />
    );
  }

  return (
    <ThumbnailContainer>
      <video>
        <source src={`${video.url}#t0.5`} type="video/mp4" />
        <track kind="captions" />
      </video>
    </ThumbnailContainer>
  );
};

const Video = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => {
  const { campaignId } = useParams();
  const videoUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${video.id}`
  );

  return (
    <StyledAnchor href={videoUrl}>
      <Container>
        <Poster video={video} />
        <div>
          <MD isBold>{video.tester.name}</MD>
          <SM color={appTheme.palette.grey[600]}>ID: {video.id}</SM>
        </div>
      </Container>
      <Divider />
    </StyledAnchor>
  );
};

export { Video };
