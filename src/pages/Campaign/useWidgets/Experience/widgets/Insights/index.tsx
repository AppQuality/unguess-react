import {
  Anchor,
  Col,
  Grid,
  IconButton,
  Notification,
  Row,
  Skeleton,
  Span,
  XL,
  useToast,
} from '@appquality/unguess-design-system';
import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CopyIcon } from 'src/assets/icons/link-fill.svg';
import { Divider } from 'src/common/components/divider';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import styled, { css } from 'styled-components';
import { HighlightCard } from './HighlightCard';
import { InsightCard } from './InsightCard';
import { InsightLightbox } from './Lightbox';
import { Navigation, navigationOffset } from './Navigation';
import { useCampaignInsights } from './useCampaignInsights';
import { InsightComment } from './Comments';

const hideOnMobile = css`
  @media (max-width: ${appTheme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledDivider = styled(Divider)`
  margin: ${({ theme }) => theme.space.base * 4}px 0
    ${({ theme }) => theme.space.base * 3}px;
`;

const ResponsiveCol = styled(Col)`
  ${hideOnMobile}
`;

export const Insights = ({
  id,
  campaign,
  isPreview,
}: {
  id: string;
  campaign: Campaign;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useCampaignInsights({
    campaignId: campaign.id ? campaign.id.toString() : '',
    isPreview,
  });
  const [insightsState, setInsightsState] = useState<{
    [key: number]: {
      isOpen: boolean;
      currentIndex: number;
      showMore: boolean;
    };
  }>({});

  const { addToast } = useToast();

  const copyLink = useCallback(
    (anchor: string) => {
      const url = window.location.href.split('#')[0];
      navigator.clipboard.writeText(`${url}#${anchor}`);
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__INSIGHT_LINK_TOAST_COPY_MESSAGE')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    },
    [data.findings]
  );

  // Check if url has an anchor and scroll to it
  useEffect(() => {
    const url = window.location.href;
    const urlAnchor = url.split('#')[1];
    if (urlAnchor) {
      const anchor = document.getElementById(urlAnchor);
      const main = document.getElementById('main');
      if (anchor && main) {
        main.scroll({
          top: anchor.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
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
          <Col xs={12} style={{ margin: 0 }}>
            <SectionTitle
              title={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_TITLE')}
              subtitle={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_SUBTITLE')}
            />
            <Divider style={{ margin: `${appTheme.space.md} 0` }} />
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
                <Grid
                  style={{
                    paddingBottom:
                      navigationOffset /* To fix unreachable last item in the navigation */,
                  }}
                >
                  {data.findings.map((insight, i) => (
                    <Row
                      id={`insight-row-${insight.id}`}
                      style={{ paddingBottom: appTheme.space.lg }}
                    >
                      <Col xs={12} style={{ margin: 0 }}>
                        <XL
                          style={{
                            fontWeight: appTheme.fontWeights.semibold,
                            paddingTop: appTheme.space.sm,
                          }}
                        >
                          {t('__CAMPAIGN_PAGE_INSIGHTS_NUMBER_LABEL')} {i + 1}
                          <IconButton
                            onClick={() =>
                              copyLink(`insight-row-${insight.id}`)
                            }
                          >
                            <CopyIcon />
                          </IconButton>
                        </XL>

                        <StyledDivider />
                      </Col>
                      <Col
                        xs={12}
                        style={{ marginBottom: `${appTheme.space.base * 3}px` }}
                      >
                        <InsightComment
                          id={insight.id}
                          cid={campaign.id}
                          comment={insight.comment}
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        lg={12}
                        xl={6}
                        style={{ marginBottom: appTheme.space.md }}
                      >
                        <InsightCard insight={insight} />
                      </Col>
                      {insight.video &&
                        insight.video.slice(0, 1).map((videoPart, index) => (
                          <Col
                            xs={12}
                            md={6}
                            lg={12}
                            xl={6}
                            style={{ marginBottom: appTheme.space.md }}
                          >
                            <HighlightCard
                              onClick={() => openLightbox(insight.id, index)}
                              video={videoPart}
                              index={index}
                              insight={insight}
                              videoCount={insight.video?.length || 0}
                            />
                          </Col>
                        ))}
                      {insight.video &&
                        insight.video.length > 1 &&
                        insightsState &&
                        (!insightsState[insight.id] ||
                          !insightsState[insight.id].showMore) && (
                          <Col
                            xs={12}
                            textAlign="end"
                            style={{ marginBottom: appTheme.space.md }}
                          >
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
                        insight.video &&
                        insight.video.slice(1).map((videoPart, index) => (
                          <Col
                            xs={12}
                            md={6}
                            lg={12}
                            xl={6}
                            style={{ marginBottom: appTheme.space.md }}
                          >
                            <HighlightCard
                              onClick={() =>
                                openLightbox(insight.id, index + 1)
                              }
                              video={videoPart}
                              index={index + 1}
                              insight={insight}
                              videoCount={insight.video?.length || 0}
                            />
                          </Col>
                        ))}
                      {insight.video &&
                        insight.video.length > 1 &&
                        insightsState &&
                        insightsState[insight.id] &&
                        insightsState[insight.id].showMore && (
                          <Col
                            xs={12}
                            textAlign="end"
                            style={{ marginBottom: appTheme.space.md }}
                          >
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
