import { Col, CampaignCard } from "@appquality/unguess-design-system";
import { HTMLAttributes } from "react";
import styled from "styled-components";

const ColCard = styled(Col)`
  margin-bottom: ${(props) => props.theme.space.base * 4}px;
`;

export const CampaignItem = ({
  campaign,
  onCampaignClicked,
  size = 3,
  ...props
}: {
  campaign: Component["campaign"];
  onCampaignClicked: (campaignId: number, cpType: string) => void;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {


  const isFunctional = campaign.test_type_name.toLowerCase() === "functional";

  return (
    <ColCard size={size}>
      <CampaignCard
        className="suggested-campaign-card"
        key={campaign.id}
        // isNew={campaign?.isNew} TODO: need an API update
        date={new Date(campaign.start_date).toLocaleString().substring(0, 10)}
        projectTitle={`${campaign.project_name}`}
        campaignTitle={campaign.title ?? "Untitled"}
        title={campaign.title ?? "Untitled"}
        type={isFunctional ? "FUNCTIONAL": "EXPERIENTIAL"}
        status={
          campaign.status_id === 1
            ? "PROGRESS"
            : campaign.status_id === 0
            ? "INCOMING"
            : "COMPLETED"
        }
        pillText={campaign.campaign_type_name}
        onClick={() => onCampaignClicked(campaign.id, campaign.test_type_name)}
        {...props}
      />
    </ColCard>
  );
};
