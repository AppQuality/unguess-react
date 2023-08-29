import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.space.xxs} 0;
  background-color: ${({ theme }) => theme.palette.grey['300']};
`;
