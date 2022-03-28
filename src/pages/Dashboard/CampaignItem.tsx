import { Col, CampaignCard } from "@appquality/unguess-design-system";
import { CampaignCardsProps } from "@appquality/unguess-design-system/build/stories/campaignCards/_types";
import { HTMLAttributes, HtmlHTMLAttributes } from "react";

export const CampaignItem = ({
  campaign,
  onCampaignClicked,
  size = 3,
  ...props
}: {
  campaign: Component["campaign"];
  onCampaignClicked?: () => void;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Col size={size}>
      <CampaignCard
        className="suggested-campaign-card"
        key={campaign.id}
        isNew={Math.random() > 0.6}
        date={new Date().toLocaleString().substring(0, 10)}
        title={campaign.title ?? "Untitled"}
        subTitle={`Progetto ${campaign.project_id}`}
        type={"FUNCTIONAL"}
        status={
          campaign.status_id === 1
            ? "PROGRESS"
            : campaign.status_id === 0
            ? "INCOMING"
            : "COMPLETED"
        }
        pillText="Functional Bug test"
        onClick={onCampaignClicked}
        {...props}
      />
    </Col>
  );
};
