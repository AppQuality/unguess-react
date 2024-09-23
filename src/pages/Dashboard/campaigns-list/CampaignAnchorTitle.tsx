import { Anchor, Span, theme } from '@appquality/unguess-design-system';
import { CampaignWithOutput } from 'src/features/api';
import { getLocalizeDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';

export const CampaignAnchorTitle = ({
  campaign,
}: {
  campaign: CampaignWithOutput;
}) => {
  const cpUrl = getLocalizeDashboardRoute({
    campaignId: campaign.id,
    cpFamily: campaign.family.name,
    outputs: campaign.outputs || [],
  });

  return (
    <Anchor href={cpUrl}>
      <Span isBold style={{ color: theme.palette.grey[800] }}>
        {campaign.customer_title ?? campaign.title}
      </Span>
    </Anchor>
  );
};
