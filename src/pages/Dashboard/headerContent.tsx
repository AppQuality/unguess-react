import { Grid, Row, Col, XXXL, theme } from "@appquality/unguess-design-system";
import { Separator } from "./Separator";
import { Counters } from "./Counters";
import styled from "styled-components";

export const DashboardHeaderContent = ({ title }: { title: string }) => {
  const StyledContainer = styled.div`
    background-color: white;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: ${({ theme }) => theme.space.xxl};
      padding-bottom: 1px;
    }
  `;

  return (
    <>
      <StyledContainer>
        <Grid>
          <Row>
            <Col xs={12}>
              <XXXL style={{ color: theme.palette.blue[600] }}>
                {title}
              </XXXL>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: theme.space.base * 6 + "px",
              marginBottom: theme.space.base * 6 + "px",
            }}
          >
            <Col xs={12}>
              <Counters />
            </Col>
          </Row>
        </Grid>
      </StyledContainer>
      <Separator style={{ marginTop: 0 }} />
    </>
  );
};
