import { CampaignCard } from '@appquality/unguess-design-system';
import { format } from 'date-fns';
import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { CampaignWithOutput } from 'src/features/api';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { CAMPAING_STATUSES } from './types';

export const CampaignItem = ({
  campaign,
  ...props
}: {
  campaign: CampaignWithOutput;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();
  const { type, project, family } = campaign;
  const isFunctional = family.name.toLowerCase() === 'functional';
  const title = campaign.customer_title ?? campaign.title;
  const targetUrl = getLocalizeoFirstLevelDashboardRoute(campaign.id);

  return (
    <CampaignCard
      className="suggested-campaign-card"
      // isNew={campaign?.isNew} TODO: need an API update
      date={format(new Date(campaign.start_date), 'dd/MM/y')}
      projectTitle={`${project.name}`}
      campaignTitle={title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      title={title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      type={isFunctional ? 'FUNCTIONAL' : 'EXPERIENTIAL'}
      status={campaign.status.name.toUpperCase() as CAMPAING_STATUSES}
      pillText={type.name}
      onClick={() => {
        window.location.href = targetUrl;
      }}
      {...props}
    />
  );
};
