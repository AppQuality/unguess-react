import { GetUsersMeApiResponse } from '@src/features/api';

type UserState = {
  status: 'idle' | 'loading' | 'logged' | 'failed';
  userData: GetUsersMeApiResponse;
};

type Users = {
  getUserMe: GetUsersMeApiResponse;
};
