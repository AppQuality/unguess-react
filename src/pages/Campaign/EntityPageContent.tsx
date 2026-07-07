import { useOutletContext } from 'react-router-dom';
import { ENTITY_TABS, type EntityTabContext } from './entityTabs';

// Generic per-tab dispatcher. The actual tab bodies live in the `ENTITY_TABS`
// registry (see `entityTabs.ts`); each tab migration registers its own content
// module there, so this file does not change as tabs are added.
//
// The wrapper resolves `activeTab` from the canonical path and only exposes
// enabled tabs, so a matching registry entry always exists in practice; the
// `null` guard is a defensive fallback for an unregistered tab id.
const EntityPageContent = () => {
  const ctx = useOutletContext<EntityTabContext>();
  const def = ENTITY_TABS.find((tab) => tab.match(ctx));

  if (!def) return null;

  const { Content } = def;
  return <Content />;
};

export default EntityPageContent;
