import { getColor, MD, Modal } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const FlexContainer = styled.div<{ isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space.base * 4}px;
  min-height: 0;
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;

export const FixedBody = styled(Modal.Body)`
  display: inline-table;
  overflow: hidden;
  padding-bottom: ${({ theme }) => theme.space.base * 2}px;
`;

export const SettingsDivider = styled.div`
  border-top: 1px solid ${({ theme }) => getColor(theme.colors.neutralHue, 200)};
  padding-top: ${({ theme }) => theme.space.base * 6}px;
`;

export const UsersLabel = styled(MD)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.base * 4}px 0;
`;

export const UsersContainer = styled.div`
  padding: 0;
  padding-left: ${({ theme }) => theme.space.xs};
`;
