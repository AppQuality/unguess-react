import { LG } from '@appquality/unguess-design-system';
import type { ReactNode } from 'react';
import styled from 'styled-components';

// Top padding of a tab section (matches the 32px spacer in the design).
export const TabSection = styled.div`
  padding-top: ${({ theme }) => theme.space.lg};
`;

const StyledTitle = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[700]};
  margin-bottom: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xs};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

/**
 * Shared tab title for the entity tab bodies (campaign + hub). Renders the
 * active-tab label (LG bold, grey-700, with a 1px grey-300 underline) and an
 * optional `meta` slot below it. Deduplicated from the per-tab inline copies so
 * every tab title is visually identical.
 *
 * Presentation-only: horizontal alignment is owned by the mount point (the
 * content column / `contentHeader` slot), which differs per tab — e.g. overview
 * aligns to the narrower widgets column, not full width.
 */
export const TabTitle = ({
  children,
  meta,
}: {
  children: ReactNode;
  meta?: ReactNode;
}) => (
  <div>
    <StyledTitle isBold>{children}</StyledTitle>
    {meta}
  </div>
);
