import { apiSlice as api } from "../api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsersMe: build.query<GetUsersMeApiResponse, GetUsersMeApiArg>({
      query: () => ({ url: `/users/me` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessApi };
export type GetUsersMeApiResponse = /** status 200  */ User;
export type GetUsersMeApiArg = void;
export type Workspace = {
  id: number;
  company: string;
  tokens: number;
  logo?: string;
  csm: {
    id: number;
    email: string;
    name: string;
    profile_id: number;
    tryber_wp_user_id: number;
    picture?: string;
  };
};
export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
  workspaces: Workspace[];
  profile_id: number;
  tryber_wp_user_id: number;
  unguess_wp_user_id: number;
  picture?: string;
  features?: {
    slug?: string;
    name?: string;
  }[];
};
export type Error = {
  message: string;
  code: number;
  error: boolean;
};
export const { useGetUsersMeQuery } = injectedRtkApi;
