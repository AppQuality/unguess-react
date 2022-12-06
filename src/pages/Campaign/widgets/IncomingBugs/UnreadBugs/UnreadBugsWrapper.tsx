import styled from 'styled-components';

export const UnreadBugsWrapper = styled.div<{
  marginTop?: string;
}>`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  ${({ marginTop }) => marginTop && `margin-top: ${marginTop};`}
`;
