import {
  Col,
  Grid,
  Row,
  Skeleton,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { ReactComponent as MajorIssueIcon } from 'src/assets/icons/insight-major-issue.svg';
import { ReactComponent as MinorIssueIcon } from 'src/assets/icons/insight-minor-issue.svg';
import { SeverityTag } from 'src/common/components/tag/SeverityTag';
import { useCampaignInsights } from './useCampaignInsights';

interface InsightSeverity {
  id: number;
  name: string;
}

function getSeverityIcon(severity: InsightSeverity) {
  switch (severity.id) {
    case 1:
      return <MajorIssueIcon />;
    case 2:
      return <MinorIssueIcon />;
    default:
      return null;
  }
}

function getSeverityTag(severity: InsightSeverity) {
  switch (severity.id) {
    case 1:
      return (
        <SeverityTag hasBackground severity="critical">
          {severity.name}
        </SeverityTag>
      );
    case 2:
      return (
        <SeverityTag hasBackground severity="high">
          {severity.name}
        </SeverityTag>
      );
    default:
      return null;
  }
}

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

  if (!data || !data.insights) return null;

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
                <StickyContainer>
                  <StickyNavItemLabel>
                    {t('__CAMPAIGN_PAGE_INSIGHTS_NAVIGATION_TITLE')}
                  </StickyNavItemLabel>
                  <StyledDivider />
                </StickyContainer>
              </Col>
              <Col xs={12} lg={8}>
                <Grid>
                  {data.insights.map((insight) => (
                    <Row id={`insight-row-${insight.id}`}>
                      <Col xs={12} lg={6}>
                        <SpecialCard title={insight.title}>
                          {console.log('insight', insight)}
                          <SpecialCard.Thumb>
                            {getSeverityIcon(insight.severity)}
                          </SpecialCard.Thumb>
                          <SpecialCard.Header>
                            <SpecialCard.Header.Label>
                              {insight.severity.name}
                            </SpecialCard.Header.Label>
                            <SpecialCard.Header.Title>
                              {insight.title}
                            </SpecialCard.Header.Title>
                          </SpecialCard.Header>
                          {insight.description}
                          <SpecialCard.Footer justifyContent="start">
                            {/* check if insight.cluster is "all" or an array of clusters */}
                            {insight.cluster === 'all' ? (
                              <Tag>
                                {t('__CAMPAIGN_PAGE_INSIGHTS_ALL_CLUSTERS')}
                              </Tag>
                            ) : (
                              Array.isArray(insight.cluster) &&
                              insight.cluster.map((cluster) => (
                                <Tag key={cluster.id}>{cluster.name}</Tag>
                              ))
                            )}
                            {getSeverityTag(insight.severity)}
                          </SpecialCard.Footer>
                        </SpecialCard>
                      </Col>
                      {insight.videoPart.map((videoPart) => (
                        <Col xs={12} lg={6}>
                          <SpecialCard
                            key={insight.id}
                            title={videoPart.description}
                          >
                            {console.log('videoPart', videoPart)}
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
