import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  min-height: 1px; //Fix for browsers rounding 1px to 0px
  height: 1px;
  margin: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) => theme.palette.grey['300']};
`;
