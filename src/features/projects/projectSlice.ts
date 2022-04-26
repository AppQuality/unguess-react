import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { getProjects, getSingleProject } from "./actions";

interface ProjectInitialState {
  status: "idle" | "loading" | "complete" | "failed";
  currentProject?: ApiComponents["schemas"]["Project"];
}

const projectsAdapter = createEntityAdapter<Component["project"]>();

const initialState = projectsAdapter.getInitialState<ProjectInitialState>({
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
    builder.addCase(getSingleProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSingleProject.fulfilled, (state, action) => {
      state.currentProject = action.payload;
      state.status = "complete";
    });
    builder.addCase(getSingleProject.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default projectSlice.reducer;

export const { selectAll: selectProjects, selectById: selectProjectById } =
projectsAdapter.getSelectors((state: RootState) => state.projects);
