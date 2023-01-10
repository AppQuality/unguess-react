import { useAppSelector } from 'src/app/hooks';

export type SeverityFilter = {
  severities: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const getCurrentSeveritiesFilter = (state?: SeverityFilter) => ({
  available: state ? state.severities.available : [],
  selected: state ? state.severities.selected : [],
});

export const setSeverityFilter = (
  state: SeverityFilter,
  severities: { id: number; name: string }[]
) => ({
  severities: {
    ...getCurrentSeveritiesFilter(state),
    ...(severities ? { available: severities } : {}),
  },
});

export const filterBySeverities = (
  state: SeverityFilter,
  severities?: { id: number; name: string }[]
) => ({
  severities: {
    ...getCurrentSeveritiesFilter(state),
    ...(severities ? { selected: severities } : {}),
  },
});

export const getSelectedSeveritiesIds = () => {
  const bugsPageSlice = useAppSelector((state) => state.bugsPage);

  if (!bugsPageSlice.currentCampaign) return undefined;

  if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].severities)
    return undefined;

  const campaign: SeverityFilter =
    bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];
  if (!campaign.severities.selected) return undefined;
  return campaign.severities.selected.map((t) => t.id);
};
