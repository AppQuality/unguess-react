import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'src/common/api';
import { USER_LOAD } from '../user.actions.types';

export const fetchUser = createAsyncThunk(USER_LOAD, async () => {
  const user = await API.me();
  return user;
});
