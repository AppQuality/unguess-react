import { Anchor, Button, MD, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { styled } from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }

  display: flex;
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
    margin: ${({ theme }) => theme.space.md};
    max-width: 20%;
    min-width: 80px;
    height: auto;
  }
`;

const Video = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const videoUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${video.id}`
  );

  return (
    <StyledAnchor href={videoUrl}>
      <Container>
        <video>
          <source src={`${video.url}#t0.5`} type="video/mp4" />
          <track kind="captions" />
        </video>
        <div>
          <MD isBold>{video.tester.name}</MD>
          <SM>ID: {video.id}</SM>
        </div>
      </Container>
    </StyledAnchor>
  );
};

export { Video };
