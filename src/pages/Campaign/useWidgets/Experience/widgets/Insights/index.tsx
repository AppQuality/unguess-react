import {
  Col,
  Grid,
  Row,
  Skeleton,
  SpecialCard,
} from '@appquality/unguess-design-system';
import Video from '@appquality/stream-player';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';
import styled from 'styled-components';
import { useCampaignInsights } from './useCampaignInsights';
import { Navigation } from './Navigation';
import { getClusterTag, getSeverityTag } from './utils';
import { CardFooter, InsightCard } from './InsightCard';

const CardThumb = styled(SpecialCard.Thumb)`
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  overflow: hidden;
  position: relative;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.sm};

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    overflow: hidden;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    width: ${({ theme }) => theme.space.base * 14}px;
    height: auto;
    z-index: 3;
  }
`;

const Player = styled(Video.Player)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > video {
    width: 100%;
    height: 200px;
  }
`;

export const Insights = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  const { data, isLoading } = useCampaignInsights({
    campaignId: campaign.id ?? 0,
  });

  if (!data || !data.findings) return null;

  // Check if url has an anchor and scroll to it
  const url = window.location.href;
  const urlAnchor = url.split('#')[1];
  if (urlAnchor) {
    const anchor = document.getElementById(urlAnchor);
    if (anchor) {
      anchor.scrollIntoView();
    }
  }

  return (
    <WidgetSection {...(id && { id })}>
      <Grid>
        <Row>
          <Col xs={12}>
            <SectionTitle
              title={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_TITLE')}
              subtitle={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_SUBTITLE')}
            />
          </Col>
        </Row>
      </Grid>
      <Grid gutters="md">
        <Row>
          {isLoading ? (
            <>
              <Col xs={12} lg={4}>
                <Skeleton height="200px" />
              </Col>
              <Col xs={12} lg={8}>
                <Skeleton height="100%" />
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} lg={4}>
                <Navigation insights={data.findings} />
              </Col>
              <Col xs={12} lg={8}>
                <Grid>
                  {data.findings.length > 0 &&
                    data.findings.map((insight) => (
                      <Row id={`insight-row-${insight.id}`}>
                        {/* TODO: Insert section title and subtitle */}
                        <Col xs={12} lg={6}>
                          <InsightCard insight={insight} />
                        </Col>
                        {insight.videoPart.map((videoPart, index) => (
                          <Col xs={12} lg={6}>
                            <SpecialCard
                              key={insight.id}
                              title={videoPart.description}
                            >
                              <SpecialCard.Header>
                                <CardThumb>
                                  <VideoPlayIcon />
                                  <Video
                                    src={videoPart.streamUrl}
                                    start={videoPart.start}
                                    end={videoPart.end}
                                  >
                                    <Player />
                                  </Video>
                                </CardThumb>
                                <SpecialCard.Header.Label>
                                  {t(
                                    '__CAMPAIGN_PAGE_INSIGHTS_VIDEO_PART_NUMBER_LABEL'
                                  )}{' '}
                                  {index + 1}
                                </SpecialCard.Header.Label>
                                <SpecialCard.Header.Title>
                                  {`”${videoPart.description}”`}
                                </SpecialCard.Header.Title>
                              </SpecialCard.Header>
                              <CardFooter justifyContent="start">
                                {getSeverityTag(
                                  insight.severity,
                                  insight.title
                                )}
                                {getClusterTag(insight.cluster, t)}
                              </CardFooter>
                            </SpecialCard>
                          </Col>
                        ))}
                      </Row>
                    ))}
                </Grid>
              </Col>
            </>
          )}
        </Row>
      </Grid>
    </WidgetSection>
  );
};
