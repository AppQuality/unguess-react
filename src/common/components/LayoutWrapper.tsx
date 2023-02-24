import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';

const Container = styled.div<{
  isNotBoxed?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.space.xxl};
  max-width: ${globalTheme.breakpoints.xxl};
  margin: 0 auto;

  ${({ isNotBoxed }) =>
    isNotBoxed &&
    `
      max-width: 100%;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.md};
  }
`;

export const LayoutWrapper = (
  props: React.ComponentProps<typeof Container>
) => {
  const { className, isNotBoxed, ...rest } = props;

  return (
    <Container
      className={
        className
          ? `${className} layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'}`
          : `layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'}`
      }
      {...rest}
    />
  );
};
