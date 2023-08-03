import {
  Anchor,
  Col,
  Grid,
  Row,
  Skeleton,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { useEffect, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
import styled, { css } from 'styled-components';
import { useCampaignInsights } from './useCampaignInsights';
import { Navigation } from './Navigation';
import { InsightCard } from './InsightCard';
import { HighlightCard } from './HighlightCard';
import { InsightLightbox } from './Lightbox';

const hideOnMobile = css`
  @media (max-width: ${appTheme.breakpoints.lg}) {
    display: none;
  }
`;

const ResponsiveCol = styled(Col)`
  ${hideOnMobile}
`;

export const Insights = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useCampaignInsights({
    campaignId: campaign.id ? campaign.id.toString() : '',
  });
  const [insightsState, setInsightsState] = useState<{
    [key: number]: {
      isOpen: boolean;
      currentIndex: number;
      showMore: boolean;
    };
  }>({});

  // Check if url has an anchor and scroll to it
  useEffect(() => {
    const url = window.location.href;
    const urlAnchor = url.split('#')[1];
    if (urlAnchor) {
      const anchor = document.getElementById(urlAnchor);
      if (anchor) {
        anchor.scrollIntoView();
      }
    }
  }, []);

  const onSlideChange = (insightId: number, index: number) => {
    setInsightsState({
      ...insightsState,
      [insightId]: {
        ...insightsState[`${insightId}`],
        isOpen: true,
        currentIndex: index,
      },
    });
  };

  const openLightbox = (insightId: number, index: number) => {
    setInsightsState({
      ...insightsState,
      [insightId]: {
        ...insightsState[`${insightId}`],
        isOpen: true,
        currentIndex: index,
      },
    });
  };

  if (!data || !data.findings || isError) return null;

  if (data.findings && data.findings.length === 0) return null;

  return (
    <div {...(id && { id })}>
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
              <ResponsiveCol xs={12} lg={6} xl={4}>
                <Navigation insights={data.findings} />
              </ResponsiveCol>
              <Col xs={12} lg={6} xl={8}>
                <Grid>
                  {data.findings.map((insight, i) => (
                    <Row id={`insight-row-${insight.id}`}>
                      <Col xs={12}>
                        <XL
                          style={{
                            fontWeight: appTheme.fontWeights.semibold,
                          }}
                        >
                          {t('__CAMPAIGN_PAGE_INSIGHTS_NUMBER_LABEL')} {i + 1}
                        </XL>
                        <Divider />
                      </Col>
                      <Col xs={12} md={6} lg={12} xl={6}>
                        <InsightCard insight={insight} />
                      </Col>
                      {insight.video?.slice(0, 1).map((videoPart, index) => (
                        <Col xs={12} md={6} lg={12} xl={6}>
                          <HighlightCard
                            onClick={() => openLightbox(insight.id, index)}
                            video={videoPart}
                            index={index}
                            insight={insight}
                          />
                        </Col>
                      ))}
                      {insight.video &&
                        insight.video.length > 1 &&
                        insightsState &&
                        (!insightsState[insight.id] ||
                          !insightsState[insight.id].showMore) && (
                          <Col xs={12} textAlign="end">
                            <Anchor
                              onClick={() =>
                                setInsightsState({
                                  ...insightsState,
                                  [insight.id]: {
                                    ...insightsState[`${insight.id}`],
                                    showMore: true,
                                  },
                                })
                              }
                            >
                              <Trans
                                count={insight.video.length - 1}
                                i18nKey="__CAMPAIGN_PAGE_INSIGHTS_SHOW_MORE_LABEL"
                              >
                                Show more highlights{' '}
                                <Span isBold>
                                  (
                                  {{
                                    video_count: insight.video.length - 1,
                                  }}
                                  )
                                </Span>
                              </Trans>
                            </Anchor>
                          </Col>
                        )}
                      {insightsState &&
                        insightsState[insight.id] &&
                        insightsState[insight.id].showMore &&
                        insight.video?.slice(1).map((videoPart, index) => (
                          <Col xs={12} md={6} lg={12} xl={6}>
                            <HighlightCard
                              onClick={() => openLightbox(insight.id, index)}
                              video={videoPart}
                              index={index + 1}
                              insight={insight}
                            />
                          </Col>
                        ))}
                      {insight.video &&
                        insight.video.length > 1 &&
                        insightsState &&
                        insightsState[insight.id] &&
                        insightsState[insight.id].showMore && (
                          <Col xs={12} textAlign="end">
                            <Anchor
                              onClick={() =>
                                setInsightsState({
                                  ...insightsState,
                                  [insight.id]: {
                                    ...insightsState[`${insight.id}`],
                                    showMore: false,
                                  },
                                })
                              }
                            >
                              {t('__CAMPAIGN_PAGE_INSIGHTS_SHOW_LESS_LABEL')}
                            </Anchor>
                          </Col>
                        )}
                      {insightsState &&
                        insightsState[insight.id] &&
                        insightsState[insight.id].isOpen && (
                          <InsightLightbox
                            insight={insight}
                            currentIndex={
                              insightsState[insight.id].currentIndex
                            }
                            items={insight?.video}
                            onClose={() =>
                              setInsightsState({
                                ...insightsState,
                                [insight.id]: {
                                  ...insightsState[`${insight.id}`],
                                  isOpen: false,
                                  currentIndex: 0,
                                },
                              })
                            }
                            onSlideChange={(index) =>
                              onSlideChange(insight.id, index)
                            }
                          />
                        )}
                    </Row>
                  ))}
                </Grid>
              </Col>
            </>
          )}
        </Row>
      </Grid>
    </div>
  );
};
