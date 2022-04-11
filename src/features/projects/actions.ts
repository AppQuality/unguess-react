import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PROJECTS } from "./actions.types";
import API from "src/common/api";

export const getProjects = createAsyncThunk(GET_PROJECTS,
  async (wid: number) => {
    const projects = await API.projects(wid);
    return projects;
  }
);