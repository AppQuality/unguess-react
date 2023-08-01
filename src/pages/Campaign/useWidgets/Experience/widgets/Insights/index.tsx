import {
  Col,
  Grid,
  Row,
  Skeleton,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { useEffect, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { appTheme } from 'src/app/theme';
import { useCampaignInsights } from './useCampaignInsights';
import { Navigation } from './Navigation';
import { InsightCard } from './InsightCard';
import { HighlightCard } from './HighlightCard';
import { InsightLightbox } from './Lightbox';

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
  const [insightsLightbox, setInsightsLightbox] = useState<{
    [key: number]: {
      isOpen: boolean;
      currentIndex: number;
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
    setInsightsLightbox({
      ...insightsLightbox,
      [insightId]: {
        isOpen: true,
        currentIndex: index,
      },
    });
  };

  const openLightbox = (insightId: number, index: number) => {
    setInsightsLightbox({
      ...insightsLightbox,
      [insightId]: {
        isOpen: true,
        currentIndex: index,
      },
    });
  };

  if (!data || !data.findings || isError) return null;

  if (data.findings && data.findings.length === 0) return null;

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
                      <Col xs={12} lg={6}>
                        <InsightCard insight={insight} />
                      </Col>
                      {insight.video?.map((videoPart, index) => (
                        <Col xs={12} lg={6}>
                          <HighlightCard
                            onClick={() => openLightbox(insight.id, index)}
                            video={videoPart}
                            index={index}
                            insight={insight}
                          />
                        </Col>
                      ))}
                      {insightsLightbox &&
                        insightsLightbox[insight.id] &&
                        insightsLightbox[insight.id].isOpen && (
                          <InsightLightbox
                            currentIndex={
                              insightsLightbox[insight.id].currentIndex
                            }
                            items={insight?.video}
                            onClose={() =>
                              setInsightsLightbox({
                                ...insightsLightbox,
                                [insight.id]: {
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
    </WidgetSection>
  );
};
