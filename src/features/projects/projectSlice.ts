import { createSlice } from "@reduxjs/toolkit";
import { getProjects } from "./actions";


const initialState: ProjectState = {
  status: "idle",
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.status = "complete";
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default projectSlice.reducer;
