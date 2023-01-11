import { useAppSelector } from 'src/app/hooks';

export type TypeFilterType = {
  types: {
    available: { id: number; name: string }[];
    selected: { id: number; name: string }[];
  };
};

export const TypeFilter = {
  getCurrent: (state?: TypeFilterType) => ({
    available: state?.types?.available ? state.types.available : [],
    selected: state?.types?.selected ? state.types.selected : [],
  }),
  setAvailable: (
    state: TypeFilterType,
    types?: { id: number; name: string }[]
  ) => ({
    types: {
      ...TypeFilter.getCurrent(state),
      ...(types ? { available: types } : {}),
    },
  }),
  filter: (state: TypeFilterType, types?: { id: number; name: string }[]) => ({
    types: {
      ...TypeFilter.getCurrent(state),
      ...(types ? { selected: types } : {}),
    },
  }),
  getIds: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].types)
      return undefined;

    const campaign: TypeFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    if (!campaign.types.selected) return undefined;
    return campaign.types.selected.map((t) => t.id);
  },
};

export const getCurrentTypesFilter = TypeFilter.getCurrent;

export const setTypesFilter = TypeFilter.setAvailable;

export const filterByTypes = TypeFilter.filter;

export const getSelectedTypesIds = TypeFilter.getIds;
