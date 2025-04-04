import { Col } from '@appquality/unguess-design-system';
import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';

const StyledCol = styled(Col)<{ $stickyHeight: number }>`
  position: sticky;
  top: ${({ $stickyHeight }) => $stickyHeight}px;
  max-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  min-height: calc(
    95vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  margin: 0;
  z-index: ${({ theme }) => theme.levels.front};
`;

interface StickyColProps extends React.ComponentProps<typeof Col> {
  children: ReactNode;
}

export const StickyCol = ({ children, ...props }: StickyColProps) => {
  const stickyHeight = useMemo(
    () => document.getElementById('sticky-plan-page-header')?.offsetHeight || 0,
    []
  );

  return (
    <StyledCol $stickyHeight={stickyHeight} {...props}>
      {children}
    </StyledCol>
  );
};
