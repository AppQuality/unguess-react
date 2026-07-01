import { Campaign } from 'src/features/api';
import { useHasOnlyUniqueBugs } from '../../useHasOnlyUniqueBugs';
import { WidgetSectionNew } from '../../WidgetSection';
import BugDistributionCard from './widgets/BugDistributionCard';
import { OnlyUniqueBugs } from './widgets/OnlyUniqueBugs';
import { Progress } from './widgets/Progress';
import { Suggestions } from './widgets/Reccomendations';
import { UniqueBugs } from './widgets/UniqueBugs';

export const CampaignOverview = ({
  id,
  campaign,
}: {
  id: string;
  campaign: Campaign;
}) => {
  const hasOnlyUniqueBugs = useHasOnlyUniqueBugs(campaign.id);

  return (
    <WidgetSectionNew id={id}>
      <Progress campaign={campaign} />
      {hasOnlyUniqueBugs ? (
        <OnlyUniqueBugs campaignId={campaign ? campaign.id : 0} />
      ) : (
        <UniqueBugs campaignId={campaign ? campaign.id : 0} />
      )}
      <BugDistributionCard campaignId={campaign ? campaign.id : 0} />
      <Suggestions campaignId={campaign.id.toString()} />
    </WidgetSectionNew>
  );
};
