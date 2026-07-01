import {
  AccordionNew,
  Col,
  Grid,
  Row,
  Skeleton,
  Tag,
} from '@appquality/unguess-design-system';
import { ReactComponent as PlayIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  getVideoDeviceLabel,
  VIDEO_DEVICE_SECTION_ORDER,
} from 'src/common/video/getVideoDeviceLabel';
import { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import { styled } from 'styled-components';
import { CompletionTooltip } from '../Bugs/Content/BugsTable/components/CompletionTooltip';
import { Empty } from './Empty';
import { ImportMediaModal } from './ImportMediaModal';
import { VideoContainer } from './parts/VideoContainer';
import { Wrapper } from './parts/Wrapper';
import { useVideos } from './useVideos';

const AccordionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideosPageContent = ({
  contentHeader,
}: {
  // Optional content rendered at the top of the content column (aligned with
  // the video grid/empty state, not full-width). Used by the entity media-list
  // tab to place the tab title + meta row; the legacy page passes nothing.
  contentHeader?: ReactNode;
}) => {
  const { t } = useTranslation();

  const { isHub, entityId } = useOutletContext<CampaignHubContext>();
  const [isImportMediaModalOpen, setIsImportMediaModalOpen] = useState(false);

  const {
    sorted: videos,
    totalVideos,
    isFetching,
    isLoading,
    isError,
  } = useVideos(entityId);

  if (isError) return null;

  if (isLoading && !videos)
    return <Skeleton height="300px" style={{ borderRadius: 0 }} />;
  const usecases = videos?.filter((item) => item.videos.total > 0) ?? [];
  const defaultExpandedSections = isHub
    ? usecases.map((_, index) => index)
    : [];

  return (
    <>
      {!videos || totalVideos === 0 ? (
        <>
          {contentHeader}
          <Empty
            onOpenImportMediaModal={() => setIsImportMediaModalOpen(true)}
          />
        </>
      ) : (
        <LayoutWrapper isNotBoxed>
          {contentHeader}
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Grid>
              {!!usecases?.length && (
                <Row>
                  <Col>
                    <Wrapper isFetching={isFetching}>
                      <AccordionNew
                        level={3}
                        isExpandable
                        isBare
                        defaultExpandedSections={defaultExpandedSections}
                      >
                        {usecases.map((uc) => (
                          <AccordionNew.Section>
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
                                    <PlayIcon
                                      color={appTheme.palette.grey[600]}
                                    />
                                  </Tag.Avatar>
                                  {t('__VIDEOS_LIST_META_LABEL')}:
                                  <Tag.SecondaryText>
                                    {uc.videos.total}
                                  </Tag.SecondaryText>
                                </Tag>
                              </AccordionNew.Meta>
                            </AccordionNew.Header>
                            <AccordionNew.Panel>
                              {VIDEO_DEVICE_SECTION_ORDER.map((deviceType) => {
                                const sectionVideos =
                                  uc.videos[`${deviceType}`];

                                if (!sectionVideos.length) return null;

                                return (
                                  <VideoContainer
                                    key={deviceType}
                                    title={
                                      getVideoDeviceLabel(t, deviceType) ||
                                      deviceType
                                    }
                                    videosCount={sectionVideos.length}
                                    video={sectionVideos}
                                  />
                                );
                              })}
                              <AccordionFooter>
                                {!isHub && (
                                  <CompletionTooltip
                                    percentage={uc.usecase.completion}
                                  />
                                )}
                              </AccordionFooter>
                            </AccordionNew.Panel>
                          </AccordionNew.Section>
                        ))}
                      </AccordionNew>
                    </Wrapper>
                  </Col>
                </Row>
              )}
            </Grid>
          </div>
        </LayoutWrapper>
      )}

      {isHub && (
        <ImportMediaModal
          isOpen={isImportMediaModalOpen}
          onClose={() => setIsImportMediaModalOpen(false)}
          hubId={entityId}
        />
      )}
    </>
  );
};

export default VideosPageContent;
