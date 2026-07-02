import { getColor, LG } from '@appquality/unguess-design-system';
import styled from 'styled-components';

/**
 * Shared presentational primitives for the entity tab bodies, deduplicated
 * from the individual tab modules (overview/media-list/insights, campaign +
 * hub). Kept alongside the tabs so they move together in the later
 * `pages/Campaign` reorg.
 */

// Top padding of a tab section (matches the 32px spacer in the design).
export const TabSection = styled.div`
  padding-top: ${({ theme }) => theme.space.lg};
`;

// Active-tab title shown at the top of the content column. Rendered bold at
// call sites (`<TabTitle isBold>`).
export const TabTitle = styled(LG)`
  color: ${({ theme }) => getColor(theme.palette.blue, 600)};
  margin-bottom: ${({ theme }) => theme.space.xs};
  padding-bottom: ${({ theme }) => theme.space.xs};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;
