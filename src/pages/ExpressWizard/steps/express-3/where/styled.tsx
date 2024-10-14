import {
  FormField as Field,
  Row,
  Span,
} from '@appquality/unguess-design-system';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import styled from 'styled-components';

export const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.space.md};
`;

export const PrimarySpan = styled(Span)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
`;

export const SpacedField = styled(Field)`
  margin-top: ${({ theme }) => theme.space.sm};
`;
