import { ReactNode } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.span<{ isActive?: boolean }>`
  ${({ isActive, theme }) =>
    isActive ? `background:${theme.palette.fuschia[400]}66;` : ``}
  line-height: 2;
  display: inline-block;
  margin-right: ${({ theme }) => theme.space.xxs};
`;

const Component = ({
  setCurrentTime,
  children,
  start,
  end,
  isActive,
}: {
  // eslint-disable-next-line no-shadow
  setCurrentTime?: ({ start, end }: { start: number; end: number }) => void;
  children: ReactNode;
  start: number;
  end: number;
  isActive?: boolean;
}) => (
  <Wrapper
    onClick={() => {
      if (setCurrentTime) {
        setCurrentTime({ start, end });
      }
    }}
    isActive={isActive}
  >
    {children}
  </Wrapper>
);

export default Component;
