import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  Anchor,
  Card,
  ContainerCard,
  SM,
  SpecialCard,
  Title,
} from '@appquality/unguess-design-system';

import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useParams } from 'react-router-dom';

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
}) => {
  const { t } = useTranslation();

  return (
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
};
