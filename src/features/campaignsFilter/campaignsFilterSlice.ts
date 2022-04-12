import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  All: 'all',
  Running: 'Running',
  Completed: 'completed',
  Incoming: 'incoming',
}

interface FilterState {
  status: string,
  projectId?: number,
}

const initialState: FilterState = {
  status: StatusFilters.All,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    projectFilterChanged(state, action) {
      state.projectId = action.payload
    }
  },
})

export const { projectFilterChanged, statusFilterChanged } = filtersSlice.actions

export default filtersSlice.reducer
