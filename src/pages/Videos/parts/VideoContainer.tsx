import { ContainerCard, SM, Title } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { IVideo } from '../types';
import { Video } from './VideoItem';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledSM = styled(SM)`
  padding: ${({ theme }) => theme.space.sm};
`;

const StyledCard = styled(ContainerCard)`
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border-color: ${({ theme }) => theme.palette.grey[300]};
`;

const StyledTitle = styled(Title)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

export const VideoContainer = ({
  title,
  video,
}: {
  title: string;
  video: IVideo[];
}) => (
  <Container id="ciollaaaaaaaa">
    <StyledCard>
      <StyledTitle>
        <StyledSM isBold>{title}</StyledSM>
      </StyledTitle>
      <div
        style={{ padding: appTheme.space.xxs, marginBottom: appTheme.space.xs }}
      >
        {video.map((v) => (
          <Video video={v} />
        ))}
      </div>
    </StyledCard>
  </Container>
);
