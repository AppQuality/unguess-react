import { useAppSelector } from 'src/app/hooks';

export type TypeFilter = {
  types: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const getCurrentTypesFilter = (state?: TypeFilter) => ({
  available: state?.types?.available ? state.types.available : [],
  selected: state?.types?.selected ? state.types.selected : [],
});

export const setTypesFilter = (
  state: TypeFilter,
  types?: { id: number; name: string }[]
) => ({
  types: {
    ...getCurrentTypesFilter(state),
    ...(types ? { available: types } : {}),
  },
});

export const filterByTypes = (
  state: TypeFilter,
  types?: { id: number; name: string }[]
) => ({
  types: {
    ...getCurrentTypesFilter(state),
    ...(types ? { selected: types } : {}),
  },
});

export const getSelectedTypesIds = () => {
  const bugsPageSlice = useAppSelector((state) => state.bugsPage);

  if (!bugsPageSlice.currentCampaign) return undefined;

  if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].types)
    return undefined;

  const campaign: TypeFilter =
    bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

  if (!campaign.types.selected) return undefined;
  return campaign.types.selected.map((t) => t.id);
};
