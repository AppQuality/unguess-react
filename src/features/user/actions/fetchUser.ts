import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_LOAD } from "./user.actions.types";
import API from "src/utils/api";

export const fetchUser = createAsyncThunk(USER_LOAD, async () => {
  const user = await API.me();
  return user;
});
