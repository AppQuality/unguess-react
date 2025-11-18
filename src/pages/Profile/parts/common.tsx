import { ContainerCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

export const StyledFooter = styled.div`
  text-align: right;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const StyledNotificationsCardHeaderWrapper = styled(StyledCardHeader)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.sm};
`;

export const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.lg};
`;

export const FieldExtraContent = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
`;

export const CardInnerPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;
