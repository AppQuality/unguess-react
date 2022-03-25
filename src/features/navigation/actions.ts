import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PROJECTS, GET_WORKSPACES } from "./navigation.actions.types";
import API from "src/common/api";

export const getProjects = createAsyncThunk(GET_PROJECTS,
  async (wid: number) => {
    const projects = await API.projects(wid);
    return projects;
  }
);

export const getWorkspaces = createAsyncThunk(GET_WORKSPACES, async () => {
  const workspaces = await API.workspaces();
  return workspaces;
});
