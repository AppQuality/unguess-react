import {
  Col,
  Paragraph,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { CampaignItem } from './CampaignItem';
import { CardRowLoading } from './CardRowLoading';
import { useCampaignsAndPlans } from './hooks/useCampaignsAndPlans';
import { PlanCard } from './PlanCard';

const MAX_SUGGESTED_ITEMS = 5;

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();

  const { items, isLoading, isFetching, isError } =
    useCampaignsAndPlans(MAX_SUGGESTED_ITEMS);

  if (isLoading || isFetching) return <CardRowLoading />;

  if (isError) return null;

  if (!items.plans.length && !items.campaigns.length) return null;

  return (
    <>
      <Row>
        <Col xs={12} style={{ marginBottom: 0 }}>
          <Paragraph>
            <SectionTitle
              title={t('__DASHABOARD_SUGGESTED_CAMPAIGN_TITLE')}
              subtitle={t('__DASHABOARD_SUGGESTED_CAMPAIGN_SUBTITLE')}
            />
            <Separator style={{ margin: `${appTheme.space.md} 0` }} />
          </Paragraph>
        </Col>
      </Row>
      <ScrollingGrid id="suggested-campaigns-scrolling-grid">
        {!!items.plans.length &&
          items.plans.map((plan, i) => (
            <ScrollingGrid.Item
              key={`suggested_plan_${plan.id}`}
              data-qa={`tracked-activity-${i}`}
            >
              <PlanCard plan={plan} />
            </ScrollingGrid.Item>
          ))}

        {!!items.campaigns.length &&
          items.campaigns.map((campaign) => (
            <ScrollingGrid.Item key={`suggested_${campaign.id}`}>
              <CampaignItem campaign={campaign} />
            </ScrollingGrid.Item>
          ))}
      </ScrollingGrid>
    </>
  );
};
