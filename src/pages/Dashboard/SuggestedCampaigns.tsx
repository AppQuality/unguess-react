import {
  Col,
  Paragraph,
  PlanCard,
  Row,
  Separator,
} from '@appquality/unguess-design-system';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ScrollingGrid } from 'src/common/components/ScrollingGrid';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { GetWorkspacesByWidPlansApiResponse } from 'src/features/api';
import { CampaignItem } from './CampaignItem';
import { CardRowLoading } from './CardRowLoading';
import { useCampaignsAndPlans } from './hooks/useCampaignsAndPlans';

type IPlanStatus = 'draft' | 'submitted' | 'pending_quote_review';

const getPlanStatus = (
  plan: GetWorkspacesByWidPlansApiResponse[number],
  t: TFunction
): {
  status: IPlanStatus;
  statusLabel: string;
} => {
  if (plan.status === 'pending_review') {
    if (!plan.quote || plan.quote.status === 'pending')
      return {
        status: 'submitted' as IPlanStatus,
        statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_SUBMITTED'),
      };

    return {
      status: 'pending_quote_review' as IPlanStatus,
      statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_AWAITING_APPROVAL'),
    };
  }

  return {
    status: 'draft' as IPlanStatus,
    statusLabel: t('__DASHBOARD_CARD_PLAN_STATUS_DRAFT'),
  };
};

export const SuggestedCampaigns = () => {
  const { t } = useTranslation();

  const { items, isLoading, isFetching, isError } = useCampaignsAndPlans();

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
          items.plans.map((plan) => (
            <ScrollingGrid.Item key={`suggested_plan_${plan.id}`}>
              <PlanCard
                status={getPlanStatus(plan, t).status}
                i18n={{
                  statusLabel: getPlanStatus(plan, t).statusLabel,
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
