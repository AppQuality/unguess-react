import { Col, Grid, Row, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { useCampaignInsights } from './useCampaignInsights';
import { Navigation } from './Navigation';
import { InsightCard } from './InsightCard';
import { HighlightCard } from './HighlightCard';

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
                            <HighlightCard {...{ videoPart, index, insight }} />
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
