import { ContainerCard, FormField } from '@appquality/unguess-design-system';
import { Field } from 'formik';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${appTheme.space.sm};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => theme.space.xs} 0;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;
export const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.md};
`;

export const ProfileField = styled(FormField)`
  margin-bottom: ${({ theme }) => theme.space.sm};
  width: 100%;
`;
