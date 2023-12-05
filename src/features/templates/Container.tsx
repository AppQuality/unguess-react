import { styled } from 'styled-components';

export const Container = styled.div<{
  excludeMarginTop?: boolean;
  excludeMarginBottom?: boolean;
}>`
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding-bottom: ${({ theme }) =>
    theme.components.chrome.header
      .height}; /* Fix to prevent page bottom for being cut because of the chrome fixed header height */
  margin: ${({ theme }) => theme.space.xxl} auto;
  ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
  ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => theme.space.md} auto;
    ${({ excludeMarginTop }) => excludeMarginTop && `margin-top: 0;`}
    ${({ excludeMarginBottom }) => excludeMarginBottom && `margin-bottom: 0;`}
  }
`;
