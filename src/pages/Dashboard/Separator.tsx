import { theme } from "@appquality/unguess-design-system";
import styled from "styled-components";

export const Separator = styled.hr`
  margin: ${theme.space.base * 6}px 0 ${theme.space.base * 8}px 0;
  border: none;
  border-top: 1px solid ${theme.palette.grey[300]};
`;
