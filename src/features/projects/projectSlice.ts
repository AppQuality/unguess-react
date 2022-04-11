import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { getProjects } from "./actions";

const projectsAdapter = createEntityAdapter<Component["project"]>();

const initialState = projectsAdapter.getInitialState({
  status: "idle",
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      projectsAdapter.setAll(state, action.payload);
      state.status = "complete";
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default projectSlice.reducer;

export const { selectAll: selectProjects, selectById: selectProjectById } =
projectsAdapter.getSelectors((state: RootState) => state.projects);