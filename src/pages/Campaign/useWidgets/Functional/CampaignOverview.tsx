import { useTranslation } from 'react-i18next';
import { Campaign, useGetCampaignsByCidBugsQuery } from 'src/features/api';
import BugDistributionCard from './widgets/BugDistributionCard';
import { Progress } from './widgets/Progress';
import { UniqueBugs } from './widgets/UniqueBugs';
import { Suggestions } from './widgets/Reccomendations';
import { WidgetSectionNew } from '../../WidgetSection';
import { NotUniqueBugs } from './widgets/NotUniqueBugs';

export const CampaignOverview = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const { t } = useTranslation();
  let hasOnlyUniqueBugs = false;

  // Check if all the bugs in the campaign are unique
  const { data: dataFilter } = useGetCampaignsByCidBugsQuery({
    cid: campaign.id?.toString() ?? '0',
    filterBy: { is_duplicated: 0 },
  });

  const { data: dataNoFilter } = useGetCampaignsByCidBugsQuery({
    cid: campaign.id?.toString() ?? '0',
  });

  if (dataFilter && dataNoFilter) {
    const filterCount = dataFilter.items?.length;
    const noFilterCount = dataNoFilter.items?.length;
    if (filterCount === noFilterCount) {
      hasOnlyUniqueBugs = true;
    }
  }

  return (
    <WidgetSectionNew
      id={id}
      title={t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OVERVIEW_LABEL')}
    >
      <Progress campaign={campaign} />
      {hasOnlyUniqueBugs ? (
        <UniqueBugs campaignId={campaign ? campaign.id : 0} />
      ) : (
        <NotUniqueBugs campaignId={campaign ? campaign.id : 0} />
      )}
      <BugDistributionCard campaignId={campaign ? campaign.id : 0} />
      <Suggestions campaignId={campaign.id.toString()} />
    </WidgetSectionNew>
  );
};
