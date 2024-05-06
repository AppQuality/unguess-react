import {
  Accordion,
  Col,
  Grid,
  LG,
  Row,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignsByCidVideoQuery } from 'src/features/api';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import Empty from './Empty';
import { Video } from './parts/VideoItem';
import { Wrapper } from './parts/Wrapper';
import { InfoRow } from './parts/InfoRow';
import { CompletionTooltip } from '../Bugs/Content/BugsTable/components/CompletionTooltip';
import { VideoContainer } from './parts/VideoContainer';

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

  const { data, isFetching, isLoading, isError } =
    useGetCampaignsByCidVideoQuery({
      cid: campaignId || '',
    });

  if (isError) return null;

  if (data && data.items.length === 0) {
    return <Empty />;
  }

  const usecases = data?.items.filter((item) => item.videos.length > 0);

  return (
    <LayoutWrapper>
      {isLoading ? (
        <Skeleton height="300px" style={{ borderRadius: 0 }} />
      ) : (
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Grid>
            {!!usecases?.length && (
              <Row>
                <Col>
                  <Wrapper isFetching={false}>
                    <Accordion
                      level={3}
                      defaultExpandedSections={Array.from(
                        usecases,
                        (_, i) => i
                      )}
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
                                usecase={uc.usecase}
                                videos={uc.videos}
                              />
                            </StyledAccordionLabel>
                          </StyledAccordionHeader>
                          <Accordion.Panel style={{ padding: 0 }}>
                            <VideoContainer
                              title="Sia Desktop che Mobile"
                              video={uc.videos}
                            />
                            <AccordionFooter>
                              <CompletionTooltip
                                percentage={Math.random() * 100}
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
      )}
    </LayoutWrapper>
  );
};

export default VideosPageContent;
