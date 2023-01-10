import { createSlice } from '@reduxjs/toolkit';
import {
  TypeFilter,
  setTypesFilter,
  filterByTypes,
  getSelectedTypesIds,
} from './typeFilters';
import {
  SeverityFilter,
  setSeverityFilter,
  filterBySeverities,
  getSelectedSeveritiesIds,
} from './severityFilters';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilter &
  SeverityFilter;

interface initialSimpleState {
  currentCampaign?: number;
  campaigns: {
    [campaign_id: string]: CampaignType;
  };
}

const initialStateSimple: initialSimpleState = {
  campaigns: {},
};

const bugPageSlice = createSlice({
  name: 'bugPage',
  initialState: initialStateSimple,
  reducers: {
    selectCampaign: (state, action) => {
      const { cp_id, filters } = action.payload;
      if (!(cp_id in state.campaigns)) {
        state.campaigns[cp_id as number] = {
          ...setTypesFilter(state.campaigns[cp_id as number], filters.types),
          ...setSeverityFilter(
            state.campaigns[cp_id as number],
            filters.severities
          ),
        };
      }
      state.currentCampaign = cp_id;
    },
    updateFilters: (state, action) => {
      const { filters } = action.payload;
      if (!state.currentCampaign) return;
      state.campaigns[state.currentCampaign] = {
        ...filterByTypes(
          state.campaigns[state.currentCampaign as number],
          filters.types
        ),
        ...filterBySeverities(
          state.campaigns[state.currentCampaign as number],
          filters.severities
        ),
      };
    },
  },
});

export default bugPageSlice.reducer;

export const getSelectedFiltersIds = () => ({
  types: getSelectedTypesIds(),
  severities: getSelectedSeveritiesIds(),
});

export const { selectCampaign, updateFilters } = bugPageSlice.actions;
