import {
  ContainerCard,
  DotsMenu,
  HeaderCell,
  HeaderRow,
  SM,
  Span,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Title,
} from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { EditVideoModal } from 'src/common/components/videos/EditVideoModal';
import { Video } from './VideoItem';
import { VideoWithObservations } from '../useVideos';
import { formatDuration } from '../utils/formatDuration';

const Container = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledSM = styled(SM)`
  padding: ${({ theme }) => theme.space.sm};
`;

const StyledCard = styled(ContainerCard)`
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border-color: ${({ theme }) => theme.palette.grey[200]};
`;

const StyledTitle = styled(Title)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

const FirstColumnHeader = styled(HeaderCell)`
  width: 64%;
`;

const SmallColumnHeader = styled(HeaderCell)`
  width: 12%;
  white-space: nowrap;
`;

const ActionCell = styled(TableCell)`
  text-align: right;
  button {
    transform: rotate(90deg);
  }
`;

export const VideoContainer = ({
  title,
  videosCount,
  video,
}: {
  title: string;
  videosCount: number;
  video: VideoWithObservations[];
}) => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] =
    useState<VideoWithObservations | null>(null);

  const handleActionClick = (
    action: string | undefined,
    targetVideo: VideoWithObservations
  ) => {
    if (action === 'edit') {
      setSelectedVideo(targetVideo);
    }
  };

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
        <Table
          isReadOnly
          style={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            backgroundColor: 'white',
          }}
          role="table"
          title="videos-table"
        >
          <TableHead>
            <HeaderRow role="row">
              <FirstColumnHeader>{''}</FirstColumnHeader>
              <SmallColumnHeader>
                {t('__VIDEOS_LIST_TABLE_DURATION', 'Duration')}
              </SmallColumnHeader>
              <SmallColumnHeader>
                {t('__VIDEOS_LIST_TABLE_TEST_DATE', 'Test date')}
              </SmallColumnHeader>
              <SmallColumnHeader>
                {t('__VIDEOS_LIST_TABLE_ACTIONS', 'Actions')}
              </SmallColumnHeader>
            </HeaderRow>
          </TableHead>
          <TableBody role="rowgroup" title="videos-table-body">
            {video.map((v) => (
              <TableRow key={v.id} role="row" title={`video-${v.id}`}>
                <TableCell style={{ width: '64%' }}>
                  <Video video={v} />
                </TableCell>
                <TableCell style={{ width: '12%' }}>
                  {typeof v.duration === 'number'
                    ? formatDuration(v.duration)
                    : ''}
                </TableCell>
                <TableCell style={{ width: '12%' }}>{''}</TableCell>
                <ActionCell style={{ width: '12%' }}>
                  <DotsMenu
                    onSelect={(action) => {
                      handleActionClick(action, v);
                    }}
                  >
                    <DotsMenu.Item value="edit">
                      {t('__VIDEOS_LIST_TABLE_ACTION_EDIT', 'Edit')}
                    </DotsMenu.Item>
                  </DotsMenu>
                </ActionCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditVideoModal
          isOpen={selectedVideo !== null}
          video={selectedVideo}
          onClose={() => {
            setSelectedVideo(null);
          }}
        />
      </StyledCard>
    </Container>
  );
};
