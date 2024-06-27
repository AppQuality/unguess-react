import {
  ContainerCard,
  SM,
  Span,
  Title,
} from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
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
  videosCount,
  video,
}: {
  title: string;
  videosCount: number;
  video: IVideo[];
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <StyledCard>
        <StyledTitle>
          <StyledSM>
            <Span isBold>{title} </Span>
            <Span style={{ color: appTheme.palette.grey[600] }}>
              {`(${videosCount} ${t('__VIDEOS_LIST_USECASE_INFO', {
                count: videosCount,
              })})`}
            </Span>
          </StyledSM>
        </StyledTitle>
        <div
          style={{
            padding: appTheme.space.xxs,
            marginBottom: appTheme.space.xs,
          }}
        >
          {video.map((v) => (
            <Video video={v} />
          ))}
        </div>
      </StyledCard>
    </Container>
  );
};
