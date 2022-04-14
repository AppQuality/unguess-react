import {
  Col,
  theme,
  MD,
  Row,
  IconButton,
  Span,
} from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
import styled from "styled-components";
import {
  selectGroupedCampaigns,
} from "src/features/campaigns/campaignSlice";
import { ReactComponent as GridIcon } from "src/assets/icons/grid.svg";
import { ReactComponent as ListIcon } from "src/assets/icons/list.svg";
import { useState } from "react";
import { CardList } from "./list";
import { TableList } from "./table";
import { Separator } from "../Separator";
// import { Filters } from "../filters";

const FloatRight = styled.div`
  float: right;
`;

export const CampaignsList = () => {
  const { t } = useTranslation();
  const campaigns: Array<Array<Component["campaign"]>> = useAppSelector(
    selectGroupedCampaigns
  );

  const campaignsCount = campaigns.reduce((acc, curr) => acc + curr.length, 0);
  const [viewType, setViewType] = useState("grid");

  return (
    <>
      <Row
        alignItems={"center"}
        style={{
          marginTop: theme.space.base * 8 + "px",
          marginBottom: theme.space.xxs,
        }}
      >
        <Col>
          <Span>
            <MD style={{ color: theme.palette.grey[700] }}>
              {t("__DASHABOARD_TOTAL_CAMPAIGN_COUNTER MAX:5").toUpperCase() +
                ` (${campaignsCount})`}
            </MD>
          </Span>
        </Col>
        <Col>
          <FloatRight>
            <IconButton
              isPill
              {...(viewType === "list" && { isPrimary: true })}
              onClick={() => setViewType("list")}
            >
              <ListIcon />
            </IconButton>
            <IconButton
              isPill
              {...(viewType === "grid" && { isPrimary: true })}
              onClick={() => setViewType("grid")}
            >
              <GridIcon />
            </IconButton>
          </FloatRight>
        </Col>
      </Row>      
      <Separator style={{marginTop: "0", marginBottom: theme.space.sm}}/>
      {/* <Filters /> */}

      {viewType === "list" ? (
        <TableList campaigns={campaigns} />
      ) : (
        <CardList campaigns={campaigns} />
      )}
    </>
  );
};
