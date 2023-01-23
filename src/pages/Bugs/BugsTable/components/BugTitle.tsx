import { theme } from 'src/app/theme';
import styled from 'styled-components';

export const BugTitle = styled.div<{ isUnread?: boolean }>`
  font-weight: ${({ isUnread }) =>
    isUnread ? theme.fontWeights.medium : theme.fontWeights.regular};
  color: ${({ isUnread }) =>
    isUnread ? theme.palette.blue[600] : theme.palette.grey[800]};
  margin-bottom: ${theme.space.xs};
`;
