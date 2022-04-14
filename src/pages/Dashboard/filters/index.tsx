import { Row, Col, theme } from "@appquality/unguess-design-system";
import styled from "styled-components";
import { SearchInput } from "./search";
import { StatusDropdown } from "./status";
import { TestTypeDropdown } from "./test";
import { CampaignTypeDropdown } from "./type";

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Filters = () => {
  return (
    <Row style={{marginBottom: theme.space.lg}}>
      <Col sm alignSelf={"start"}>
        <StatusDropdown />
      </Col>
      <Col sm>
        <CampaignTypeDropdown />
      </Col>
      <Col sm>
        <TestTypeDropdown />
      </Col>
      <Col xs={12} sm={12} md={12} lg={4} xl={6}>
        <StyledDiv>
          <SearchInput />
        </StyledDiv>
      </Col>
    </Row>
  );
};
