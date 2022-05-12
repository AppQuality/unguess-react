import { Row } from "@appquality/unguess-design-system";
import styled from "styled-components";

export const StyledRow = styled(Row)``;

export const CardsContainer = styled.div`
  ${StyledRow} {
    overflow-x: auto;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;
