import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import BugDistributionCard from './widgets/BugDistributionCard';
import { Progress } from './widgets/Progress';
import { UniqueBugs } from './widgets/UniqueBugs';
import { Suggestions } from './widgets/Suggestions';
import { WidgetSectionNew } from '../../WidgetSection';

export const CampaignOverview = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  return (
    <WidgetSectionNew
      id={id}
      title={t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL')}
    >
      <Progress campaign={campaign} />
      <UniqueBugs campaignId={campaign ? campaign.id : 0} />
      <BugDistributionCard campaignId={campaign ? campaign.id : 0} />
      <Suggestions campaignId={campaign.id.toString()} />
    </WidgetSectionNew>
  );
};
