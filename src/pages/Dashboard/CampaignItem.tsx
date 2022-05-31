import { Col, CampaignCard } from '@appquality/unguess-design-system';
import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { getCampaignStatus } from 'src/hooks/getCampaignStatus';
import styled from 'styled-components';

export const ColCard = styled(Col)`
  margin-bottom: ${(props) => props.theme.space.base * 4}px;
`;

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
  const isFunctional =
    campaign.campaign_family_name.toLowerCase() === 'functional';

  return (
    <CampaignCard
      className="suggested-campaign-card"
      key={campaign.id}
      // isNew={campaign?.isNew} TODO: need an API update
      date={new Date(campaign.start_date).toLocaleString().substring(0, 10)}
      projectTitle={`${campaign.project_name}`}
      campaignTitle={campaign.title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      title={campaign.title ?? t('__CAMPAIGN_CARD_EMPTY_TITLE_LABEL')}
      type={isFunctional ? 'FUNCTIONAL' : 'EXPERIENTIAL'}
      status={getCampaignStatus(campaign)}
      pillText={campaign.campaign_type_name}
      onClick={() =>
        onCampaignClicked(campaign.id, campaign.campaign_family_name)
      }
      {...props}
    />
  );
};
