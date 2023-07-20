import { Col, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { SectionTitle } from 'src/pages/Campaign/SectionTitle';
import { WidgetSection } from 'src/pages/Campaign/WidgetSection';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation';
import { useCampaignInsights } from './useCampaignInsights';

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

  return (
    <WidgetSection {...(id && { id })}>
      <Col xs={12}>
        <SectionTitle
          title={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_TITLE')}
          subtitle={t('__CAMPAIGN_PAGE_INSIGHTS_SECTION_SUBTITLE')}
        />
      </Col>
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
            <div>insights</div>
          </Col>
        </>
      )}
    </WidgetSection>
  );
};
