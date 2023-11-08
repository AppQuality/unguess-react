import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  severity: { id: number; name: string }[];
  usecase: { id: number; name: string }[];
}

const initialState: FilterState = {
  severity: [],
  usecase: [],
};

const filtersSlice = createSlice({
  name: 'uxfilters',
  initialState,
  reducers: {
    setSeverity(state, action) {
      state.severity = action.payload;
    },
    setUseCase(state, action) {
      state.usecase = action.payload;
    },
    resetFilters(state) {
      state.severity = initialState.severity;
      state.usecase = initialState.usecase;
    },
  },
});

export const { setSeverity, setUseCase, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
