import {
  Accordion,
  Col,
  Grid,
  Row,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import { CompletionTooltip } from '../Bugs/Content/BugsTable/components/CompletionTooltip';
import { Empty } from './Empty';
import { InfoRow } from './parts/InfoRow';
import { VideoContainer } from './parts/VideoContainer';
import { Wrapper } from './parts/Wrapper';
import { useVideo } from './useVideos';

const StyledAccordionLabel = styled(Accordion.Label)`
  padding: 0;
`;
const StyledAccordionHeader = styled(Accordion.Header)`
  svg {
    padding: ${({ theme }) => theme.space.xs};
  }
`;

const AccordionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideosPageContent = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();

  const {
    sorted: videos,
    isFetching,
    isLoading,
    isError,
  } = useVideo(campaignId ?? '');

  if (isError) return null;

  if (isLoading) return <Skeleton height="300px" style={{ borderRadius: 0 }} />;

  if (!videos || videos.length === 0) {
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
                <Wrapper isFetching={false}>
                  <Accordion
                    level={3}
                    defaultExpandedSections={Array.from(usecases, (_, i) => i)}
                    isExpandable
                    isBare
                  >
                    {usecases.map((uc) => (
                      <Accordion.Section
                        style={{ marginBottom: appTheme.space.lg }}
                      >
                        <StyledAccordionHeader>
                          <StyledAccordionLabel>
                            <InfoRow
                              usecase={uc.usecase.title}
                              videos={uc.videos.total}
                            />
                          </StyledAccordionLabel>
                        </StyledAccordionHeader>
                        <Accordion.Panel style={{ padding: 0 }}>
                          {!!uc.videos.desktop.length && (
                            <VideoContainer
                              title={t('__VIDEOS_LIST_DESKTOP_TITLE')}
                              video={uc.videos.desktop}
                            />
                          )}
                          {!!uc.videos.tablet.length && (
                            <VideoContainer
                              title={t('__VIDEOS_LIST_TABLET_TITLE')}
                              video={uc.videos.tablet}
                            />
                          )}
                          {!!uc.videos.smartphone.length && (
                            <VideoContainer
                              title={t('__VIDEOS_LIST_SMARTPHONE_TITLE')}
                              video={uc.videos.smartphone}
                            />
                          )}
                          <AccordionFooter>
                            <CompletionTooltip
                              percentage={uc.usecase.completion}
                            />
                          </AccordionFooter>
                        </Accordion.Panel>
                      </Accordion.Section>
                    ))}
                  </Accordion>
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
