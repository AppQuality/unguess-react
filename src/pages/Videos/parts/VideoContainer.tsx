import { Card, SM, Title } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { IVideo } from '../types';
import { Video } from './VideoItem';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledSM = styled(SM)`
  padding: ${({ theme }) => theme.space.sm};
`;

const StyledCard = styled(Card)`
  padding: 0;
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
  <Container>
    <StyledCard>
      <StyledTitle>
        <StyledSM isBold>{title}</StyledSM>
      </StyledTitle>
      {video.map((v) => (
        <Video video={v} />
      ))}
    </StyledCard>
  </Container>
);
