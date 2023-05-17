import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

export const BugTitle = styled.div<{ isUnread?: boolean; isBold?: boolean }>`
  flex: 1 0 100%;
  font-weight: ${({ isBold }) =>
    isBold ? appTheme.fontWeights.medium : appTheme.fontWeights.regular};
  color: ${({ isUnread }) =>
    isUnread ? appTheme.palette.blue[600] : appTheme.palette.grey[800]};
  margin-bottom: ${appTheme.space.xs};
`;
