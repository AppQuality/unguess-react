import { theme } from '@appquality/unguess-design-system';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  margin: ${theme.space.base * 6}px 0 ${theme.space.base * 8}px 0;
  border: none;
  border-top: 1px solid ${theme.palette.grey[300]};
`;

export const Separator = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledHr {...props} />
);
