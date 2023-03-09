import { theme } from 'src/app/theme';
import styled from 'styled-components';

export const BugTitle = styled.div<{ isUnread?: boolean; isBold?: boolean }>`
  flex: 1 0 100%;
  font-weight: ${({ isBold }) =>
    isBold ? theme.fontWeights.medium : theme.fontWeights.regular};
  color: ${({ isUnread }) =>
    isUnread ? theme.palette.blue[600] : theme.palette.grey[800]};
  margin-bottom: ${theme.space.xs};
`;
