import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';

const Container = styled.div<{
  isBoxed?: boolean;
}>`
  ${({ isBoxed }) =>
    isBoxed &&
    `
      max-width: ${globalTheme.breakpoints.xxl};
      margin: 0 auto;
  `}
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.space.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.md};
  }
`;

export const LayoutWrapper = (
  props: React.ComponentProps<typeof Container>
) => {
  const { className, ...rest } = props;

  return (
    <Container
      className={className ? `${className} layout-wrapper` : 'layout-wrapper'}
      {...rest}
    />
  );
};
