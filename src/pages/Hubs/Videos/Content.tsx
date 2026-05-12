import {
  AccordionNew,
  Col,
  Grid,
  Row,
  Skeleton,
  Tag,
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { ReactComponent as PlayIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import { CompletionTooltip } from 'src/pages/Bugs/Content/BugsTable/components/CompletionTooltip';
import { VideoContainer } from 'src/pages/Videos/parts/VideoContainer';
import { Wrapper } from 'src/pages/Videos/parts/Wrapper';
import { useVideos } from 'src/pages/Videos/useVideos';
import { HubVideosEmpty } from './Empty';
import { PendingVideoContainer } from './PendingVideoItem';
import { PendingUpload } from './UploadModal';

const AccordionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HubVideosContent = () => {
  const { hubId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const { t } = useTranslation();

  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>(
    (location.state as { pendingUploads?: PendingUpload[] })?.pendingUploads ??
      []
  );

  useEffect(() => {
    const incoming = (location.state as { pendingUploads?: PendingUpload[] })
      ?.pendingUploads;
    if (incoming && incoming.length > 0) {
      setPendingUploads((prev) => [...prev, ...incoming]);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleRemovePending = (index: number) => {
    setPendingUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const {
    sorted: videos,
    isFetching,
    isLoading,
    isError,
  } = useVideos(hubId ?? '');

  useEffect(() => {
    if (videos) {
      const groupedVideos = videos.reduce(
        (total, item) => total + item.videos.total,
        0
      );
      setTotalVideos(groupedVideos);
    }
  }, [videos]);

  if (isLoading) return <Skeleton height="300px" style={{ borderRadius: 0 }} />;

  const hasRealVideos = !isError && videos && totalVideos > 0;
  const hasPending = pendingUploads.length > 0;

  if (!hasRealVideos && !hasPending) return <HubVideosEmpty />;

  const usecases = hasRealVideos
    ? videos.filter((item) => item.videos.total > 0)
    : [];

  return (
    <LayoutWrapper isNotBoxed>
      <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <Grid>
          <Row>
            <Col>
              <Wrapper isFetching={isFetching}>
                <AccordionNew
                  level={3}
                  isExpandable
                  isBare
                  defaultExpandedSections={hasPending ? [0] : []}
                >
                  {hasPending && (
                    <AccordionNew.Section>
                      <AccordionNew.Header>
                        <AccordionNew.Label
                          label={t('__NEW_ACTIVITY_MODAL_IMPORT_MEDIA_TITLE')}
                        />
                        <AccordionNew.Meta>
                          <Tag
                            isPill
                            hue={appTheme.palette.blue[100]}
                            size="large"
                          >
                            <Tag.Avatar>
                              <PlayIcon color={appTheme.palette.grey[600]} />
                            </Tag.Avatar>
                            {t('__VIDEOS_LIST_META_LABEL', 'Videos')}:
                            <Tag.SecondaryText>
                              {pendingUploads.length}
                            </Tag.SecondaryText>
                          </Tag>
                        </AccordionNew.Meta>
                      </AccordionNew.Header>
                      <AccordionNew.Panel>
                        <PendingVideoContainer
                          files={pendingUploads}
                          onRemove={handleRemovePending}
                        />
                      </AccordionNew.Panel>
                    </AccordionNew.Section>
                  )}

                  {usecases.map((uc) => (
                    <AccordionNew.Section key={uc.usecase.id}>
                      <AccordionNew.Header>
                        <AccordionNew.Label
                          label={`${uc.usecase.title.full} `}
                        />
                        <AccordionNew.Meta>
                          <Tag
                            isPill
                            hue={appTheme.palette.blue[100]}
                            size="large"
                          >
                            <Tag.Avatar>
                              <PlayIcon color={appTheme.palette.grey[600]} />
                            </Tag.Avatar>
                            {t('__VIDEOS_LIST_META_LABEL', 'Videos')}:
                            <Tag.SecondaryText>
                              {uc.videos.total}
                            </Tag.SecondaryText>
                          </Tag>
                        </AccordionNew.Meta>
                      </AccordionNew.Header>
                      <AccordionNew.Panel>
                        {!!uc.videos.desktop.length && (
                          <VideoContainer
                            title={t('__VIDEOS_LIST_DESKTOP_TITLE')}
                            videosCount={uc.videos.desktop.length}
                            video={uc.videos.desktop}
                          />
                        )}
                        {!!uc.videos.tablet.length && (
                          <VideoContainer
                            title={t('__VIDEOS_LIST_TABLET_TITLE')}
                            videosCount={uc.videos.tablet.length}
                            video={uc.videos.tablet}
                          />
                        )}
                        {!!uc.videos.smartphone.length && (
                          <VideoContainer
                            title={t('__VIDEOS_LIST_SMARTPHONE_TITLE')}
                            videosCount={uc.videos.smartphone.length}
                            video={uc.videos.smartphone}
                          />
                        )}
                        {!!uc.videos.other.length && (
                          <VideoContainer
                            title={t('__VIDEOS_LIST_OTHER_TITLE')}
                            videosCount={uc.videos.other.length}
                            video={uc.videos.other}
                          />
                        )}
                        <AccordionFooter>
                          <CompletionTooltip
                            percentage={uc.usecase.completion}
                          />
                        </AccordionFooter>
                      </AccordionNew.Panel>
                    </AccordionNew.Section>
                  ))}
                </AccordionNew>
              </Wrapper>
            </Col>
          </Row>
        </Grid>
      </div>
    </LayoutWrapper>
  );
};

export default HubVideosContent;
