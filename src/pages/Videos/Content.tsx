import {
  AccordionNew,
  Col,
  Grid,
  MD,
  Row,
  Skeleton,
  Span,
  Tag,
} from '@appquality/unguess-design-system';
import { useEffect, useState } from 'react';
import { ReactComponent as PlayIcon } from '@zendeskgarden/svg-icons/src/16/play-circle-stroke.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import { CompletionTooltip } from '../Bugs/Content/BugsTable/components/CompletionTooltip';
import { Empty } from './Empty';
import { VideoContainer } from './parts/VideoContainer';
import { Wrapper } from './parts/Wrapper';
import { useVideos } from './useVideos';

const AccordionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideosPageContent = () => {
  const { campaignId } = useParams();
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const { t } = useTranslation();

  const {
    sorted: videos,
    isFetching,
    isLoading,
    isError,
  } = useVideos(campaignId ?? '');
  useEffect(() => {
    if (videos) {
      const groupedVideos = videos?.reduce(
        (total, item) => total + item.videos.total,
        0
      );
      setTotalVideos(groupedVideos);
    }
  }, [videos]);

  if (isError) return null;

  if (isLoading) return <Skeleton height="300px" style={{ borderRadius: 0 }} />;
  if (!videos || totalVideos === 0) {
    return <Empty />;
  }

  const usecases = videos.filter((item) => item.videos.total > 0);

  return (
    <LayoutWrapper isNotBoxed>
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
                    defaultExpandedSections={[]}
                  >
                    {usecases.map((uc) => (
                      <AccordionNew.Section
                        style={{ marginBottom: appTheme.space.lg }}
                      >
                        <AccordionNew.Header>
                          <AccordionNew.Label
                            label={`${uc.usecase.title.full} `}
                            // removed InfoRow component defined in videos/parts/InfoRow.tsx - maybe to be deleted because deprecated
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
                        <AccordionNew.Panel style={{ padding: 0 }}>
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
          )}
        </Grid>
      </div>
    </LayoutWrapper>
  );
};

export default VideosPageContent;
