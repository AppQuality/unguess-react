import styled from 'styled-components';

const Component = styled.div`
  padding: ${({ theme }) => theme.space.sm} 0;
  .paragraph-topbar {
    display: flex;
    justify-content: space-between;
  }
`;

export default Component;
