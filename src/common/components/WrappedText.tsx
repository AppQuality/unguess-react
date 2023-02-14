import styled from 'styled-components';

const StyledSpan = styled.span`
  overflow-wrap: break-word;
`;

export const WrappedText = ({ children }: { children: string }) => {
  if (typeof children !== 'string') {
    return <StyledSpan>{children}</StyledSpan>;
  }

  const wrapped = children.split('\n').map((item) => (
    <>
      {item}
      <br />
    </>
  ));

  return <StyledSpan>{wrapped}</StyledSpan>;
};
