import { Anchor, Span, theme } from '@appquality/unguess-design-system';
import { CampaignWithOutput } from 'src/features/api';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';

export const ProjectAnchor = ({
  campaign,
}: {
  campaign: CampaignWithOutput;
}) => {
  const cpUrl = getLocalizeoFirstLevelDashboardRoute(campaign.id);

  return (
    <Anchor href={cpUrl}>
      <Span isBold style={{ color: theme.palette.grey[800] }}>
        {campaign.customer_title ?? campaign.title}
      </Span>
    </Anchor>
  );
};
