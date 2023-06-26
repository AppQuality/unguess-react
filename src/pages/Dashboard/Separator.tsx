import { appTheme } from 'src/app/theme';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  margin: ${appTheme.space.base * 6}px 0 ${appTheme.space.base * 8}px 0;
  border: none;
  border-top: 1px solid ${appTheme.palette.grey[300]};
`;

export const Separator = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledHr {...props} />
);
