import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${({ theme }) => theme.space.xs};
  background-color: ${({ theme }) => theme.palette.grey['300']};
`;
