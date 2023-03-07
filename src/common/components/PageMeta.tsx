import styled from 'styled-components';

export const PageMeta = styled.div`
  padding: ${(p) => p.theme.space.xxs} 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-bottom: ${(p) => p.theme.space.xxs};
  }
`;
