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
import { ReactComponent as GridIcon } from "src/assets/icons/grid.svg";
import { ReactComponent as ListIcon } from "src/assets/icons/list.svg";
import { useMemo, useState } from "react";
import { CardList } from "./list";
import { TableList } from "./table";
import { Separator } from "../Separator";
import { Filters } from "../filters";
import { EmptyResults } from "../emptyState";
import { selectFilteredCampaigns } from "src/features/campaigns";
import { Campaign, useGetWorkspacesByWidCampaignsQuery } from "src/features/api";
import { createSelector } from "@reduxjs/toolkit";

const FloatRight = styled.div`
  float: right;
`;

export const ProjectItems = () => {
  const { t } = useTranslation();
  const activeWorkspace = useAppSelector(
    (state) => state.navigation.activeWorkspace
  );

  //Get workspaces campaigns from rtk query and filter them
  const filters = useAppSelector((state) => state.filters);

  const getFilteredCampaigns = useMemo(() => {
    return createSelector(
      selectFilteredCampaigns,
      (campaigns) => campaigns
    );

  }, [])
  
  const { filteredCampaigns } = useGetWorkspacesByWidCampaignsQuery({wid: activeWorkspace?.id || 0, limit: 10000}, {
    selectFromResult: (result) => {
      return {
        ...result,
        filteredCampaigns: getFilteredCampaigns(result?.data?.items || [], filters),
      }
    }
  });

  const campaignsCount = filteredCampaigns.length; 
  const [viewType, setViewType] = useState("list");

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
      <Separator style={{ marginTop: "0", marginBottom: theme.space.sm }} />
      <Filters />

      {campaignsCount ? (
        viewType === "list" ? (
          <TableList campaigns={filteredCampaigns as Campaign[]} />
        ) : (
          <CardList campaigns={filteredCampaigns as Campaign[]} />
        )
      ) : (
        <EmptyResults />
      )}
    </>
  );
};
