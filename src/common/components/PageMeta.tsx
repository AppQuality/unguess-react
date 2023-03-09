import styled from 'styled-components';

export const PageMeta = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-flow: column;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.sm}) {
    flex-flow: row wrap;
  }
  > * {
    margin-top: ${(p) => p.theme.space.xxs};
    margin-bottom: ${(p) => p.theme.space.xxs};
  }
`;
