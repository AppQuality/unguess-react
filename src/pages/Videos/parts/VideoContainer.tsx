import {
  ButtonMenu,
  ContainerCard,
  HeaderCell,
  HeaderRow,
  IconButton,
  SM,
  Span,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Title,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { EditVideoModal } from 'src/common/components/videos/EditVideoModal';
import { useDeleteHubsByHidAssetsAndMidMutation } from 'src/features/api';
import { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { styled } from 'styled-components';
import { VideoWithObservations } from '../useVideos';
import { formatDuration } from '../utils/formatDuration';
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
  border-color: ${({ theme }) => theme.palette.grey[200]};
`;

const StyledTitle = styled(Title)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

const FirstColumnHeader = styled(HeaderCell)`
  width: 70%;
`;

const SmallColumnHeader = styled(HeaderCell)`
  width: 10%;
  white-space: nowrap;
`;

const ActionsColumnHeader = styled(HeaderCell)`
  width: 10%;
  white-space: nowrap;
`;

const ActionCell = styled(TableCell)`
  width: 10%;
  text-align: center;
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
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const { addToast } = useToast();
  const [deleteAsset] = useDeleteHubsByHidAssetsAndMidMutation();
  const [selectedVideo, setSelectedVideo] =
    useState<VideoWithObservations | null>(null);
  const [isDeletingVideoId, setIsDeletingVideoId] = useState<number | null>(
    null
  );

  const showErrorToast = (message: string) => {
    addToast(
      ({ close }) => (
        <Notification
          onClose={close}
          type="error"
          message={message}
          closeText={t('__TOAST_CLOSE_TEXT')}
          isPrimary
        />
      ),
      { placement: 'top' }
    );
  };

  const handleActionClick = async (
    action: string | undefined,
    targetVideo: VideoWithObservations
  ) => {
    if (action === 'edit') {
      setSelectedVideo(targetVideo);
      return;
    }

    if (action === 'delete') {
      //await handleDeleteErrorVideo(targetVideo.id);
    }
  };

  const handleDeleteErrorVideo = async (videoId: number) => {
    if (!isHub) return;

    setIsDeletingVideoId(videoId);

    try {
      await deleteAsset({ hid: entityId, mid: videoId }).unwrap();
    } catch {
      showErrorToast(t('__VIDEOS_IMPORT_MEDIA_MODAL_DELETE_ERROR_GENERIC'));
    } finally {
      setIsDeletingVideoId(null);
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
              <ActionsColumnHeader>
                {t('__VIDEOS_LIST_TABLE_ACTIONS', 'Actions')}
              </ActionsColumnHeader>
            </HeaderRow>
          </TableHead>
          <TableBody role="rowgroup" title="videos-table-body">
            {video.map((v) => (
              <TableRow key={v.id} role="row" title={`video-${v.id}`}>
                <TableCell style={{ width: '70%' }}>
                  <Video video={v} />
                </TableCell>
                <TableCell style={{ width: '10%' }}>
                  {typeof v.duration === 'number'
                    ? formatDuration(v.duration)
                    : ''}
                </TableCell>
                <TableCell style={{ width: '10%' }}>{''}</TableCell>
                <ActionCell>
                  {isHub && v.processingStatus === 'error' ? (
                    <IconButton
                      isDanger
                      size="small"
                      disabled={isDeletingVideoId === v.id}
                      aria-label={t(
                        '__VIDEOS_IMPORT_MEDIA_MODAL_REMOVE_FILE',
                        'Delete media'
                      )}
                      onClick={() => {
                        // handleDeleteErrorVideo(v.id).catch(() => undefined);
                      }}
                    >
                      <TrashIcon />
                    </IconButton>
                  ) : (
                    <ButtonMenu
                      onSelect={(action) => {
                        handleActionClick(action, v);
                      }}
                      label={(props) => (
                        <IconButton {...props} isBasic size="small">
                          <DotsIcon />
                        </IconButton>
                      )}
                    >
                      <ButtonMenu.Item value="edit">
                        {t('__VIDEOS_LIST_TABLE_ACTION_EDIT', 'Edit')}
                      </ButtonMenu.Item>
                      {isHub && (
                        <ButtonMenu.Item
                          value="delete"
                          isDisabled={
                            v.processingStatus === 'processing' ||
                            isDeletingVideoId === v.id
                          }
                        >
                          {t(
                            '__VIDEOS_IMPORT_MEDIA_MODAL_REMOVE_FILE',
                            'Delete media'
                          )}
                        </ButtonMenu.Item>
                      )}
                    </ButtonMenu>
                  )}
                </ActionCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditVideoModal
          isOpen={selectedVideo !== null}
          video={selectedVideo}
          hubId={isHub ? entityId : undefined}
          onClose={() => {
            setSelectedVideo(null);
          }}
        />
      </StyledCard>
    </Container>
  );
};
