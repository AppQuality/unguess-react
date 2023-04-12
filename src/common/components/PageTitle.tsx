import { ReactNode } from 'react';
import styled from 'styled-components';

// this implemetation is meant to give a minimal solution for the problem
// of having more space in the Editable Title component. We can't use the
// PageHeader.Title as it is because it's thinner than the EditableTitle

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${(p) => p.theme.space.xs} 0;
  border-bottom: 2px solid transparent;
`;

export const PageTitle = ({ children }: { children: ReactNode }) => (
  <TitleWrapper>{children}</TitleWrapper>
);
