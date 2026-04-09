import { Logo } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const AuthHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.space.lg} ${theme.space.xxl} ${theme.space.md}`};
`;

export const AuthHeader = () => (
  <AuthHeaderWrapper>
    <Logo type="horizontal" size={150} />
  </AuthHeaderWrapper>
);
