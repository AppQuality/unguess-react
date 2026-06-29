// UN-2893 (Subtask 1) ships only the routing + header shell. The per-tab
// content is NOT migrated here: it stays in the following subtasks, each
// reusing the existing content-only components (so no legacy header is
// rendered and no `renderHeader` suppression prop is needed):
//   overview   -> UN-2894 (CampaignWidgets)
//   bug-list   -> UN-2895 (BugsPageContent)
//   media-list -> UN-2896 campaign / UN-2897 hub (VideosPageContent)
//   insights   -> UN-2896 campaign / UN-2897 hub (InsightsPageContent)
//
// Until then this is an intentional placeholder. The wrapper falls back to the
// legacy content when `?tab=` is absent, so this path is not reachable through
// normal navigation yet.
const EntityPageContent = () => null;

export default EntityPageContent;
