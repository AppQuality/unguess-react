import type { ComponentType } from 'react';
import type { CampaignHubContext } from './CampaignsHubsMiddleware';
import type { EntityPageTabId } from './EntityPageHeader';

/**
 * Context exposed to per-tab content via the wrapper `<Outlet>`. Mirrors the
 * object `EntityPageWrapper` passes as the outlet context.
 */
export type EntityTabContext = CampaignHubContext & {
  activeTab: EntityPageTabId;
};

/**
 * One registered tab body. `match` decides when the definition applies to the
 * current entity/tab, so campaign and hub variants of the same tab id can
 * register independently (e.g. campaign vs hub `media-list`).
 */
export interface EntityTabDef {
  id: EntityPageTabId;
  match: (ctx: EntityTabContext) => boolean;
  Content: ComponentType;
}

/**
 * Registry of per-tab content rendered under the shared `EntityPageWrapper`.
 *
 * This is the seam that lets the remaining tab migrations be developed in
 * parallel: each subtask adds its own content module and appends a single
 * entry here, without touching `EntityPageContent` or the wrapper.
 *
 *   overview   -> UN-2894 (CampaignWidgets)
 *   bug-list   -> UN-2895
 *   media-list -> UN-2896 campaign / UN-2897 hub
 *   insights   -> UN-2896 campaign / UN-2897 hub
 *
 * `match` predicates are expected to be mutually exclusive; the first match
 * wins. While empty, the wrapper renders no tab body (the shell still falls
 * back to legacy content when `?tab=` is absent).
 */
export const ENTITY_TABS: EntityTabDef[] = [];
