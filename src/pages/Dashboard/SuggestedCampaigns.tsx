import {
  Col,
  Paragraph,
  PlanCard,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { CampaignItem } from './CampaignItem';
import { CardRowLoading } from './CardRowLoading';
import { getPlanStatus } from './hooks/getPlanStatus';
import { useCampaignsAndPlans } from './hooks/useCampaignsAndPlans';

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
              <PlanCard
                status={
                  getPlanStatus({
                    planStatus: plan.status,
                    quote: plan.quote,
                    t,
                  }).status
                }
                i18n={{
                  statusLabel: getPlanStatus({
                    planStatus: plan.status,
                    quote: plan.quote,
                    t,
                  }).statusLabel,
                }}
                onClick={() => {
                  window.location.href = `/plans/${plan.id}`;
                }}
              >
                <PlanCard.ProjectLabel>
                  {plan.project.title}
                </PlanCard.ProjectLabel>
                <PlanCard.Title>{plan.title}</PlanCard.Title>
              </PlanCard>
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
