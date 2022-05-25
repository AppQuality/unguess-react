import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.xxl};
    padding-bottom: 1px;
  }
`;

export const PageHeaderContainer: React.FC<{}> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
