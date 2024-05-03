import { styled } from 'styled-components';

export const Container = styled.div<{
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
}>`
  height: ${({ theme }) =>
    `calc(100vh + ${theme.components.chrome.header.height} + ${theme.space.xxl})`};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: ${({ theme }) => theme.space.xxl} 0;
  ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
  ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}
 
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.md} 0;
    ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
    ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}
  }
`;
