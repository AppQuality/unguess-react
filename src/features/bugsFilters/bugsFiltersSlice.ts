import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { BugType } from '../api';

interface Filter {
  selectedBugId?: number;
  types: {
    available: BugType[];
    selected?: BugType[];
  };
}

interface initialSimpleState {
  filters: { [campaign_id: string]: Filter };
}

const filterAdapter = createEntityAdapter<Filter>();

const initialState = filterAdapter.getInitialState({
  status: 'idle',
});

const initialStateSimple: initialSimpleState = {
  filters: {},
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // action = {id: 5080, changes: {id: 5080, name: "Campaign 5080", ...}, ...}
    campaignUpdate: filterAdapter.updateOne,
    campaignAdded: filterAdapter.addOne,
    campaignRemoved: filterAdapter.removeOne,
  },
});

const filterSliceSimple = createSlice({
  name: 'filters',
  initialState: initialStateSimple,
  reducers: {
    addCampaign: (state, action) => {
      const { cp_id, filters } = action.payload;
      state.filters[cp_id] = {
        types: {
          available: filters.types,
          selected: state.filters[cp_id]?.types?.selected || [],
        },
      };
    },

    updateFilters: (state, action) => {
      const { cp_id, filters } = action.payload;
      state.filters[cp_id] = {
        types: {
          available: state.filters[cp_id].types.available,
          selected: filters.types,
        },
      };
    },
  },
});

export default filterSliceSimple.reducer;
export const { addCampaign, updateFilters } = filterSliceSimple.actions;
