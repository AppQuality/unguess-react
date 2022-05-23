import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./actions/fetchUser";
import { UserState } from "./types";

const initialState: UserState = {
  status: "idle",
  userData: {
    id: 0,
    email: "",
    role: "none",
    name: "",
    workspaces: [],
    profile_id: 0,
    tryber_wp_user_id: 0,
    unguess_wp_user_id: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.status = "logged";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export default userSlice.reducer;
