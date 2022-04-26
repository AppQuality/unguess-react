import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PROJECT, GET_PROJECTS } from "./actions.types";
import API from "src/common/api";

export const getProjects = createAsyncThunk(GET_PROJECTS,
  async (wid: number) => {
    const projects = await API.projects(wid);
    return projects.items as ApiComponents['schemas']['Project'][];
  }
);

export const getSingleProject = createAsyncThunk(GET_PROJECT,
  async (pid: number) => {
    const project = await API.project(pid);
    return project;
  }
);