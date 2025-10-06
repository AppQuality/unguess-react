import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { usePlan } from '../../../hooks/usePlan';

const GoToCampaignButton = () => {
  const { t } = useTranslation();
  const { planId } = useParams();
  const { plan } = usePlan(planId);

  const navigate = useNavigate();
  const campaignRoute = useLocalizeRoute(
    `campaigns/${plan?.campaign?.id ?? 0}`
  );

  return (
    <Button
      type="button"
      size="small"
      isAccent
      isPrimary
      onClick={() => navigate(campaignRoute)}
    >
      {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_GO_TO_CAMPAIGN_CTA')}
    </Button>
  );
};

export { GoToCampaignButton };
