import { useOutletContext } from 'react-router-dom';
import { ENTITY_TABS, type EntityTabContext } from './entityTabs';

// Generic per-tab dispatcher. The actual tab bodies live in the `ENTITY_TABS`
// registry (see `entityTabs.ts`); each tab migration registers its own content
// module there, so this file does not change as tabs are added.
//
// Until a tab is registered this renders nothing — an intentional placeholder.
// The wrapper falls back to legacy content when `?tab=` is absent, so the
// unregistered path is not reachable through normal navigation yet.
const EntityPageContent = () => {
  const ctx = useOutletContext<EntityTabContext>();
  const def = ENTITY_TABS.find((tab) => tab.match(ctx));

  if (!def) return null;

  const { Content } = def;
  return <Content />;
};

export default EntityPageContent;
