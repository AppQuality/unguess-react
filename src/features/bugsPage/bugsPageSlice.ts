import { createSlice } from '@reduxjs/toolkit';
import { TypeFilterType, TypeFilter } from './typeFilters';
import { SeverityFilter, SeverityFilterType } from './severityFilters';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilterType &
  SeverityFilterType;

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
          ...TypeFilter.setAvailable(
            state.campaigns[cp_id as number],
            filters.types
          ),
          ...SeverityFilter.setAvailable(
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
        ...TypeFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.types
        ),
        ...SeverityFilter.filter(
          state.campaigns[state.currentCampaign],
          filters.severities
        ),
      };
    },
  },
});

export default bugPageSlice.reducer;

export const getSelectedFiltersIds = () => ({
  types: TypeFilter.getIds(),
  severities: SeverityFilter.getIds(),
});

export const { selectCampaign, updateFilters } = bugPageSlice.actions;
