import { createSlice } from '@reduxjs/toolkit';
import { TypeFilter, setTypesFilter, filterByTypes } from './typeFilters';

type CampaignType = {
  selectedBugId?: number;
} & TypeFilter;

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
      };
    },
  },
});

export default bugPageSlice.reducer;
export const { selectCampaign, updateFilters } = bugPageSlice.actions;
