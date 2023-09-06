import styled from 'styled-components';

const Container = styled.div<{
  isNotBoxed?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${({ theme }) => theme.space.xxl};
  margin: 0 auto;
  max-width: ${({ theme, isNotBoxed }) =>
    isNotBoxed ? '100%' : theme.breakpoints.xxl};
  overflow: hidden;

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
          ? `layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'} ${className}`
          : `layout-wrapper ${isNotBoxed ? 'not-boxed' : 'boxed'}`
      }
      isNotBoxed={isNotBoxed}
      {...rest}
    />
  );
};
