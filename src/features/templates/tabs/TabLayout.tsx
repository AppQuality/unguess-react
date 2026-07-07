import type { ReactNode } from 'react';
import styled from 'styled-components';

// Top padding of a tab section (matches the 40px spacer in the design).
export const TabSection = styled.div`
  padding-top: ${({ theme }) => theme.space.xl};
`;

/**
 * Shared header slot for the entity tab bodies (campaign + hub). The tab label
 * title and its underline were removed by design; only the optional `meta`
 * slot (e.g. the meta row) is rendered now. Kept as a component so the per-tab
 * mount points stay unchanged and horizontal alignment remains owned by the
 * mount point (the content column / `contentHeader` slot).
 */
export const TabTitle = ({
  meta,
}: {
  // Retained for call-site compatibility (the active-tab label); no longer
  // rendered now that the tab title and its border are removed.
  // eslint-disable-next-line react/no-unused-prop-types
  children?: ReactNode;
  meta?: ReactNode;
}) => <div>{meta}</div>;
