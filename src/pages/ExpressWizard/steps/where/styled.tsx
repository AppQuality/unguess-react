import { Row, Span } from "@appquality/unguess-design-system";
import { Field } from "@zendeskgarden/react-forms";
import styled from "styled-components";

export const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.space.md};
`;

export const PrimarySpan = styled(Span)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;

export const SpacedField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.sm};
`;
