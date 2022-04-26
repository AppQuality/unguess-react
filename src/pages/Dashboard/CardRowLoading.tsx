import {
  Col,
  Row,
  Paragraph,
  theme,
  Skeleton,
  CampaignCard,
} from "@appquality/unguess-design-system";

import { CardsContainer } from "./CardContainer";

export const CardRowLoading = () => {
  return (
    <Row>
      <Col xs={12} style={{ marginBottom: theme.space.base * 4 + "px" }}>
        <Paragraph>
          <Skeleton width={"200px"} />
        </Paragraph>
      </Col>
      <CardsContainer>
        <CampaignCard isLoading projectTitle={""} campaignTitle={""} date="" />
        <CampaignCard isLoading projectTitle={""} campaignTitle={""} date="" />
        <CampaignCard isLoading projectTitle={""} campaignTitle={""} date="" />
        <CampaignCard isLoading projectTitle={""} campaignTitle={""} date="" />
      </CardsContainer>
    </Row>
  );
};
