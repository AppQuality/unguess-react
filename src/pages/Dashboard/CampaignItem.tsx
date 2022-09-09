import { CampaignCard } from '@appquality/unguess-design-system';
import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import { format } from 'date-fns';

export const CampaignItem = ({
  campaign,
  onCampaignClicked,
  ...props
}: {
  campaign: Campaign;
  onCampaignClicked: (campaignId: number, cpType: string) => void;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();
  const { type, project, family } = campaign;
  const isFunctional = family.name.toLowerCase() === 'functional';
  const title = campaign.customer_title ?? campaign.title;

  return (
    <CampaignCard
      className="suggested-campaign-card"
      key={campaign.id}
      // isNew={campaign?.isNew} TODO: need an API update
      date={format(new Date(campaign.start_date), 'dd/MM/Y')}
      projectTitle={`${project.name}`}
      campaignTitle={title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      title={title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      type={isFunctional ? 'FUNCTIONAL' : 'EXPERIENTIAL'}
      status={getCampaignStatus(campaign)}
      pillText={type.name}
      onClick={() => onCampaignClicked(campaign.id, family.name)}
      {...props}
    />
  );
};
