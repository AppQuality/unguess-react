import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'all',
  Running: 'running',
  Completed: 'completed',
  Incoming: 'incoming',
};

export interface FilterState {
  status: string;
  type: string;
  testNameId: number;
  search?: string;
  projectId?: number;
}

const initialState: FilterState = {
  status: StatusFilters.All,
  type: 'all',
  testNameId: 0,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    typeFilterChanged(state, action) {
      state.type = action.payload;
    },
    testTypeFilterChanged(state, action) {
      state.testNameId = action.payload;
    },
    searchFilterChanged(state, action) {
      state.search = action.payload;
    },
    projectFilterChanged(state, action) {
      state.projectId = action.payload;
    },
    resetFilters(state) {
      state.status = initialState.status;
      state.type = initialState.type;
      state.testNameId = initialState.testNameId;
      state.search = initialState.search;
      state.projectId = initialState.projectId;
    },
  },
});

export const {
  statusFilterChanged,
  typeFilterChanged,
  testTypeFilterChanged,
  searchFilterChanged,
  projectFilterChanged,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
